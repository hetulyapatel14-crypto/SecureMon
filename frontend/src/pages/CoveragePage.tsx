import React from 'react';
import { Activity, ShieldCheck, CheckCircle2, AlertTriangle, XCircle, Minus, Sparkles } from 'lucide-react';

export const CoveragePage: React.FC = () => {
  const matrix = [
    { category: 'Authentication', tests: 9, passed: 6, failed: 2, warnings: 1, notTested: 0, coveragePct: 100 },
    { category: 'Session Management', tests: 8, passed: 5, failed: 1, warnings: 2, notTested: 0, coveragePct: 100 },
    { category: 'Authorization & RBAC', tests: 8, passed: 7, failed: 1, warnings: 0, notTested: 0, coveragePct: 100 },
    { category: 'Input Validation', tests: 12, passed: 9, failed: 2, warnings: 1, notTested: 0, coveragePct: 100 },
    { category: 'API Security & CORS', tests: 12, passed: 8, failed: 2, warnings: 2, notTested: 0, coveragePct: 100 },
    { category: 'Client-Side Security', tests: 8, passed: 6, failed: 1, warnings: 1, notTested: 0, coveragePct: 100 },
    { category: 'Transport Security', tests: 7, passed: 5, failed: 2, warnings: 0, notTested: 0, coveragePct: 100 },
    { category: 'Data Protection & PII', tests: 10, passed: 8, failed: 1, warnings: 1, notTested: 0, coveragePct: 100 },
    { category: 'Error Handling & Recon', tests: 7, passed: 4, failed: 2, warnings: 1, notTested: 0, coveragePct: 100 }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight font-heading">
            Security Coverage Matrix
          </h1>
          <p className="text-xs text-slate-500 font-semibold mt-1">
            Verification density across the 9 primary OWASP Application Security Verification Standard (ASVS) categories.
          </p>
        </div>

        <span className="stamp-badge bg-emerald-100 text-emerald-800 text-xs self-start sm:self-auto">
          81 Total Test Cases Executed
        </span>
      </div>

      <div className="sticker-card overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 border-b-2 border-ink text-slate-600 uppercase text-[10px] font-heading font-black">
              <tr>
                <th className="py-3.5 px-5">Security Category</th>
                <th className="py-3.5 px-5">Total Tests</th>
                <th className="py-3.5 px-5">Passed</th>
                <th className="py-3.5 px-5">Failed</th>
                <th className="py-3.5 px-5">Warnings</th>
                <th className="py-3.5 px-5">Coverage Density</th>
                <th className="py-3.5 px-5 text-right">Health Status</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-slate-100">
              {matrix.map((row, idx) => {
                const healthPct = Math.round((row.passed / row.tests) * 100);
                return (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-5 text-ink font-extrabold font-heading text-sm">
                      {row.category}
                    </td>
                    <td className="py-4 px-5 font-bold text-slate-700">
                      {row.tests}
                    </td>
                    <td className="py-4 px-5 text-emerald-700 font-black">
                      {row.passed}
                    </td>
                    <td className="py-4 px-5 text-rose-600 font-black">
                      {row.failed}
                    </td>
                    <td className="py-4 px-5 text-amber-600 font-black">
                      {row.warnings}
                    </td>
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-28 bg-slate-100 rounded-full h-2.5 overflow-hidden border border-ink">
                          <div
                            className="bg-[#8B5CF6] h-full"
                            style={{ width: `${row.coveragePct}%` }}
                          />
                        </div>
                        <span className="text-[11px] font-bold text-slate-500 font-heading">{row.coveragePct}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-5 text-right">
                      <span
                        className={`stamp-badge text-[10px] ${
                          healthPct >= 80
                            ? 'bg-emerald-100 text-emerald-800'
                            : healthPct >= 60
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {healthPct}% Pass Rate
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
