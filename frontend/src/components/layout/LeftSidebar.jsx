import React, { useState } from 'react';
import { Type, BrainCircuit, Image as ImageIcon, Video, ChevronLeft, ChevronRight, TerminalSquare, FileText } from 'lucide-react';
import useWorkflowStore from '../../store/workflowStore';

export default function LeftSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const addNode = useWorkflowStore((state) => state.addNode);

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const onNodeClick = (nodeType) => {
    const newNode = {
      id: `node_${Date.now()}`,
      type: nodeType,
      position: { x: 250 + Math.random() * 50, y: 150 + Math.random() * 50 },
      data: { label: `${nodeType.charAt(0).toUpperCase() + nodeType.slice(1)} Node` },
    };
    addNode(newNode);
  };

  return (
    <aside className={`${isOpen ? 'w-[260px]' : 'w-[60px]'} bg-gray-900 border-r border-gray-800 flex flex-col h-full shadow-sm z-10 shrink-0 transition-all duration-300 relative overflow-hidden`}>
      <div className={`p-4 border-b border-gray-800 flex items-center ${isOpen ? 'justify-between' : 'justify-center'}`}>
        {isOpen && <h2 className="text-lg font-semibold text-gray-100 whitespace-nowrap">Node Library</h2>}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="p-1 hover:bg-gray-800 rounded-md transition-colors flex-shrink-0"
        >
          {isOpen ? <ChevronLeft className="w-5 h-5 text-gray-400"/> : <ChevronRight className="w-5 h-5 text-gray-400"/>}
        </button>
      </div>
      
      {isOpen && (
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        
        {/* Text Node Draggable */}
        <div 
          className="flex items-center gap-3 p-3 border border-gray-700 rounded-lg bg-gray-800 hover:bg-indigo-900/40 hover:border-indigo-500 hover:text-indigo-300 cursor-grab transition-colors"
          onDragStart={(event) => onDragStart(event, 'text')}
          onClick={() => onNodeClick('text')}
          draggable
        >
          <Type className="w-5 h-5 text-indigo-400" />
          <span className="font-medium text-sm text-gray-300">Text Input</span>
        </div>

        {/* LLM Node Draggable */}
        <div 
          className="flex items-center gap-3 p-3 border border-gray-700 rounded-lg bg-gray-800 hover:bg-indigo-900/40 hover:border-indigo-500 hover:text-indigo-300 cursor-grab transition-colors"
          onDragStart={(event) => onDragStart(event, 'llm')}
          onClick={() => onNodeClick('llm')}
          draggable
        >
          <BrainCircuit className="w-5 h-5 text-indigo-400" />
          <span className="font-medium text-sm text-gray-300">LLM Processor</span>
        </div>

        {/* Upload Image Draggable */}
        <div 
          className="flex items-center gap-3 p-3 border border-gray-700 rounded-lg bg-gray-800 hover:bg-indigo-900/40 hover:border-indigo-500 hover:text-indigo-300 cursor-grab transition-colors"
          onDragStart={(event) => onDragStart(event, 'image')}
          onClick={() => onNodeClick('image')}
          draggable
        >
          <ImageIcon className="w-5 h-5 text-indigo-400" />
          <span className="font-medium text-sm text-gray-300">Upload Image</span>
        </div>

        {/* Upload Video Draggable */}
        <div 
          className="flex items-center gap-3 p-3 border border-gray-700 rounded-lg bg-gray-800 hover:bg-indigo-900/40 hover:border-indigo-500 hover:text-indigo-300 cursor-grab transition-colors"
          onDragStart={(event) => onDragStart(event, 'video')}
          onClick={() => onNodeClick('video')}
          draggable
        >
          <Video className="w-5 h-5 text-indigo-400" />
          <span className="font-medium text-sm text-gray-300">Upload Video</span>
        </div>

        {/* Upload PDF Draggable */}
        <div 
          className="flex items-center gap-3 p-3 border border-gray-700 rounded-lg bg-gray-800 hover:bg-teal-900/40 hover:border-teal-500 hover:text-teal-300 cursor-grab transition-colors"
          onDragStart={(event) => onDragStart(event, 'uploadPdf')}
          onClick={() => onNodeClick('uploadPdf')}
          draggable
        >
          <FileText className="w-5 h-5 text-teal-400" />
          <span className="font-medium text-sm text-gray-300">Upload PDF</span>
        </div>

        {/* Output Display Draggable */}
        <div 
          className="flex items-center gap-3 p-3 border border-gray-700 rounded-lg bg-gray-800 hover:bg-indigo-900/40 hover:border-indigo-500 hover:text-indigo-300 cursor-grab transition-colors"
          onDragStart={(event) => onDragStart(event, 'outputNode')}
          onClick={() => onNodeClick('outputNode')}
          draggable
        >
          <TerminalSquare className="w-5 h-5 text-indigo-400" />
          <span className="font-medium text-sm text-gray-300">Output Display</span>
        </div>

      </div>
      )}
    </aside>
  );
}
