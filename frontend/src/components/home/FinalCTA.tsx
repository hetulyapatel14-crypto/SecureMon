import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Lock, Sparkles, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

export const FinalCTA: React.FC = () => {
  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden text-center bg-slate-100 border-t-2 border-b-2 border-ink pattern-dots">
      {/* Playful Memphis background shapes */}
      <div className="absolute top-10 left-12 w-16 h-16 rounded-full bg-[#8B5CF6]/20 border-2 border-ink hidden md:block" />
      <div className="absolute bottom-10 right-16 w-20 h-20 bg-[#F472B6]/25 border-2 border-ink rotate-45 hidden md:block" />
      <div className="absolute top-1/2 left-6 w-12 h-12 bg-[#FBBF24]/30 border-2 border-dashed border-ink -translate-y-1/2 hidden lg:block rounded-xl" />

      <div className="max-w-4xl mx-auto relative z-10 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-2 border-ink shadow-[3px_3px_0px_#1E293B] text-xs font-bold text-ink mb-6">
            <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
            <span>SIH26163 Security Assessment Platform</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-ink tracking-tight leading-[1.08] font-heading">
            See your application's <br />
            <span className="bg-[#8B5CF6] text-white px-3 py-1 rounded-2xl border-2 border-ink shadow-[5px_5px_0px_#1E293B] inline-block rotate-1 mt-2">
              security posture
            </span>{' '}
            clearly.
          </h2>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mt-6 leading-relaxed font-medium">
            Start a controlled assessment and move from unknown risk to actionable evidence with
            audit-ready reporting and real threat intelligence.
          </p>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link
              to="/assessments"
              className="btn-candy text-base px-9 py-4 inline-flex items-center gap-3 w-full sm:w-auto justify-center"
            >
              <span>START ASSESSMENT</span>
              <div className="w-6 h-6 rounded-full bg-white text-ink flex items-center justify-center">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              to="/lab"
              className="btn-candy-secondary text-base px-8 py-4 inline-flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <Terminal className="w-4 h-4 text-ink" />
              <span>LAUNCH LOCAL SECURITY LAB</span>
            </Link>
          </div>

          <div className="pt-8 text-xs text-slate-500 font-bold flex items-center justify-center gap-2">
            <div className="w-5 h-5 rounded-full bg-emerald-100 border-2 border-ink flex items-center justify-center">
              <Lock className="w-3 h-3 text-emerald-700" />
            </div>
            <span>Authorized Testing Only • Isolated Local Lab Environment (RFC 1918 Guard)</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
