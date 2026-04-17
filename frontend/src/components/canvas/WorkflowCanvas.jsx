import React, { useState, useCallback, useRef } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  MiniMap,
  ReactFlowProvider
} from 'reactflow';
import 'reactflow/dist/style.css';

import TextNode from '../nodes/TextNode';
import LLMNode from '../nodes/LLMNode';
import UploadImageNode from '../nodes/UploadImageNode';
import UploadVideoNode from '../nodes/UploadVideoNode';
import OutputNode from '../nodes/OutputNode';
import UploadPdfNode from '../nodes/UploadPdfNode';
import useWorkflowStore from '../../store/workflowStore';

const nodeTypes = {
  text: TextNode,
  llm: LLMNode,
  image: UploadImageNode,
  video: UploadVideoNode,
  outputNode: OutputNode,
  uploadPdf: UploadPdfNode
};

let id = 1;
const getId = () => `node_${id++}`;

function CanvasArea() {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode } = useWorkflowStore();

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      addNode(newNode);
    },
    [reactFlowInstance, addNode]
  );

  return (
    <div className="flex-1 w-full h-full bg-gray-950" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        fitView
      >
        <Background variant="dots" gap={16} size={1} color="#334155" />
        <Controls />
        <MiniMap zoomable pannable nodeColor={(n) => '#1e293b'} maskColor="rgba(3, 7, 18, 0.8)" />
      </ReactFlow>
    </div>
  );
}

export default function WorkflowCanvas() {
  return (
    <ReactFlowProvider>
      <CanvasArea />
    </ReactFlowProvider>
  );
}
