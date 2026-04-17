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
      <header className="h-[60px] px-6 bg-gray-900 border-b border-gray-800 flex justify-between items-center z-10 shrink-0 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">N</div>
          <h1 className="text-xl font-bold text-gray-100 tracking-tight">NextFlow</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={handleLoad} 
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-gray-200 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
          >
            {isLoading ? 'Loading...' : 'Load'}
          </button>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-sm cursor-pointer"
          >
            {isSaving ? 'Saving...' : 'Save Workflow'}
          </button>
          <div className="w-px h-6 bg-gray-700 mx-2"></div>
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>
      
      <main className="flex-1 flex overflow-hidden">
        <LeftSidebar />
        <div className="flex-1 h-full relative">
          <WorkflowCanvas />
        </div>
        <RightSidebar />
      </main>
    </div>
  );
}
