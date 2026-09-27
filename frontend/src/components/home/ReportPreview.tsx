import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileText, ArrowRight, ShieldCheck, Download, CheckCircle, Lock, Award, FileCode } from 'lucide-react';

export const ReportPreview: React.FC = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative">
      {/* Decorative background shape */}
      <div className="absolute top-12 left-10 w-20 h-20 bg-[#F472B6]/20 rounded-full border-2 border-dashed border-ink -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Copy */}
        <div className="lg:col-span-5 space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FBBF24]/20 text-ink border-2 border-ink shadow-[2px_2px_0px_#1E293B]">
            <Award className="w-3.5 h-3.5 text-amber-700" />
            Audit-Grade Reporting
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-ink tracking-tight font-heading leading-tight">
            From discovery to <br />
            <span className="bg-[#FBBF24] px-2 py-0.5 rounded-lg border-2 border-ink shadow-[3px_3px_0px_#1E293B] inline-block -rotate-1">
              decision-ready
            </span>{' '}
            reporting.
          </h2>

          <p className="text-base text-slate-600 leading-relaxed font-medium">
            Generate professional assessment reports containing technical evidence, severity, risk context,
            reproduction steps, and remediation guidance for engineering leads and executive stakeholders.
          </p>

          <ul className="space-y-3.5 text-xs font-semibold text-slate-700 pt-2">
            <li className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-emerald-100 border-2 border-ink flex items-center justify-center shrink-0">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-700" />
              </div>
              <span>Full compliance with NTRO & Ministry Innovation Cell standards</span>
            </li>
            <li className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-emerald-100 border-2 border-ink flex items-center justify-center shrink-0">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-700" />
              </div>
              <span>Sanitized HTTP evidence with strict credential and token masking</span>
            </li>
            <li className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-emerald-100 border-2 border-ink flex items-center justify-center shrink-0">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-700" />
              </div>
              <span>Multi-format export: Print-Ready PDF, Structured JSON, CSV</span>
            </li>
          </ul>

          <div className="pt-4 flex items-center gap-4">
            <Link
              to="/reports"
              className="btn-candy text-sm px-7 py-3.5 inline-flex items-center gap-2"
            >
              <span>VIEW SAMPLE REPORT</span>
              <div className="w-5 h-5 rounded-full bg-white text-ink flex items-center justify-center">
                <ArrowRight className="w-3 h-3" />
              </div>
            </Link>
          </div>
        </div>

        {/* Right Floating Report Preview */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="sticker-card p-6 sm:p-8 relative bg-white rotate-1 hover:rotate-0 transition-transform"
          >
            {/* Stamp "CONFIDENTIAL" in top right corner */}
            <div className="absolute -top-3.5 -right-3.5 bg-[#F472B6] text-white font-heading font-black text-xs px-3.5 py-1 rounded-full border-2 border-ink shadow-[3px_3px_0px_#1E293B] rotate-6">
              NTRO COMPLIANT
            </div>

            {/* Header Document Metadata */}
            <div className="border-b-2 border-slate-200 pb-5 mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-ink uppercase bg-amber-100 px-2.5 py-0.5 rounded-full border-2 border-ink">
                    OFFICIAL REPORT
                  </span>
                  <span className="text-xs text-slate-500 font-bold">SEC-RPT-2026-091</span>
                </div>
                <h3 className="text-xl font-extrabold text-ink mt-2 font-heading">
                  World Monitor Web Application Security Assessment
                </h3>
              </div>
              <div className="text-xs text-slate-500 font-semibold sm:text-right">
                <div>Date: Q1 2026</div>
                <div className="text-ink font-bold">Scope: worldmonitor.internal</div>
              </div>
            </div>

            {/* Document Body Sections */}
            <div className="space-y-4 text-xs font-sans">
              {/* Section 1: Executive Summary */}
              <div className="p-4 rounded-xl border-2 border-ink bg-[#FFFDF5] shadow-[2px_2px_0px_#1E293B]">
                <span className="text-[11px] font-extrabold text-ink uppercase font-heading block mb-1">
                  1. Executive Summary
                </span>
                <p className="text-slate-600 leading-relaxed text-[11px] font-medium">
                  During the authorized assessment of World Monitor, a total of 5 findings were identified.
                  1 Critical vulnerability involving CORS origin reflection requires immediate remediation to safeguard telemetry streams.
                </p>
              </div>

              {/* Section 2: Assessment Scope */}
              <div className="p-3.5 rounded-xl border-2 border-ink bg-slate-50 flex items-center justify-between shadow-[2px_2px_0px_#1E293B]">
                <div>
                  <span className="text-[11px] font-bold text-ink uppercase font-heading block">
                    2. Authorized Scope & Governance
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium">
                    Reference: NTRO-MIC-SIH26163-AUTH-001 | Safe Non-Destructive PoCs
                  </span>
                </div>
                <div className="w-7 h-7 rounded-full bg-emerald-100 border-2 border-ink flex items-center justify-center shrink-0">
                  <Lock className="w-3.5 h-3.5 text-emerald-700" />
                </div>
              </div>

              {/* Section 3: Risk Overview */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-xl border-2 border-ink bg-rose-50 shadow-[2px_2px_0px_#1E293B]">
                  <span className="text-[10px] text-rose-700 font-bold uppercase tracking-wider block">Critical</span>
                  <span className="text-xl font-black text-rose-800 font-heading">1</span>
                </div>
                <div className="p-3 rounded-xl border-2 border-ink bg-amber-50 shadow-[2px_2px_0px_#1E293B]">
                  <span className="text-[10px] text-amber-700 font-bold uppercase tracking-wider block">High</span>
                  <span className="text-xl font-black text-amber-800 font-heading">2</span>
                </div>
                <div className="p-3 rounded-xl border-2 border-ink bg-sky-50 shadow-[2px_2px_0px_#1E293B]">
                  <span className="text-[10px] text-sky-700 font-bold uppercase tracking-wider block">Med / Low</span>
                  <span className="text-xl font-black text-sky-800 font-heading">2</span>
                </div>
              </div>

              {/* Section 4: Evidence & Remediation */}
              <div className="p-3.5 rounded-xl border-2 border-ink bg-[#FFFDF5] text-[11px] space-y-1 shadow-[2px_2px_0px_#1E293B]">
                <div className="flex items-center justify-between text-ink">
                  <span className="font-bold text-ink font-heading">Finding #1: CORS Permissive Wildcard</span>
                  <span className="stamp-badge bg-rose-500 text-white text-[10px]">CVSS 8.8 (Critical)</span>
                </div>
                <p className="text-slate-600 text-[10px] font-medium pt-1">
                  Remediation: Restrict Access-Control-Allow-Origin to authorized domains; eliminate wildcard with credentials.
                </p>
              </div>
            </div>

            {/* Footer Tag */}
            <div className="mt-5 pt-3 border-t-2 border-slate-200 flex items-center justify-between text-[11px] font-bold text-slate-500">
              <span>Authorized Security Assessment Only</span>
              <span className="text-[#8B5CF6] font-heading">Signed by SecureMon Engine</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
