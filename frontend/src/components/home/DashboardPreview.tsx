import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, Flame } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line } from 'recharts';

const sparklineData = [
  { val: 40 }, { val: 45 }, { val: 38 }, { val: 65 }, { val: 60 }, { val: 78 }, { val: 82 }
];

export const DashboardPreview: React.FC = () => {
  return (
    <section className="relative -mt-4 pb-24 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto rounded-sticker-lg border-2 border-pop-border bg-white shadow-pop-xl overflow-hidden relative"
      >
        {/* Top Playful Application Bar */}
        <div className="border-b-2 border-pop-border px-6 py-4 bg-[#F8FAFC] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-full bg-brand-pink border-2 border-pop-border" />
              <span className="w-3.5 h-3.5 rounded-full bg-brand-amber border-2 border-pop-border" />
              <span className="w-3.5 h-3.5 rounded-full bg-brand-mint border-2 border-pop-border" />
            </div>
            <span className="text-xs font-mono text-ink-muted border-l-2 border-pop-border pl-3">
              target: <strong className="text-ink font-bold">worldmonitor-demo.ntro.internal</strong>
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="flex items-center gap-1 text-[11px] font-mono font-bold text-ink bg-brand-mint px-2.5 py-0.5 rounded-full border-2 border-pop-border shadow-[1px_1px_0px_#1E293B]">
              <span className="w-1.5 h-1.5 rounded-full bg-ink" />
              Completed Assessment
            </span>
            <span className="text-[11px] font-mono font-bold text-ink bg-brand-pink px-2.5 py-0.5 rounded-full border-2 border-pop-border shadow-[1px_1px_0px_#1E293B]">
              Risk: HIGH
            </span>
          </div>
        </div>

        {/* Inner Content Grid */}
        <div className="p-6 md:p-8 space-y-6 bg-canvas">
          {/* Main Top Row: Posture Score + Severity Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {/* Posture Score Card */}
            <div className="md:col-span-5 rounded-sticker border-2 border-pop-border bg-white p-6 flex flex-col justify-between shadow-pop relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-xs font-heading font-extrabold text-ink-muted uppercase tracking-wider">
                    Security Posture
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-5xl font-extrabold text-ink font-heading tracking-tight">
                      82
                    </span>
                    <span className="text-base font-bold text-ink-muted">/ 100</span>
                    <span className="text-xs font-bold font-mono text-ink bg-brand-mint px-2.5 py-0.5 rounded-full border-2 border-pop-border shadow-[1px_1px_0px_#1E293B] ml-2">
                      Good Posture
                    </span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-brand-violet border-2 border-pop-border flex items-center justify-center text-white shadow-pop-xs">
                  <ShieldCheck className="w-6 h-6" strokeWidth={2.5} />
                </div>
              </div>

              {/* Sparkline trend */}
              <div className="h-12 w-full mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sparklineData}>
                    <Line type="monotone" dataKey="val" stroke="#8B5CF6" strokeWidth={3} dot={{ r: 3, fill: '#8B5CF6', stroke: '#1E293B', strokeWidth: 2 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="text-xs font-medium text-ink-muted flex justify-between mt-3 pt-3 border-t-2 border-slate-100">
                <span>Standard: OWASP ASVS v4.0</span>
                <span className="text-brand-violet font-bold font-mono">2 action items</span>
              </div>
            </div>

            {/* Severity Distribution */}
            <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-sticker border-2 border-pop-border bg-red-100 p-4 flex flex-col justify-between shadow-pop-xs">
                <span className="text-xs font-mono font-bold text-red-800 uppercase">Critical</span>
                <span className="text-3xl font-extrabold text-ink font-heading mt-2">2</span>
                <span className="text-[11px] font-bold text-red-700 mt-1">Immediate fix</span>
              </div>
              <div className="rounded-sticker border-2 border-pop-border bg-amber-100 p-4 flex flex-col justify-between shadow-pop-xs">
                <span className="text-xs font-mono font-bold text-amber-800 uppercase">High</span>
                <span className="text-3xl font-extrabold text-ink font-heading mt-2">6</span>
                <span className="text-[11px] font-bold text-amber-700 mt-1">Exploitable</span>
              </div>
              <div className="rounded-sticker border-2 border-pop-border bg-yellow-100 p-4 flex flex-col justify-between shadow-pop-xs">
                <span className="text-xs font-mono font-bold text-yellow-800 uppercase">Medium</span>
                <span className="text-3xl font-extrabold text-ink font-heading mt-2">14</span>
                <span className="text-[11px] font-bold text-yellow-700 mt-1">Defense gap</span>
              </div>
              <div className="rounded-sticker border-2 border-pop-border bg-emerald-100 p-4 flex flex-col justify-between shadow-pop-xs">
                <span className="text-xs font-mono font-bold text-emerald-800 uppercase">Low</span>
                <span className="text-3xl font-extrabold text-ink font-heading mt-2">21</span>
                <span className="text-[11px] font-bold text-emerald-700 mt-1">Hardening</span>
              </div>
            </div>
          </div>

          {/* Layer Status Micro-Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              { label: 'Authentication', status: 'WARN', desc: 'Missing HttpOnly flag', bg: 'bg-amber-50', badgeColor: 'bg-amber-200' },
              { label: 'Authorization', status: 'PASS', desc: 'RBAC controls intact', bg: 'bg-emerald-50', badgeColor: 'bg-emerald-200' },
              { label: 'API Security', status: 'FAIL', desc: 'CORS wildcard with creds', bg: 'bg-red-50', badgeColor: 'bg-red-200' },
              { label: 'Transport', status: 'WARN', desc: 'HSTS header missing', bg: 'bg-amber-50', badgeColor: 'bg-amber-200' },
              { label: 'Data Protection', status: 'PASS', desc: 'PII redacted & safe', bg: 'bg-emerald-50', badgeColor: 'bg-emerald-200' },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`rounded-xl border-2 border-pop-border ${item.bg} p-3.5 shadow-pop-xs hover:-translate-y-0.5 transition-all`}
              >
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-ink font-bold font-heading">{item.label}</span>
                  <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded-full border border-pop-border ${item.badgeColor}`}>
                    {item.status}
                  </span>
                </div>
                <p className="text-[11px] text-ink-muted truncate font-medium">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Mini Findings Table */}
          <div className="rounded-sticker border-2 border-pop-border bg-white overflow-hidden shadow-pop-sm">
            <div className="px-5 py-3.5 bg-slate-50 border-b-2 border-pop-border flex items-center justify-between text-xs">
              <span className="font-extrabold text-ink font-heading">Recent Validated Evidence</span>
              <span className="text-ink-muted font-mono font-medium">CVSS 3.1 & CISA KEV Enriched</span>
            </div>
            <div className="divide-y-2 divide-slate-100 text-xs">
              {[
                { title: 'Critical CORS Misconfiguration with Allowed Credentials', cat: 'API Security', sev: 'Critical', cvss: '8.8', kev: true },
                { title: 'Missing Content-Security-Policy (CSP) Defense', cat: 'Headers', sev: 'Medium', cvss: '5.4', kev: false },
                { title: 'Insecure Session Cookie: Missing HttpOnly Flag', cat: 'Authentication', sev: 'Medium', cvss: '6.5', kev: false },
              ].map((row, i) => (
                <div key={i} className="px-5 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-violet border border-pop-border" />
                    <span className="text-ink font-bold font-heading">{row.title}</span>
                    <span className="text-[11px] text-ink-muted font-mono">{row.cat}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {row.kev && (
                      <span className="text-[10px] bg-red-100 text-red-800 px-2 py-0.5 rounded-full font-mono font-bold border-2 border-pop-border shadow-[1px_1px_0px_#1E293B] flex items-center gap-1">
                        <Flame className="w-3 h-3 text-red-600" />
                        KEV
                      </span>
                    )}
                    <span className="text-[11px] font-mono font-extrabold text-brand-violet bg-violet-100 px-2.5 py-0.5 rounded-full border border-brand-violet">
                      CVSS {row.cvss}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
