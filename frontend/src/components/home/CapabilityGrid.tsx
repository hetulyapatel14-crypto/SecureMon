import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  LockKeyhole, KeyRound, UserCheck, Network, Code2, Globe, Shield, Database, Bug, ArrowRight
} from 'lucide-react';

export const CapabilityGrid: React.FC = () => {
  const capabilities = [
    {
      icon: LockKeyhole,
      title: 'Authentication',
      desc: 'Validates credential handling, password policy indicators, endpoint brute-force limits, and missing login protection.',
      colSpan: 'md:col-span-2',
      badgeColor: 'bg-violet-100 text-violet-800',
      iconBg: 'bg-brand-violet text-white',
    },
    {
      icon: KeyRound,
      title: 'Session Management',
      desc: 'Checks session token randomness, HttpOnly/Secure/SameSite cookie attributes, and timeout invalidation behavior.',
      colSpan: 'md:col-span-1',
      badgeColor: 'bg-pink-100 text-pink-800',
      iconBg: 'bg-brand-pink text-ink',
    },
    {
      icon: UserCheck,
      title: 'Authorization Controls',
      desc: 'Controlled evaluation of role-based access control, privilege boundaries, and IDOR patterns with test identities.',
      colSpan: 'md:col-span-1',
      badgeColor: 'bg-amber-100 text-amber-800',
      iconBg: 'bg-brand-amber text-ink',
    },
    {
      icon: Network,
      title: 'API Security & CORS',
      desc: 'Audits CORS origin reflection, wildcard allowances with credentials, unauthenticated routes, and HTTP verb misuse.',
      colSpan: 'md:col-span-2',
      badgeColor: 'bg-emerald-100 text-emerald-800',
      iconBg: 'bg-brand-mint text-ink',
    },
    {
      icon: Code2,
      title: 'Input Validation',
      desc: 'Safely injects harmless non-executable markers to observe output reflection and contextual HTML entity encoding.',
      colSpan: 'md:col-span-1',
      badgeColor: 'bg-sky-100 text-sky-800',
      iconBg: 'bg-brand-sky text-ink',
    },
    {
      icon: Globe,
      title: 'Client-Side Security',
      desc: 'Examines exposed API tokens, source maps, DOM sink vulnerabilities, and third-party script integrity controls.',
      colSpan: 'md:col-span-1',
      badgeColor: 'bg-rose-100 text-rose-800',
      iconBg: 'bg-rose-400 text-white',
    },
    {
      icon: Shield,
      title: 'Transport & TLS',
      desc: 'Verifies HTTPS protocol enforcement, TLS 1.2/1.3 cipher strength, certificate chain validity, and HSTS preload.',
      colSpan: 'md:col-span-1',
      badgeColor: 'bg-indigo-100 text-indigo-800',
      iconBg: 'bg-indigo-500 text-white',
    },
    {
      icon: Database,
      title: 'Data Protection & PII',
      desc: 'Detects sensitive telemetry or tokens in query parameters, error responses, and local storage mechanisms.',
      colSpan: 'md:col-span-2',
      badgeColor: 'bg-teal-100 text-teal-800',
      iconBg: 'bg-teal-400 text-ink',
    },
    {
      icon: Bug,
      title: 'Error Handling & Recon',
      desc: 'Flags verbose framework stack traces, unhandled exceptions, and Server/X-Powered-By software version disclosures.',
      colSpan: 'md:col-span-1',
      badgeColor: 'bg-amber-100 text-amber-800',
      iconBg: 'bg-brand-amber text-ink',
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs uppercase tracking-widest text-ink font-heading font-extrabold bg-brand-amber px-3 py-1 rounded-full border-2 border-pop-border shadow-pop-xs">
          COMPREHENSIVE COVERAGE
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-ink tracking-tight mt-3 font-heading">
          Security visibility across <br />
          <span className="text-brand-violet">every critical layer.</span>
        </h2>
        <p className="text-sm text-ink-muted mt-3 font-medium">
          Controlled assessments covering the OWASP Application Security Verification Standard (ASVS).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {capabilities.map((cap, i) => {
          const Icon = cap.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className={`${cap.colSpan}`}
            >
              <div className="h-full rounded-sticker border-2 border-pop-border bg-white p-6 flex flex-col justify-between shadow-pop hover:-translate-y-1 hover:shadow-pop-lg transition-all group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-11 h-11 rounded-2xl border-2 border-pop-border ${cap.iconBg} flex items-center justify-center shadow-pop-xs group-hover:scale-105 transition-transform`}>
                      <Icon className="w-5 h-5" strokeWidth={2.5} />
                    </div>
                    <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border-2 border-pop-border ${cap.badgeColor}`}>
                      ASVS v4
                    </span>
                  </div>

                  <h3 className="text-lg font-extrabold text-ink mb-2 font-heading group-hover:text-brand-violet transition-colors">
                    {cap.title}
                  </h3>
                  <p className="text-xs text-ink-muted leading-relaxed font-sans font-medium">
                    {cap.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t-2 border-slate-100 flex items-center justify-between text-xs text-ink-muted">
                  <span className="font-mono text-[11px] font-bold">Safe Probe</span>
                  <Link
                    to="/coverage"
                    className="inline-flex items-center gap-1 text-brand-violet font-heading font-extrabold group-hover:translate-x-1 transition-transform"
                  >
                    <span>Inspect Layer</span>
                    <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
