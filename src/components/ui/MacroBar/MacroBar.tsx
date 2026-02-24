import React from 'react';
import { motion } from 'framer-motion';

export interface MacroBarProps {
  name: string;
  value: number;     // grams consumed / calculated
  color: string;
  /** Provide for tracker mode: shows "{value}g / {target}g" */
  target?: number;
  /** Provide for calculator mode: shown as secondary label */
  kcal?: number;
  /** Explicit 0-100 percentage to render. If omitted, derived from value/target. */
  pct?: number;
  /** Animate the bar fill with framer-motion (default false) */
  animate?: boolean;
  /** Override the name label colour (defaults to .macro-name CSS colour) */
  nameColor?: string;
}

/**
 * Single-macro progress bar.
 * - Tracker mode (target provided): "{name}  {value}g / {target}g"
 * - Calculator mode (kcal + pct provided): "{name}  {value}g  {kcal} kcal  {pct}%"
 *
 * Relies on `.macro-row`, `.macro-label-row`, `.macro-name`, `.macro-val`,
 * `.macro-bar-track`, `.macro-bar-fill` CSS classes.
 */
const MacroBar: React.FC<MacroBarProps> = ({
  name, value, color, target, kcal, pct: pctProp, animate = false, nameColor,
}) => {
  const pct =
    pctProp !== undefined
      ? pctProp
      : target
      ? Math.min(100, Math.round((value / target) * 100))
      : 0;

  const barStyle = { background: color };

  return (
    <div className="macro-row">
      <div className="macro-label-row">
        <span className="macro-name" style={nameColor ? { color: nameColor } : undefined}>{name}</span>
        <span className="macro-val">
          {target !== undefined
            ? `${value}g / ${target}g`
            : kcal !== undefined
            ? (
              <>
                {value}g
                <span style={{ color: '#64748b', fontSize: '0.72rem', marginLeft: '0.4rem' }}>
                  {kcal} kcal
                </span>
                <span style={{ color: '#475569', fontSize: '0.72rem', marginLeft: '0.4rem' }}>
                  {pct}%
                </span>
              </>
            )
            : `${value}g`}
        </span>
      </div>
      <div className="macro-bar-track">
        {animate ? (
          <motion.div
            className="macro-bar-fill"
            style={barStyle}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        ) : (
          <div
            className="macro-bar-fill"
            style={{ ...barStyle, width: `${pct}%` }}
          />
        )}
      </div>
    </div>
  );
};

export default MacroBar;
