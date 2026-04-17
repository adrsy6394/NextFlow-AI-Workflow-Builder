import React, { useEffect, useState } from 'react';
import useWorkflowStore from '../../store/workflowStore';
import { Play, CheckCircle2, XCircle, Clock, Loader2, ChevronRight, ChevronLeft } from 'lucide-react';
import toast from 'react-hot-toast';

export default function RightSidebar() {
  const { nodes, edges } = useWorkflowStore();
  const updateNodeData = useWorkflowStore((state) => state.updateNodeData);
  const [jobId, setJobId] = useState(null);
  const [jobState, setJobState] = useState(null);
  const [isPolling, setIsPolling] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const handleRun = async () => {
    try {
      // Automatic conversion: OpenRouter ONLY supports static images via Vision API.
      // Since Cloudinary automatically returns a structural frame when an `.mp4` URL is changed to `.jpg`,
      // we transform video nodes into structural .jpg URLs prior to backend submission. This utilizes Vite HMR so the user doesn't need to restart node!
      const safeNodes = nodes.map(node => {
        if (node.type === 'video' && node.data?.url) {
           return {
             ...node,
             data: { ...node.data, url: node.data.url.replace(/\.(mp4|webm|mov|avi|mkv)$/i, ".jpg") }
           };
        }
        return node;
      });

      const res = await fetch(`${import.meta.env.VITE_API_URL}/execute/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes: safeNodes, edges })
      });
      const data = await res.json();
      if (data.success) {
        setJobId(data.jobId);
        setJobState(null);
        setIsPolling(true);
        if (!isOpen) setIsOpen(true);
        toast.success("Execution started");
      }
    } catch (err) {
      toast.error("Failed to start workflow execution.");
    }
  };

  useEffect(() => {
    let interval;
    if (isPolling && jobId) {
      interval = setInterval(async () => {
        try {
          const res = await fetch(`${import.meta.env.VITE_API_URL}/execute/status/${jobId}`);
          const data = await res.json();
          if (data.success && data.data) {
            setJobState(data.data);
            
            // Sync specific node outputs back to the canvas live!
            data.data.logs.forEach(log => {
              const matchedNode = nodes.find(n => n.id === log.nodeId);
              if (matchedNode && matchedNode.type === 'outputNode' && log.status === 'Success') {
                updateNodeData(log.nodeId, { output: log.output });
              }
            });

            if (data.data.status === 'Success' || data.data.status === 'Failed') {
              setIsPolling(false);
            }
          }
        } catch (err) {
          console.error("Polling error", err);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPolling, jobId]);

  return (
    <aside className={`${isOpen ? 'w-[300px]' : 'w-[60px]'} bg-gray-900 border-l border-gray-800 flex flex-col h-full shadow-sm z-10 shrink-0 transition-all duration-300 relative overflow-hidden`}>
      <div className={`p-4 border-b border-gray-800 flex items-center ${isOpen ? 'justify-between' : 'justify-center'} bg-gray-800`}>
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className={`p-1 hover:bg-gray-700 rounded-md transition-colors ${isOpen ? 'mr-0' : 'mr-0'}`}
        >
          {isOpen ? <ChevronRight className="w-5 h-5 text-gray-400"/> : <ChevronLeft className="w-5 h-5 text-gray-400"/>}
        </button>
        {isOpen && (
          <>
            <h2 className="text-lg font-semibold text-gray-100 whitespace-nowrap mr-auto ml-2">Execution</h2>
            <button 
              onClick={handleRun}
              disabled={isPolling || nodes.length === 0}
              className="flex items-center gap-1 px-3 py-1.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-indigo-400/50 transition-colors shadow-sm text-sm font-medium cursor-pointer flex-shrink-0"
            >
              {isPolling ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
              {isPolling ? 'Running' : 'Run'}
            </button>
          </>
        )}
      </div>

      {isOpen && (
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
          {!jobState && !isPolling && (
            <div className="text-center text-gray-500 mt-10 text-sm">
              Press Run to execute your workflow. Logs will appear here.
            </div>
          )}

        {jobState && (
          <div className="flex flex-col gap-4">
             <div className="flex items-center justify-between p-3 rounded-lg border border-gray-700 bg-gray-800 shadow-sm">
               <span className="text-xs text-gray-400 font-medium">Job Status</span>
               <div className="flex items-center gap-1.5">
                 {jobState.status === 'Running' && <Loader2 className="w-4 h-4 text-indigo-400 animate-spin" />}
                 {jobState.status === 'Success' && <CheckCircle2 className="w-4 h-4 text-green-400" />}
                 {jobState.status === 'Failed' && <XCircle className="w-4 h-4 text-red-400" />}
                 {jobState.status === 'Pending' && <Clock className="w-4 h-4 text-orange-400" />}
                 <span className={`text-sm font-semibold 
                    ${jobState.status === 'Success' ? 'text-green-500' : 
                      jobState.status === 'Failed' ? 'text-red-500' : 
                      'text-indigo-400'}`}>
                   {jobState.status}
                 </span>
               </div>
             </div>

             <div className="flex flex-col gap-2">
               <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Execution Logs</h3>
               {jobState.logs.map((log, index) => {
                 const nodeBlock = nodes.find(n => n.id === log.nodeId);
                 const nodeName = nodeBlock ? nodeBlock.type : log.nodeId;
                 return (
                   <div key={index} className="p-3 bg-gray-800 border border-gray-700 rounded-md shadow-sm text-sm">
                     <div className="flex justify-between items-center mb-1">
                       <span className="font-semibold text-gray-200 capitalize">{nodeName} Node</span>
                       <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${
                         log.status === 'Success' ? 'bg-green-900/30 text-green-400' : 
                         log.status === 'Failed' ? 'bg-red-900/30 text-red-400' : 
                         'bg-indigo-900/40 text-indigo-400'}`}>
                         {log.status}
                       </span>
                     </div>
                     {log.output && log.status === 'Success' && (
                       <div className="mt-2 text-xs bg-gray-900 p-2 rounded text-gray-300 max-h-32 overflow-auto font-mono whitespace-pre-wrap">
                         {typeof log.output === 'object' ? JSON.stringify(log.output, null, 2) : log.output}
                       </div>
                     )}
                     {log.output && log.status === 'Failed' && (
                       <div className="mt-2 text-xs bg-red-900/20 p-2 rounded text-red-400 font-mono">
                         {typeof log.output === 'object' ? JSON.stringify(log.output, null, 2) : log.output}
                       </div>
                     )}
                   </div>
                 );
               })}
               
               {jobState.logs.length === 0 && (
                 <p className="text-xs text-gray-500">Initializing nodes...</p>
               )}
             </div>
          </div>
        )}
      </div>
      )}
    </aside>
  );
}
