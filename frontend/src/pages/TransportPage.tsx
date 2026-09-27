import React from 'react';
import { Lock, ShieldCheck, CheckCircle2, AlertTriangle, Key, Globe, Sparkles } from 'lucide-react';

export const TransportPage: React.FC = () => {
  const checks = [
    { label: 'HTTPS Protocol Enforcement', status: 'PASS', val: 'Enforced (301 Redirect Active)', detail: 'Plaintext HTTP requests automatically upgrade to TLS 1.3.' },
    { label: 'TLS Protocol Version', status: 'PASS', val: 'TLS 1.3 (RFC 8446)', detail: 'Legacy SSLv3, TLS 1.0, and TLS 1.1 ciphers disabled.' },
    { label: 'Certificate Validity & Chain', status: 'PASS', val: 'Valid (Expires in 218 days)', detail: 'RSA 4096-bit with SHA256withRSA signature verified.' },
    { label: 'HTTP Strict Transport Security (HSTS)', status: 'WARN', val: 'Missing max-age header', detail: 'HSTS header absent; recommend adding preload flag.' },
    { label: 'Mixed Active/Passive Content', status: 'PASS', val: 'Zero Mixed Content Found', detail: 'All scripts, stylesheets, and images load securely over HTTPS.' },
    { label: 'Secure Cookie Attributes', status: 'WARN', val: 'Missing Secure flag on 1 cookie', detail: 'wm_session_id issued without Secure transport requirement.' }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight font-heading">
            Transport Layer & TLS Inspection
          </h1>
          <p className="text-xs text-slate-500 font-semibold mt-1">
            Cryptographic handshake parameters, cipher suites, and secure channel enforcement.
          </p>
        </div>

        <span className="stamp-badge bg-emerald-100 text-emerald-800 text-xs self-start sm:self-auto flex items-center gap-1.5">
          <Lock className="w-3.5 h-3.5 text-emerald-700" />
          TLS 1.3 Active
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {checks.map((item, idx) => (
          <div
            key={idx}
            className={`sticker-card p-6 space-y-3 bg-white ${
              item.status === 'PASS' ? 'border-l-[6px] border-l-emerald-500' : 'border-l-[6px] border-l-amber-500'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black uppercase text-slate-500 font-heading">{item.label}</span>
              <span
                className={`stamp-badge text-[10px] ${
                  item.status === 'PASS'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {item.status}
              </span>
            </div>

            <h3 className="text-lg font-extrabold text-ink font-heading">{item.val}</h3>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">{item.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
