import React from 'react';
import { Network, ShieldCheck, Lock, ExternalLink, ArrowUpRight, Sparkles } from 'lucide-react';

export const ApiInventory: React.FC = () => {
  const endpoints = [
    { method: 'GET', path: '/api/v1/telemetry/nodes', auth: true, params: ['region', 'limit'], risk: 'High', status: 200, lastSeen: '10m ago' },
    { method: 'POST', path: '/api/v1/auth/login', auth: false, params: ['username', 'password'], risk: 'Medium', status: 200, lastSeen: '4m ago' },
    { method: 'GET', path: '/api/v1/reports/summary', auth: true, params: ['date_range'], risk: 'Low', status: 200, lastSeen: '25m ago' },
    { method: 'POST', path: '/api/v1/telemetry/stream', auth: true, params: ['channel_id'], risk: 'High', status: 200, lastSeen: '2m ago' },
    { method: 'GET', path: '/api/v1/health', auth: false, params: [], risk: 'Low', status: 200, lastSeen: '1m ago' },
    { method: 'DELETE', path: '/api/v1/cache/purge', auth: true, params: ['zone'], risk: 'Medium', status: 403, lastSeen: '1h ago' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight font-heading">
            Discovered API Inventory
          </h1>
          <p className="text-xs text-slate-500 font-semibold mt-1">
            Authorized attack surface discovery mapping routes, authentication requirements, and exposure risk.
          </p>
        </div>

        <span className="stamp-badge bg-white text-ink text-xs self-start sm:self-auto">
          {endpoints.length} Endpoints Mapped
        </span>
      </div>

      <div className="sticker-card overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 border-b-2 border-ink text-slate-600 uppercase text-[10px] font-heading font-black">
              <tr>
                <th className="py-3 px-5">Method</th>
                <th className="py-3 px-5">API Route</th>
                <th className="py-3 px-5">Authentication</th>
                <th className="py-3 px-5">Parameters</th>
                <th className="py-3 px-5">Risk Rating</th>
                <th className="py-3 px-5">Status</th>
                <th className="py-3 px-5 text-right">Last Seen</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-slate-100">
              {endpoints.map((ep, i) => (
                <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-5">
                    <span
                      className={`stamp-badge text-[10px] ${
                        ep.method === 'GET'
                          ? 'bg-sky-100 text-sky-800'
                          : ep.method === 'POST'
                          ? 'bg-emerald-100 text-emerald-800'
                          : ep.method === 'DELETE'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {ep.method}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-ink font-extrabold font-heading text-sm">
                    {ep.path}
                  </td>
                  <td className="py-3.5 px-5">
                    {ep.auth ? (
                      <span className="text-emerald-700 flex items-center gap-1 text-[11px] font-bold">
                        <Lock className="w-3 h-3 text-emerald-600" />
                        Bearer JWT
                      </span>
                    ) : (
                      <span className="text-amber-700 text-[11px] font-bold">Public / Unauthenticated</span>
                    )}
                  </td>
                  <td className="py-3.5 px-5 text-slate-500 font-semibold font-mono">
                    {ep.params.length > 0 ? ep.params.join(', ') : 'none'}
                  </td>
                  <td className="py-3.5 px-5">
                    <span
                      className={`stamp-badge text-[10px] ${
                        ep.risk === 'High'
                          ? 'bg-rose-500 text-white'
                          : ep.risk === 'Medium'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-sky-100 text-sky-800'
                      }`}
                    >
                      {ep.risk}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 font-bold text-slate-700">
                    {ep.status}
                  </td>
                  <td className="py-3.5 px-5 text-right text-slate-400 font-semibold">
                    {ep.lastSeen}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
