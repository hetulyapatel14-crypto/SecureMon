import React from 'react';
import { Layers, CheckCircle2, AlertTriangle, XCircle, Shield, Sparkles } from 'lucide-react';

export const HeadersPage: React.FC = () => {
  const headers = [
    {
      name: 'Content-Security-Policy (CSP)',
      status: 'FAIL',
      directive: 'default-src',
      description: 'The Content-Security-Policy header is completely absent from HTTP responses.',
      risk: 'High risk of Cross-Site Scripting (XSS) and client-side data exfiltration.',
      recommended: "Content-Security-Policy: default-src 'self'; script-src 'self'; frame-ancestors 'none';"
    },
    {
      name: 'Strict-Transport-Security (HSTS)',
      status: 'WARN',
      directive: 'max-age',
      description: 'HSTS is missing from intermediate staging proxies, allowing potential downgrade to HTTP.',
      risk: 'Susceptible to SSL-stripping and man-in-the-middle attacks on untrusted networks.',
      recommended: 'Strict-Transport-Security: max-age=31536000; includeSubDomains; preload'
    },
    {
      name: 'X-Content-Type-Options',
      status: 'FAIL',
      directive: 'nosniff',
      description: 'Header missing. User-agents may attempt MIME-sniffing on untyped response streams.',
      risk: 'MIME confusion attacks allowing text files to execute as JavaScript in legacy browsers.',
      recommended: 'X-Content-Type-Options: nosniff'
    },
    {
      name: 'X-Frame-Options',
      status: 'FAIL',
      directive: 'DENY / SAMEORIGIN',
      description: 'Clickjacking protections are missing. The portal can be rendered inside arbitrary iframes.',
      risk: 'UI redressing attacks capturing administrative clicks or telemetry commands.',
      recommended: 'X-Frame-Options: DENY'
    },
    {
      name: 'Referrer-Policy',
      status: 'PASS',
      directive: 'strict-origin-when-cross-origin',
      description: 'Properly restricts full URL leakage when navigating across third-party links.',
      risk: 'Compliant with modern privacy standards.',
      recommended: 'Referrer-Policy: strict-origin-when-cross-origin'
    },
    {
      name: 'Permissions-Policy',
      status: 'WARN',
      directive: 'camera, microphone, geolocation',
      description: 'No explicit restriction on browser hardware capabilities (camera, microphone, sensors).',
      risk: 'Unconstrained browser feature access.',
      recommended: 'Permissions-Policy: camera=(), microphone=(), geolocation=()'
    }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight font-heading">
            HTTP Security Headers Audit
          </h1>
          <p className="text-xs text-slate-500 font-semibold mt-1">
            Baseline defensive header posture evaluated against OWASP Secure Headers Project.
          </p>
        </div>

        <span className="stamp-badge bg-rose-500 text-white text-xs self-start sm:self-auto">
          4 Issues Identified
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {headers.map((h, idx) => (
          <div
            key={idx}
            className={`sticker-card p-6 flex flex-col justify-between space-y-4 bg-white ${
              h.status === 'FAIL' ? 'border-l-[6px] border-l-rose-500' : h.status === 'WARN' ? 'border-l-[6px] border-l-amber-500' : 'border-l-[6px] border-l-emerald-500'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-extrabold text-ink text-base font-heading">{h.name}</span>
                <span
                  className={`stamp-badge text-[10px] ${
                    h.status === 'PASS'
                      ? 'bg-emerald-100 text-emerald-800'
                      : h.status === 'WARN'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-rose-500 text-white'
                  }`}
                >
                  {h.status}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {h.description}
              </p>

              <div className="mt-3.5 p-3 rounded-xl border-2 border-ink bg-slate-50 text-xs text-slate-600 shadow-[2px_2px_0px_#1E293B]">
                <strong className="text-ink font-bold block mb-1 font-heading">Impact:</strong>
                {h.risk}
              </div>
            </div>

            <div className="pt-3 border-t-2 border-slate-100 text-[11px] font-mono text-slate-800 bg-[#FFFDF5] p-3 rounded-xl border-2 border-ink shadow-[2px_2px_0px_#1E293B] truncate">
              <span className="text-[#8B5CF6] font-bold block mb-0.5 font-heading">Recommended Fix:</span>
              {h.recommended}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
