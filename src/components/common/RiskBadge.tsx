import React from 'react';
import { RiskLevel } from '../../types';
import { AlertCircle, AlertTriangle, CheckCircle2, ShieldAlert, HelpCircle } from 'lucide-react';

interface RiskBadgeProps {
  level: RiskLevel;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ level, size = 'md', showIcon = true }) => {
  const config = {
    low: {
      label: 'Low Risk',
      colorText: 'text-emerald-800',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-300',
      icon: CheckCircle2,
    },
    moderate: {
      label: 'Moderate Risk',
      colorText: 'text-amber-800',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-300',
      icon: AlertTriangle,
    },
    high: {
      label: 'High Risk',
      colorText: 'text-orange-800',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-300',
      icon: AlertCircle,
    },
    critical: {
      label: 'Critical Risk',
      colorText: 'text-rose-800',
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-300',
      icon: ShieldAlert,
    },
    unavailable: {
      label: 'Data Unavailable',
      colorText: 'text-slate-600',
      bgColor: 'bg-slate-100',
      borderColor: 'border-slate-300',
      icon: HelpCircle,
    }
  }[level] || {
    label: 'Unavailable',
    colorText: 'text-slate-600',
    bgColor: 'bg-slate-100',
    borderColor: 'border-slate-300',
    icon: HelpCircle,
  };

  const Icon = config.icon;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-sm px-2.5 py-1 gap-1.5',
    lg: 'text-base px-3.5 py-1.5 gap-2 font-bold',
  }[size];

  return (
    <span
      className={`inline-flex items-center font-semibold rounded border ${config.bgColor} ${config.colorText} ${config.borderColor} ${sizeClasses}`}
    >
      {showIcon && <Icon className={size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />}
      <span>{config.label}</span>
    </span>
  );
};
