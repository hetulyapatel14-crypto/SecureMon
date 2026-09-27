import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, FileCheck, CheckCircle2, Lock, Play, FileText } from 'lucide-react';

export const Workflow: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Define Target',
      desc: 'Register the target application hostname, environment type, and technical owner.',
      icon: ShieldCheck,
      color: 'bg-brand-violet text-white'
    },
    {
      num: '02',
      title: 'Verify Authorization',
      desc: 'Enforce explicit authorization reference code, tester confirmation, and date bounds.',
      icon: Lock,
      color: 'bg-brand-pink text-ink'
    },
    {
      num: '03',
      title: 'Set Scope & SSRF Guard',
      desc: 'Configure approved domains and API paths. Automatically block private IP loopbacks.',
      icon: CheckCircle2,
      color: 'bg-brand-amber text-ink'
    },
    {
      num: '04',
      title: 'Run Assessment',
      desc: 'Execute passive inspection and harmless non-destructive PoC checks in isolated worker.',
      icon: Play,
      color: 'bg-brand-mint text-ink'
    },
    {
      num: '05',
      title: 'Validate Findings',
      desc: 'Correlate evidence with NVD CVEs, calculate CVSS 3.1 vectors, and verify against CISA KEV.',
      icon: FileCheck,
      color: 'bg-brand-sky text-ink'
    },
    {
      num: '06',
      title: 'Generate Report',
      desc: 'Export executive-level PDF reports with technical evidence, risk ratings, and fix guides.',
      icon: FileText,
      color: 'bg-violet-600 text-white'
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <span className="text-xs uppercase tracking-widest text-ink font-heading font-extrabold bg-brand-pink px-3 py-1 rounded-full border-2 border-pop-border shadow-pop-xs">
          GOVERNED EXECUTION LIFECYCLE
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-ink tracking-tight mt-3 font-heading">
          Assessment Workflow
        </h2>
        <p className="text-sm text-ink-muted mt-3 font-medium">
          Every scan is strictly authorized, bounded by allowlists, and recorded to an immutable audit trail.
        </p>
      </div>

      <div className="relative">
        {/* Dashed connecting line on desktop */}
        <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-[2px] border-t-2 border-dashed border-[#1E293B] -translate-y-12 z-0" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5 relative z-10">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="flex flex-col h-full"
              >
                <div className="h-full rounded-sticker border-2 border-pop-border bg-white p-5 flex flex-col justify-between shadow-pop hover:-translate-y-1.5 hover:shadow-pop-lg transition-all group">
                  <div>
                    {/* Step number badge & icon */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-extrabold text-ink bg-slate-100 px-2.5 py-0.5 rounded-full border-2 border-pop-border shadow-[1px_1px_0px_#1E293B]">
                        {step.num}
                      </span>
                      <div className={`w-9 h-9 rounded-xl border-2 border-pop-border ${step.color} flex items-center justify-center shadow-pop-xs group-hover:scale-105 transition-transform`}>
                        <Icon className="w-4 h-4" strokeWidth={2.5} />
                      </div>
                    </div>

                    <h3 className="text-base font-extrabold text-ink mb-1.5 font-heading group-hover:text-brand-violet transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-xs text-ink-muted leading-relaxed font-sans font-medium">
                      {step.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t-2 border-slate-100 text-[10px] font-mono font-bold text-ink-muted uppercase">
                    Stage {step.num} / 06
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
