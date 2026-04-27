import React from 'react';
import { Handle, Position } from 'reactflow';
import { Type } from 'lucide-react';
import NodeContainer from './NodeContainer';
import useWorkflowStore from '../../store/workflowStore';

export default function TextNode({ id, data, selected }) {
  const updateNodeData = useWorkflowStore((state) => state.updateNodeData);

  const handleChange = (e) => {
    updateNodeData(id, { value: e.target.value });
  };

  return (
    <NodeContainer title="Text Input" icon={Type} isSelected={selected} nodeId={id}>
      <div className="flex flex-col gap-2">
        <label className="text-xs font-medium text-gray-500">Value</label>
        <textarea 
          className="w-full text-sm p-2 bg-gray-50 border border-gray-200 rounded-md focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none nodrag text-black" 
          rows="3" 
          placeholder="Enter text..."
          value={data.value || ''}
          onChange={handleChange}
        />
      </div>
      {/* Output Node */}
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-indigo-500" />
    </NodeContainer>
  );
}
