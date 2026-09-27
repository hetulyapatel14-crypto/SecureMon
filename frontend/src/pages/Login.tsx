import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, Key, ArrowRight, User, Sparkles } from 'lucide-react';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('analyst@securemon.gov.in');
  const [password, setPassword] = useState('SecureMon@2026');
  const [isRegister, setIsRegister] = useState(false);
  const [fullName, setFullName] = useState('Senior Security Evaluator');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 600);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 relative">
      {/* Decorative Memphis Background Blobs */}
      <div className="absolute top-10 left-1/4 w-16 h-16 rounded-full bg-brand-amber border-2 border-ink -rotate-12 -z-10 opacity-70 hidden sm:block" />
      <div className="absolute bottom-12 right-1/4 w-20 h-20 rounded-2xl bg-brand-pink border-2 border-ink rotate-6 -z-10 opacity-70 hidden sm:block" />
      <div className="absolute top-1/3 right-12 w-10 h-10 rounded-full bg-brand-mint border-2 border-ink -z-10 opacity-60 hidden md:block" />

      <div className="w-full max-w-md bg-white border-2 border-ink rounded-3xl p-8 shadow-pop-xl space-y-6 relative">
        {/* Floating icon badge half-in/half-out */}
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 rounded-2xl bg-brand-violet border-2 border-ink flex items-center justify-center text-white shadow-pop rotate-3">
          <ShieldCheck className="w-7 h-7 stroke-[2.5]" />
        </div>

        <div className="text-center pt-5 space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-amber/20 border border-brand-amber text-ink font-heading font-extrabold text-[11px] mb-1">
            <Sparkles className="w-3.5 h-3.5 text-brand-amber fill-brand-amber" />
            <span>SIH26163 Evaluator Portal</span>
          </div>
          <h2 className="text-2xl font-heading font-extrabold text-ink tracking-tight">
            {isRegister ? 'Register Analyst Account' : 'Analyst Access Portal'}
          </h2>
          <p className="text-xs text-ink/70 font-body font-medium">
            Authorized Application Security Assessment Platform (NTRO / MIC)
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-body">
          {isRegister && (
            <div>
              <label className="block text-ink font-heading font-extrabold text-xs uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-ink/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#F8FAFC] border-2 border-ink rounded-xl pl-10 pr-3.5 py-3 text-ink font-medium focus:outline-none focus:border-brand-violet focus:bg-white text-xs transition-colors"
                  placeholder="e.g. Dr. A. Sharma"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-ink font-heading font-extrabold text-xs uppercase tracking-wider mb-1.5">
              Official Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-ink/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#F8FAFC] border-2 border-ink rounded-xl pl-10 pr-3.5 py-3 text-ink font-medium focus:outline-none focus:border-brand-violet focus:bg-white text-xs transition-colors"
                placeholder="analyst@securemon.gov.in"
              />
            </div>
          </div>

          <div>
            <label className="block text-ink font-heading font-extrabold text-xs uppercase tracking-wider mb-1.5">
              Access Token / Password
            </label>
            <div className="relative">
              <Key className="w-4 h-4 text-ink/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#F8FAFC] border-2 border-ink rounded-xl pl-10 pr-3.5 py-3 text-ink font-mono focus:outline-none focus:border-brand-violet focus:bg-white text-xs transition-colors"
                placeholder="••••••••••••"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-candy py-3.5 text-xs font-heading font-extrabold flex items-center justify-center gap-2 group cursor-pointer"
            >
              {loading ? (
                <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin mx-auto" />
              ) : (
                <>
                  <span>{isRegister ? 'Register Account' : 'Authenticate & Enter Platform'}</span>
                  <div className="w-5 h-5 rounded-full bg-white text-brand-violet flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                </>
              )}
            </button>
          </div>
        </form>

        <div className="text-center pt-3 border-t-2 border-slate-100 text-xs">
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-ink/70 hover:text-brand-violet font-heading font-bold transition-colors cursor-pointer"
          >
            {isRegister ? 'Already have an account? Sign In' : 'Need evaluator credentials? Register here'}
          </button>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-[11px] text-ink/70 flex items-center gap-2">
          <Lock className="w-4 h-4 text-brand-mint shrink-0 stroke-[2.5]" />
          <span>Role-Based Access Control enforced with RFC 1918 boundary security.</span>
        </div>
      </div>
    </div>
  );
};
