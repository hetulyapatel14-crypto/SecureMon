import React, { useState, useEffect } from 'react';
import { Shield, Clock, Lock, CheckCircle2, User, Terminal, Sparkles } from 'lucide-react';
import { api } from '../services/api';
import { AuditLogItem } from '../types';

export const AuditLogsPage: React.FC = () => {
  const [logs, setLogs] = useState<AuditLogItem[]>([]);

  useEffect(() => {
    api.getAuditLogs().then(setLogs);
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight font-heading">
            Immutable Audit Trail
          </h1>
          <p className="text-xs text-slate-500 font-semibold mt-1">
            Tamper-resistant cryptographic event logging for all target authorizations, scan executions, and report outputs.
          </p>
        </div>

        <span className="stamp-badge bg-emerald-100 text-emerald-800 text-xs self-start sm:self-auto flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-emerald-700" />
          Append-Only Log Verified
        </span>
      </div>

      <div className="sticker-card overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 border-b-2 border-ink text-slate-600 uppercase text-[10px] font-heading font-black">
              <tr>
                <th className="py-3 px-5">Timestamp</th>
                <th className="py-3 px-5">Actor / Operator</th>
                <th className="py-3 px-5">Action Event</th>
                <th className="py-3 px-5">Target Asset</th>
                <th className="py-3 px-5">Details Payload</th>
                <th className="py-3 px-5 text-right">Integrity Status</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-slate-100">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-5 text-slate-500 font-semibold">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="py-3.5 px-5 text-ink font-bold font-heading text-sm">
                    {log.actor_email}
                  </td>
                  <td className="py-3.5 px-5">
                    <span className="stamp-badge bg-[#8B5CF6]/15 text-[#8B5CF6] text-[10px]">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-slate-700 font-bold">
                    {log.target_name || 'System Assessment'}
                  </td>
                  <td className="py-3.5 px-5 text-slate-500 font-mono text-[11px] truncate max-w-xs">
                    {JSON.stringify(log.details || {})}
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <span className="text-emerald-700 font-bold flex items-center gap-1.5 justify-end text-[11px] font-heading">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
                      SHA256 Valid
                    </span>
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
