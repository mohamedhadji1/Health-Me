import React from 'react';
import { motion } from 'framer-motion';
import { PROGRAMS } from '../../../utils/programsData';
import { MacroResults } from '../hooks/useSignupWizard';
import '../../SelectProgram/SelectProgram.css';

/* ── Map macro goal to suggested program key ─────────────── */
const GOAL_TO_PROGRAM: Record<string, string> = {
  cut:      'weight_loss',
  bulk:     'muscle_gain',
  maintain: 'general',
};

const containerVariants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.07 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
};

interface Props {
  macroResults: MacroResults | null;
  onConfirm: (programKey: string) => void;
  onBack: () => void;
  username?: string;
}

const StepPlan: React.FC<Props> = ({ macroResults, onConfirm, onBack, username }) => {
  /* Pre-select the plan that best matches the macro goal */
  const suggested = macroResults ? GOAL_TO_PROGRAM[macroResults.goal] ?? '' : '';
  const [selected, setSelected] = React.useState<string>(suggested);
  const [confirming, setConfirming] = React.useState(false);

  const chosenProgram = PROGRAMS.find(p => p.key === selected);

  const handleConfirm = async () => {
    if (!selected) return;
    setConfirming(true);
    await new Promise(r => setTimeout(r, 500));
    onConfirm(selected);
  };

  return (
    <motion.div
      key="step-plan"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.35 }}
      className="sp-step-root"
    >
      {/* Intro banner */}
      <div className="sp-step-intro">
        <span style={{ fontSize: '1rem', flexShrink: 0, marginTop: 1 }}>
          {macroResults ? '🎯' : '💡'}
        </span>
        <span>
          {username ? <><strong style={{ color: '#e2e8f0' }}>{username.split(' ')[0]}</strong> — </> : null}
          {macroResults
            ? <>Your daily target is <strong style={{ color: '#22c55e' }}>{macroResults.target} kcal</strong>. We've highlighted the best matching plan — feel free to choose any.</>
            : <>Pick the nutrition plan that matches your fitness goal. You can always switch it later from the dashboard.</>
          }
        </span>
      </div>

      {/* Program cards grid */}
      <motion.div
        className="sp-grid sp-step-grid"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {PROGRAMS.map(prog => {
          const isSelected  = selected === prog.key;
          const isSuggested = prog.key === suggested && !!suggested;

          return (
            <motion.div
              key={prog.key}
              variants={cardVariants}
              className={`sp-card${isSelected ? ' selected' : ''}${(isSuggested || prog.badge) ? ' has-badge' : ''}`}
              style={{ '--prog-color': prog.color, '--prog-gradient': prog.gradient } as React.CSSProperties}
              onClick={() => setSelected(prog.key)}
            >
              {/* Badge — recommended (from macros) takes priority over default badge */}
              {(isSuggested || prog.badge) && (
                <div
                  className="sp-card-badge"
                  style={isSuggested ? { background: 'linear-gradient(135deg,#22c55e,#16a34a)' } : undefined}
                >
                  {isSuggested ? '★ Recommended' : prog.badge}
                </div>
              )}

              {/* Selection checkmark */}
              <div className="sp-card-check">{isSelected && <span>✓</span>}</div>

              <div className="sp-card-top">
                <div className="sp-card-emoji">{prog.emoji}</div>
                <div>
                  <div className="sp-card-name">{prog.name}</div>
                  <div className="sp-card-tagline">{prog.tagline}</div>
                </div>
              </div>

              <div className="sp-macro-row">
                <div className="sp-macro-pill">
                  <span className="sp-macro-val">{prog.calories}</span>
                  <span className="sp-macro-lbl">kcal</span>
                </div>
                <div className="sp-macro-pill">
                  <span className="sp-macro-val">{prog.protein}g</span>
                  <span className="sp-macro-lbl">protein</span>
                </div>
              </div>

              <ul className="sp-features">
                {prog.features.map((f, i) => (
                  <li key={i}><span className="sp-feat-dot" /> {f}</li>
                ))}
              </ul>

              <div className="sp-card-strip" />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Confirm bar */}
      <motion.div
        className="sp-step-confirm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: selected ? 1 : 0.5, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <button type="button" className="sm-back-btn sp-step-back" onClick={onBack}>← Back</button>

        {chosenProgram && (
          <div className="sp-confirm-info sp-step-info">
            <span className="sp-confirm-emoji">{chosenProgram.emoji}</span>
            <div>
              <div className="sp-confirm-name">{chosenProgram.name}</div>
              <div className="sp-confirm-macro">{chosenProgram.calories} kcal · {chosenProgram.protein}g protein</div>
            </div>
          </div>
        )}
        {!chosenProgram && (
          <div className="sp-confirm-placeholder sp-step-placeholder">← Select a program to continue</div>
        )}

        <button
          type="button"
          className="sp-confirm-btn"
          disabled={!selected || confirming}
          onClick={handleConfirm}
          style={{ background: chosenProgram?.gradient ?? 'linear-gradient(135deg,#22c55e,#16a34a)' }}
        >
          {confirming ? <span className="sp-spinner" /> : <>Start My Program →</>}
        </button>
      </motion.div>
    </motion.div>
  );
};

export default StepPlan;
