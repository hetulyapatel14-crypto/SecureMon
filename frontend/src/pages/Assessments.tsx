import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck, PlusCircle, Play, CheckCircle2, Clock, AlertTriangle,
  X, Check, Lock, ArrowRight, Shield, RefreshCw, Eye, Sparkles, Layers
} from 'lucide-react';
import { api } from '../services/api';
import { Assessment, Target } from '../types';
import { Link } from 'react-router-dom';

export const Assessments: React.FC = () => {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [targets, setTargets] = useState<Target[]>([]);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);

  // Wizard State
  const [formData, setFormData] = useState({
    name: 'World Monitor Application (Authorized Test Suite)',
    base_url: 'https://worldmonitor-demo.ntro.internal',
    environment: 'Staging',
    owner: 'SOC Operations',
    description: 'Controlled security evaluation of World Monitor portal for SIH26163.',
    allowed_domains: 'worldmonitor-demo.ntro.internal, api.worldmonitor.internal',
    allowed_api_paths: '/api/v1/*, /auth/*, /telemetry/*',
    excluded_paths: '/admin/purge, /billing/*',
    auth_reference_code: 'NTRO-MIC-SIH26163-AUTH-001',
    confirmed_by: 'analyst@securemon.gov.in',
    is_confirmed: false,
    legal_disclaimer_accepted: false,
    profile: 'SAFE' // PASSIVE, SAFE, STANDARD
  });

  // Live Scan Progress Simulation
  const [isScanning, setIsScanning] = useState(false);
  const [scanStepIndex, setScanStepIndex] = useState(0);

  const scanSteps = [
    'Initializing scan worker & verifying authorization token...',
    'Validating target scope against RFC 1918 & Cloud Metadata SSRF guard...',
    'Discovering active endpoints & inspecting HTTP response envelopes...',
    'Analyzing Security Headers (CSP, HSTS, X-Content-Type-Options, XFO)...',
    'Auditing Authentication flags (HttpOnly, Secure, SameSite, JWT exposure)...',
    'Checking CORS origin reflection & wildcard credentials misconfiguration...',
    'Injecting safe non-destructive reflection marker into parameters...',
    'Enriching findings via NIST NVD API 2.0, FIRST EPSS, & CISA KEV...',
    'Calculating composite risk score (CVSS + EPSS + Asset context)...',
    'Assessment completed successfully! Generating executive summary...'
  ];

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const [asms, tgts] = await Promise.all([
      api.getAssessments(),
      api.getTargets()
    ]);
    setAssessments(asms);
    setTargets(tgts);
  }

  const handleStartScan = async () => {
    setIsScanning(true);
    setScanStepIndex(0);

    // Simulate animated scanning progression for live demo
    for (let i = 0; i < scanSteps.length; i++) {
      setScanStepIndex(i);
      await new Promise((resolve) => setTimeout(resolve, 800));
    }

    // Call API to persist
    await api.createTargetAndAssessment(
      {
        name: formData.name,
        base_url: formData.base_url,
        environment: formData.environment,
        owner: formData.owner,
        description: formData.description,
        scope: {
          allowed_domains: formData.allowed_domains.split(',').map((s) => s.trim()),
          allowed_api_paths: formData.allowed_api_paths.split(',').map((s) => s.trim()),
          excluded_paths: formData.excluded_paths.split(',').map((s) => s.trim())
        },
        authorization: {
          auth_reference_code: formData.auth_reference_code,
          confirmed_by: formData.confirmed_by,
          is_confirmed: true,
          authorized_to: new Date(Date.now() + 86400000 * 30).toISOString(),
          legal_disclaimer_accepted: true
        }
      },
      formData.profile
    );

    setIsScanning(false);
    setIsWizardOpen(false);
    setWizardStep(1);
    loadData();
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight font-heading">
            Security Assessments
          </h1>
          <p className="text-xs text-slate-500 font-semibold mt-1">
            Registered targets, scan history, and active controlled evaluation profiles.
          </p>
        </div>

        <button
          onClick={() => {
            setIsWizardOpen(true);
            setWizardStep(1);
          }}
          className="btn-candy text-xs px-5 py-2.5 inline-flex items-center gap-2 self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create Assessment</span>
        </button>
      </div>

      {/* Assessment Profiles Explainer Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="sticker-card p-5 bg-white flex flex-col justify-between">
          <div>
            <span className="stamp-badge bg-sky-100 text-sky-800 text-[10px]">
              PASSIVE PROFILE
            </span>
            <h4 className="text-base font-extrabold text-ink font-heading mt-2">Zero-Impact Inspection</h4>
            <p className="text-xs text-slate-600 font-medium mt-1 leading-relaxed">
              Examines headers, TLS negotiation, cookies, and passive error responses without emitting active probes.
            </p>
          </div>
          <span className="text-[10px] text-slate-400 font-bold mt-3">Ideal for live production portals</span>
        </div>

        <div className="sticker-card p-5 bg-white border-l-[6px] border-l-[#8B5CF6] flex flex-col justify-between">
          <div>
            <span className="stamp-badge bg-[#8B5CF6] text-white text-[10px]">
              SAFE PROFILE (DEFAULT)
            </span>
            <h4 className="text-base font-extrabold text-ink font-heading mt-2">Safe Verification</h4>
            <p className="text-xs text-slate-600 font-medium mt-1 leading-relaxed">
              Executes harmless parameter reflections and CORS origin tests without destructive or payload modifications.
            </p>
          </div>
          <span className="text-[10px] text-[#8B5CF6] font-bold mt-3 font-heading">Recommended for staging environments</span>
        </div>

        <div className="sticker-card p-5 bg-white flex flex-col justify-between">
          <div>
            <span className="stamp-badge bg-slate-100 text-slate-700 text-[10px]">
              STANDARD PROFILE
            </span>
            <h4 className="text-base font-extrabold text-ink font-heading mt-2">Automated ZAP Crawler</h4>
            <p className="text-xs text-slate-600 font-medium mt-1 leading-relaxed">
              Full spidering and baseline rule validation via isolated local OWASP ZAP Docker daemon.
            </p>
          </div>
          <span className="text-[10px] text-slate-400 font-bold mt-3">Requires dedicated test sandbox</span>
        </div>
      </div>

      {/* Assessments List Table */}
      <div className="sticker-card overflow-hidden bg-white">
        <div className="p-5 border-b-2 border-ink flex items-center justify-between bg-slate-50">
          <h3 className="text-base font-extrabold text-ink font-heading">Assessment Directory</h3>
          <span className="stamp-badge bg-white text-slate-700 text-xs">{assessments.length} Total Registered</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 border-b-2 border-ink text-slate-600 uppercase text-[10px] font-heading font-black">
              <tr>
                <th className="py-3 px-5">Assessment</th>
                <th className="py-3 px-5">Target Application</th>
                <th className="py-3 px-5">Profile</th>
                <th className="py-3 px-5">Status</th>
                <th className="py-3 px-5">Risk</th>
                <th className="py-3 px-5">Findings</th>
                <th className="py-3 px-5">Duration</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-slate-100">
              {assessments.map((a) => (
                <tr key={a.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-5">
                    <span className="font-extrabold text-ink block font-heading text-sm">{a.title}</span>
                    <span className="text-[10px] text-slate-400 font-bold">{a.id}</span>
                  </td>
                  <td className="py-4 px-5">
                    <span className="text-slate-700 block font-bold">
                      {a.target_name || 'World Monitor Application'}
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold">Staging Replica</span>
                  </td>
                  <td className="py-4 px-5">
                    <span className="stamp-badge bg-[#8B5CF6]/15 text-[#8B5CF6] text-[10px]">
                      {a.profile}
                    </span>
                  </td>
                  <td className="py-4 px-5">
                    {a.status === 'Completed' ? (
                      <span className="inline-flex items-center gap-1.5 text-emerald-700 font-bold font-heading">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                        Completed
                      </span>
                    ) : a.status === 'Running' ? (
                      <span className="inline-flex items-center gap-1.5 text-[#8B5CF6] font-bold font-heading">
                        <span className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-pulse" />
                        Running ({a.progress}%)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-slate-500 font-bold">
                        <Clock className="w-3.5 h-3.5" />
                        {a.status}
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-5 font-black text-ink font-heading text-sm">
                    {a.risk_score} / 100
                  </td>
                  <td className="py-4 px-5 font-bold text-slate-700">
                    {a.findings_count || 4} findings
                  </td>
                  <td className="py-4 px-5 font-semibold text-slate-500">
                    {a.duration_seconds ? `${Math.floor(a.duration_seconds / 60)}m ${a.duration_seconds % 60}s` : '—'}
                  </td>
                  <td className="py-4 px-5 text-right">
                    <Link
                      to="/findings"
                      className="text-[#8B5CF6] hover:underline font-extrabold font-heading text-xs"
                    >
                      View Findings →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE ASSESSMENT WIZARD MODAL */}
      <AnimatePresence>
        {isWizardOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl sticker-card p-6 sm:p-8 space-y-6 relative overflow-hidden bg-white shadow-pop-xl"
            >
              {/* Close Button */}
              {!isScanning && (
                <button
                  onClick={() => setIsWizardOpen(false)}
                  className="absolute top-6 right-6 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 border-2 border-ink text-ink transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              {/* Wizard Steps Indicator */}
              <div className="flex items-center justify-between pb-4 border-b-2 border-slate-200">
                <div>
                  <span className="stamp-badge bg-[#FBBF24] text-ink text-[10px]">
                    Stage {wizardStep} of 5
                  </span>
                  <h3 className="text-xl font-black text-ink mt-1 font-heading">
                    {wizardStep === 1 && 'Target Information'}
                    {wizardStep === 2 && 'Legal Authorization'}
                    {wizardStep === 3 && 'Scope Definition & SSRF Guard'}
                    {wizardStep === 4 && 'Assessment Profile'}
                    {wizardStep === 5 && (isScanning ? 'Executing Assessment' : 'Review & Confirm')}
                  </h3>
                </div>

                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <div
                      key={s}
                      className={`w-7 h-2 rounded-full border border-ink ${
                        s <= wizardStep ? 'bg-[#8B5CF6]' : 'bg-slate-200'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Step 1: Target Info */}
              {wizardStep === 1 && (
                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1 font-heading">Target Application Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-50 border-2 border-ink rounded-xl px-3.5 py-2.5 text-ink focus:outline-none focus:bg-white text-xs font-semibold shadow-[2px_2px_0px_#1E293B]"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1 font-heading">Target Base URL (HTTP/HTTPS only)</label>
                    <input
                      type="text"
                      value={formData.base_url}
                      onChange={(e) => setFormData({ ...formData, base_url: e.target.value })}
                      className="w-full bg-slate-50 border-2 border-ink rounded-xl px-3.5 py-2.5 text-ink focus:outline-none focus:bg-white text-xs font-mono shadow-[2px_2px_0px_#1E293B]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1 font-heading">Environment</label>
                      <select
                        value={formData.environment}
                        onChange={(e) => setFormData({ ...formData, environment: e.target.value })}
                        className="w-full bg-slate-50 border-2 border-ink rounded-xl px-3.5 py-2.5 text-ink focus:outline-none focus:bg-white text-xs font-semibold shadow-[2px_2px_0px_#1E293B]"
                      >
                        <option value="Testing">Testing / Lab</option>
                        <option value="Staging">Staging Replica</option>
                        <option value="Production">Production (Restricted)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-700 font-bold mb-1 font-heading">Owner / Point of Contact</label>
                      <input
                        type="text"
                        value={formData.owner}
                        onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                        className="w-full bg-slate-50 border-2 border-ink rounded-xl px-3.5 py-2.5 text-ink focus:outline-none focus:bg-white text-xs font-semibold shadow-[2px_2px_0px_#1E293B]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Legal Authorization */}
              {wizardStep === 2 && (
                <div className="space-y-4 text-xs">
                  <div className="p-3.5 rounded-xl border-2 border-ink bg-[#FFFDF5] flex items-start gap-3 shadow-[2px_2px_0px_#1E293B]">
                    <div className="w-8 h-8 rounded-full bg-amber-200 border-2 border-ink flex items-center justify-center shrink-0">
                      <Lock className="w-4 h-4 text-ink" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-ink font-heading text-sm">Mandatory Authorization Governance</h4>
                      <p className="text-[11px] text-slate-600 mt-1 leading-relaxed font-medium">
                        Assessments are strictly limited to authorized assets. You must confirm that you possess explicit authorization from the system owner.
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1 font-heading">Authorization Reference Code</label>
                    <input
                      type="text"
                      value={formData.auth_reference_code}
                      onChange={(e) => setFormData({ ...formData, auth_reference_code: e.target.value })}
                      className="w-full bg-slate-50 border-2 border-ink rounded-xl px-3.5 py-2.5 text-ink focus:outline-none focus:bg-white text-xs font-mono shadow-[2px_2px_0px_#1E293B]"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1 font-heading">Evaluator Official Email</label>
                    <input
                      type="text"
                      value={formData.confirmed_by}
                      onChange={(e) => setFormData({ ...formData, confirmed_by: e.target.value })}
                      className="w-full bg-slate-50 border-2 border-ink rounded-xl px-3.5 py-2.5 text-ink focus:outline-none focus:bg-white text-xs font-semibold shadow-[2px_2px_0px_#1E293B]"
                    />
                  </div>

                  {/* Mandatory Checkbox */}
                  <div className="pt-2">
                    <label className="flex items-start gap-3 cursor-pointer p-3.5 rounded-xl border-2 border-ink bg-slate-50 hover:bg-slate-100 transition-colors shadow-[2px_2px_0px_#1E293B]">
                      <input
                        type="checkbox"
                        checked={formData.is_confirmed}
                        onChange={(e) => setFormData({ ...formData, is_confirmed: e.target.checked })}
                        className="mt-0.5 rounded text-[#8B5CF6] focus:ring-[#8B5CF6] w-4 h-4 border-2 border-ink"
                      />
                      <span className="text-xs text-ink leading-tight">
                        <strong className="font-heading font-extrabold">I confirm that I am authorized to assess this target.</strong> <br />
                        <span className="text-slate-500 text-[11px] font-medium">
                          I certify this evaluation complies with NTRO & MIC directives and uses non-destructive methods.
                        </span>
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* Step 3: Scope */}
              {wizardStep === 3 && (
                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1 font-heading">Allowed Hostnames / Domains</label>
                    <input
                      type="text"
                      value={formData.allowed_domains}
                      onChange={(e) => setFormData({ ...formData, allowed_domains: e.target.value })}
                      className="w-full bg-slate-50 border-2 border-ink rounded-xl px-3.5 py-2.5 text-ink focus:outline-none focus:bg-white text-xs font-mono shadow-[2px_2px_0px_#1E293B]"
                    />
                    <span className="text-[10px] text-slate-500 font-medium mt-1 block">Comma-separated allowlist.</span>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1 font-heading">Allowed API Paths</label>
                    <input
                      type="text"
                      value={formData.allowed_api_paths}
                      onChange={(e) => setFormData({ ...formData, allowed_api_paths: e.target.value })}
                      className="w-full bg-slate-50 border-2 border-ink rounded-xl px-3.5 py-2.5 text-ink focus:outline-none focus:bg-white text-xs font-mono shadow-[2px_2px_0px_#1E293B]"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1 font-heading">Excluded Sensitive Paths</label>
                    <input
                      type="text"
                      value={formData.excluded_paths}
                      onChange={(e) => setFormData({ ...formData, excluded_paths: e.target.value })}
                      className="w-full bg-slate-50 border-2 border-ink rounded-xl px-3.5 py-2.5 text-ink focus:outline-none focus:bg-white text-xs font-mono shadow-[2px_2px_0px_#1E293B]"
                    />
                    <span className="text-[10px] text-slate-500 font-medium mt-1 block">Routes completely off-limits to testing.</span>
                  </div>
                </div>
              )}

              {/* Step 4: Assessment Profile */}
              {wizardStep === 4 && (
                <div className="space-y-3 text-xs">
                  {[
                    { id: 'PASSIVE', title: 'PASSIVE', desc: 'Inspects HTTP responses, cookies, and TLS without sending active injection probes.' },
                    { id: 'SAFE', title: 'SAFE (RECOMMENDED)', desc: 'Validates harmless marker reflections and CORS headers without destructive payloads.' },
                    { id: 'STANDARD', title: 'STANDARD', desc: 'Full spidering and baseline rule validation via local OWASP ZAP worker.' }
                  ].map((p) => (
                    <div
                      key={p.id}
                      onClick={() => setFormData({ ...formData, profile: p.id })}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        formData.profile === p.id
                          ? 'border-ink bg-[#8B5CF6]/10 shadow-[3px_3px_0px_#1E293B]'
                          : 'border-slate-200 bg-white hover:border-ink hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <strong className="text-ink text-xs font-heading font-extrabold">{p.title}</strong>
                        {formData.profile === p.id && (
                          <div className="w-5 h-5 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </div>
                      <p className="text-slate-600 text-[11px] font-medium">{p.desc}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Step 5: Review & Scan Progress Simulation */}
              {wizardStep === 5 && (
                <div className="space-y-5 text-xs">
                  {isScanning ? (
                    <div className="space-y-5 py-6 text-center">
                      <div className="w-14 h-14 rounded-full border-4 border-ink border-t-[#8B5CF6] animate-spin mx-auto" />
                      <div>
                        <h4 className="text-lg font-black text-ink font-heading">Controlled Assessment In Progress</h4>
                        <p className="text-xs text-[#8B5CF6] font-bold mt-1 font-heading">
                          {scanSteps[scanStepIndex]}
                        </p>
                      </div>

                      <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border-2 border-ink">
                        <div
                          className="bg-[#8B5CF6] h-full transition-all duration-300"
                          style={{ width: `${((scanStepIndex + 1) / scanSteps.length) * 100}%` }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="p-4 rounded-xl border-2 border-ink bg-slate-50 space-y-2 shadow-[2px_2px_0px_#1E293B]">
                        <div className="flex justify-between">
                          <span className="text-slate-500 font-bold">Target:</span>
                          <span className="font-extrabold text-ink font-heading">{formData.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500 font-bold">URL:</span>
                          <span className="font-mono text-[#8B5CF6] font-bold">{formData.base_url}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500 font-bold">Profile:</span>
                          <span className="stamp-badge bg-white text-ink text-[10px]">{formData.profile}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500 font-bold">Authorization Ref:</span>
                          <span className="font-mono text-ink font-bold">{formData.auth_reference_code}</span>
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-500 font-medium">
                        Scanning will commence immediately in an isolated worker queue. Results and evidence will populate the dashboard upon completion.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Wizard Action Buttons */}
              {!isScanning && (
                <div className="flex items-center justify-between pt-4 border-t-2 border-slate-200">
                  {wizardStep > 1 ? (
                    <button
                      onClick={() => setWizardStep(wizardStep - 1)}
                      className="btn-candy-secondary text-xs px-4 py-2"
                    >
                      Back
                    </button>
                  ) : (
                    <div />
                  )}

                  {wizardStep < 5 ? (
                    <button
                      disabled={wizardStep === 2 && !formData.is_confirmed}
                      onClick={() => setWizardStep(wizardStep + 1)}
                      className={`btn-candy text-xs px-6 py-2.5 ${
                        wizardStep === 2 && !formData.is_confirmed ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      Next Step →
                    </button>
                  ) : (
                    <button
                      onClick={handleStartScan}
                      className="btn-candy text-xs px-7 py-3 font-bold inline-flex items-center gap-2"
                    >
                      <Play className="w-4 h-4 fill-white" />
                      <span>Start Assessment</span>
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
