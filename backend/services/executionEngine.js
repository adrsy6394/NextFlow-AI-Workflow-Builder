const aiService = require('./aiService');

class ExecutionEngine {
  constructor(nodes, edges) {
    this.nodes = nodes || [];
    this.edges = edges || [];
    this.nodeMap = new Map(this.nodes.map(n => [n.id, n]));
    this.adjacencyList = new Map();
    this.inDegree = new Map();
    
    // Initialize graph structures
    this.nodes.forEach(n => {
      this.adjacencyList.set(n.id, []);
      this.inDegree.set(n.id, 0);
    });

    // Populate adjacency list and track in-degrees for topological sort
    this.edges.forEach(e => {
      // Directed edge from source to target
      if (this.adjacencyList.has(e.source) && this.inDegree.has(e.target)) {
        this.adjacencyList.get(e.source).push({ target: e.target, targetHandle: e.targetHandle });
        this.inDegree.set(e.target, this.inDegree.get(e.target) + 1);
      }
    });
  }

  getTopologicalSort() {
    const sorted = [];
    const queue = [];

    // Enqueue all nodes with 0 dependencies (in-degree == 0)
    for (let [nodeId, degree] of this.inDegree.entries()) {
      if (degree === 0) queue.push(nodeId);
    }

    while (queue.length > 0) {
      const current = queue.shift();
      sorted.push(current);

      for (let edge of this.adjacencyList.get(current)) {
        const neighbor = edge.target;
        this.inDegree.set(neighbor, this.inDegree.get(neighbor) - 1);
        if (this.inDegree.get(neighbor) === 0) {
          queue.push(neighbor);
        }
      }
    }

    // If topological sort does not encompass all nodes, a structural cycle is present
    if (sorted.length !== this.nodes.length) {
      throw new Error("Cycle detected in workflow. Cannot execute looping flows.");
    }

    return sorted;
  }

  async executeWorkflow(onProgress = () => {}) {
    const executionOrder = this.getTopologicalSort();
    const results = new Map();

    for (const nodeId of executionOrder) {
      const node = this.nodeMap.get(nodeId);
      let output = null;

      onProgress(nodeId, "Running", null);

      try {
        switch (node.type) {
          case 'text':
            output = node.data?.value || "";
            break;

          case 'image':
          case 'video':
            // Cloudinary uploaded URL string
            output = node.data?.url || "";
            break;

          case 'uploadPdf':
            output = { url: node.data?.url, extractedText: node.data?.extractedText };
            break;

          case 'llm':
            let systemPrompt = node.data?.systemPrompt || "";
            let userPrompt = node.data?.userPrompt || "";
            let imageUrl = "";
            let documentData = "";

            // Input Chaining: Read dynamic properties routed from previous nodes into payload bindings
            const incomingEdges = this.edges.filter(e => e.target === nodeId);
            for (const edge of incomingEdges) {
              const sourceValue = results.get(edge.source);
              if (edge.targetHandle === 'system') systemPrompt = sourceValue;
              if (edge.targetHandle === 'user') userPrompt = sourceValue;
              if (edge.targetHandle === 'image') imageUrl = sourceValue;
              if (edge.targetHandle === 'document') {
                 documentData = sourceValue?.extractedText || sourceValue || "";
                 // Failsafe: if text extraction yielded nothing (e.g. image-based PDF) but we have a link,
                 // fallback to Cloudinary automatic rasterization so OpenRouter Vision can read the first page.
                 if (!documentData && sourceValue?.url && typeof sourceValue.url === 'string' && sourceValue.url.includes('cloudinary')) {
                    imageUrl = sourceValue.url.replace(/\.pdf$/i, ".jpg");
                 }
              }
            }

            // Pre-process context window logic bypassing LLM restrictions natively
            if (documentData) {
               userPrompt = `[Document Context Provided Below]\n\n${documentData}\n\n[End of Document Context]\n\nUser Question/Instruction:\n${userPrompt}`;
            }

            const model = node.data?.model || "gemini-flash";
            output = await aiService.runLLM(systemPrompt, userPrompt, model, imageUrl);
            break;

          case 'outputNode': {
            const incomingEdgesOutput = this.edges.filter(e => e.target === nodeId);
            let displayValue = "No input connected.";
            if (incomingEdgesOutput.length > 0) {
              const sourceValue = results.get(incomingEdgesOutput[0].source);
              displayValue = sourceValue !== undefined ? sourceValue : "No data received.";
            }
            output = displayValue;
            break;
          }

          default:
            output = "Unknown functionality";
        }

        results.set(nodeId, output);
        onProgress(nodeId, "Success", output);
      } catch (err) {
        console.error(`Error executing node ${nodeId}:`, err);
        onProgress(nodeId, "Failed", err.message);
        throw new Error(`Execution failed at node: ${node.data?.label || nodeId}`);
      }
    }

    return Object.fromEntries(results);
  }
}

module.exports = ExecutionEngine;
