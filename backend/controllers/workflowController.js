const fs = require('fs');
const path = require('path');
const os = require('os');

const isVercel = process.env.VERCEL;
const dataFilePath = isVercel 
  ? path.join(os.tmpdir(), 'workflows.json')
  : path.join(__dirname, '../data/workflows.json');

// Helper to read/write data safely
const readData = () => {
  if (!fs.existsSync(dataFilePath)) return [];
  const raw = fs.readFileSync(dataFilePath);
  return JSON.parse(raw);
};

const writeData = (data) => {
  if (!fs.existsSync(path.dirname(dataFilePath))) {
    fs.mkdirSync(path.dirname(dataFilePath), { recursive: true });
  }
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

exports.saveWorkflow = (req, res) => {
  try {
    const userId = req.auth.userId;
    const { nodes, edges } = req.body;
    
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const workflows = readData();
    const existingIndex = workflows.findIndex(w => w.userId === userId);

    const workflowState = {
      userId,
      nodes,
      edges,
      updatedAt: new Date().toISOString()
    };

    if (existingIndex >= 0) {
      workflows[existingIndex] = workflowState;
    } else {
      workflows.push(workflowState);
    }

    writeData(workflows);
    res.status(200).json({ success: true, message: "Workflow saved successfully" });

  } catch (error) {
    res.status(500).json({ error: "Failed to save workflow" });
  }
};

exports.getWorkflows = (req, res) => {
  try {
    const userId = req.auth.userId;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const workflows = readData();
    const userWorkflow = workflows.find(w => w.userId === userId);

    res.status(200).json({ success: true, data: userWorkflow || { nodes: [], edges: [] } });
  } catch (error) {
    res.status(500).json({ error: "Failed to load workflows" });
  }
};
