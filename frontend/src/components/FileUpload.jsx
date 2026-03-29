import React, { useState } from 'react';
import { Upload, X, FileText, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import axios from 'axios';

const FileUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.name.toLowerCase().endsWith('.csv')) {
      setFile(selected);
      setError('');
    } else {
      setError('Please select a valid CSV file.');
      setFile(null);
    }
    // Reset the input value so the same file could be selected again if needed
    e.target.value = null;
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);
    
    // Fallback to relative /api if no env var is set
    const API_URL = import.meta.env.VITE_API_URL || '';

    try {
      const res = await axios.post(`${API_URL}/api/analysis/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setSuccess(true);
      if (onUploadSuccess) onUploadSuccess(res.data);
    } catch (err) {
      console.error("Upload error:", err);
      setError(err.response?.data?.message || 'Upload failed. Check server connectivity.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-[2rem] border-2 border-dashed border-slate-200 hover:border-orange-500 transition-all group relative">
      {!file ? (
        <div className="flex flex-col items-center justify-center py-10">
          <div className="bg-slate-50 p-4 rounded-2xl group-hover:bg-orange-50 transition-colors mb-6">
            <Upload size={32} className="text-slate-400 group-hover:text-orange-500" />
          </div>
          <h3 className="font-bold text-slate-900 mb-2">Upload Investigation Data</h3>
          <p className="text-slate-500 text-sm text-center max-w-xs mb-8">
            Select a <span className="text-slate-900 font-bold">CSV file</span> containing call records with caller, receiver, and duration columns.
          </p>
          <label className="px-6 py-3 bg-slate-900 text-white rounded-xl text-sm font-bold cursor-pointer hover:bg-slate-800 transition-all shadow-lg active:scale-95">
            Browse Files
            <input type="file" className="hidden" accept=".csv" onChange={handleFileChange} />
          </label>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-6">
          <div className="flex items-center gap-4 bg-slate-50 p-6 rounded-2xl w-full max-w-sm mb-8 border border-slate-100">
            <div className="bg-white p-3 rounded-xl shadow-sm text-orange-500">
              <FileText size={24} />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="font-bold text-slate-900 truncate">{file.name}</p>
              <p className="text-xs text-slate-400 font-medium">{(file.size / 1024).toFixed(1)} KB</p>
            </div>
            {!success && (
              <button 
                onClick={() => setFile(null)} 
                className="p-1.5 text-slate-400 hover:bg-white hover:text-rose-500 rounded-lg transition-all"
              >
                <X size={18} />
              </button>
            )}
          </div>
          
          {loading ? (
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="animate-spin text-orange-500" size={32} />
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Processing Engine...</p>
            </div>
          ) : success ? (
            <div className="flex flex-col items-center gap-4">
              <div className="bg-emerald-50 p-3 rounded-full text-emerald-600 mb-2">
                <CheckCircle size={32} />
              </div>
              <p className="text-sm font-bold text-emerald-600">Processing Complete</p>
              <button onClick={() => {setFile(null); setSuccess(false);}} className="text-xs font-bold text-slate-400 hover:text-slate-600 underline underline-offset-4">Upload Another</button>
            </div>
          ) : (
            <button 
              onClick={handleUpload}
              className="px-10 py-3 bg-orange-500 text-white rounded-xl text-sm font-bold hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/20 active:scale-95"
            >
              Analyze Records
            </button>
          )}

          {error && (
            <div className="mt-4 flex items-center gap-2 text-rose-500 font-bold text-xs uppercase tracking-wide">
              <AlertCircle size={16} />
              {error}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
