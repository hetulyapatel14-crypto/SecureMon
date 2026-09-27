import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ShieldAlert, ArrowLeft, Flame, CheckCircle, ExternalLink,
  Copy, Check, FileCode, Shield, Layers, HelpCircle, Terminal, Sparkles
} from 'lucide-react';
import { api } from '../services/api';
import { Finding } from '../types';
import { SeverityBadge } from '../components/SeverityBadge';

export const FindingDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [finding, setFinding] = useState<Finding | null>(null);
  const [copied, setCopied] = useState(false);
  const [statusUpdating, setStatusUpdating] = useState(false);

  useEffect(() => {
    if (id) {
      api.getFindingById(id).then((res) => {
        if (res) setFinding(res);
      });
    }
  }, [id]);

  if (!finding) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-10 h-10 rounded-full border-4 border-ink border-t-[#8B5CF6] animate-spin" />
      </div>
    );
  }

  const handleStatusChange = async (newStatus: string) => {
    setStatusUpdating(true);
    await api.updateFindingStatus(finding.id, newStatus);
    setFinding({ ...finding, remediation_status: newStatus as any });
    setStatusUpdating(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Back button */}
      <div>
        <Link
          to="/findings"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-ink transition-colors font-heading"
        >
          <div className="w-6 h-6 rounded-full bg-white border-2 border-ink flex items-center justify-center shadow-[2px_2px_0px_#1E293B]">
            <ArrowLeft className="w-3.5 h-3.5 text-ink" />
          </div>
          <span>Back to Findings Directory</span>
        </Link>
      </div>

      {/* Main Finding Title Header Card */}
      <div className="sticker-card p-6 sm:p-8 space-y-6 bg-white">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <SeverityBadge severity={finding.severity} size="md" />
              <span className="stamp-badge bg-slate-100 text-slate-700 text-xs">
                {finding.category}
              </span>
              {finding.cisa_kev && (
                <span className="stamp-badge bg-rose-500 text-white text-xs flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 fill-white" />
                  CISA KEV ACTIVE
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight font-heading mt-2">
              {finding.title}
            </h1>

            <p className="text-xs text-slate-500 font-semibold font-mono">
              Target Component: <span className="text-ink font-bold">{finding.affected_component}</span>
            </p>
          </div>

          {/* Remediation Status Selector */}
          <div className="flex flex-col sm:items-end gap-1.5 shrink-0">
            <span className="text-[10px] text-slate-500 font-black uppercase tracking-wider font-heading">
              Remediation Status
            </span>
            <select
              value={finding.remediation_status}
              disabled={statusUpdating}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="bg-slate-50 border-2 border-ink rounded-full px-4 py-1.5 text-xs font-bold text-ink focus:outline-none focus:bg-white shadow-[2px_2px_0px_#1E293B]"
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Accepted Risk">Accepted Risk</option>
            </select>
          </div>
        </div>

        {/* Intelligence Metric Strips (CVSS, EPSS, KEV) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-4 border-t-2 border-slate-100">
          <div className="p-3.5 rounded-xl border-2 border-ink bg-slate-50 shadow-[2px_2px_0px_#1E293B]">
            <span className="text-[10px] text-slate-500 uppercase font-black tracking-wider block font-heading">CVSS v3.1</span>
            <span className="text-2xl font-black text-ink font-heading mt-0.5 block">
              {finding.cvss_score.toFixed(1)}
            </span>
            <span className="text-[10px] text-slate-500 font-bold truncate block">
              {finding.cvss_vector || 'CVSS:3.1/AV:N/AC:L'}
            </span>
          </div>

          <div className="p-3.5 rounded-xl border-2 border-ink bg-slate-50 shadow-[2px_2px_0px_#1E293B]">
            <span className="text-[10px] text-slate-500 uppercase font-black tracking-wider block font-heading">EPSS Probability</span>
            <span className="text-2xl font-black text-[#8B5CF6] font-heading mt-0.5 block">
              {(finding.epss_score * 100).toFixed(1)}%
            </span>
            <span className="text-[10px] text-slate-500 font-medium">
              {finding.epss_percentile ? `${(finding.epss_percentile * 100).toFixed(0)}th percentile` : 'Predictive weaponization'}
            </span>
          </div>

          <div className="p-3.5 rounded-xl border-2 border-ink bg-slate-50 shadow-[2px_2px_0px_#1E293B]">
            <span className="text-[10px] text-slate-500 uppercase font-black tracking-wider block font-heading">CWE Weakness</span>
            <span className="text-lg font-black text-ink font-heading mt-0.5 block">
              {finding.cwe_id || 'CWE-693'}
            </span>
            <span className="text-[10px] text-slate-500 font-medium">Taxonomy classification</span>
          </div>

          <div className="p-3.5 rounded-xl border-2 border-ink bg-slate-50 shadow-[2px_2px_0px_#1E293B]">
            <span className="text-[10px] text-slate-500 uppercase font-black tracking-wider block font-heading">CVE Correlation</span>
            <span className="text-lg font-black text-ink font-heading mt-0.5 block">
              {finding.cve_id || 'N/A (CWE-based)'}
            </span>
            <span className="text-[10px] text-slate-500 font-medium">NIST NVD 2.0</span>
          </div>
        </div>
      </div>

      {/* Complete Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Column: Description, Evidence, PoC, Impact */}
        <div className="md:col-span-8 space-y-6">
          {/* Section 1: Detailed Description */}
          <div className="sticker-card p-6 space-y-3 bg-white">
            <h3 className="text-xs font-black text-ink uppercase tracking-wider font-heading">
              1. Vulnerability Description
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {finding.description}
            </p>
          </div>

          {/* Section 4: Technical Evidence */}
          <div className="sticker-card p-6 space-y-3 bg-white">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black text-ink uppercase tracking-wider font-heading">
                4. Technical Evidence (Masked & Sanitized)
              </h3>
              <span className="stamp-badge bg-emerald-100 text-emerald-800 text-[10px]">
                Zero Sensitive Data Leakage Policy
              </span>
            </div>

            <div className="rounded-xl border-2 border-ink bg-[#FFFDF5] p-4 font-mono text-[11px] text-slate-700 overflow-x-auto space-y-2 shadow-[2px_2px_0px_#1E293B]">
              <div className="text-[#8B5CF6] font-bold">Captured HTTP Inspection Headers:</div>
              <pre className="text-slate-600 leading-relaxed">
{`HTTP/1.1 200 OK
Date: ${new Date(finding.detected_at).toUTCString()}
Server: WorldMonitor-Gateway/2.4.1
Content-Type: text/html; charset=UTF-8
Access-Control-Allow-Origin: *
Access-Control-Allow-Credentials: true
Set-Cookie: wm_session_id=[REDACTED_BY_SECUREMON_POLICY]; Path=/
Content-Security-Policy: [ABSENT]
Strict-Transport-Security: [ABSENT]`}
              </pre>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              Evidence has been automatically processed by SecureMon's Redaction Engine to obscure active tokens, passwords, and user identities.
            </p>
          </div>

          {/* Section 5 & 6: Reproduction Steps & Safe Proof of Concept */}
          <div className="sticker-card p-6 space-y-4 bg-white">
            <h3 className="text-xs font-black text-ink uppercase tracking-wider font-heading">
              5 & 6. Safe Proof of Concept (Non-Destructive)
            </h3>

            <div className="space-y-2 text-xs text-slate-600 font-medium">
              <p className="font-extrabold text-ink font-heading">Reproduction Steps:</p>
              <ol className="list-decimal list-inside space-y-1 pl-1 text-[11px]">
                <li>Dispatch an authorized HTTP preflight OPTIONS request to the target component.</li>
                <li>Supply header <code className="text-[#8B5CF6] bg-slate-100 px-1 py-0.5 rounded border border-ink">Origin: https://test-eval.internal</code>.</li>
                <li>Observe the reflection of wildcard origin paired with credential allowance.</li>
              </ol>
            </div>

            <div className="rounded-xl border-2 border-ink bg-slate-50 p-3.5 flex items-center justify-between font-mono text-[11px] shadow-[2px_2px_0px_#1E293B]">
              <span className="text-[#8B5CF6] font-bold truncate">
                curl -I -X OPTIONS '{finding.affected_component}' -H "Origin: https://eval-test.internal"
              </span>
              <button
                onClick={() => copyToClipboard(`curl -I -X OPTIONS '${finding.affected_component}' -H "Origin: https://eval-test.internal"`)}
                className="p-1.5 rounded-lg border border-ink bg-white hover:bg-slate-100 text-ink transition-colors ml-2 shrink-0"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Section 7 & 8: Business & Security Impact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sticker-card p-5 space-y-2 bg-white">
              <h4 className="text-xs font-black text-ink uppercase tracking-wider font-heading">
                7. Business Impact
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {finding.business_impact || 'Potential unauthorized access to proprietary telemetry data and situational surveillance operations.'}
              </p>
            </div>

            <div className="sticker-card p-5 space-y-2 bg-white">
              <h4 className="text-xs font-black text-ink uppercase tracking-wider font-heading">
                8. Security Impact
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {finding.security_impact || 'Compromises browser Same-Origin Policy, enabling authenticated cross-origin data theft.'}
              </p>
            </div>
          </div>

          {/* Section 14: Remediation Guidance */}
          <div className="sticker-card p-6 space-y-4 bg-white border-l-[6px] border-l-[#8B5CF6]">
            <div className="flex items-center gap-2 text-ink font-extrabold text-sm font-heading uppercase">
              <FileCode className="w-5 h-5 text-[#8B5CF6]" />
              14. Actionable Remediation Guidance
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {finding.remediation_recommendation}
            </p>

            <div className="rounded-xl border-2 border-ink bg-[#FFFDF5] p-4 font-mono text-[11px] text-slate-700 shadow-[2px_2px_0px_#1E293B]">
              <span className="text-[#8B5CF6] font-bold block mb-1">Recommended Configuration Fix:</span>
              <pre className="text-slate-800 leading-relaxed">
{`# Explicit Origin Whitelist (Nginx / Express / FastAPI)
origins = ["https://worldmonitor.ntro.gov.in"]

# Security Headers Middleware
Content-Security-Policy: default-src 'self'; frame-ancestors 'none';
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
X-Content-Type-Options: nosniff`}
              </pre>
            </div>
          </div>
        </div>

        {/* Right Column: References & Verification */}
        <div className="md:col-span-4 space-y-6">
          {/* Section 15: Verification Steps */}
          <div className="sticker-card p-5 space-y-3 bg-white">
            <h4 className="text-xs font-black text-ink uppercase tracking-wider font-heading">
              15. Verification Steps
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Re-run SecureMon SAFE assessment profile after applying patch.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Verify that Access-Control-Allow-Origin rejects arbitrary origins.</span>
              </li>
            </ul>
          </div>

          {/* Section 16: References */}
          <div className="sticker-card p-5 space-y-3 bg-white">
            <h4 className="text-xs font-black text-ink uppercase tracking-wider font-heading">
              16. Standards & References
            </h4>
            <div className="space-y-2 text-xs">
              <a
                href="https://owasp.org/www-project-top-ten/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl border-2 border-ink bg-slate-50 text-slate-700 hover:bg-[#8B5CF6]/10 font-bold font-heading transition-colors"
              >
                <span>OWASP Top 10 Guidelines</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#8B5CF6]" />
              </a>

              <a
                href="https://csrc.nist.gov/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl border-2 border-ink bg-slate-50 text-slate-700 hover:bg-[#8B5CF6]/10 font-bold font-heading transition-colors"
              >
                <span>NIST Special Publication 800-53</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#8B5CF6]" />
              </a>

              <a
                href="https://www.cisa.gov/known-exploited-vulnerabilities-catalog"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl border-2 border-ink bg-slate-50 text-slate-700 hover:bg-[#8B5CF6]/10 font-bold font-heading transition-colors"
              >
                <span>CISA KEV Catalog</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#8B5CF6]" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
