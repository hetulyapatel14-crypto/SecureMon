import React from 'react';
import { ShieldCheck, Lock } from 'lucide-react';

export const ScopeBanner: React.FC = () => {
  return (
    <div className="bg-[#FFFDF5] border-b-2 border-[#1E293B] py-2 px-4 text-xs flex items-center justify-between text-[#1E293B] select-none shadow-[0_2px_0px_rgba(30,41,59,0.05)]">
      <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 font-bold text-[#1E293B] uppercase text-[11px] bg-brand-amber px-2.5 py-0.5 rounded-full border-2 border-[#1E293B] shadow-[2px_2px_0px_#1E293B]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#1E293B]" strokeWidth={2.5} />
            AUTHORIZED TARGET ONLY
          </span>
          <span className="hidden sm:inline text-ink-muted text-[11px] font-medium">
            Strict allowlisting enforced • Non-destructive PoCs & RFC 1918 SSRF guard active
          </span>
        </div>

        <div className="flex items-center gap-3 text-[11px] text-ink-muted font-medium">
          <span className="flex items-center gap-1.5 bg-white px-2.5 py-0.5 rounded-full border border-slate-300">
            <Lock className="w-3 h-3 text-brand-mint" strokeWidth={2.5} />
            Authorization: <strong className="text-ink font-mono font-bold">NTRO-MIC-2026</strong>
          </span>
        </div>
      </div>
    </div>
  );
};
