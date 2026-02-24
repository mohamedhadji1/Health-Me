import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import MacroBar from '../../ui/MacroBar';
import MacroSplitBar from '../../ui/MacroSplitBar';
import ToggleGroup from '../../ui/ToggleGroup';

/* ─── Types ───────────────────────────────────────────────── */
type Gender   = 'male' | 'female';
type Activity = 'sedentary' | 'light' | 'moderate' | 'active' | 'extreme';
type Goal     = 'cut' | 'maintain' | 'bulk';
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
const GOAL_LABELS: Record<Goal, string> = {
  cut:      'Cut',
  maintain: 'Maintain',
  bulk:     'Bulk',
};
const GOAL_DESC: Record<Goal, string> = {
  cut:      '−500 kcal / day',
  maintain: 'Break even',
  bulk:     '+300 kcal / day',
};
const GOAL_ADJUST: Record<Goal, number> = {
  cut:      -500,
  maintain: 0,
  bulk:     300,
};
// [protein%, carbs%, fat%] of target calories
const GOAL_MACRO_SPLIT: Record<Goal, [number, number, number]> = {
  cut:      [0.40, 0.30, 0.30],
  maintain: [0.30, 0.45, 0.25],
  bulk:     [0.30, 0.50, 0.20],
};

interface Results {
  bmr: number;
  tdee: number;
  target: number;
  protein: number;
  carbs: number;
  fat: number;
}

/* ─── Main component ───────────────────────────────────────── */
const MacroCalculator: React.FC = () => {
  /* inputs */
  const [gender,     setGender]     = React.useState<Gender>('male');
  const [age,        setAge]        = React.useState('');
  const [weightUnit, setWeightUnit] = React.useState<WeightUnit>('kg');
  const [weight,     setWeight]     = React.useState('');
  const [heightUnit, setHeightUnit] = React.useState<HeightUnit>('cm');
  const [heightCm,   setHeightCm]   = React.useState('');
  const [heightFt,   setHeightFt]   = React.useState('');
  const [heightIn,   setHeightIn]   = React.useState('');
  const [activity,   setActivity]   = React.useState<Activity>('moderate');
  const [goal,       setGoal]       = React.useState<Goal>('maintain');

  /* result */
  const [results,  setResults]  = React.useState<Results | null>(null);
  const [calcError, setCalcError] = React.useState('');

  const calculate = () => {
    setCalcError('');

    const ageNum = parseFloat(age);
    const wKg    = weightUnit === 'kg'
      ? parseFloat(weight)
      : parseFloat(weight) / 2.20462;

    let hCm: number;
    if (heightUnit === 'cm') {
      hCm = parseFloat(heightCm);
    } else {
      const ft = parseFloat(heightFt) || 0;
      const inches = parseFloat(heightIn) || 0;
      hCm = (ft * 12 + inches) * 2.54;
    }

    if (isNaN(ageNum) || ageNum <= 0 || ageNum > 120) { setCalcError('Enter a valid age.'); return; }
    if (isNaN(wKg)  || wKg <= 0)                       { setCalcError('Enter a valid weight.'); return; }
    if (isNaN(hCm)  || hCm <= 0)                       { setCalcError('Enter a valid height.'); return; }

    // Mifflin-St Jeor
    const bmr = gender === 'male'
      ? 10 * wKg + 6.25 * hCm - 5 * ageNum + 5
      : 10 * wKg + 6.25 * hCm - 5 * ageNum - 161;

    const tdee   = Math.round(bmr * ACTIVITY_MULTIPLIER[activity]);
    const target = Math.max(1200, tdee + GOAL_ADJUST[goal]);

    const [pp, cp, fp] = GOAL_MACRO_SPLIT[goal];
    const protein = Math.round((target * pp) / 4);
    const carbs   = Math.round((target * cp) / 4);
    const fat     = Math.round((target * fp) / 9);

    setResults({
      bmr: Math.round(bmr),
      tdee,
      target,
      protein,
      carbs,
      fat,
    });
  };

  const reset = () => { setResults(null); setCalcError(''); };

  const proteinKcal = results ? results.protein * 4 : 0;
  const carbsKcal   = results ? results.carbs   * 4 : 0;
  const fatKcal     = results ? results.fat      * 9 : 0;
  const totalKcal   = proteinKcal + carbsKcal + fatKcal;
  const proteinPct  = totalKcal ? Math.round((proteinKcal / totalKcal) * 100) : 0;
  const carbsPct    = totalKcal ? Math.round((carbsKcal   / totalKcal) * 100) : 0;
  const fatPct      = totalKcal ? 100 - proteinPct - carbsPct : 0;

  return (
    <div className="mc-root">
      <div className="mc-header">
        <div className="mc-plan-label">Tools</div>
        <h2 className="mc-title">Macro Calculator</h2>
        <p className="mc-subtitle">
          Calculates your TDEE using the Mifflin-St Jeor equation, then splits daily macros based on your goal.
        </p>
      </div>

      <div className="mc-layout">
        {/* ── Input panel ── */}
        <div className="mc-inputs">

          {/* Gender */}
          <div className="mc-field-group">
            <label className="mc-label">Gender</label>
            <ToggleGroup
              options={[
                { value: 'male',   label: 'Male' },
                { value: 'female', label: 'Female' },
              ]}
              value={gender}
              onChange={v => { setGender(v as Gender); reset(); }}
            />
          </div>

          {/* Age */}
          <div className="mc-field-group">
            <label className="mc-label">Age</label>
            <div className="mc-input-row">
              <input
                className="mc-input"
                type="number"
                min={10} max={100}
                placeholder="e.g. 28"
                value={age}
                onChange={e => { setAge(e.target.value); reset(); }}
              />
              <span className="mc-unit">years</span>
            </div>
          </div>

          {/* Weight */}
          <div className="mc-field-group">
            <label className="mc-label">
              Weight
              <ToggleGroup
                options={[
                  { value: 'kg',  label: 'kg' },
                  { value: 'lbs', label: 'lbs' },
                ]}
                value={weightUnit}
                onChange={v => { setWeightUnit(v as WeightUnit); setWeight(''); reset(); }}
                className="mc-unit-toggle"
                btnClassName="mc-ut-btn"
              />
            </label>
            <div className="mc-input-row">
              <input
                className="mc-input"
                type="number"
                min={1}
                placeholder={weightUnit === 'kg' ? 'e.g. 80' : 'e.g. 176'}
                value={weight}
                onChange={e => { setWeight(e.target.value); reset(); }}
              />
              <span className="mc-unit">{weightUnit}</span>
            </div>
          </div>

          {/* Height */}
          <div className="mc-field-group">
            <label className="mc-label">
              Height
              <ToggleGroup
                options={[
                  { value: 'cm', label: 'cm' },
                  { value: 'ft', label: 'ft' },
                ]}
                value={heightUnit}
                onChange={v => { setHeightUnit(v as HeightUnit); setHeightCm(''); setHeightFt(''); setHeightIn(''); reset(); }}
                className="mc-unit-toggle"
                btnClassName="mc-ut-btn"
              />
            </label>
            {heightUnit === 'cm' ? (
              <div className="mc-input-row">
                <input
                  className="mc-input"
                  type="number"
                  min={1}
                  placeholder="e.g. 178"
                  value={heightCm}
                  onChange={e => { setHeightCm(e.target.value); reset(); }}
                />
                <span className="mc-unit">cm</span>
              </div>
            ) : (
              <div className="mc-input-row" style={{ gap: '0.5rem' }}>
                <input
                  className="mc-input"
                  type="number"
                  min={1} max={8}
                  placeholder="ft"
                  value={heightFt}
                  style={{ flex: 1 }}
                  onChange={e => { setHeightFt(e.target.value); reset(); }}
                />
                <input
                  className="mc-input"
                  type="number"
                  min={0} max={11}
                  placeholder="in"
                  value={heightIn}
                  style={{ flex: 1 }}
                  onChange={e => { setHeightIn(e.target.value); reset(); }}
                />
              </div>
            )}
          </div>

          {/* Activity level */}
          <div className="mc-field-group">
            <label className="mc-label">Activity Level</label>
            <div className="mc-activity-list">
              {(Object.keys(ACTIVITY_LABELS) as Activity[]).map(a => (
                <button
                  key={a}
                  className={`mc-activity-btn${activity === a ? ' active' : ''}`}
                  onClick={() => { setActivity(a); reset(); }}
                >
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
              {(Object.keys(GOAL_LABELS) as Goal[]).map(g => (
                <button
                  key={g}
                  className={`mc-goal-btn${goal === g ? ' active' : ''}`}
                  onClick={() => { setGoal(g); reset(); }}
                >
                  <span className="mc-goal-name">{GOAL_LABELS[g]}</span>
                  <span className="mc-goal-adj">{GOAL_DESC[g]}</span>
                </button>
              ))}
            </div>
          </div>

          {calcError && <p className="mc-error">{calcError}</p>}

          <button className="mc-calc-btn" onClick={calculate}>
            Calculate
          </button>
        </div>

        {/* ── Results panel ── */}
        <div className="mc-results-panel">
          <AnimatePresence mode="wait">
            {!results ? (
              <motion.div
                key="empty"
                className="mc-empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="mc-empty-icon">⊞</div>
                <div className="mc-empty-title">Fill in your details</div>
                <div className="mc-empty-sub">Your personalised macro targets will appear here.</div>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* TDEE summary row */}
                <div className="mc-tdee-row">
                  <div className="mc-tdee-box">
                    <div className="mc-tdee-val">{results.bmr}</div>
                    <div className="mc-tdee-lbl">BMR (kcal/day)</div>
                  </div>
                  <div className="mc-tdee-arrow">→</div>
                  <div className="mc-tdee-box">
                    <div className="mc-tdee-val">{results.tdee}</div>
                    <div className="mc-tdee-lbl">TDEE (kcal/day)</div>
                  </div>
                  <div className="mc-tdee-arrow">→</div>
                  <div className="mc-tdee-box mc-tdee-target">
                    <div className="mc-tdee-val">{results.target}</div>
                    <div className="mc-tdee-lbl">
                      Target ({GOAL_LABELS[goal]})
                    </div>
                  </div>
                </div>

                {/* Macro bars */}
                <div className="mc-macro-bars">
                  <div className="mc-macro-heading">Daily Macro Targets</div>
                  <MacroBar name="Protein"       value={results.protein} color="#3b82f6" kcal={proteinKcal} pct={proteinPct} animate nameColor="#3b82f6" />
                  <MacroBar name="Carbohydrates" value={results.carbs}   color="#f97316" kcal={carbsKcal}   pct={carbsPct}   animate nameColor="#f97316" />
                  <MacroBar name="Fat"           value={results.fat}     color="#a855f7" kcal={fatKcal}     pct={fatPct}     animate nameColor="#a855f7" />
                </div>

                {/* Segmented split bar */}
                <MacroSplitBar
                  protein={proteinPct}
                  carbs={carbsPct}
                  fat={fatPct}
                  height={10}
                  legend={false}
                />

                {/* Info table */}
                <div className="mc-info-table">
                  {[
                    { key: 'Formula',   val: 'Mifflin-St Jeor' },
                    { key: 'Activity',  val: ACTIVITY_LABELS[activity] },
                    { key: 'Goal',      val: `${GOAL_LABELS[goal]} (${GOAL_DESC[goal]})` },
                    { key: 'Split',     val: `P ${proteinPct}% · C ${carbsPct}% · F ${fatPct}%` },
                  ].map(row => (
                    <div key={row.key} className="mc-info-row">
                      <span className="mc-info-key">{row.key}</span>
                      <span className="mc-info-val">{row.val}</span>
                    </div>
                  ))}
                </div>

                <p className="mc-disclaimer">
                  These are estimates. Adjust based on real-world results over 2–4 weeks.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default MacroCalculator;
