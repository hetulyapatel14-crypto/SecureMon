import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Radar, Flame, FileCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const SecurityOverview: React.FC = () => {
  const cards = [
    {
      icon: Radar,
      title: 'Continuous Assessment',
      badge: 'Automated & Safe',
      badgeBg: 'bg-brand-violet text-white',
      iconBg: 'bg-brand-violet text-white',
      shadowColor: 'shadow-pop-lg',
      description:
        'Systematic evaluation of HTTP security headers, session parameters, CORS policies, and harmless token reflection without service disruption.',
      link: '/assessments'
    },
    {
      icon: Flame,
      title: 'Risk Intelligence',
      badge: 'CISA KEV + EPSS',
      badgeBg: 'bg-brand-pink text-ink',
      iconBg: 'bg-brand-pink text-ink',
      shadowColor: 'shadow-pop-lg',
      description:
        'Contextual vulnerability enrichment mapping CVSS v3.1 base vectors with real-world exploit probability (EPSS) and CISA Known Exploited catalogues.',
      link: '/findings'
    },
    {
      icon: FileCheck,
      title: 'Evidence & Reporting',
      badge: 'Audit-Grade Export',
      badgeBg: 'bg-brand-amber text-ink',
      iconBg: 'bg-brand-amber text-ink',
      shadowColor: 'shadow-pop-lg',
      description:
        'Immutable cryptographic audit trail, sanitized HTTP request/response payloads, non-destructive reproduction steps, and executive PDF summaries.',
      link: '/reports'
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <span className="text-xs uppercase tracking-widest text-brand-violet font-heading font-extrabold bg-violet-100 px-3 py-1 rounded-full border-2 border-pop-border shadow-pop-xs">
          CORE PLATFORM ARCHITECTURE
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-ink tracking-tight font-heading mt-3">
          One platform for complete <br />
          <span className="text-brand-violet">application security visibility.</span>
        </h2>
        <p className="text-base text-ink-muted mt-4 leading-relaxed font-normal">
          From authentication controls to API security and vulnerability intelligence, SecureMon brings the
          assessment lifecycle into one workspace.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
        {cards.map((c, i) => {
          const Icon = c.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.12 }}
            >
              <Link
                to={c.link}
                className={`group block h-full rounded-sticker-lg border-2 border-pop-border bg-white p-8 pt-10 relative transition-all duration-300 ${c.shadowColor} hover:-translate-y-2 hover:rotate-[-0.5deg] hover:shadow-pop-xl`}
              >
                {/* Floating Circle Icon half-in / half-out of top border */}
                <div
                  className={`absolute -top-7 left-8 w-14 h-14 rounded-2xl border-2 border-pop-border ${c.iconBg} flex items-center justify-center shadow-pop-sm group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-7 h-7" strokeWidth={2.5} />
                </div>

                <div className="flex items-center justify-end mb-4">
                  <span className={`text-[11px] font-mono font-bold px-3 py-1 rounded-full border-2 border-pop-border shadow-[2px_2px_0px_#1E293B] ${c.badgeBg}`}>
                    {c.badge}
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-ink mb-3 font-heading group-hover:text-brand-violet transition-colors flex items-center justify-between">
                  <span>{c.title}</span>
                  <div className="w-7 h-7 rounded-full border-2 border-pop-border bg-slate-100 flex items-center justify-center group-hover:bg-brand-violet group-hover:text-white transition-colors">
                    <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
                  </div>
                </h3>

                <p className="text-sm text-ink-muted leading-relaxed font-sans font-medium">
                  {c.description}
                </p>

                <div className="mt-8 pt-4 border-t-2 border-slate-100 text-xs font-heading font-bold text-brand-violet flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                  <span>Explore module</span>
                  <span>→</span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
