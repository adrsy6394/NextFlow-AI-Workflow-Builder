import React from 'react';
import { Trash2 } from 'lucide-react';
import useWorkflowStore from '../../store/workflowStore';

export default function NodeContainer({ title, icon: Icon, children, isSelected, nodeId }) {
  const removeNode = useWorkflowStore((state) => state.removeNode);

  return (
    <div className={`bg-gray-800 rounded-xl shadow-lg border ${isSelected ? 'border-indigo-500 ring-2 ring-indigo-500/30' : 'border-gray-700'} min-w-[240px] overflow-hidden transition-all duration-200`}>
      <div className="bg-gray-900 border-b border-gray-700 flex justify-between items-center px-4 py-3">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-4 h-4 text-indigo-400" />}
          <span className="font-semibold text-sm text-gray-200">{title}</span>
        </div>
        
        {nodeId && (
          <button 
            onClick={() => removeNode(nodeId)} 
            className="text-gray-500 hover:text-red-400 p-1 hover:bg-gray-800 rounded transition-colors nodrag"
            title="Delete Node"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
      <div className="p-4 bg-gray-800 text-gray-300">
        {children}
      </div>
    </div>
  );
}
