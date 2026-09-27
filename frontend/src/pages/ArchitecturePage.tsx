import React from 'react';
import { ShieldCheck, Cpu, Database, Network, Lock, Flame, FileText, ArrowRight, Layers, Sparkles, ArrowDown } from 'lucide-react';

export const ArchitecturePage: React.FC = () => {
  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight font-heading">
            Platform Architecture & Data Flow
          </h1>
          <p className="text-xs text-slate-500 font-semibold mt-1">
            End-to-end component topology, isolation boundaries, threat intelligence feeds, and non-destructive execution pathways.
          </p>
        </div>

        <span className="stamp-badge bg-white text-ink text-xs self-start sm:self-auto">
          SIH26163 Reference Architecture
        </span>
      </div>

      {/* Visual Architectural Flow Container */}
      <div className="sticker-card p-8 md:p-12 space-y-12 bg-white shadow-pop-xl">
        {/* Layer 1: Client & Presentation */}
        <div className="space-y-3">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 font-heading">
            LAYER 1: PRESENTATION & OPERATOR CONSOLE
          </span>
          <div className="p-5 rounded-2xl border-2 border-ink bg-[#FFFDF5] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[3px_3px_0px_#1E293B]">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-[#8B5CF6] border-2 border-ink flex items-center justify-center text-white shadow-[2px_2px_0px_#1E293B]">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-ink font-heading">Vite React + TypeScript SPA</h3>
                <p className="text-xs text-slate-600 font-medium">
                  Playful Geometric UI with Framer Motion, Recharts, and strict client-side secret masking. Zero external API keys in frontend.
                </p>
              </div>
            </div>
            <span className="stamp-badge bg-[#8B5CF6]/15 text-[#8B5CF6] text-[11px] shrink-0">
              JWT Bearer Auth
            </span>
          </div>
        </div>

        {/* Arrow Down */}
        <div className="flex items-center justify-center -my-6">
          <div className="inline-flex items-center gap-2 bg-slate-100 px-4 py-1.5 rounded-full border-2 border-ink shadow-[2px_2px_0px_#1E293B] text-xs font-bold text-ink font-heading">
            <ArrowDown className="w-4 h-4 text-[#8B5CF6]" />
            <span>HTTPS REST API & SSE Event Stream</span>
          </div>
        </div>

        {/* Layer 2: API Gateway & Security Controls */}
        <div className="space-y-3">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 font-heading">
            LAYER 2: SECURE API GATEWAY & GOVERNANCE
          </span>
          <div className="p-5 rounded-2xl border-2 border-ink bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[3px_3px_0px_#1E293B]">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-[#FBBF24] border-2 border-ink flex items-center justify-center text-ink shadow-[2px_2px_0px_#1E293B]">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-ink font-heading">FastAPI Core Backend Engine</h3>
                <p className="text-xs text-slate-600 font-medium">
                  Mandatory Legal Authorization Check, RFC 1918 SSRF Guard, Role-Based Access Control (RBAC), and Audit Trail logging.
                </p>
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <span className="stamp-badge bg-emerald-100 text-emerald-800 text-[10px]">
                SSRF Guard Active
              </span>
            </div>
          </div>
        </div>

        {/* Split Flow to Storage & Assessment Engine */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Storage Branch */}
          <div className="p-5 rounded-2xl border-2 border-ink bg-[#FFFDF5] space-y-3 shadow-[3px_3px_0px_#1E293B]">
            <div className="flex items-center gap-2.5 text-ink font-extrabold text-base font-heading">
              <Database className="w-5 h-5 text-[#8B5CF6]" />
              <span>Relational Persistence Layer</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              PostgreSQL (Supabase / Local) storing immutable audit logs, target scopes, evidence blobs, CVSS vectors, and report artifacts.
            </p>
            <div className="pt-2 text-[10px] font-bold text-slate-500">
              Database: PostgreSQL 15 / SQLite Fallback
            </div>
          </div>

          {/* Assessment Worker Branch */}
          <div className="p-5 rounded-2xl border-2 border-ink bg-[#FFFDF5] space-y-3 shadow-[3px_3px_0px_#1E293B]">
            <div className="flex items-center gap-2.5 text-ink font-extrabold text-base font-heading">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Security Assessment Engine</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Executes passive inspection, safe non-destructive parameter reflection tests, and coordinates with the isolated OWASP ZAP worker.
            </p>
            <div className="pt-2 text-[10px] font-extrabold text-[#8B5CF6] font-heading">
              Profile: PASSIVE / SAFE / STANDARD
            </div>
          </div>
        </div>

        {/* External Threat Intelligence Integrations */}
        <div className="space-y-3">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 font-heading">
            LAYER 3: VULNERABILITY INTELLIGENCE & THREAT ENRICHMENT
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl border-2 border-ink bg-white text-center shadow-[3px_3px_0px_#1E293B]">
              <span className="text-sm font-black text-ink font-heading block">NIST NVD API 2.0</span>
              <p className="text-[11px] text-slate-600 mt-1 font-medium">Official CVE database, CVSS 3.1 base vectors, and CWE taxonomies.</p>
            </div>
            <div className="p-5 rounded-2xl border-2 border-ink bg-white text-center shadow-[3px_3px_0px_#1E293B]">
              <span className="text-sm font-black text-[#8B5CF6] font-heading block">FIRST EPSS API</span>
              <p className="text-[11px] text-slate-600 mt-1 font-medium">Machine-learning exploit probability prediction scoring.</p>
            </div>
            <div className="p-5 rounded-2xl border-2 border-ink bg-white text-center shadow-[3px_3px_0px_#1E293B]">
              <span className="text-sm font-black text-rose-600 font-heading block">CISA KEV CATALOG</span>
              <p className="text-[11px] text-slate-600 mt-1 font-medium">Real-time tracking of actively exploited in-the-wild vulnerabilities.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
