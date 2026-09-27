import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, HelpCircle, Star, Sparkles } from 'lucide-react';

export const RiskAnalytics: React.FC = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="rounded-sticker-lg border-2 border-pop-border bg-white p-8 md:p-14 relative overflow-hidden shadow-pop-xl pattern-dots">
        {/* Playful background decorative circle */}
        <div className="absolute top-1/2 -right-10 -translate-y-1/2 w-80 h-80 rounded-full border-2 border-pop-border bg-brand-amber/20 pointer-events-none -z-0" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Column */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-ink bg-brand-amber px-3 py-1 rounded-full border-2 border-pop-border shadow-pop-xs">
              TRANSPARENT PRIORITIZATION
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-ink tracking-tight font-heading leading-tight">
              Turn technical findings <br />
              into <span className="text-brand-violet">clear business risk.</span>
            </h2>

            <p className="text-base text-ink-muted leading-relaxed font-sans font-medium">
              Prioritize security issues using CVSS, exploit intelligence, asset criticality, and assessment confidence.
              Never hide behind an opaque algorithm—understand exactly why a finding demands urgent attention.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-brand-violet border-2 border-pop-border flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5 shadow-pop-xs">
                  1
                </div>
                <div className="text-xs text-ink-muted font-medium">
                  <strong className="text-ink font-bold font-heading">CVSS v3.1 Base Metrics:</strong> Quantifies technical severity, attack complexity, and privilege requirements.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-brand-pink border-2 border-pop-border flex items-center justify-center text-ink text-xs font-bold shrink-0 mt-0.5 shadow-pop-xs">
                  2
                </div>
                <div className="text-xs text-ink-muted font-medium">
                  <strong className="text-ink font-bold font-heading">FIRST EPSS Probability:</strong> Machine-learning exploit probability predicting weaponization in the wild.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-brand-amber border-2 border-pop-border flex items-center justify-center text-ink text-xs font-bold shrink-0 mt-0.5 shadow-pop-xs">
                  3
                </div>
                <div className="text-xs text-ink-muted font-medium">
                  <strong className="text-ink font-bold font-heading">CISA KEV Verification:</strong> Flags vulnerabilities actively exploited by cyber adversaries.
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link
                to="/findings"
                className="btn-candy text-sm px-6 py-3 group"
              >
                <span>VIEW RISK MODEL</span>
                <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-brand-violet group-hover:translate-x-0.5 transition-transform">
                  <ArrowRight className="w-3.5 h-3.5" strokeWidth={3} />
                </div>
              </Link>
            </div>
          </div>

          {/* Right Column: Live Composite Risk Card */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-sticker border-2 border-pop-border bg-canvas p-7 shadow-pop-lg space-y-6 relative"
            >
              <div className="flex items-center justify-between pb-4 border-b-2 border-pop-border">
                <div>
                  <span className="text-xs font-mono text-ink-muted font-bold">Target: World Monitor Staging</span>
                  <h3 className="text-lg font-extrabold text-ink font-heading mt-0.5">Composite Risk Evaluation</h3>
                </div>
                <div className="text-right">
                  <span className="text-4xl font-extrabold text-brand-violet font-heading">82</span>
                  <span className="text-xs text-ink-muted font-bold"> / 100</span>
                  <div className="text-[10px] font-mono uppercase font-extrabold text-red-600 bg-red-100 px-2 py-0.5 rounded-full border border-red-300 mt-0.5">
                    HIGH RISK
                  </div>
                </div>
              </div>

              {/* Factors Grid */}
              <div className="grid grid-cols-2 gap-3.5">
                <div className="p-4 rounded-xl border-2 border-pop-border bg-white shadow-pop-xs">
                  <span className="text-[11px] text-ink-muted font-bold font-mono block">CVSS v3.1 Base</span>
                  <span className="text-2xl font-extrabold text-ink font-heading mt-1 block">8.8</span>
                  <span className="text-[10px] text-ink-muted font-mono font-medium">AV:N/AC:L/PR:N</span>
                </div>

                <div className="p-4 rounded-xl border-2 border-pop-border bg-amber-50 shadow-pop-xs">
                  <span className="text-[11px] text-amber-900 font-bold font-mono block">FIRST EPSS Score</span>
                  <span className="text-2xl font-extrabold text-amber-700 font-heading mt-1 block">0.76</span>
                  <span className="text-[10px] text-amber-800 font-mono font-medium">97.8th Percentile</span>
                </div>

                <div className="p-4 rounded-xl border-2 border-pop-border bg-red-50 shadow-pop-xs">
                  <span className="text-[11px] text-red-900 font-bold font-mono block">CISA KEV Status</span>
                  <span className="text-xl font-extrabold text-red-600 font-heading mt-1 block">Detected</span>
                  <span className="text-[10px] text-red-700 font-mono font-medium">Urgent Patch Active</span>
                </div>

                <div className="p-4 rounded-xl border-2 border-pop-border bg-white shadow-pop-xs">
                  <span className="text-[11px] text-ink-muted font-bold font-mono block">Asset Criticality</span>
                  <span className="text-xl font-extrabold text-ink font-heading mt-1 block">High</span>
                  <span className="text-[10px] text-ink-muted font-mono font-medium">1.0x Context Factor</span>
                </div>
              </div>

              {/* Transparent Explanation Box */}
              <div className="p-4 rounded-xl border-2 border-pop-border bg-white text-xs space-y-1.5 font-mono shadow-pop-xs">
                <div className="flex items-center gap-1.5 text-brand-violet font-bold text-[11px]">
                  <HelpCircle className="w-3.5 h-3.5" strokeWidth={2.5} />
                  Risk Score Explanation
                </div>
                <p className="text-[11px] leading-relaxed text-ink-muted font-medium">
                  "Active presence in CISA Known Exploited catalog elevated prioritization by +15 points.
                  EPSS probability (76%) demonstrates weaponized real-world adversary exploitation."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
