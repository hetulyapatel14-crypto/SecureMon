import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ShieldCheck, LayoutDashboard, Search, Bell, User, PlusCircle,
  FileText, Shield, KeyRound, Network, Lock, Terminal, Activity,
  Layers, Database, Menu, X, ArrowUpRight, Flame, BarChart3, AlertCircle,
  Sparkles
} from 'lucide-react';
import { ScopeBanner } from '../components/ScopeBanner';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navSections = [
    {
      title: 'OVERVIEW',
      items: [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Assessments', path: '/assessments', icon: ShieldCheck },
      ]
    },
    {
      title: 'SECURITY POSTURE',
      items: [
        { name: 'Findings & Evidence', path: '/findings', icon: AlertCircle },
        { name: 'API Inventory', path: '/api-inventory', icon: Network },
        { name: 'Security Headers', path: '/headers', icon: Layers },
        { name: 'Transport & TLS', path: '/transport', icon: Lock },
        { name: 'Coverage Matrix', path: '/coverage', icon: Activity },
      ]
    },
    {
      title: 'THREAT INTEL & LAB',
      items: [
        { name: 'Executive Reports', path: '/reports', icon: FileText },
        { name: 'Immutable Audit', path: '/audit-logs', icon: Shield },
        { name: 'Local Security Lab', path: '/lab', icon: Terminal },
        { name: 'Architecture', path: '/architecture', icon: BarChart3 },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-ink flex flex-col font-body relative selection:bg-[#F472B6]/30 selection:text-ink">
      <ScopeBanner />

      <div className="flex-1 flex overflow-hidden">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-ink/40 z-40 lg:hidden backdrop-blur-sm"
          />
        )}

        {/* Sidebar for Desktop & Mobile Drawer */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-50 w-64 flex flex-col border-r-2 border-ink bg-white shrink-0 transition-transform duration-300 lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Sidebar Brand Header */}
          <div className="h-16 px-5 border-b-2 border-ink flex items-center justify-between bg-slate-50">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-[#8B5CF6] border-2 border-ink flex items-center justify-center text-white shadow-[2px_2px_0px_#1E293B] group-hover:rotate-6 transition-transform">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading font-extrabold text-base tracking-tight text-ink">
                SECURE<span className="text-[#8B5CF6]">MON</span>
              </span>
            </Link>
            <span className="stamp-badge bg-[#FBBF24] text-ink text-[10px]">
              v2.0
            </span>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto px-3.5 py-5 space-y-6">
            {navSections.map((section, idx) => (
              <div key={idx} className="space-y-1.5">
                <h4 className="text-[10px] font-heading font-black text-slate-500 uppercase tracking-widest px-3 mb-2">
                  {section.title}
                </h4>
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-full text-xs font-bold transition-all ${
                        isActive
                          ? 'bg-[#8B5CF6] text-white border-2 border-ink shadow-[3px_3px_0px_#1E293B]'
                          : 'text-slate-600 hover:text-ink hover:bg-slate-100 border-2 border-transparent'
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Target Assessment Status Box at Bottom */}
          <div className="p-3.5 border-t-2 border-ink bg-slate-50">
            <div className="rounded-xl border-2 border-ink bg-[#FFFDF5] p-3 space-y-1 text-xs shadow-[2px_2px_0px_#1E293B]">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-heading">
                  Active Target
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border border-ink animate-pulse" />
              </div>
              <p className="text-xs font-black text-ink truncate font-heading">
                worldmonitor.internal
              </p>
              <div className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full border border-ink">
                <Lock className="w-2.5 h-2.5" />
                <span>Scope: Authorized</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Top Header Bar */}
          <header className="h-16 border-b-2 border-ink bg-white/95 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between shrink-0">
            {/* Mobile Hamburger Button */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-xl bg-slate-100 border-2 border-ink text-ink shadow-[2px_2px_0px_#1E293B]"
                aria-label="Toggle Navigation"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              {/* Breadcrumb or Search Bar */}
              <div className="relative hidden sm:block w-72">
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search findings, CVEs, targets..."
                  className="w-full bg-slate-50 border-2 border-ink rounded-full pl-9 pr-4 py-1.5 text-xs font-medium text-ink placeholder-slate-400 focus:outline-none focus:bg-white shadow-[2px_2px_0px_#1E293B]"
                />
              </div>
            </div>

            {/* Right Quick Actions & Profile */}
            <div className="flex items-center gap-3">
              <Link
                to="/assessments"
                className="btn-candy text-xs px-4 py-2 inline-flex items-center gap-2"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>New Assessment</span>
              </Link>

              <div className="w-[2px] h-6 bg-slate-200 mx-1 hidden sm:block" />

              <div className="flex items-center gap-2.5 bg-slate-50 px-3 py-1.5 rounded-full border-2 border-ink shadow-[2px_2px_0px_#1E293B]">
                <div className="w-7 h-7 rounded-full bg-[#8B5CF6] border-2 border-ink flex items-center justify-center text-white text-xs font-black font-heading">
                  SA
                </div>
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-xs font-bold text-ink leading-tight font-heading">
                    Analyst (NTRO)
                  </span>
                  <span className="text-[10px] text-slate-500 font-semibold leading-tight">
                    SIH26163 Evaluator
                  </span>
                </div>
              </div>
            </div>
          </header>

          {/* Page Body Viewport with soft grey dot canvas */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6 pattern-dots">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};
