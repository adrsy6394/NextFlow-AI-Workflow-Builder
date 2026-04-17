import React from 'react';
import { Handle, Position } from 'reactflow';
import { BrainCircuit } from 'lucide-react';
import NodeContainer from './NodeContainer';
import useWorkflowStore from '../../store/workflowStore';

export default function LLMNode({ id, data, selected }) {
  const updateNodeData = useWorkflowStore((state) => state.updateNodeData);

  const handleModelChange = (e) => {
    updateNodeData(id, { model: e.target.value });
  };

  return (
    <NodeContainer title="LLM Processor" icon={BrainCircuit} isSelected={selected} nodeId={id}>
      <div className="flex flex-col gap-3">
        {/* System Prompt Input */}
        <div className="relative flex items-center border border-dashed border-gray-600 rounded p-2 bg-gray-800">
          <Handle type="target" id="system" position={Position.Left} className="w-3 h-3 bg-indigo-400 -ml-[9px]" />
          <div className="text-xs font-medium text-gray-300 pl-2">System Prompt</div>
        </div>
        
        {/* User Prompt Input */}
        <div className="relative flex items-center border border-dashed border-gray-600 rounded p-2 bg-gray-800">
          <Handle type="target" id="user" position={Position.Left} className="w-3 h-3 bg-indigo-400 -ml-[9px]" />
          <div className="text-xs font-medium text-gray-300 pl-2">User Prompt</div>
        </div>

        {/* Image Input */}
        <div className="relative flex items-center border border-dashed border-gray-600 rounded p-2 bg-gray-800 border-l-4 border-l-pink-500">
          <Handle type="target" id="image" position={Position.Left} className="w-3 h-3 bg-pink-500 -ml-[9px]" />
          <div className="text-xs font-medium text-gray-300 pl-2">Image & Video URL (Optional)</div>
        </div>

        {/* Document Parsing Input */}
        <div className="relative flex items-center border border-dashed border-gray-600 rounded p-2 bg-gray-800 border-l-4 border-l-teal-500">
          <Handle type="target" id="document" position={Position.Left} className="w-3 h-3 bg-teal-500 -ml-[9px]" />
          <div className="text-xs font-medium text-gray-300 pl-2">Document Data (Optional)</div>
        </div>
        
        {/* Model Selection */}
        <div className="mt-2">
          <label className="text-xs font-medium text-gray-400 mb-1 block">Model</label>
          <select 
            className="w-full text-sm p-2 bg-gray-900 text-gray-200 border border-gray-700 rounded-md nodrag focus:outline-none focus:ring-1 focus:ring-indigo-500" 
            value={data.model || 'gemini-flash'}
            onChange={handleModelChange}
          >
            <option value="gemini-flash">Gemini 2.0 Flash (Google)</option>
            <option value="claude-3">Claude 3 (Anthropic)</option>
          </select>
        </div>
      </div>
      
      {/* Output */}
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-indigo-400" />
    </NodeContainer>
  );
}
