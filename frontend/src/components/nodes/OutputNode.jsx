import React from 'react';
import { Handle, Position } from 'reactflow';
import { TerminalSquare } from 'lucide-react';
import NodeContainer from './NodeContainer';

export default function OutputNode({ id, data, selected }) {
  return (
    <NodeContainer title="Output Display" icon={TerminalSquare} isSelected={selected} nodeId={id}>
      <Handle type="target" id="input" position={Position.Left} className="w-3 h-3 bg-indigo-400 -ml-[9px]" />
      <div className="flex flex-col gap-2">
        <label className="text-xs font-medium text-gray-400">Response Data</label>
        <div className="w-full text-xs p-3 bg-gray-900 border border-gray-700 rounded-md text-green-400 min-h-[60px] max-h-[250px] overflow-y-auto break-words whitespace-pre-wrap">
          {data.output ? (typeof data.output === 'object' ? JSON.stringify(data.output, null, 2) : data.output) : "Waiting for execution..."}
        </div>
      </div>
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-indigo-400" />
    </NodeContainer>
  );
}
