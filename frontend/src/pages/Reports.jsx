import React from 'react';
import { FileText, Download, CheckCircle, Clock, AlertTriangle, ShieldCheck } from 'lucide-react';

const Reports = () => {
  const reports = [
    { id: 'REP-782', name: 'Case #1024 - Telecom Summary', date: '2026-03-24', size: '2.4 MB', status: 'Generated' },
    { id: 'REP-781', name: 'Identity Analysis - Suspect #09', date: '2026-03-24', size: '1.2 MB', status: 'Pending' },
    { id: 'REP-780', name: 'Full CDR Export (March 2026)', date: '2026-03-23', size: '15.8 MB', status: 'Generated' },
    { id: 'REP-779', name: 'Movement Pattern Map - Region 4', date: '2026-03-22', size: '4.7 MB', status: 'Generated' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Forensic Reports</h1>
          <p className="text-slate-500">Generate and download official investigative documents.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-sm font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 active:scale-95">
          <FileText size={20} />
          Generate Custom Report
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <h3 className="font-bold text-slate-900">Recent Reports</h3>
          </div>
          <div className="divide-y divide-slate-50">
            {reports.map((report) => (
              <div key={report.id} className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="bg-slate-100 p-3 rounded-xl group-hover:bg-white border border-transparent group-hover:border-slate-100 transition-all">
                    <FileText size={22} className="text-slate-400 group-hover:text-orange-500" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 group-hover:text-orange-600 transition-colors">{report.name}</p>
                    <div className="flex items-center gap-3 mt-1 text-slate-400 text-xs font-medium">
                      <span className="font-mono text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-500">{report.id}</span>
                      <span>{report.date}</span>
                      <span>{report.size}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    {report.status === 'Generated' ? (
                      <span className="flex items-center gap-1 text-emerald-600 text-[10px] font-bold uppercase tracking-widest bg-emerald-50 px-2 py-1 rounded-lg">
                        <CheckCircle size={12} />
                        Available
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-orange-500 text-[10px] font-bold uppercase tracking-widest bg-orange-50 px-2 py-1 rounded-lg">
                        <Clock size={12} className="animate-spin" />
                        Processing
                      </span>
                    )}
                  </div>
                  <button className="p-2 text-slate-400 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all" disabled={report.status !== 'Generated'}>
                    <Download size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-orange-500 p-8 rounded-[2rem] text-white shadow-xl shadow-orange-500/20 relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform"></div>
            <div className="relative z-10">
              <ShieldCheck size={40} className="mb-6 opacity-80" />
              <h3 className="font-bold text-xl mb-2 leading-tight">Authenticity Verification</h3>
              <p className="text-orange-100 text-sm leading-relaxed mb-6 font-medium">
                All reports are cryptographically signed and include a trackable QR code for legal verification.
              </p>
              <button className="w-full py-3 bg-white text-orange-600 rounded-xl text-xs font-extrabold uppercase tracking-widest hover:bg-orange-50 transition-colors shadow-lg">
                Verify Report Integrity
              </button>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
            <h4 className="font-bold text-slate-900 text-sm mb-4">Quick Templates</h4>
            <div className="space-y-3">
              <button className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-left hover:border-orange-200 transition-all flex items-center justify-between group">
                <div>
                  <p className="text-xs font-bold text-slate-900">Standard CDR Summary</p>
                  <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider font-bold">1-Click Generation</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-400 group-hover:text-orange-500 transition-colors border border-slate-100">
                  <CheckCircle size={14} />
                </div>
              </button>
              <button className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-left hover:border-orange-200 transition-all flex items-center justify-between group">
                <div>
                  <p className="text-xs font-bold text-slate-900">Suspicious Activity Brief</p>
                  <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider font-bold">AI Powered</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-400 group-hover:text-orange-500 transition-colors border border-slate-100">
                  <AlertTriangle size={14} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
