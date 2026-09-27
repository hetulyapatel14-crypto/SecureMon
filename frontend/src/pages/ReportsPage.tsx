import React, { useState, useEffect } from 'react';
import { FileText, Download, Printer, ShieldCheck, Lock, CheckCircle2, Award } from 'lucide-react';
import { api } from '../services/api';
import { ReportItem } from '../types';

export const ReportsPage: React.FC = () => {
  const [reports, setReports] = useState<ReportItem[]>([]);

  useEffect(() => {
    api.getReports().then(setReports);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJSON = (report: ReportItem) => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(report, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `SecureMon_Report_${report.id}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const activeReport = reports[0];

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight font-heading">
            Executive Security Reports
          </h1>
          <p className="text-xs text-slate-500 font-semibold mt-1">
            Formal assessment reports for NTRO, Ministry Innovation Cell (MIC), and technical leadership.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="btn-candy-secondary text-xs px-4 py-2 flex items-center gap-2"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print PDF</span>
          </button>
          {activeReport && (
            <button
              onClick={() => handleDownloadJSON(activeReport)}
              className="btn-candy text-xs px-4 py-2 flex items-center gap-2"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export JSON</span>
            </button>
          )}
        </div>
      </div>

      {activeReport && (
        <div className="sticker-card p-8 sm:p-12 space-y-8 bg-white print:bg-white print:text-black print:border-none shadow-pop-xl relative">
          {/* Top Stamp Badge */}
          <div className="absolute -top-3.5 right-8 bg-[#F472B6] text-white font-heading font-black text-xs px-4 py-1 rounded-full border-2 border-ink shadow-[3px_3px_0px_#1E293B] rotate-2">
            NTRO EVALUATION REPORT
          </div>

          {/* Official Report Title Cover */}
          <div className="border-b-2 border-slate-200 pb-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="stamp-badge bg-amber-100 text-amber-900 text-[10px]">
                  OFFICIAL ASSESSMENT REPORT
                </span>
                <span className="text-xs font-bold text-slate-500 font-mono">NTRO-MIC-SIH26163</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-ink mt-2 font-heading">
                {activeReport.report_title}
              </h2>
              <p className="text-xs text-slate-500 font-semibold mt-1">
                Platform: <strong className="text-ink font-heading">SECUREMON v2.0</strong> • Evaluation of Authorized Test Application
              </p>
            </div>

            <div className="text-xs font-semibold text-slate-500 sm:text-right space-y-1">
              <div>Date Generated: {new Date(activeReport.generated_at).toLocaleDateString()}</div>
              <div>Classification: <strong className="text-[#8B5CF6] font-heading font-bold">RESTRICTED - SOC INTERNAL</strong></div>
              <div>Authorization Ref: <strong className="text-ink">NTRO-MIC-2026-001</strong></div>
            </div>
          </div>

          {/* Section 1: Executive Summary */}
          <div className="space-y-3">
            <h3 className="text-xs font-black text-ink uppercase tracking-wider font-heading">
              1. Executive Summary
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium bg-[#FFFDF5] p-4 rounded-xl border-2 border-ink shadow-[2px_2px_0px_#1E293B]">
              {activeReport.executive_summary}
            </p>
          </div>

          {/* Section 2: Scope & Legal Authorization */}
          <div className="space-y-3 p-4 rounded-xl border-2 border-ink bg-slate-50 shadow-[2px_2px_0px_#1E293B]">
            <h3 className="text-xs font-black text-ink uppercase tracking-wider font-heading flex items-center justify-between">
              <span>2. Authorized Scope & Safety Governance</span>
              <div className="w-6 h-6 rounded-full bg-emerald-100 border border-ink flex items-center justify-center">
                <Lock className="w-3.5 h-3.5 text-emerald-700" />
              </div>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Assessment was conducted under strict compliance with Ministry of Education's Innovation Cell (MIC)
              and National Technical Research Organisation (NTRO) directives for Problem Statement SIH26163.
              All active probes were non-destructive and limited strictly to allowlisted domains.
            </p>
          </div>

          {/* Section 3: Severity Breakdown */}
          <div className="space-y-3">
            <h3 className="text-xs font-black text-ink uppercase tracking-wider font-heading">
              3. Findings Severity Distribution
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl border-2 border-ink bg-rose-50 text-center shadow-[3px_3px_0px_#1E293B]">
                <span className="text-xs text-rose-700 font-bold uppercase tracking-wider block font-heading">Critical</span>
                <span className="text-3xl font-black text-rose-900 mt-1 block font-heading">
                  {activeReport.metrics_summary.critical}
                </span>
                <span className="text-[10px] text-rose-600 font-medium">CORS Wildcard with Creds</span>
              </div>

              <div className="p-4 rounded-xl border-2 border-ink bg-amber-50 text-center shadow-[3px_3px_0px_#1E293B]">
                <span className="text-xs text-amber-700 font-bold uppercase tracking-wider block font-heading">High</span>
                <span className="text-3xl font-black text-amber-900 mt-1 block font-heading">
                  {activeReport.metrics_summary.high}
                </span>
                <span className="text-[10px] text-amber-600 font-medium">CISA KEV Enriched</span>
              </div>

              <div className="p-4 rounded-xl border-2 border-ink bg-sky-50 text-center shadow-[3px_3px_0px_#1E293B]">
                <span className="text-xs text-sky-700 font-bold uppercase tracking-wider block font-heading">Medium</span>
                <span className="text-3xl font-black text-sky-900 mt-1 block font-heading">
                  {activeReport.metrics_summary.medium}
                </span>
                <span className="text-[10px] text-sky-600 font-medium">Missing CSP / Cookie Flags</span>
              </div>

              <div className="p-4 rounded-xl border-2 border-ink bg-slate-50 text-center shadow-[3px_3px_0px_#1E293B]">
                <span className="text-xs text-slate-700 font-bold uppercase tracking-wider block font-heading">Low</span>
                <span className="text-3xl font-black text-slate-800 mt-1 block font-heading">
                  {activeReport.metrics_summary.low}
                </span>
                <span className="text-[10px] text-slate-500 font-medium">Technology Disclosure</span>
              </div>
            </div>
          </div>

          {/* Section 4: Key Remediation Actions */}
          <div className="space-y-3">
            <h3 className="text-xs font-black text-ink uppercase tracking-wider font-heading">
              4. Immediate Remediation Action Plan
            </h3>
            <div className="space-y-2.5 text-xs">
              <div className="p-3.5 rounded-xl border-2 border-ink bg-slate-50 flex items-start gap-2.5 shadow-[2px_2px_0px_#1E293B]">
                <span className="stamp-badge bg-rose-500 text-white text-[10px]">P1</span>
                <span className="text-slate-700 font-medium">
                  Eliminate wildcard CORS origin reflection on <code className="text-[#8B5CF6] font-bold">/api/telemetry</code> and mandate credentials allowlists.
                </span>
              </div>
              <div className="p-3.5 rounded-xl border-2 border-ink bg-slate-50 flex items-start gap-2.5 shadow-[2px_2px_0px_#1E293B]">
                <span className="stamp-badge bg-amber-500 text-white text-[10px]">P2</span>
                <span className="text-slate-700 font-medium">
                  Deploy strict Content-Security-Policy with frame-ancestors 'none' to mitigate clickjacking and script injection.
                </span>
              </div>
              <div className="p-3.5 rounded-xl border-2 border-ink bg-slate-50 flex items-start gap-2.5 shadow-[2px_2px_0px_#1E293B]">
                <span className="stamp-badge bg-sky-500 text-white text-[10px]">P3</span>
                <span className="text-slate-700 font-medium">
                  Append HttpOnly, Secure, and SameSite attributes to all issued session cookies.
                </span>
              </div>
            </div>
          </div>

          {/* Footer Sign-off */}
          <div className="pt-6 border-t-2 border-slate-200 flex flex-col sm:flex-row items-center justify-between text-[11px] font-bold text-slate-500 gap-2">
            <span>Authorized Security Assessment Only • SIH26163</span>
            <span className="text-[#8B5CF6] font-heading font-extrabold">Certified by SecureMon Assessment Engine</span>
          </div>
        </div>
      )}
    </div>
  );
};
