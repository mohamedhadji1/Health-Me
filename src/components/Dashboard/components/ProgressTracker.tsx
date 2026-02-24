import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import { getPlanForGoal } from '../../../utils/nutritionData';
import { WeightEntry } from '../../../utils/userStore';

const ProgressTracker: React.FC = () => {
  const { user, refreshUser } = useAuth();
  const plan = getPlanForGoal(user?.goal ?? 'general');

  // ── Weight tracking ──────────────────────────────────────
  const weightHistory: WeightEntry[] = user?.progress ?? [];
  const latestWeight = weightHistory[weightHistory.length - 1]?.weight ?? 75;
  const firstWeight = weightHistory[0]?.weight ?? 75;
  const weightDelta = latestWeight - firstWeight;
  const [newWeight, setNewWeight] = React.useState('');

  const handleLogWeight = () => {
    if (!user || !newWeight) return;
    const val = parseFloat(newWeight);
    if (isNaN(val) || val < 30 || val > 300) return;
    const today = new Date().toISOString().split('T')[0];
    const existing = user.progress.findIndex(p => p.date === today);
    const updated = [...user.progress];
    if (existing >= 0) updated[existing] = { date: today, weight: val };
    else updated.push({ date: today, weight: val });
    refreshUser({ ...user, progress: updated });
    setNewWeight('');
  };

  // Build chart: last 8 entries
  const chartData = weightHistory.slice(-8);
  const minW = Math.min(...chartData.map(e => e.weight)) - 2;
  const maxW = Math.max(...chartData.map(e => e.weight)) + 2;
  const range = Math.max(1, maxW - minW);

  // ── Calorie streak (days user logged ≥ 1 meal) ──────────
  const logStreak = React.useMemo(() => {
    const sorted = [...(user?.nutritionLogs ?? [])].sort((a, b) => b.date.localeCompare(a.date));
    let streak = 0;
    for (const log of sorted) {
      if (log.caloriesConsumed > 0) streak++;
      else break;
    }
    return streak;
  }, [user]);

  // ── Last 21 days for streak calendar ────────────────────
  const last21 = React.useMemo(() => {
    const days: { date: string; active: boolean; isToday: boolean }[] = [];
    const today = new Date().toISOString().split('T')[0];
    for (let i = 20; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const ds = d.toISOString().split('T')[0];
      const log = user?.nutritionLogs.find(l => l.date === ds);
      days.push({ date: ds, active: (log?.caloriesConsumed ?? 0) > 0, isToday: ds === today });
    }
    return days;
  }, [user]);

  // ── 7-day calorie chart ─────────────────────────────────
  const last7Logs = React.useMemo(() => {
    const days: { label: string; consumed: number; target: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const ds = d.toISOString().split('T')[0];
      const log = user?.nutritionLogs.find(l => l.date === ds);
      days.push({
        label: d.toLocaleDateString('en-US', { weekday: 'short' }),
        consumed: log?.caloriesConsumed ?? 0,
        target: plan.targetCalories,
      });
    }
    return days;
  }, [user, plan]);

  const maxCal = Math.max(...last7Logs.map(l => l.target), 100);

  return (
    <div>
      {/* Top bar */}
      <div className="dash-top-bar">
        <div className="dash-greeting">
          <h1>📈 My Progress</h1>
          <p>Track your weight, streaks and calorie history</p>
        </div>
        <div className="dash-date-badge">
          {weightHistory.length} check-ins recorded
        </div>
      </div>

      {/* Summary cards */}
      <div className="dash-stats-row">
        {[
          { icon: '⚖️', label: 'Current Weight', val: `${latestWeight}`, unit: 'kg', sub: 'last logged', col: '#22c55e', bg: 'rgba(34,197,94,0.1)' },
          { icon: '📉', label: 'Total Change', val: `${weightDelta >= 0 ? '+' : ''}${weightDelta.toFixed(1)}`, unit: 'kg', sub: `since ${weightHistory[0]?.date ?? 'start'}`, col: weightDelta < 0 ? '#22c55e' : '#f97316', bg: 'rgba(249,115,22,0.1)' },
          { icon: '🔥', label: 'Log Streak', val: `${logStreak}`, unit: ' days', sub: 'nutrition logged', col: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
          { icon: '📊', label: 'Weigh-ins', val: `${weightHistory.length}`, unit: '', sub: 'total records', col: '#3b82f6', bg: 'rgba(59,130,246,0.1)' },
        ].map(c => (
          <div className="stat-card" key={c.label}>
            <div className="stat-card-header">
              <span className="stat-card-label">{c.label}</span>
              <div className="stat-card-icon" style={{ background: c.bg }}>{c.icon}</div>
            </div>
            <div className="stat-card-value" style={{ color: c.col }}>
              {c.val}<span style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 500 }}>{c.unit}</span>
            </div>
            <div className="stat-card-sub">{c.sub}</div>
          </div>
        ))}
      </div>

      <div className="dash-two-col">
        {/* Weight Chart */}
        <div className="dash-panel">
          <div className="dash-panel-header">
            <span className="dash-panel-title">⚖️ Weight History</span>
            <span className="dash-panel-badge badge-green">{chartData.length} entries</span>
          </div>

          {/* Bar chart */}
          <div className="weight-chart">
            {chartData.map((entry, idx) => {
              const heightPct = ((entry.weight - minW) / range) * 80 + 10;
              const isCurrent = idx === chartData.length - 1;
              return (
                <div className="weight-bar-col" key={entry.date}>
                  <div
                    className={`weight-bar${isCurrent ? ' current' : ''}`}
                    style={{ height: `${heightPct}%` }}
                    title={`${entry.weight}kg on ${entry.date}`}
                  />
                  <span className="weight-bar-label">
                    {new Date(entry.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="weight-summary">
            <div className="weight-stat">
              <div className="weight-stat-val">{firstWeight} kg</div>
              <div className="weight-stat-lbl">Starting</div>
            </div>
            <div className="weight-stat">
              <div className="weight-stat-val" style={{ color: '#22c55e' }}>{latestWeight} kg</div>
              <div className="weight-stat-lbl">Current</div>
            </div>
            <div className="weight-stat">
              <div className="weight-stat-val" style={{ color: weightDelta < 0 ? '#22c55e' : '#f97316' }}>
                {weightDelta >= 0 ? '+' : ''}{weightDelta.toFixed(1)} kg
              </div>
              <div className="weight-stat-lbl">Change</div>
            </div>
          </div>

          {/* Log weight */}
          <div style={{ marginTop: '1.25rem', display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
            <input
              type="number"
              placeholder="Log today's weight (kg)"
              value={newWeight}
              onChange={e => setNewWeight(e.target.value)}
              style={{
                flex: 1, background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8,
                padding: '0.55rem 0.875rem', color: '#f1f5f9', fontSize: '0.85rem', outline: 'none',
              }}
              onKeyDown={e => { if (e.key === 'Enter') handleLogWeight(); }}
            />
            <button
              onClick={handleLogWeight}
              style={{
                background: '#22c55e', color: '#fff', border: 'none', borderRadius: 8,
                padding: '0.55rem 1rem', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer',
              }}
            >
              Log
            </button>
          </div>
        </div>

        {/* Streak Calendar */}
        <div className="dash-panel">
          <div className="dash-panel-header">
            <span className="dash-panel-title">🔥 Nutrition Streak</span>
            <span className="dash-panel-badge badge-orange">{logStreak} day streak</span>
          </div>

          <div className="streak-day-labels">
            {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => (
              <span key={d}>{d}</span>
            ))}
          </div>

          <div className="streak-grid">
            {/* Pad to start on correct weekday */}
            {Array.from({ length: (new Date(last21[0].date + 'T00:00:00').getDay() + 6) % 7 }).map((_, i) => (
              <div key={`pad-${i}`} style={{ aspectRatio: '1' }} />
            ))}
            {last21.map(day => (
              <div
                key={day.date}
                className={`streak-day${day.active ? ' active' : ''}${day.isToday ? ' today' : ''}`}
                title={`${day.date}${day.active ? ' – logged!' : ''}`}
              />
            ))}
          </div>

          <div className="streak-count">
            <strong>{logStreak}</strong> day streak · {last21.filter(d => d.active).length} days logged this month
          </div>

          {/* 7-day calorie bar chart */}
          <div style={{ marginTop: '1.5rem' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8', marginBottom: '0.875rem' }}>
              7-Day Calorie Intake
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.4rem', height: 80 }}>
              {last7Logs.map((day, i) => {
                const isToday = i === last7Logs.length - 1;
                const heightPct = day.consumed > 0 ? (day.consumed / maxCal) * 100 : 4;
                const color = day.consumed === 0 ? '#2a2a2a' : day.consumed > day.target ? '#f97316' : '#22c55e';
                return (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                    <div
                      style={{
                        width: '100%', maxWidth: 28, borderRadius: '6px 6px 0 0',
                        height: `${heightPct}%`, minHeight: 4, background: color,
                        opacity: isToday ? 1 : 0.7,
                        boxShadow: isToday ? `0 0 8px ${color}88` : 'none',
                        transition: 'height 0.6s ease',
                      }}
                      title={`${day.label}: ${day.consumed} kcal`}
                    />
                    <span style={{ fontSize: '0.62rem', color: '#64748b' }}>{day.label}</span>
                  </div>
                );
              })}
            </div>
            {/* Target line label */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.4rem' }}>
              <span style={{ fontSize: '0.7rem', color: '#64748b' }}>
                🎯 Target: {plan.targetCalories} kcal
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Goal progress */}
      <div className="dash-panel">
        <div className="dash-panel-header">
          <span className="dash-panel-title">🎯 Goal Progress</span>
          <span className="dash-panel-badge badge-blue">{plan.name}</span>
        </div>
        <div className="gp-grid">
          {[
            { label: 'Week 1', pct: 100, note: 'Program started' },
            { label: 'Week 2', pct: Math.min(100, Math.round((logStreak / 7) * 100)), note: `${logStreak} days logged` },
            { label: 'Week 3', pct: weightHistory.length >= 3 ? 60 : 20, note: `${weightHistory.length} weigh-ins` },
            { label: 'Calories On-Track', pct: Math.round((last7Logs.filter(d => d.consumed > 0 && d.consumed <= d.target * 1.1).length / 7) * 100), note: 'last 7 days' },
            { label: 'Meals Logged', pct: Math.round((last7Logs.filter(d => d.consumed > 0).length / 7) * 100), note: 'this week' },
            { label: 'Overall', pct: Math.round(((logStreak * 5 + weightHistory.length * 10) / 100) * 100) > 100 ? 100 : Math.round(((logStreak * 5 + weightHistory.length * 10) / 100) * 100), note: 'keep it up!' },
          ].map(item => (
            <div key={item.label} style={{ background: '#1a1a1a', borderRadius: 12, padding: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600, minWidth: 0, flex: '1 1 60%' }}>{item.label}</span>
                <span style={{ fontSize: '0.82rem', color: '#22c55e', fontWeight: 700, flexShrink: 0 }}>{item.pct}%</span>
              </div>
              <div style={{ height: 6, background: '#2a2a2a', borderRadius: 99, overflow: 'hidden', marginBottom: '0.35rem' }}>
                <div style={{ height: '100%', width: `${item.pct}%`, background: 'linear-gradient(to right, #22c55e, #16a34a)', borderRadius: 99, transition: 'width 1s ease' }} />
              </div>
              <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{item.note}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;
