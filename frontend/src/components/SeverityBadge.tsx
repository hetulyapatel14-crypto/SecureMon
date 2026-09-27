import React from 'react';
import { Severity } from '../types';

interface SeverityBadgeProps {
  severity: Severity | string;
  size?: 'sm' | 'md' | 'lg';
}

export const SeverityBadge: React.FC<SeverityBadgeProps> = ({ severity, size = 'md' }) => {
  const sev = severity.toLowerCase();

  const styles = {
    critical: 'bg-red-100 text-red-700 border-[#1E293B]',
    high: 'bg-amber-100 text-amber-800 border-[#1E293B]',
    medium: 'bg-yellow-100 text-yellow-800 border-[#1E293B]',
    low: 'bg-emerald-100 text-emerald-800 border-[#1E293B]',
    info: 'bg-slate-100 text-slate-700 border-[#1E293B]',
  }[sev] || 'bg-slate-100 text-slate-700 border-[#1E293B]';

  const dotColors = {
    critical: 'bg-red-500 animate-pulse',
    high: 'bg-amber-500',
    medium: 'bg-yellow-500',
    low: 'bg-emerald-500',
    info: 'bg-slate-400',
  }[sev] || 'bg-slate-400';

  const sizeClasses = {
    sm: 'text-[11px] px-2.5 py-0.5',
    md: 'text-xs px-3 py-1',
    lg: 'text-sm px-4 py-1.5'
  }[size];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border-2 font-mono font-bold uppercase tracking-wider shadow-[2px_2px_0px_#1E293B] ${styles} ${sizeClasses}`}
    >
      <span className={`w-2 h-2 rounded-full border border-[#1E293B] ${dotColors}`} />
      {severity}
    </span>
  );
};
