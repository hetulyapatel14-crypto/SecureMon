import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ShieldCheck, AlertTriangle, Activity, ArrowUpRight, Flame, Lock,
  FileText, CheckCircle2, RefreshCw, BarChart2, PlusCircle, Sparkles,
  Zap, Target, Shield
} from 'lucide-react';
import {
  ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip
} from 'recharts';
import { api } from '../services/api';
import { DashboardSummaryData, Finding } from '../types';
import { SeverityBadge } from '../components/SeverityBadge';

export const Dashboard: React.FC = () => {
  const [data, setData] = useState<DashboardSummaryData | null>(null);
  const [findings, setFindings] = useState<Finding[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [dash, finds] = await Promise.all([
        api.getDashboard(),
        api.getFindings()
      ]);
      setData(dash);
      setFindings(finds);
      setLoading(false);
    }
    load();
  }, []);

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-4 border-ink border-t-[#8B5CF6] animate-spin" />
          <span className="text-xs font-bold text-ink font-heading">Loading Security Telemetry...</span>
        </div>
      </div>
    );
  }

  // Format data for Recharts donut
  const pieData = Object.entries(data.risk_distribution).map(([name, value]) => ({
    name,
    value
  }));

  const pieColors: Record<string, string> = {
    Critical: '#EF4444',
    High: '#F97316',
    Medium: '#FBBF24',
    Low: '#38BDF8',
    Info: '#64748B'
  };

  return (
    <div className="space-y-7 max-w-7xl mx-auto">
      {/* Top Welcome & Target Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-ink font-heading tracking-tight">
              Good morning, Analyst
            </h1>
            <span className="stamp-badge bg-emerald-100 text-emerald-800 border-2 border-ink flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              SOC Environment Online
            </span>
          </div>
          <p className="text-xs font-semibold text-slate-500 mt-1">
            Current Target Assessment Posture:{' '}
            <strong className="text-ink font-heading">World Monitor Application (Authorized Test Suite)</strong>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/assessments" className="btn-candy text-xs px-5 py-2.5 inline-flex items-center gap-2">
            <PlusCircle className="w-4 h-4" />
            <span>Launch Assessment</span>
          </Link>
        </div>
      </div>

      {/* Top Row: Main Security Posture Score Card + Quick Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Posture Score Banner */}
        <div className="lg:col-span-5 sticker-card p-6 flex flex-col justify-between relative overflow-hidden bg-white">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 font-heading">
                Application Security Posture
              </span>
              <div className="flex items-baseline gap-2.5 mt-2">
                <span className="text-5xl font-black text-ink font-heading tracking-tight">
                  {data.security_posture_score}
                </span>
                <span className="text-base font-bold text-slate-400">/ 100</span>
                <span className="stamp-badge bg-emerald-200 text-emerald-900 ml-2">
                  Good Posture
                </span>
              </div>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-[#8B5CF6] border-2 border-ink flex items-center justify-center text-white shadow-[3px_3px_0px_#1E293B] -rotate-3">
              <ShieldCheck className="w-7 h-7" />
            </div>
          </div>

          <div className="mt-4 pt-4 border-t-2 border-slate-100 text-xs text-slate-600 leading-relaxed font-medium">
            <p>
              Calculated across 9 critical layers including transport security, CORS origin restrictions,
              and cookie attributes. 2 critical exposures require immediate engineering resolution.
            </p>
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-slate-500 pt-3 border-t-2 border-slate-100 font-semibold">
            <span>Audit Standard: OWASP ASVS</span>
            <Link to="/coverage" className="text-[#8B5CF6] hover:underline font-extrabold flex items-center gap-1 font-heading">
              View Matrix →
            </Link>
          </div>
        </div>

        {/* 6 Key Metric Cards */}
        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="sticker-card p-4 flex flex-col justify-between bg-white">
            <span className="text-xs font-bold text-slate-500">Total Assessments</span>
            <span className="text-3xl font-black text-ink font-heading mt-2">{data.total_assessments}</span>
            <span className="text-[10px] text-slate-400 font-bold mt-1">3 Authorized Targets</span>
          </div>

          <div className="sticker-card p-4 flex flex-col justify-between bg-white border-l-[6px] border-l-[#8B5CF6]">
            <span className="text-xs font-bold text-slate-500">Active Scans</span>
            <span className="text-3xl font-black text-[#8B5CF6] font-heading mt-2">{data.active_scans}</span>
            <span className="text-[10px] text-[#8B5CF6] font-bold mt-1 flex items-center gap-1 font-heading">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] animate-pulse" /> Running
            </span>
          </div>

          <div className="sticker-card p-4 flex flex-col justify-between bg-white">
            <span className="text-xs font-bold text-slate-500">Open Findings</span>
            <span className="text-3xl font-black text-ink font-heading mt-2">{data.open_findings}</span>
            <span className="text-[10px] text-slate-400 font-bold mt-1">Action items</span>
          </div>

          <div className="sticker-card p-4 flex flex-col justify-between bg-rose-50/70 border-l-[6px] border-l-rose-500">
            <span className="text-xs font-bold text-rose-700">Critical Findings</span>
            <span className="text-3xl font-black text-rose-900 font-heading mt-2">{data.critical_findings}</span>
            <span className="text-[10px] text-rose-600 font-bold mt-1">Immediate fix</span>
          </div>

          <div className="sticker-card p-4 flex flex-col justify-between bg-amber-50/70 border-l-[6px] border-l-amber-500">
            <span className="text-xs font-bold text-amber-700">High Findings</span>
            <span className="text-3xl font-black text-amber-900 font-heading mt-2">{data.high_findings}</span>
            <span className="text-[10px] text-amber-600 font-bold mt-1">Exploitable</span>
          </div>

          <div className="sticker-card p-4 flex flex-col justify-between bg-emerald-50/70 border-l-[6px] border-l-emerald-500">
            <span className="text-xs font-bold text-emerald-700">Resolved Findings</span>
            <span className="text-3xl font-black text-emerald-900 font-heading mt-2">{data.resolved_findings}</span>
            <span className="text-[10px] text-emerald-600 font-bold mt-1">Verified fixes</span>
          </div>
        </div>
      </div>

      {/* Second Row: Visual Charts (Donut + Trend) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Risk Distribution Donut */}
        <div className="md:col-span-4 sticker-card p-5 flex flex-col justify-between bg-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-base font-extrabold text-ink font-heading">Risk Distribution</h3>
            <span className="stamp-badge bg-slate-100 text-slate-700 text-[10px]">By Severity</span>
          </div>
          <div className="h-48 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[entry.name] || '#64748B'} stroke="#1E293B" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#1E293B', borderWidth: '2px', borderRadius: '12px', fontSize: '11px', boxShadow: '3px 3px 0px #1E293B' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-xs pt-3 border-t-2 border-slate-100">
            {pieData.slice(0, 3).map((item) => (
              <div key={item.name} className="flex flex-col">
                <span className="text-[10px] text-slate-500 font-bold">{item.name}</span>
                <span className="font-extrabold text-ink font-heading text-sm">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Findings Over Time Trend Line Chart */}
        <div className="md:col-span-8 sticker-card p-5 flex flex-col justify-between bg-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-extrabold text-ink font-heading">Findings Over Time</h3>
              <span className="text-xs text-slate-500 font-medium">7-Day Security Posture Trajectory</span>
            </div>
            <div className="flex items-center gap-3 text-xs font-bold">
              <span className="flex items-center gap-1.5 text-rose-600">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 border border-ink" /> Critical
              </span>
              <span className="flex items-center gap-1.5 text-amber-600">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 border border-ink" /> High
              </span>
            </div>
          </div>
          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.findings_trend}>
                <XAxis dataKey="date" stroke="#1E293B" fontSize={11} tickLine={false} />
                <YAxis stroke="#1E293B" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#1E293B', borderWidth: '2px', borderRadius: '12px', fontSize: '11px', boxShadow: '3px 3px 0px #1E293B' }} />
                <Line type="monotone" dataKey="critical" stroke="#EF4444" strokeWidth={3} dot={{ r: 4, stroke: '#1E293B', strokeWidth: 2, fill: '#EF4444' }} />
                <Line type="monotone" dataKey="high" stroke="#F97316" strokeWidth={3} dot={{ r: 4, stroke: '#1E293B', strokeWidth: 2, fill: '#F97316' }} />
                <Line type="monotone" dataKey="medium" stroke="#FBBF24" strokeWidth={2} dot={false} strokeDasharray="4 4" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Third Row: Recent Findings Table */}
      <div className="sticker-card overflow-hidden bg-white">
        <div className="p-5 border-b-2 border-ink flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="text-lg font-extrabold text-ink font-heading">Top Security Findings</h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Enriched with CVSS v3.1, FIRST EPSS, and CISA KEV</p>
          </div>
          <Link to="/findings" className="stamp-badge bg-white text-[#8B5CF6] hover:bg-[#8B5CF6] hover:text-white transition-colors flex items-center gap-1 font-heading text-xs">
            <span>View All ({findings.length})</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 border-b-2 border-ink text-slate-600 uppercase text-[10px] font-heading font-black">
              <tr>
                <th className="py-3 px-5">Severity</th>
                <th className="py-3 px-5">Finding</th>
                <th className="py-3 px-5">Category</th>
                <th className="py-3 px-5">CVSS</th>
                <th className="py-3 px-5">EPSS</th>
                <th className="py-3 px-5">KEV</th>
                <th className="py-3 px-5">Status</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-slate-100">
              {findings.slice(0, 5).map((f) => (
                <tr key={f.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-5">
                    <SeverityBadge severity={f.severity} size="sm" />
                  </td>
                  <td className="py-3.5 px-5">
                    <Link to={`/findings/${f.id}`} className="font-extrabold text-ink hover:text-[#8B5CF6] transition-colors block font-heading text-sm">
                      {f.title}
                    </Link>
                    <span className="text-[11px] text-slate-500 font-medium truncate block max-w-md">
                      {f.affected_component}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 font-bold text-slate-600">
                    {f.category}
                  </td>
                  <td className="py-3.5 px-5 font-black text-ink font-heading">
                    {f.cvss_score.toFixed(1)}
                  </td>
                  <td className="py-3.5 px-5 font-bold text-[#8B5CF6]">
                    {(f.epss_score * 100).toFixed(1)}%
                  </td>
                  <td className="py-3.5 px-5">
                    {f.cisa_kev ? (
                      <span className="stamp-badge bg-rose-500 text-white text-[10px] flex items-center gap-1 w-fit">
                        <Flame className="w-3 h-3 fill-white" />
                        ACTIVE
                      </span>
                    ) : (
                      <span className="text-slate-400 font-bold">-</span>
                    )}
                  </td>
                  <td className="py-3.5 px-5">
                    <span className="stamp-badge bg-slate-100 text-slate-700 text-[10px]">
                      {f.remediation_status}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <Link
                      to={`/findings/${f.id}`}
                      className="text-xs text-[#8B5CF6] hover:underline font-extrabold font-heading"
                    >
                      Inspect →
                    </Link>
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
