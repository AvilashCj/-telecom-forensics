import React, { useState } from 'react';
import { Plus, Search, Folder, Clock, User, ChevronRight, Tag } from 'lucide-react';

const mockCases = [
  { id: 'C-1024', title: 'Suspicious Burst Activity - Zone A', officer: 'James D.', status: 'Active', priority: 'High', date: '2026-03-24', records: 42 },
  { id: 'C-1025', title: 'Unauthorized Device Linkage', officer: 'Sarah M.', status: 'In Progress', priority: 'Medium', date: '2026-03-23', records: 128 },
  { id: 'C-1026', title: 'Identity Verification - CDR Case', officer: 'James D.', status: 'Pending', priority: 'Low', date: '2026-03-22', records: 15 },
  { id: 'C-1027', title: 'Cross-Border Call Frequency Study', officer: 'Robert K.', status: 'Closed', priority: 'High', date: '2026-03-20', records: 256 },
];

const Cases = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Case Management</h1>
          <p className="text-slate-500">Organize and track individual investigation files.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-2xl text-sm font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20 active:scale-95">
          <Plus size={20} />
          Create New Case
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mockCases.map((c) => (
          <div key={c.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-orange-200 transition-all cursor-pointer group">
            <div className="flex items-start justify-between">
              <div className="bg-slate-50 p-3 rounded-xl group-hover:bg-orange-50 transition-colors">
                <Folder size={24} className="text-slate-400 group-hover:text-orange-500" />
              </div>
              <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                c.priority === 'High' ? 'bg-rose-50 text-rose-600' :
                c.priority === 'Medium' ? 'bg-orange-50 text-orange-600' :
                'bg-slate-50 text-slate-500'
              }`}>
                {c.priority} Priority
              </span>
            </div>

            <div className="mt-6">
              <p className="text-xs font-bold text-orange-600 tracking-widest uppercase mb-1">{c.id}</p>
              <h3 className="font-bold text-slate-900 leading-tight group-hover:text-orange-600 transition-colors">{c.title}</h3>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                <User size={14} />
                <span>Officer: <span className="text-slate-900 font-bold">{c.officer}</span></span>
              </div>
              <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                <Clock size={14} />
                <span>Updated {c.date}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                <Tag size={14} />
                <span>{c.records} Analysis Records</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-50 flex items-center justify-between">
              <span className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest ${
                c.status === 'Active' ? 'text-emerald-600' :
                c.status === 'Closed' ? 'text-slate-400' :
                'text-orange-500'
              }`}>
                <div className={`w-1.5 h-1.5 rounded-full ${c.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'}`}></div>
                {c.status}
              </span>
              <ChevronRight size={18} className="text-slate-300 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cases;
