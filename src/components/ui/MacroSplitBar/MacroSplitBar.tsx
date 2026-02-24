import React from 'react';

export interface MacroSplitBarProps {
  /** Raw gram values — used as flex weights to compute proportions */
  protein: number;
  carbs: number;
  fat: number;
  /** Bar height in px (default 6) */
  height?: number;
  /** Show P / C / F legend below the bar (default true) */
  legend?: boolean;
}

/**
 * Three-segment horizontal bar showing relative macro proportions.
 * Accepts raw gram values; uses them as flex weights so no pre-calculation needed.
 * Used in meal cards and the macro calculator results panel.
 */
const MacroSplitBar: React.FC<MacroSplitBarProps> = ({
  protein, carbs, fat, height = 6, legend = true,
}) => (
  <div className="macro-split-wrap">
    <div
      className="macro-split-bar"
      style={{ height, borderRadius: Math.ceil(height / 2) }}
    >
      <div style={{ flex: protein, background: '#3b82f6', borderRadius: `${Math.ceil(height / 2)}px 0 0 ${Math.ceil(height / 2)}px` }} />
      <div style={{ flex: carbs,   background: '#f97316' }} />
      <div style={{ flex: fat,     background: '#a855f7', borderRadius: `0 ${Math.ceil(height / 2)}px ${Math.ceil(height / 2)}px 0` }} />
    </div>
    {legend && (
      <div className="macro-split-legend">
        {([
          { c: '#3b82f6', l: 'Protein' },
          { c: '#f97316', l: 'Carbs' },
          { c: '#a855f7', l: 'Fat' },
        ] as const).map(dot => (
          <span key={dot.l} className="macro-split-dot">
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: dot.c, display: 'inline-block', flexShrink: 0 }} />
            {dot.l}
          </span>
        ))}
      </div>
    )}
  </div>
);

export default MacroSplitBar;
