import React, { useState } from 'react';
import { UserButton, useAuth } from '@clerk/clerk-react';
import LeftSidebar from '../components/layout/LeftSidebar';
import RightSidebar from '../components/layout/RightSidebar';
import WorkflowCanvas from '../components/canvas/WorkflowCanvas';
import useWorkflowStore from '../store/workflowStore';
import toast from 'react-hot-toast';

export default function Builder() {
  const { getToken } = useAuth();
  const { nodes, edges, setNodes, setEdges } = useWorkflowStore();
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const token = await getToken();
      const response = await fetch(`${import.meta.env.VITE_API_URL}/workflow/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ nodes, edges })
      });
      if (!response.ok) throw new Error("Failed to save");
      toast.success("Workflow saved successfully!");
    } catch (err) {
      toast.error("Error saving workflow.");
    }
    setIsSaving(false);
  };

  const handleLoad = async () => {
    setIsLoading(true);
    try {
      const token = await getToken();
      const response = await fetch(`${import.meta.env.VITE_API_URL}/workflow/history`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const resData = await response.json();
      if (resData.success && resData.data) {
        setNodes(resData.data.nodes || []);
        setEdges(resData.data.edges || []);
        toast.success("Workflow loaded!");
      }
    } catch (err) {
      toast.error("Error loading workflow.");
    }
    setIsLoading(false);
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-950 overflow-hidden">
      <header className="h-[60px] px-3 sm:px-6 bg-gray-900 border-b border-gray-800 flex justify-between items-center z-20 shrink-0 shadow-sm relative">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm sm:text-base shrink-0">N</div>
          <h1 className="text-lg sm:text-xl font-bold text-gray-100 tracking-tight hidden min-[360px]:block">NextFlow</h1>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-4">
          <button 
            onClick={handleLoad} 
            disabled={isLoading}
            className="px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-200 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
          >
            {isLoading ? 'Loading...' : 'Load'}
          </button>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-sm cursor-pointer whitespace-nowrap"
          >
            {isSaving ? 'Saving...' : <span className="hidden sm:inline">Save Workflow</span>}
            {!isSaving && <span className="sm:hidden">Save</span>}
          </button>
          <div className="w-px h-5 sm:h-6 bg-gray-700 mx-1 sm:mx-2"></div>
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>
      
      <main className="flex-1 flex overflow-hidden relative">
        <LeftSidebar />
        <div className="flex-1 h-full relative">
          <WorkflowCanvas />
        </div>
        <RightSidebar />
      </main>
    </div>
  );
}
