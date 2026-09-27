import React from 'react';

export const TrustBar: React.FC = () => {
  const standards = [
    { label: 'OWASP ASVS', desc: 'App Security Standard', bg: 'bg-violet-100', color: 'text-violet-900', rotate: '-rotate-1' },
    { label: 'OWASP TOP 10', desc: 'Critical Web Risks', bg: 'bg-pink-100', color: 'text-pink-900', rotate: 'rotate-1' },
    { label: 'CVSS v3.1', desc: 'Vulnerability Scoring', bg: 'bg-amber-100', color: 'text-amber-900', rotate: '-rotate-1' },
    { label: 'CWE TAXONOMY', desc: 'Weakness Classification', bg: 'bg-emerald-100', color: 'text-emerald-900', rotate: 'rotate-0' },
    { label: 'NVD CVE 2.0', desc: 'Live NIST Database', bg: 'bg-sky-100', color: 'text-sky-900', rotate: 'rotate-1' },
    { label: 'CISA KEV', desc: 'Active Exploited Catalog', bg: 'bg-rose-100', color: 'text-rose-900', rotate: '-rotate-1' },
    { label: 'FIRST EPSS', desc: 'Probability Intelligence', bg: 'bg-indigo-100', color: 'text-indigo-900', rotate: 'rotate-1' },
  ];

  return (
    <section className="border-y-2 border-pop-border bg-[#F1F5F9] py-10 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-xs uppercase tracking-widest text-ink-muted font-heading font-extrabold mb-6">
          Built for controlled and authorized security assessment
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3.5 items-center justify-center">
          {standards.map((s, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 border-pop-border ${s.bg} ${s.rotate} shadow-pop-xs hover:-translate-y-1 hover:rotate-0 transition-all`}
            >
              <span className={`font-extrabold text-xs tracking-wider ${s.color} font-mono`}>
                {s.label}
              </span>
              <span className="text-[10px] text-ink font-medium mt-0.5">
                {s.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
