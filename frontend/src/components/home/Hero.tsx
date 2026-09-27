import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-20 pb-20 md:pt-28 md:pb-24 overflow-hidden text-center pattern-dots">
      {/* Playful Geometric Memphis Background Shapes */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[520px] h-[520px] bg-brand-amber/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-28 left-10 w-20 h-20 rounded-2xl rotate-12 border-2 border-pop-border bg-brand-pink/30 shadow-pop-sm pointer-events-none hidden md:block" />
      <div className="absolute top-40 right-14 w-24 h-24 rounded-full border-2 border-pop-border bg-brand-violet/20 shadow-pop pointer-events-none hidden md:block" />
      <div className="absolute bottom-12 left-1/4 w-16 h-16 rounded-blob-1 border-2 border-pop-border bg-brand-mint/40 shadow-pop-xs pointer-events-none hidden lg:block" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Top Mini Badge (Playful Sticker Style) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-2 border-pop-border shadow-pop-xs mb-6"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-brand-violet animate-pulse" />
          <span className="text-xs font-mono font-bold tracking-wider uppercase text-ink">
            AUTHORIZED SECURITY ASSESSMENT
          </span>
          <span className="text-[10px] font-mono font-bold bg-brand-amber px-2 py-0.5 rounded-full border border-pop-border">
            SIH26163
          </span>
        </motion.div>

        {/* Main Heading in Bold Outfit */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-ink leading-[1.08] mb-6 font-heading"
        >
          Assess Security <br />
          <span className="relative inline-block text-brand-violet">
            Before Attackers Do.
            {/* Playful Squiggle Underline Effect */}
            <svg
              className="absolute -bottom-3 left-0 w-full h-4 text-brand-pink"
              viewBox="0 0 100 20"
              preserveAspectRatio="none"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
            >
              <path d="M0,10 Q25,0 50,10 T100,10" />
            </svg>
          </span>
        </motion.h1>

        {/* Supporting Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-ink-muted max-w-2xl mx-auto mb-10 leading-relaxed font-normal pt-2"
        >
          SecureMon helps security teams assess authorized web applications, identify vulnerabilities,
          validate evidence, prioritize risk, and generate actionable remediation reports.
        </motion.p>

        {/* Candy Button CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          <Link
            to="/assessments"
            className="btn-candy text-sm sm:text-base px-8 py-3.5 group w-full sm:w-auto"
          >
            <span>START ASSESSMENT</span>
            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-brand-violet group-hover:translate-x-0.5 transition-transform">
              <ArrowRight className="w-4 h-4" strokeWidth={3} />
            </div>
          </Link>
          <Link
            to="/dashboard"
            className="btn-candy-secondary text-sm sm:text-base px-8 py-3.5 w-full sm:w-auto"
          >
            EXPLORE PLATFORM
          </Link>
        </motion.div>

        {/* Sub-hero trust bullets */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4 text-xs font-heading font-bold text-ink"
        >
          <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border-2 border-pop-border shadow-[2px_2px_0px_#1E293B]">
            <CheckCircle2 className="w-4 h-4 text-brand-mint" strokeWidth={2.5} />
            Explicit Scope Control
          </span>
          <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border-2 border-pop-border shadow-[2px_2px_0px_#1E293B]">
            <CheckCircle2 className="w-4 h-4 text-brand-mint" strokeWidth={2.5} />
            Non-Destructive PoCs
          </span>
          <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border-2 border-pop-border shadow-[2px_2px_0px_#1E293B]">
            <CheckCircle2 className="w-4 h-4 text-brand-mint" strokeWidth={2.5} />
            CISA KEV & EPSS
          </span>
          <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border-2 border-pop-border shadow-[2px_2px_0px_#1E293B]">
            <CheckCircle2 className="w-4 h-4 text-brand-mint" strokeWidth={2.5} />
            Audit-Grade Reporting
          </span>
        </motion.div>
      </div>
    </section>
  );
};
