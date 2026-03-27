import React, { useState } from 'react';
import { TrendingUp, Users, Activity, AlertCircle, ArrowUpRight, ArrowDownRight, Upload } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import FileUpload from '../components/FileUpload';

const data = [
  { name: 'Mon', calls: 4000 },
  { name: 'Tue', calls: 3000 },
  { name: 'Wed', calls: 2000 },
  { name: 'Thu', calls: 2780 },
  { name: 'Fri', calls: 1890 },
  { name: 'Sat', calls: 2390 },
  { name: 'Sun', calls: 3490 },
];

const StatCard = ({ icon: Icon, label, value, trend, color, subtext }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between">
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon size={24} className="text-white" />
      </div>
      <div className={`flex items-center gap-1 text-sm font-medium ${trend.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>
        {trend}
        {trend.startsWith('+') ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
      </div>
    </div>
    <div className="mt-4">
      <h3 className="text-slate-500 text-sm font-medium">{label}</h3>
      <p className="text-3xl font-bold text-slate-900 mt-1">{value}</p>
      <p className="text-xs text-slate-400 mt-2 font-medium">{subtext}</p>
    </div>
  </div>
);

const Dashboard = () => {
  const [recentAnalysis, setRecentAnalysis] = useState(null);

  const handleUploadSuccess = (data) => {
    setRecentAnalysis(data);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Investigation Overview</h1>
          <p className="text-slate-500">Real-time telecom intelligence and case tracking.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={Activity} 
          label="Total Cases" 
          value="1,284" 
          trend="+12%" 
          color="bg-indigo-600"
          subtext="Compared to last month"
        />
        <StatCard 
          icon={Users} 
          label="Active Suspects" 
          value="42" 
          trend="-4%" 
          color="bg-orange-500"
          subtext="Monitoring in progress"
        />
        <StatCard 
          icon={TrendingUp} 
          label="Calls Analyzed" 
          value={recentAnalysis ? `${recentAnalysis.count + 156000}` : "156k"} 
          trend="+28%" 
          color="bg-sky-500"
          subtext="High volume data processing"
        />
        <StatCard 
          icon={AlertCircle} 
          label="High Risk Flags" 
          value={recentAnalysis ? recentAnalysis.analysis.alerts.length : "15"} 
          trend="+2" 
          color="bg-rose-500"
          subtext="Requires immediate attention"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold text-lg text-slate-900">Communication Volume</h3>
              <select className="bg-slate-50 border border-slate-200 text-sm rounded-lg px-3 py-1.5 outline-none">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
              </select>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{border: 'none', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
                  <Bar dataKey="calls" fill="#f97316" radius={[4, 4, 0, 0]} barSize={35} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <FileUpload onUploadSuccess={handleUploadSuccess} />
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm overflow-hidden relative">
          <h3 className="font-bold text-lg text-slate-900 mb-6">Live AI Alerts</h3>
          <div className="space-y-6 relative z-10">
            {(recentAnalysis?.analysis?.alerts || [1, 2, 3, 4]).map((alert, i) => (
              <div key={i} className="flex gap-4 group cursor-pointer animate-fade-in">
                <div className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${alert.priority === 'High' ? 'bg-rose-500 animate-pulse' : 'bg-orange-500'}`}></div>
                <div>
                  <p className="text-sm font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                    {alert.type || 'Suspicious Activity Detected'}
                  </p>
                  <p className="text-xs text-slate-500 mt-1 línea-clamp-2">
                    {alert.detail || 'High frequency communication detected between suspected numbers in Zone B.'}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-wider">{alert.priority || 'Medium'} Priority</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-10 py-4 rounded-2xl border border-slate-100 bg-slate-50 text-sm font-bold text-slate-600 hover:bg-slate-100 transition-all">
            Open Alerts Hub
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
