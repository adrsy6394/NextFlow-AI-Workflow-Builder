import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { Image as ImageIcon, UploadCloud } from 'lucide-react';
import NodeContainer from './NodeContainer';
import useWorkflowStore from '../../store/workflowStore';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

export default function UploadImageNode({ id, data, selected }) {
  const updateNodeData = useWorkflowStore((state) => state.updateNodeData);
  const { getToken } = useAuth();
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const token = await getToken();
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/upload`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });

      const resData = await response.json();
      if (resData.success && resData.url) {
        updateNodeData(id, { url: resData.url });
        toast.success("Image uploaded!");
      } else {
        toast.error("Upload failed.");
      }
    } catch (err) {
      toast.error("Error processing upload.");
    }
    setIsUploading(false);
  };

  return (
    <NodeContainer title="Upload Image" icon={ImageIcon} isSelected={selected} nodeId={id}>
      <div className="flex flex-col gap-2 relative">
        {!data.url ? (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-indigo-50 hover:border-indigo-300 transition-colors nodrag flex flex-col items-center justify-center cursor-pointer relative h-24">
            <UploadCloud className={`w-6 h-6 mb-1 ${isUploading ? 'text-indigo-400 animate-pulse' : 'text-gray-400'}`} />
            <span className="text-xs text-gray-500 font-medium">
              {isUploading ? 'Uploading...' : 'Click to Pick Image'}
            </span>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
              disabled={isUploading}
            />
          </div>
        ) : (
          <div className="relative group w-full">
            <img src={data.url} alt="Uploaded preview" className="w-full h-32 object-cover rounded-md border border-gray-200 block" />
            <button 
              onClick={() => updateNodeData(id, { url: null })}
              className="absolute top-1 right-1 bg-white p-1 rounded-md shadow text-xs text-red-500 opacity-0 group-hover:opacity-100 transition-opacity nodrag cursor-pointer select-none"
            >
              Clear
            </button>
          </div>
        )}
      </div>
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-indigo-500" />
    </NodeContainer>
  );
}
