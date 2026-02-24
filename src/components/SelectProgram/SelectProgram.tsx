import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { PROGRAMS } from '../../utils/programsData';
import './SelectProgram.css';

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const SelectProgram: React.FC = () => {
  const { user, refreshUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isNewSignup = new URLSearchParams(location.search).get('new') === '1';
  const [selected, setSelected] = React.useState<string>(user?.goal ?? '');
  const [confirming, setConfirming] = React.useState(false);

  const handleConfirm = async () => {
    if (!selected || !user) return;
    setConfirming(true);
    await new Promise(r => setTimeout(r, 600));
    refreshUser({ ...user, goal: selected });
    navigate('/dashboard');
  };

  const chosenProgram = PROGRAMS.find(p => p.key === selected);

  return (
    <div className="sp-page">
      {/* Background glow */}
      <div className="sp-bg-glow" style={{ background: chosenProgram?.gradient ?? 'linear-gradient(135deg,#22c55e,#16a34a)' }} />

      <motion.div
        className="sp-inner"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header */}
        <div className="sp-header">
          <div className="sp-logo">
            <span className="sp-logo-icon">💪</span>
            <span className="sp-logo-text">Health<span>Me</span></span>
          </div>

          {/* Step indicator — only shown for new signups */}
          {isNewSignup && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#1e3a2a', border: '2px solid #22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: '#22c55e' }}>✓</div>
              <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#64748b' }}>Account Created</span>
            </div>
            <div style={{ width: 28, height: 2, background: '#22c55e', borderRadius: 99 }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'linear-gradient(135deg,#22c55e,#16a34a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 800, color: '#fff' }}>2</div>
              <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#22c55e' }}>Choose Program</span>
            </div>
          </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="sp-title">
              {isNewSignup ? 'Choose Your Nutrition Program' : 'Switch Nutrition Program'}
            </h1>
            <p className="sp-subtitle">
              {isNewSignup
                ? <>Hey {user?.username?.split(' ')[0] ?? 'there'} 👋 — pick the plan that matches your goal.<br />You can always switch it later from the dashboard.</>
                : <>Welcome back, {user?.username?.split(' ')[0] ?? 'there'} 👋 — select a new program or continue with your current one.</>}
            </p>
          </motion.div>
        </div>

        {/* Program cards */}
        <motion.div
          className="sp-grid"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {PROGRAMS.map(prog => {
            const isSelected = selected === prog.key;
            return (
              <motion.div
                key={prog.key}
                variants={cardVariants}
                className={`sp-card${isSelected ? ' selected' : ''}${prog.badge ? ' has-badge' : ''}`}
                style={{ '--prog-color': prog.color, '--prog-gradient': prog.gradient } as React.CSSProperties}
                onClick={() => setSelected(prog.key)}
              >
                {/* Badge */}
                {prog.badge && (
                  <div className="sp-card-badge">{prog.badge}</div>
                )}

                {/* Selection ring */}
                <div className="sp-card-check">
                  {isSelected && <span>✓</span>}
                </div>

                {/* Top */}
                <div className="sp-card-top">
                  <div className="sp-card-emoji">{prog.emoji}</div>
                  <div>
                    <div className="sp-card-name">{prog.name}</div>
                    <div className="sp-card-tagline">{prog.tagline}</div>
                  </div>
                </div>

                {/* Macro pills */}
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

                {/* Features */}
                <ul className="sp-features">
                  {prog.features.map((f, i) => (
                    <li key={i}><span className="sp-feat-dot" />  {f}</li>
                  ))}
                </ul>

                {/* Bottom gradient strip */}
                <div className="sp-card-strip" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Sticky confirm bar */}
        <motion.div
          className="sp-confirm-bar"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: selected ? 1 : 0.4, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {chosenProgram && (
            <div className="sp-confirm-info">
              <span className="sp-confirm-emoji">{chosenProgram.emoji}</span>
              <div>
                <div className="sp-confirm-name">{chosenProgram.name}</div>
                <div className="sp-confirm-macro">
                  {chosenProgram.calories} kcal · {chosenProgram.protein}g protein
                </div>
              </div>
            </div>
          )}
          {!chosenProgram && (
            <div className="sp-confirm-placeholder">← Select a program to continue</div>
          )}
          <button
            className="sp-confirm-btn"
            disabled={!selected || confirming}
            onClick={handleConfirm}
            style={{ background: chosenProgram?.gradient ?? 'linear-gradient(135deg,#22c55e,#16a34a)' }}
          >
            {confirming ? (
              <span className="sp-spinner" />
            ) : (
            <>
              {isNewSignup ? 'Start My Program' : 'Update Program'} <span>→</span>
            </>
            )}
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SelectProgram;
