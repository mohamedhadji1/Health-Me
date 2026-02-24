import React from 'react';

export interface StatCardProps {
  label: string;
  value: string;
  unit?: string;
  sub?: string;
  color?: string;
  bg?: string;
  icon?: React.ReactNode;
  /** 0–1 progress fraction. Omit to hide the bar. */
  pct?: number;
}

/**
 * Dashboard stat card: icon + label header, large value, sub-label, optional progress bar.
 * Relies on `.stat-card`, `.stat-card-header`, `.stat-card-label`, `.stat-card-icon`,
 * `.stat-card-value`, `.stat-card-sub`, `.stat-progress-bar`, `.stat-progress-fill` CSS classes.
 */
const StatCard: React.FC<StatCardProps> = ({
  label, value, unit, sub, color, bg, icon, pct,
}) => (
  <div className="stat-card">
    <div className="stat-card-header">
      <span className="stat-card-label">{label}</span>
      {icon !== undefined && (
        <div className="stat-card-icon" style={bg ? { background: bg } : undefined}>
          {icon}
        </div>
      )}
    </div>
    <div className="stat-card-value" style={color ? { color } : undefined}>
      {value}
      {unit && (
        <span style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 500 }}>{unit}</span>
      )}
    </div>
    {sub && <div className="stat-card-sub">{sub}</div>}
    {pct !== undefined && (
      <div className="stat-progress-bar">
        <div
          className="stat-progress-fill"
          style={{ width: `${Math.min(100, Math.round(pct * 100))}%`, background: color }}
        />
      </div>
    )}
  </div>
);

export default StatCard;
