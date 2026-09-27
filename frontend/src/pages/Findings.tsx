import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Flame, ArrowUpRight, CheckCircle2, AlertCircle, ShieldAlert } from 'lucide-react';
import { api } from '../services/api';
import { Finding, Severity } from '../types';
import { SeverityBadge } from '../components/SeverityBadge';

export const Findings: React.FC = () => {
  const [findings, setFindings] = useState<Finding[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  useEffect(() => {
    loadFindings();
  }, [selectedSeverity, selectedStatus]);

  async function loadFindings() {
    setLoading(true);
    const params: any = {};
    if (selectedSeverity !== 'ALL') params.severity = selectedSeverity;
    if (selectedStatus !== 'ALL') params.status = selectedStatus;
    if (search) params.search = search;

    const data = await api.getFindings(params);
    setFindings(data);
    setLoading(false);
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadFindings();
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight font-heading">
            Security Findings & Evidence
          </h1>
          <p className="text-xs text-slate-500 font-semibold mt-1">
            Validated vulnerabilities, sanitized technical evidence, CVSS vectors, and threat intelligence.
          </p>
        </div>

        <span className="stamp-badge bg-white text-ink text-xs self-start sm:self-auto">
          {findings.length} Findings Cataloged
        </span>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 sticker-card bg-white flex flex-col md:flex-row gap-4 items-center justify-between">
        <form onSubmit={handleSearchSubmit} className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by title, component, or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border-2 border-ink rounded-full pl-9 pr-4 py-2 text-xs font-semibold text-ink placeholder-slate-400 focus:outline-none focus:bg-white shadow-[2px_2px_0px_#1E293B]"
          />
        </form>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {/* Severity Filter Pills */}
          {['ALL', 'Critical', 'High', 'Medium', 'Low'].map((sev) => (
            <button
              key={sev}
              onClick={() => setSelectedSeverity(sev)}
              className={`text-xs px-3.5 py-1.5 rounded-full border-2 border-ink font-heading font-black transition-all ${
                selectedSeverity === sev
                  ? 'bg-[#8B5CF6] text-white shadow-[3px_3px_0px_#1E293B] -translate-y-0.5'
                  : 'bg-white text-slate-700 hover:bg-slate-100 shadow-[2px_2px_0px_#1E293B]'
              }`}
            >
              {sev}
            </button>
          ))}

          <div className="w-[2px] h-6 bg-slate-200 mx-1 hidden sm:block" />

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-slate-50 border-2 border-ink rounded-full px-4 py-1.5 text-xs font-bold text-ink focus:outline-none focus:bg-white shadow-[2px_2px_0px_#1E293B]"
          >
            <option value="ALL">All Statuses</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
      </div>

      {/* Findings Table */}
      <div className="sticker-card overflow-hidden bg-white">
        {loading ? (
          <div className="p-14 text-center text-xs text-ink font-heading font-bold flex items-center justify-center gap-3">
            <div className="w-8 h-8 rounded-full border-4 border-ink border-t-[#8B5CF6] animate-spin" />
            Loading findings...
          </div>
        ) : findings.length === 0 ? (
          <div className="p-14 text-center text-xs text-slate-500 font-semibold">
            <AlertCircle className="w-10 h-10 text-slate-400 mx-auto mb-2" />
            No security findings matching the filter criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 border-b-2 border-ink text-slate-600 uppercase text-[10px] font-heading font-black">
                <tr>
                  <th className="py-3 px-5">Severity</th>
                  <th className="py-3 px-5">Finding & Component</th>
                  <th className="py-3 px-5">Category</th>
                  <th className="py-3 px-5">CVSS</th>
                  <th className="py-3 px-5">EPSS</th>
                  <th className="py-3 px-5">CISA KEV</th>
                  <th className="py-3 px-5">Remediation Status</th>
                  <th className="py-3 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-slate-100">
                {findings.map((f) => (
                  <tr key={f.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-5">
                      <SeverityBadge severity={f.severity} size="sm" />
                    </td>
                    <td className="py-4 px-5 max-w-md">
                      <Link
                        to={`/findings/${f.id}`}
                        className="font-extrabold text-ink hover:text-[#8B5CF6] transition-colors block text-sm font-heading"
                      >
                        {f.title}
                      </Link>
                      <span className="text-[11px] text-slate-500 font-medium truncate block mt-0.5">
                        {f.affected_component}
                      </span>
                    </td>
                    <td className="py-4 px-5 font-bold text-slate-600">
                      {f.category}
                    </td>
                    <td className="py-4 px-5 font-black text-ink font-heading text-sm">
                      {f.cvss_score.toFixed(1)}
                    </td>
                    <td className="py-4 px-5 font-bold text-[#8B5CF6]">
                      {(f.epss_score * 100).toFixed(1)}%
                    </td>
                    <td className="py-4 px-5 font-bold">
                      {f.cisa_kev ? (
                        <span className="stamp-badge bg-rose-500 text-white text-[10px] flex items-center gap-1 w-fit">
                          <Flame className="w-3 h-3 fill-white" />
                          ACTIVE
                        </span>
                      ) : (
                        <span className="text-slate-400 font-bold">—</span>
                      )}
                    </td>
                    <td className="py-4 px-5">
                      <span
                        className={`stamp-badge text-[10px] ${
                          f.remediation_status === 'Resolved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : f.remediation_status === 'In Progress'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {f.remediation_status}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-right">
                      <Link
                        to={`/findings/${f.id}`}
                        className="btn-candy-secondary text-[11px] px-3.5 py-1.5 inline-flex items-center gap-1.5"
                      >
                        <span>Analyze</span>
                        <ArrowUpRight className="w-3 h-3 text-[#8B5CF6]" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
