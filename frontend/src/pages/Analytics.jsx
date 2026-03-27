import React, { useState } from 'react';
import { Search, Filter, Download, MoreVertical, PhoneIncoming, PhoneOutgoing, Clock, MapPin } from 'lucide-react';

const mockCalls = [
  { id: 1, caller: '+91 98765 43210', receiver: '+91 87654 32109', duration: '12m 4s', time: '14:20:05', date: '2026-03-24', type: 'Incoming', location: 'Mumbai, MH', risk: 'Low' },
  { id: 2, caller: '+91 99887 76655', receiver: '+91 11223 34455', duration: '0m 12s', time: '02:15:22', date: '2026-03-24', type: 'Outgoing', location: 'Delhi, DL', risk: 'High' },
  { id: 3, caller: '+91 98765 43210', receiver: '+91 99334 45566', duration: '5m 50s', time: '10:05:11', date: '2026-03-24', type: 'Incoming', location: 'Mumbai, MH', risk: 'Low' },
  { id: 4, caller: '+91 77665 54433', receiver: '+91 88776 65544', duration: '15m 30s', time: '18:45:00', date: '2026-03-23', type: 'Incoming', location: 'Bangalore, KA', risk: 'Medium' },
  { id: 5, caller: '+91 91234 56789', receiver: '+91 99887 76655', duration: '0m 08s', time: '03:40:15', date: '2026-03-23', type: 'Outgoing', location: 'Kolkata, WB', risk: 'High' },
];

const Analytics = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Call Data Analysis</h1>
          <p className="text-slate-500">Detailed examination of communication records.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-colors">
            <Filter size={18} />
            Filters
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10">
            <Download size={18} />
            Export CSV
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by number or location..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/10"
            />
          </div>
          <div className="flex items-center gap-4 text-sm text-slate-500 font-medium">
            <span>Showing <span className="text-slate-900 font-bold">128</span> records</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Call Type</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Caller Info</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Receiver Info</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Duration</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Date & Time</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Risk Level</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {mockCalls.map((call) => (
                <tr key={call.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${call.type === 'Incoming' ? 'bg-sky-50 text-sky-600' : 'bg-orange-50 text-orange-600'}`}>
                        {call.type === 'Incoming' ? <PhoneIncoming size={16} /> : <PhoneOutgoing size={16} />}
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wide text-slate-500">{call.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-bold text-slate-900">{call.caller}</p>
                      <div className="flex items-center gap-1.5 mt-1 text-slate-400">
                        <MapPin size={12} />
                        <span className="text-[10px] font-bold uppercase">{call.location}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-900">{call.receiver}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-slate-600 font-medium">
                      <Clock size={14} className="text-slate-400" />
                      {call.duration}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{call.date}</p>
                      <p className="text-xs text-slate-400 font-medium mt-0.5">{call.time}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      call.risk === 'High' ? 'bg-rose-50 text-rose-600 border border-rose-100' :
                      call.risk === 'Medium' ? 'bg-orange-50 text-orange-600 border border-orange-100' :
                      'bg-emerald-50 text-emerald-600 border border-emerald-100'
                    }`}>
                      {call.risk}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-white rounded-lg transition-all">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
