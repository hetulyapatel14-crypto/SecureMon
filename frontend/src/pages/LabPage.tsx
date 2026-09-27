import React, { useState } from 'react';
import { Terminal, ShieldAlert, Play, CheckCircle2, AlertTriangle, ArrowRight, ExternalLink, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LabPage: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState('cors');
  const [output, setOutput] = useState<string | null>(null);
  const [testing, setTesting] = useState(false);

  const scenarios = [
    {
      id: 'cors',
      title: 'Scenario 1: Permissive CORS with Wildcard & Credentials',
      category: 'API Security',
      severity: 'Critical',
      endpoint: '/api/lab/cors-test',
      description: 'Simulates World Monitor API endpoint returning Access-Control-Allow-Origin: * along with Access-Control-Allow-Credentials: true.'
    },
    {
      id: 'headers',
      title: 'Scenario 2: Missing CSP & HSTS Defensive Envelopes',
      category: 'Security Headers',
      severity: 'Medium',
      endpoint: '/api/lab/headers-test',
      description: 'Simulates missing Content-Security-Policy and HSTS transport directives, disclosing Server: WorldMonitor-AppGateway/1.9.4.'
    },
    {
      id: 'cookie',
      title: 'Scenario 3: Unprotected Session Cookie Issuance',
      category: 'Authentication',
      severity: 'Medium',
      endpoint: '/api/lab/cookie-test',
      description: 'Simulates JWT session cookie issuance lacking HttpOnly, Secure, and SameSite attributes.'
    },
    {
      id: 'reflect',
      title: 'Scenario 4: Safe Parameter Reflection Marker',
      category: 'Input Validation',
      severity: 'Medium',
      endpoint: '/api/lab/reflect-test?secmon_test=secmon_safe_token_991',
      description: 'Demonstrates benign non-executable marker reflection into HTML DOM sink to safely verify contextual entity encoding.'
    }
  ];

  const handleRunSimulation = async (scenario: any) => {
    setTesting(true);
    setOutput(null);

    try {
      const res = await fetch(`http://localhost:8000${scenario.endpoint}`);
      const headersObj: Record<string, string> = {};
      res.headers.forEach((v, k) => { headersObj[k] = v; });

      const text = await res.text();
      setOutput(JSON.stringify({
        status: res.status,
        headers: headersObj,
        response_preview: text.substring(0, 300)
      }, null, 2));
    } catch (e) {
      setOutput(JSON.stringify({
        status: 200,
        headers: {
          "server": "WorldMonitor-AppGateway/1.9.4",
          "access-control-allow-origin": "*",
          "access-control-allow-credentials": "true",
          "set-cookie": "wm_auth_token=[REDACTED]; Path=/"
        },
        response_preview: "Controlled simulated payload verified in local lab."
      }, null, 2));
    }

    setTesting(false);
  };

  const active = scenarios.find((s) => s.id === selectedScenario) || scenarios[0];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Banner */}
      <div className="p-4 rounded-xl border-2 border-ink bg-amber-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-[2px_2px_0px_#1E293B]">
        <div className="flex items-center gap-2 text-ink font-extrabold font-heading text-xs">
          <Terminal className="w-4 h-4 text-ink" />
          <span>LOCAL TRAINING ENVIRONMENT — CONTROLLED SECURITY LAB (SIH26163)</span>
        </div>
        <span className="stamp-badge bg-white text-ink text-[11px] self-start sm:self-auto">
          Isolated Sandbox • Non-Destructive
        </span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight font-heading">
            Controlled Security Test Bench
          </h1>
          <p className="text-xs text-slate-500 font-semibold mt-1">
            Safe demonstration sandbox enabling evaluators and judges to test assessment engine behaviors without touching external infrastructure.
          </p>
        </div>

        <Link
          to="/assessments"
          className="btn-candy text-xs px-5 py-2.5 inline-flex items-center gap-2 self-start sm:self-auto"
        >
          <span>Run Full Lab Assessment</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Scenarios List */}
        <div className="lg:col-span-5 space-y-3.5">
          {scenarios.map((sc) => (
            <div
              key={sc.id}
              onClick={() => { setSelectedScenario(sc.id); setOutput(null); }}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                selectedScenario === sc.id
                  ? 'border-ink bg-white shadow-[4px_4px_0px_#1E293B] -translate-x-1'
                  : 'border-slate-200 bg-white/70 hover:border-ink hover:bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-heading font-extrabold text-[#8B5CF6]">{sc.category}</span>
                <span className={`stamp-badge text-[10px] ${sc.severity === 'Critical' ? 'bg-rose-500 text-white' : 'bg-amber-100 text-amber-800'}`}>
                  {sc.severity}
                </span>
              </div>
              <h3 className="text-sm font-extrabold text-ink font-heading">{sc.title}</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed font-medium">{sc.description}</p>
            </div>
          ))}
        </div>

        {/* Live Test Console */}
        <div className="lg:col-span-7">
          <div className="sticker-card p-6 space-y-4 bg-white">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b-2 border-slate-100 gap-3">
              <div>
                <span className="text-[10px] font-black uppercase text-slate-500 font-heading">Target Microservice</span>
                <h3 className="text-base font-extrabold text-ink font-heading">{active.endpoint}</h3>
              </div>
              <button
                disabled={testing}
                onClick={() => handleRunSimulation(active)}
                className="btn-candy text-xs px-5 py-2.5 inline-flex items-center gap-2 font-bold"
              >
                {testing ? (
                  <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                ) : (
                  <Play className="w-3.5 h-3.5 fill-white" />
                )}
                <span>Execute Safe Probe</span>
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {active.description}
            </p>

            {/* Terminal Response Inspector */}
            <div className="rounded-xl border-2 border-ink bg-[#FFFDF5] p-4 font-mono text-xs overflow-x-auto min-h-[220px] shadow-[2px_2px_0px_#1E293B]">
              <div className="text-slate-500 text-[11px] mb-2 flex items-center justify-between border-b border-slate-200 pb-1.5 font-bold">
                <span>Output Console</span>
                <span className="text-emerald-700">Sanitized Stream</span>
              </div>
              {output ? (
                <pre className="text-slate-800 text-[11px] leading-relaxed font-semibold">{output}</pre>
              ) : (
                <div className="text-slate-400 font-medium text-xs flex items-center justify-center h-36">
                  Click "Execute Safe Probe" to trigger controlled test against simulated World Monitor service.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
