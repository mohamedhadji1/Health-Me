import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../../context/AuthContext';
import { getTrainingPlan, WorkoutDay, Exercise } from '../../../utils/trainingData';
import { getPlanForGoal } from '../../../utils/nutritionData';

const DIFF_COLOR: Record<string, string> = {
  Beginner:     '#22c55e',
  Intermediate: '#f59e0b',
  Advanced:     '#ef4444',
};

/* ── Video Modal ─────────────────────────────── */
const VideoModal: React.FC<{ videoId: string; title: string; onClose: () => void }> = ({
  videoId, title, onClose,
}) => (
  <motion.div
    className="video-modal-backdrop"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClose}
  >
    <motion.div
      className="video-modal-box"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      onClick={e => e.stopPropagation()}
    >
      <div className="video-modal-header">
        <span className="video-modal-title">{title}</span>
        <button className="video-modal-close" onClick={onClose}>✕</button>
      </div>
      <div className="video-modal-embed">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </motion.div>
  </motion.div>
);

/* ── Exercise table row ─────────────────────── */
interface ExRowProps {
  ex: Exercise;
  index: number;
  completedSets: number;
  onSetToggle: (sets: number) => void;
  accentColor: string;
}

const ExerciseTableRow: React.FC<ExRowProps> = ({ ex, index, completedSets, onSetToggle, accentColor }) => {
  const [showVideo, setShowVideo] = React.useState(false);
  const [showTip, setShowTip] = React.useState(false);
  const done = completedSets >= ex.sets;

  const toggleSet = (i: number) => {
    if (i < completedSets) onSetToggle(i);
    else if (i === completedSets) onSetToggle(i + 1);
  };

  return (
    <>
      <motion.tr
        className={`ex-tr${done ? ' ex-tr-done' : ''}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.04 }}
      >
        {/* # */}
        <td className="ex-td ex-td-num">
          <span className="ex-num" style={{ color: done ? '#22c55e' : '#475569' }}>
            {done ? '✓' : index + 1}
          </span>
        </td>

        {/* Thumbnail + name */}
        <td className="ex-td ex-td-name">
          <div className="ex-name-cell">
            <div className="ex-thumb-wrap">
              <img
                src={ex.image}
                alt={ex.name}
                className="ex-thumb"
                loading="lazy"
                onError={e => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80';
                }}
              />
              <button className="ex-thumb-play" onClick={() => setShowVideo(true)}>
                <svg width="10" height="10" viewBox="0 0 10 10"><polygon points="2,1 9,5 2,9" fill="currentColor"/></svg>
              </button>
            </div>
            <div>
              <div className="ex-name-text">{ex.name}</div>
              <div className="ex-muscles-row">
                {ex.muscles.map(m => (
                  <span key={m} className="ex-muscle-tag">{m}</span>
                ))}
              </div>
            </div>
          </div>
        </td>

        {/* Sets */}
        <td className="ex-td ex-td-center">
          <span className="ex-val">{ex.sets}</span>
        </td>

        {/* Reps */}
        <td className="ex-td ex-td-center">
          <span className="ex-val">{ex.reps}</span>
        </td>

        {/* Rest */}
        <td className="ex-td ex-td-center">
          <span className="ex-val">{ex.rest}</span>
        </td>

        {/* Equipment */}
        <td className="ex-td ex-td-gear">
          <span className="ex-gear-text">{ex.equipment}</span>
        </td>

        {/* Difficulty */}
        <td className="ex-td ex-td-center">
          <span className="ex-diff-dot" style={{ color: DIFF_COLOR[ex.difficulty] }}>
            {ex.difficulty}
          </span>
        </td>

        {/* Set tracker */}
        <td className="ex-td ex-td-tracker">
          <div className="ex-dots-row">
            {Array.from({ length: ex.sets }).map((_, i) => (
              <button
                key={i}
                className={`ex-dot${i < completedSets ? ' ex-dot-on' : ''}`}
                style={i < completedSets ? { background: accentColor, borderColor: accentColor } : {}}
                onClick={() => toggleSet(i)}
                title={i < completedSets ? 'Undo' : 'Done'}
              />
            ))}
          </div>
        </td>

        {/* Tip */}
        <td className="ex-td ex-td-tip">
          <button
            className={`ex-tip-toggle${showTip ? ' ex-tip-toggle-on' : ''}`}
            onClick={() => setShowTip(v => !v)}
            title="Show tip"
          >
            i
          </button>
        </td>
      </motion.tr>

      {/* Tip row */}
      {showTip && (
        <tr className="ex-tr-tip">
          <td />
          <td colSpan={8} className="ex-td-tip-text">
            {ex.tip}
          </td>
        </tr>
      )}

      <AnimatePresence>
        {showVideo && (
          <VideoModal
            videoId={ex.videoId}
            title={`${ex.name} — Tutorial`}
            onClose={() => setShowVideo(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

/* ── Day summary bar ────────────────────────── */
interface DaySummaryProps {
  day: WorkoutDay;
  workoutPct: number;
  protein: number;
  carbs: number;
  fat: number;
}

const DaySummary: React.FC<DaySummaryProps> = ({ day, workoutPct, protein, carbs, fat }) => {
  const [showVideo, setShowVideo] = React.useState(false);

  return (
    <>
      <div className="day-summary">
        <div className="day-summary-left">
          <div className="day-summary-type" style={{ borderLeftColor: day.color }}>{day.type}</div>
          <div className="day-summary-day">{day.day}</div>
          <div className="day-summary-muscles">
            {day.muscles.map(m => <span key={m} className="day-summary-muscle">{m}</span>)}
          </div>
        </div>

        <div className="day-summary-stats">
          <div className="dss">
            <div className="dss-val">{day.duration}<span> min</span></div>
            <div className="dss-lbl">Duration</div>
          </div>
          <div className="dss-divider" />
          <div className="dss">
            <div className="dss-val">{day.calories}<span> kcal</span></div>
            <div className="dss-lbl">Est. Burn</div>
          </div>
          <div className="dss-divider" />
          <div className="dss">
            <div className="dss-val">{day.exercises.length}</div>
            <div className="dss-lbl">Exercises</div>
          </div>
          <div className="dss-divider" />
          <div className="dss">
            <div className="dss-val" style={{ color: DIFF_COLOR[day.difficulty] }}>{day.difficulty}</div>
            <div className="dss-lbl">Level</div>
          </div>
          <div className="dss-divider-macro" />
          <div className="dss">
            <div className="dss-val" style={{ color: '#3b82f6' }}>{protein}<span>g</span></div>
            <div className="dss-lbl">Protein</div>
          </div>
          <div className="dss-divider" />
          <div className="dss">
            <div className="dss-val" style={{ color: '#f97316' }}>{carbs}<span>g</span></div>
            <div className="dss-lbl">Carbs</div>
          </div>
          <div className="dss-divider" />
          <div className="dss">
            <div className="dss-val" style={{ color: '#a855f7' }}>{fat}<span>g</span></div>
            <div className="dss-lbl">Fat</div>
          </div>
        </div>

        <div className="day-summary-right">
          <div className="day-progress-wrap">
            <div className="day-progress-track">
              <div className="day-progress-fill" style={{ width: `${workoutPct}%`, background: day.color }} />
            </div>
            <span className="day-progress-pct">{workoutPct}%</span>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showVideo && (
          <VideoModal
            videoId={day.overviewVideoId}
            title={`${day.type} — Full Workout`}
            onClose={() => setShowVideo(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

/* ── Exercise grid card ────────────────────── */
interface ExGridProps {
  ex: Exercise;
  index: number;
  completedSets: number;
  onSetToggle: (sets: number) => void;
  accentColor: string;
}

const ExerciseGridCard: React.FC<ExGridProps> = ({ ex, index, completedSets, onSetToggle, accentColor }) => {
  const [showVideo, setShowVideo] = React.useState(false);
  const done = completedSets >= ex.sets;

  const toggleSet = (i: number) => {
    if (i < completedSets) onSetToggle(i);
    else if (i === completedSets) onSetToggle(i + 1);
  };

  return (
    <motion.div
      className={`ex-grid-card${done ? ' ex-grid-card-done' : ''}`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
    >
      {/* Image */}
      <div className="ex-grid-img-wrap">
        <img
          src={ex.image}
          alt={ex.name}
          className="ex-grid-img"
          loading="lazy"
          onError={e => {
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80';
          }}
        />
        <button className="ex-grid-play" onClick={() => setShowVideo(true)}>
          <svg width="11" height="11" viewBox="0 0 10 10"><polygon points="2,1 9,5 2,9" fill="currentColor"/></svg>
        </button>
        {done && <div className="ex-grid-done-badge">Done</div>}
      </div>

      {/* Body */}
      <div className="ex-grid-body">
        <div className="ex-grid-name">{ex.name}</div>
        <div className="ex-grid-muscles">
          {ex.muscles.map(m => <span key={m} className="ex-muscle-tag">{m}</span>)}
        </div>

        {/* Stats row */}
        <div className="ex-grid-stats">
          <span className="ex-grid-stat"><span className="ex-grid-stat-lbl">Sets</span>{ex.sets}</span>
          <span className="ex-grid-stat"><span className="ex-grid-stat-lbl">Reps</span>{ex.reps}</span>
          <span className="ex-grid-stat"><span className="ex-grid-stat-lbl">Rest</span>{ex.rest}</span>
        </div>

        {/* Set dots */}
        <div className="ex-dots-row">
          {Array.from({ length: ex.sets }).map((_, i) => (
            <button
              key={i}
              className={`ex-dot${i < completedSets ? ' ex-dot-on' : ''}`}
              style={i < completedSets ? { background: accentColor, borderColor: accentColor } : {}}
              onClick={() => toggleSet(i)}
              title={i < completedSets ? 'Undo' : 'Done'}
            />
          ))}
        </div>

        {/* Equipment + level */}
        <div className="ex-grid-meta">
          <span className="ex-gear-text">{ex.equipment}</span>
          <span className="ex-diff-dot" style={{ color: DIFF_COLOR[ex.difficulty] }}>{ex.difficulty}</span>
        </div>
      </div>

      <AnimatePresence>
        {showVideo && (
          <VideoModal
            videoId={ex.videoId}
            title={`${ex.name} — Tutorial`}
            onClose={() => setShowVideo(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ── Main ───────────────────────────────────── */
const TrainingProgram: React.FC = () => {
  const { user } = useAuth();
  const plan = getTrainingPlan(user?.goal ?? 'general');
  const nutrition = getPlanForGoal(user?.goal ?? 'general');

  const todayIndex = new Date().getDay();
  const defaultDay = todayIndex === 0 ? 6 : todayIndex - 1;

  const [selectedDay, setSelectedDay] = React.useState(defaultDay);
  const [completedSets, setCompletedSets] = React.useState<Record<string, number>>({});
  const [layout, setLayout] = React.useState<'list' | 'grid'>(
    typeof window !== 'undefined' && window.innerWidth <= 650 ? 'grid' : 'list'
  );

  const day = plan.days[selectedDay];

  const getKey = React.useCallback(
    (ex: Exercise) => `${selectedDay}-${ex.id}`,
    [selectedDay],
  );

  const handleSetToggle = React.useCallback(
    (ex: Exercise, sets: number) => {
      setCompletedSets(prev => ({ ...prev, [getKey(ex)]: sets }));
    },
    [getKey],
  );

  const totalDone = day.exercises.reduce(
    (acc, ex) => acc + Math.min(completedSets[getKey(ex)] ?? 0, ex.sets), 0,
  );
  const totalSets = day.exercises.reduce((acc, ex) => acc + ex.sets, 0);
  const workoutPct = totalSets > 0 ? Math.round((totalDone / totalSets) * 100) : 0;

  return (
    <div className="training-root">

      {/* Header */}
      <div className="tp-header">
        <div>
          <div className="tp-plan-label">{plan.name}</div>
          <h2 className="tp-title">Training Programme</h2>
        </div>
        <div className="tp-layout-toggle">
          <button
            className={`tp-layout-btn tp-layout-btn-list${layout === 'list' ? ' active' : ''}`}
            onClick={() => setLayout('list')}
            title="List view"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="1" y="2" width="12" height="1.5" rx="0.5" fill="currentColor"/>
              <rect x="1" y="6.25" width="12" height="1.5" rx="0.5" fill="currentColor"/>
              <rect x="1" y="10.5" width="12" height="1.5" rx="0.5" fill="currentColor"/>
            </svg>
            List
          </button>
          <button
            className={`tp-layout-btn${layout === 'grid' ? ' active' : ''}`}
            onClick={() => setLayout('grid')}
            title="Grid view"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="1" y="1" width="5" height="5" rx="1" fill="currentColor"/>
              <rect x="8" y="1" width="5" height="5" rx="1" fill="currentColor"/>
              <rect x="1" y="8" width="5" height="5" rx="1" fill="currentColor"/>
              <rect x="8" y="8" width="5" height="5" rx="1" fill="currentColor"/>
            </svg>
            Grid
          </button>
        </div>
      </div>

      {/* Day tabs */}
      <div className="tp-day-tabs">
        {plan.days.map((d, i) => (
          <button
            key={d.day}
            className={`tp-day-tab${selectedDay === i ? ' tp-day-tab-active' : ''}${i === defaultDay && selectedDay !== i ? ' tp-day-tab-today' : ''}`}
            style={selectedDay === i ? { borderBottomColor: d.color, color: '#f1f5f9' } : {}}
            onClick={() => setSelectedDay(i)}
          >
            {d.day.slice(0, 3)}
            {i === defaultDay && <span className="tp-today-badge">Today</span>}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedDay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <DaySummary
            day={day}
            workoutPct={workoutPct}
            protein={nutrition.targetProtein}
            carbs={nutrition.targetCarbs}
            fat={nutrition.targetFat}
          />

          {/* Exercise layout: table or grid */}
          {layout === 'list' ? (
            <div className="ex-table-wrap">
              <table className="ex-table">
                <thead>
                  <tr className="ex-thead-tr">
                    <th className="ex-th ex-th-num">#</th>
                    <th className="ex-th ex-th-name">Exercise</th>
                    <th className="ex-th ex-th-center">Sets</th>
                    <th className="ex-th ex-th-center">Reps</th>
                    <th className="ex-th ex-th-center">Rest</th>
                    <th className="ex-th">Equipment</th>
                    <th className="ex-th ex-th-center">Level</th>
                    <th className="ex-th">Progress</th>
                    <th className="ex-th ex-th-tip" />
                  </tr>
                </thead>
                <tbody>
                  {day.exercises.map((ex, i) => (
                    <ExerciseTableRow
                      key={ex.id}
                      ex={ex}
                      index={i}
                      completedSets={completedSets[getKey(ex)] ?? 0}
                      onSetToggle={sets => handleSetToggle(ex, sets)}
                      accentColor={day.color}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="ex-grid">
              {day.exercises.map((ex, i) => (
                <ExerciseGridCard
                  key={ex.id}
                  ex={ex}
                  index={i}
                  completedSets={completedSets[getKey(ex)] ?? 0}
                  onSetToggle={sets => handleSetToggle(ex, sets)}
                  accentColor={day.color}
                />
              ))}
            </div>
          )}

          {workoutPct === 100 && (
            <motion.div
              className="workout-complete-banner"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="wc-title">Workout Complete</div>
              <div className="wc-sub">Great work — all sets logged for {day.day}.</div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TrainingProgram;
