import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { FileText, UploadCloud, CheckCircle2, Loader2 } from 'lucide-react';
import { useAuth } from '@clerk/clerk-react';
import NodeContainer from './NodeContainer';
import toast from 'react-hot-toast';
import useWorkflowStore from '../../store/workflowStore';

export default function UploadPdfNode({ id, data, selected }) {
  const updateNodeData = useWorkflowStore((state) => state.updateNodeData);
  const [isUploading, setIsUploading] = useState(false);
  const { getToken } = useAuth();

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
       toast.error("Please upload a valid PDF document.");
       return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = await getToken();
      const res = await fetch(`${import.meta.env.VITE_API_URL}/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });
      const responseData = await res.json();
      
      if (responseData.success) {
        toast.success("PDF Uploaded & Parsed Successfully!");
        // Store both the file URL and its raw text content extracted by the backend
        updateNodeData(id, { 
           url: responseData.url, 
           extractedText: responseData.text || "", 
           fileName: file.name 
        });
      } else {
        toast.error("Upload failed: " + responseData.error);
      }
    } catch (err) {
      toast.error("Error connecting to upload server.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <NodeContainer title="Upload PDF" icon={FileText} isSelected={selected} nodeId={id}>
      <div className="flex flex-col gap-2 relative">
        {!data.url ? (
          <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center hover:bg-indigo-900/20 hover:border-indigo-500 transition-colors nodrag flex flex-col items-center justify-center cursor-pointer relative h-24 bg-gray-800">
            {isUploading ? (
              <Loader2 className="w-6 h-6 animate-spin text-indigo-400 mb-2" />
            ) : (
              <UploadCloud className="w-6 h-6 text-gray-400 mb-2" />
            )}
            <span className="text-xs text-gray-400 font-medium">
              {isUploading ? "Extracting Text..." : "Click to Upload PDF"}
            </span>
            <input 
              type="file" 
              accept=".pdf,application/pdf"
              onChange={handleFileUpload} 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={isUploading}
            />
          </div>
        ) : (
          <div className="bg-gray-900 border border-gray-700 rounded p-3 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              <span className="text-xs font-medium text-gray-300 truncate">{data.fileName || "Document.pdf"}</span>
            </div>
            {data.extractedText && (
               <span className="text-[10px] text-gray-500 font-mono bg-gray-800 px-2 py-1 rounded truncate">
                 {data.extractedText.substring(0, 30)}...
               </span>
            )}
            <button 
              onClick={() => updateNodeData(id, { url: null, extractedText: null, fileName: null })}
              className="text-xs text-red-400 hover:text-red-300 mt-1 text-left"
            >
              Remove PDF
            </button>
          </div>
        )}
      </div>
      
      {/* Output Handle */}
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-teal-500" />
    </NodeContainer>
  );
}
