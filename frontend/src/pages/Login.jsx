import React, { useState } from 'react';
import { Shield, Lock, Mail, ChevronRight, AlertCircle } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('admin@police.gov');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === 'admin@police.gov' && password === 'admin123') {
      onLogin({ id: 'admin-1', name: 'Admin Officer', role: 'Admin' });
    } else {
      setError('Invalid credentials. Please verify your officer ID.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-slate-950">
      <div className="mb-10 flex flex-col items-center">
        <div className="bg-orange-500 p-4 rounded-3xl shadow-2xl shadow-orange-500/20 mb-6">
          <Shield size={48} className="text-white" />
        </div>
        <h1 className="text-3xl font-bold text-white tracking-tight">ForensIQ Intelligence</h1>
        <p className="text-slate-500 mt-2 font-medium uppercase tracking-[0.2em] text-xs">Official Forensic Terminal v1.0</p>
      </div>

      <div className="w-full max-w-md bg-white rounded-[2.5rem] p-10 shadow-2xl">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Officer Login</h2>
        <p className="text-slate-500 text-sm mb-8 font-medium">Please enter your credentials to access the forensic database.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email / Officer ID</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="officer@police.gov"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Secure Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium"
              />
            </div>
          </div>

          {error && (
            <div className="bg-rose-50 border border-rose-100 p-4 rounded-xl flex items-center gap-3 animate-head-shake">
              <AlertCircle size={18} className="text-rose-500" />
              <p className="text-xs font-bold text-rose-500 tracking-wide uppercase">{error}</p>
            </div>
          )}

          <button 
            type="submit"
            className="w-full py-4 bg-orange-500 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/20 active:scale-[0.98]"
          >
            Access Secure Terminal
            <ChevronRight size={20} />
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-slate-50 text-center">
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Authorized Personnel Only</p>
          <p className="text-slate-300 text-[9px] mt-2 max-w-[200px] mx-auto leading-relaxed">System activities are monitored and logged for security and compliance purposes.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
