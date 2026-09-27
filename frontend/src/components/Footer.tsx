import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, Award, Sparkles, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t-2 border-pop-border bg-white pt-16 pb-12 relative overflow-hidden pattern-dots">
      {/* Playful Decorative Shapes */}
      <div className="absolute top-6 right-12 w-16 h-16 rounded-full border-2 border-pop-border bg-brand-pink/20 shadow-pop-sm pointer-events-none hidden sm:block" />
      <div className="absolute bottom-10 left-8 w-12 h-12 rotate-12 border-2 border-pop-border bg-brand-amber/30 shadow-pop-xs pointer-events-none hidden sm:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Brand & Problem Statement */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-brand-violet border-2 border-pop-border flex items-center justify-center shadow-[2px_2px_0px_#1E293B]">
                <ShieldCheck className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-ink font-heading">
                SECUREMON
              </span>
            </div>
            <p className="text-xs text-ink-muted leading-relaxed font-sans">
              Authorized Application Security Assessment & Vulnerability Intelligence Platform.
              Engineered for controlled posture evaluation and non-destructive verification.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-ink bg-brand-amber px-3 py-1 rounded-full border-2 border-pop-border shadow-[2px_2px_0px_#1E293B]">
                <Award className="w-3.5 h-3.5" strokeWidth={2.5} />
                SIH26163 | NTRO / MIC
              </span>
            </div>
          </div>

          {/* Column 2: Platform Modules */}
          <div>
            <h4 className="text-xs font-extrabold text-ink uppercase tracking-wider font-heading mb-4">
              Platform Modules
            </h4>
            <ul className="space-y-2.5 text-xs font-medium text-ink-muted">
              <li><Link to="/dashboard" className="hover:text-brand-violet transition-colors">Posture Dashboard</Link></li>
              <li><Link to="/assessments" className="hover:text-brand-violet transition-colors">Assessment Wizard</Link></li>
              <li><Link to="/findings" className="hover:text-brand-violet transition-colors">Findings & Evidence</Link></li>
              <li><Link to="/coverage" className="hover:text-brand-violet transition-colors">Coverage Matrix</Link></li>
              <li><Link to="/lab" className="hover:text-brand-violet transition-colors">Local Security Lab</Link></li>
            </ul>
          </div>

          {/* Column 3: Standards & Intelligence */}
          <div>
            <h4 className="text-xs font-extrabold text-ink uppercase tracking-wider font-heading mb-4">
              Intelligence Standards
            </h4>
            <ul className="space-y-2.5 text-xs font-medium text-ink-muted">
              <li><span>OWASP ASVS & Top 10</span></li>
              <li><span>NIST NVD API 2.0</span></li>
              <li><span>CISA Known Exploited (KEV)</span></li>
              <li><span>FIRST EPSS Exploit Probability</span></li>
              <li><Link to="/architecture" className="hover:text-brand-violet transition-colors">System Architecture</Link></li>
            </ul>
          </div>

          {/* Column 4: Compliance & Authorization */}
          <div>
            <h4 className="text-xs font-extrabold text-ink uppercase tracking-wider font-heading mb-4">
              Governance
            </h4>
            <div className="bg-canvas border-2 border-pop-border p-4 rounded-xl shadow-[3px_3px_0px_#1E293B] space-y-2 text-xs">
              <div className="flex items-center gap-2 text-ink font-bold font-heading">
                <Lock className="w-4 h-4 text-brand-violet" strokeWidth={2.5} />
                Strict Scope Boundary
              </div>
              <p className="text-[11px] leading-relaxed text-ink-muted font-sans">
                Scanning is restricted to allowlisted targets with cryptographic audit logging and SSRF safeguards.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t-2 border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-ink-muted">
          <div className="flex items-center gap-1.5">
            <span>© 2026 SecureMon • Built with precision for Smart India Hackathon</span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/audit-logs" className="hover:text-ink transition-colors font-mono">Immutable Audit</Link>
            <Link to="/reports" className="hover:text-ink transition-colors font-mono">Executive Reports</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
