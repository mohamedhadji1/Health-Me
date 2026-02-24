import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MacroBar from '../../ui/MacroBar';
import MacroSplitBar from '../../ui/MacroSplitBar';
import ToggleGroup from '../../ui/ToggleGroup';
import '../../Dashboard/Dashboard.css';
import { MacroResults } from '../hooks/useSignupWizard';

/* ── Types ─────────────────────────────────────────────────── */
type Gender     = 'male' | 'female';
type Activity   = 'sedentary' | 'light' | 'moderate' | 'active' | 'extreme';
type GoalCalc   = 'cut' | 'maintain' | 'bulk';
type WeightUnit = 'kg' | 'lbs';
type HeightUnit = 'cm' | 'ft';

const ACTIVITY_LABELS: Record<Activity, string> = {
  sedentary: 'Sedentary',
  light:     'Lightly active',
  moderate:  'Moderately active',
  active:    'Very active',
  extreme:   'Athlete',
};
const ACTIVITY_DESC: Record<Activity, string> = {
  sedentary: 'Desk job, little to no exercise',
  light:     '1–3 workouts per week',
  moderate:  '3–5 workouts per week',
  active:    '6–7 workouts per week',
  extreme:   'Physical job + daily training',
};
const ACTIVITY_MULTIPLIER: Record<Activity, number> = {
  sedentary: 1.2,
  light:     1.375,
  moderate:  1.55,
  active:    1.725,
  extreme:   1.9,
};
const GOAL_LABELS: Record<GoalCalc, string>  = { cut: 'Cut', maintain: 'Maintain', bulk: 'Bulk' };
const GOAL_DESC:   Record<GoalCalc, string>  = { cut: '−500 kcal/day', maintain: 'Break even', bulk: '+300 kcal/day' };
const GOAL_ADJUST: Record<GoalCalc, number>  = { cut: -500, maintain: 0, bulk: 300 };
const GOAL_MACRO_SPLIT: Record<GoalCalc, [number, number, number]> = {
  cut:      [0.40, 0.30, 0.30],
  maintain: [0.30, 0.45, 0.25],
  bulk:     [0.30, 0.50, 0.20],
};

/* ── Props ─────────────────────────────────────────────────── */
interface Props {
  onContinue: (results: MacroResults | null) => void;
  onBack: () => void;
}

/* ── Component ─────────────────────────────────────────────── */
const StepMacros: React.FC<Props> = ({ onContinue, onBack }) => {
  const [gender,     setGender]     = React.useState<Gender>('male');
  const [age,        setAge]        = React.useState('');
  const [weightUnit, setWeightUnit] = React.useState<WeightUnit>('kg');
  const [weight,     setWeight]     = React.useState('');
  const [heightUnit, setHeightUnit] = React.useState<HeightUnit>('cm');
  const [heightCm,   setHeightCm]   = React.useState('');
  const [heightFt,   setHeightFt]   = React.useState('');
  const [heightIn,   setHeightIn]   = React.useState('');
  const [activity,   setActivity]   = React.useState<Activity>('moderate');
  const [goal,       setGoal]       = React.useState<GoalCalc>('maintain');
  const [results,    setResults]    = React.useState<MacroResults | null>(null);
  const [calcError,  setCalcError]  = React.useState('');

  const reset = () => { setResults(null); setCalcError(''); };

  const calculate = () => {
    setCalcError('');
    const ageNum = parseFloat(age);
    const wKg = weightUnit === 'kg' ? parseFloat(weight) : parseFloat(weight) / 2.20462;
    let hCm: number;
    if (heightUnit === 'cm') {
      hCm = parseFloat(heightCm);
    } else {
      hCm = ((parseFloat(heightFt) || 0) * 12 + (parseFloat(heightIn) || 0)) * 2.54;
    }
    if (isNaN(ageNum) || ageNum <= 0 || ageNum > 120) { setCalcError('Enter a valid age (1–120).'); return; }
    if (isNaN(wKg)   || wKg  <= 0)                    { setCalcError('Enter a valid weight.'); return; }
    if (isNaN(hCm)   || hCm  <= 0)                    { setCalcError('Enter a valid height.'); return; }

    const bmr = gender === 'male'
      ? 10 * wKg + 6.25 * hCm - 5 * ageNum + 5
      : 10 * wKg + 6.25 * hCm - 5 * ageNum - 161;

    const tdee   = Math.round(bmr * ACTIVITY_MULTIPLIER[activity]);
    const target = Math.max(1200, tdee + GOAL_ADJUST[goal]);
    const [pp, cp, fp] = GOAL_MACRO_SPLIT[goal];

    setResults({
      bmr:     Math.round(bmr),
      tdee,
      target,
      protein: Math.round((target * pp) / 4),
      carbs:   Math.round((target * cp) / 4),
      fat:     Math.round((target * fp) / 9),
      goal,
    });
  };

  const proteinKcal = results ? results.protein * 4 : 0;
  const carbsKcal   = results ? results.carbs   * 4 : 0;
  const fatKcal     = results ? results.fat      * 9 : 0;
  const totalKcal   = proteinKcal + carbsKcal + fatKcal;
  const proteinPct  = totalKcal ? Math.round((proteinKcal / totalKcal) * 100) : 0;
  const carbsPct    = totalKcal ? Math.round((carbsKcal   / totalKcal) * 100) : 0;
  const fatPct      = totalKcal ? 100 - proteinPct - carbsPct : 0;

  return (
    <motion.div
      key="step-macros"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.35 }}
      className="sm-root"
    >
      <div className="sm-layout">
        {/* ── Left column: inputs ── */}
        <div className="mc-inputs sm-inputs">

          {/* Gender */}
          <div className="mc-field-group">
            <label className="mc-label">Gender</label>
            <ToggleGroup
              options={[{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }]}
              value={gender}
              onChange={v => { setGender(v as Gender); reset(); }}
            />
          </div>

          {/* Age */}
          <div className="mc-field-group">
            <label className="mc-label">Age</label>
            <div className="mc-input-row">
              <input className="mc-input" type="number" min={10} max={100} placeholder="e.g. 28"
                value={age} onChange={e => { setAge(e.target.value); reset(); }} />
              <span className="mc-unit">years</span>
            </div>
          </div>

          {/* Weight */}
          <div className="mc-field-group">
            <label className="mc-label">
              Weight
              <ToggleGroup
                options={[{ value: 'kg', label: 'kg' }, { value: 'lbs', label: 'lbs' }]}
                value={weightUnit}
                onChange={v => { setWeightUnit(v as WeightUnit); setWeight(''); reset(); }}
                className="mc-unit-toggle"
                btnClassName="mc-ut-btn"
              />
            </label>
            <div className="mc-input-row">
              <input className="mc-input" type="number" min={1}
                placeholder={weightUnit === 'kg' ? 'e.g. 80' : 'e.g. 176'}
                value={weight} onChange={e => { setWeight(e.target.value); reset(); }} />
              <span className="mc-unit">{weightUnit}</span>
            </div>
          </div>

          {/* Height */}
          <div className="mc-field-group">
            <label className="mc-label">
              Height
              <ToggleGroup
                options={[{ value: 'cm', label: 'cm' }, { value: 'ft', label: 'ft' }]}
                value={heightUnit}
                onChange={v => { setHeightUnit(v as HeightUnit); setHeightCm(''); setHeightFt(''); setHeightIn(''); reset(); }}
                className="mc-unit-toggle"
                btnClassName="mc-ut-btn"
              />
            </label>
            {heightUnit === 'cm' ? (
              <div className="mc-input-row">
                <input className="mc-input" type="number" min={1} placeholder="e.g. 178"
                  value={heightCm} onChange={e => { setHeightCm(e.target.value); reset(); }} />
                <span className="mc-unit">cm</span>
              </div>
            ) : (
              <div className="mc-input-row" style={{ gap: '0.5rem' }}>
                <input className="mc-input" type="number" min={1} max={8} placeholder="ft"
                  value={heightFt} style={{ flex: 1 }} onChange={e => { setHeightFt(e.target.value); reset(); }} />
                <input className="mc-input" type="number" min={0} max={11} placeholder="in"
                  value={heightIn} style={{ flex: 1 }} onChange={e => { setHeightIn(e.target.value); reset(); }} />
              </div>
            )}
          </div>

          {/* Activity */}
          <div className="mc-field-group">
            <label className="mc-label">Activity Level</label>
            <div className="mc-activity-list">
              {(Object.keys(ACTIVITY_LABELS) as Activity[]).map(a => (
                <button key={a} type="button"
                  className={`mc-activity-btn${activity === a ? ' active' : ''}`}
                  onClick={() => { setActivity(a); reset(); }}>
                  <span className="mc-act-label">{ACTIVITY_LABELS[a]}</span>
                  <span className="mc-act-desc">{ACTIVITY_DESC[a]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Goal */}
          <div className="mc-field-group">
            <label className="mc-label">Goal</label>
            <div className="mc-goal-row">
              {(Object.keys(GOAL_LABELS) as GoalCalc[]).map(g => (
                <button key={g} type="button"
                  className={`mc-goal-btn${goal === g ? ' active' : ''}`}
                  onClick={() => { setGoal(g); reset(); }}>
                  <span className="mc-goal-name">{GOAL_LABELS[g]}</span>
                  <span className="mc-goal-adj">{GOAL_DESC[g]}</span>
                </button>
              ))}
            </div>
          </div>

          {calcError && <p className="mc-error">{calcError}</p>}
          <button type="button" className="mc-calc-btn" onClick={calculate}>Calculate</button>
        </div>

        {/* ── Right column: results ── */}
        <div className="mc-results-panel sm-results">
          <AnimatePresence mode="wait">
            {!results ? (
              <motion.div key="empty" className="mc-empty"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="mc-empty-icon">⊞</div>
                <div className="mc-empty-title">Fill in your details</div>
                <div className="mc-empty-sub">Your macro targets will appear here.</div>
              </motion.div>
            ) : (
              <motion.div key="results"
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                <div className="mc-tdee-row">
                  <div className="mc-tdee-box">
                    <div className="mc-tdee-val">{results.bmr}</div>
                    <div className="mc-tdee-lbl">BMR</div>
                  </div>
                  <div className="mc-tdee-arrow">→</div>
                  <div className="mc-tdee-box">
                    <div className="mc-tdee-val">{results.tdee}</div>
                    <div className="mc-tdee-lbl">TDEE</div>
                  </div>
                  <div className="mc-tdee-arrow">→</div>
                  <div className="mc-tdee-box mc-tdee-target">
                    <div className="mc-tdee-val">{results.target}</div>
                    <div className="mc-tdee-lbl">Target ({GOAL_LABELS[goal]})</div>
                  </div>
                </div>

                <div className="mc-macro-bars">
                  <div className="mc-macro-heading">Daily Macro Targets</div>
                  <MacroBar name="Protein"       value={results.protein} color="#3b82f6" kcal={proteinKcal} pct={proteinPct} animate nameColor="#3b82f6" />
                  <MacroBar name="Carbohydrates" value={results.carbs}   color="#f97316" kcal={carbsKcal}   pct={carbsPct}   animate nameColor="#f97316" />
                  <MacroBar name="Fat"           value={results.fat}     color="#a855f7" kcal={fatKcal}     pct={fatPct}     animate nameColor="#a855f7" />
                </div>

                <MacroSplitBar protein={proteinPct} carbs={carbsPct} fat={fatPct} height={8} legend={false} />

                <div className="mc-info-table" style={{ marginTop: '0.75rem' }}>
                  {[
                    { key: 'Activity', val: ACTIVITY_LABELS[activity] },
                    { key: 'Goal',     val: `${GOAL_LABELS[goal]} (${GOAL_DESC[goal]})` },
                    { key: 'Split',    val: `P ${proteinPct}% · C ${carbsPct}% · F ${fatPct}%` },
                  ].map(row => (
                    <div key={row.key} className="mc-info-row">
                      <span className="mc-info-key">{row.key}</span>
                      <span className="mc-info-val">{row.val}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Navigation ── */}
      <div className="sm-nav">
        <button type="button" className="sm-back-btn" onClick={onBack}>← Back</button>
        <button
          type="button"
          className="sm-skip-btn"
          onClick={() => onContinue(null)}
        >
          Skip for now
        </button>
        <button
          type="button"
          className={`sm-continue-btn${results ? ' active' : ''}`}
          disabled={!results}
          onClick={() => onContinue(results)}
        >
          Continue to Plan →
        </button>
      </div>
    </motion.div>
  );
};

export default StepMacros;
