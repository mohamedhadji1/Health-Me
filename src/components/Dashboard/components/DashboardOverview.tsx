import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import { getPlanForGoal } from '../../../utils/nutritionData';
import StatCard from '../../ui/StatCard';
import MacroBar from '../../ui/MacroBar';
import PanelHeader from '../../ui/PanelHeader';

/* ─── CalorieRing (dashboard-only visual) ───────────────── */
type CalorieRingProps = { consumed: number; target: number };
const CalorieRing: React.FC<CalorieRingProps> = ({ consumed, target }) => {
  const r = 52;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(1, consumed / target);
  const offset = circ - pct * circ;
  const remaining = Math.max(0, target - consumed);

  return (
    <div className="calorie-ring-wrap">
      <div className="calorie-ring">
        <svg width="130" height="130" viewBox="0 0 130 130">
          <circle cx="65" cy="65" r={r} fill="none" stroke="#2a2a2a" strokeWidth="10" />
          <circle
            cx="65" cy="65" r={r} fill="none"
            stroke="#22c55e" strokeWidth="10"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1s ease' }}
          />
        </svg>
        <div className="calorie-ring-text">
          <span className="calorie-ring-number">{consumed.toLocaleString()}</span>
          <span className="calorie-ring-label">kcal eaten</span>
        </div>
      </div>
      <div className="calorie-ring-stats">
        <div className="calorie-stat-box">
          <div className="calorie-stat-val">{target.toLocaleString()}</div>
          <div className="calorie-stat-lbl">Goal</div>
        </div>
        <div className="calorie-stat-box">
          <div className="calorie-stat-val">{remaining.toLocaleString()}</div>
          <div className="calorie-stat-lbl">Remaining</div>
        </div>
      </div>
    </div>
  );
};

const DashboardOverview: React.FC = () => {
  const { user, refreshUser } = useAuth();
  const plan = getPlanForGoal(user?.goal ?? 'general');

  const today = new Date().toISOString().split('T')[0];

  // Get or build today's log
  const todayLog = React.useMemo(() => {
    return user?.nutritionLogs.find(l => l.date === today) ?? {
      date: today,
      caloriesConsumed: 0,
      meals: [],
    };
  }, [user, today]);

  // Meals for today's plan (Mon=0 … Sun=6)
  const dayIdx = (new Date().getDay() + 6) % 7; // 0=Mon
  const todayMeals = plan.days[dayIdx]?.meals ?? [];

  const [loggedIds, setLoggedIds] = React.useState<Set<string>>(() => {
    const set = new Set<string>();
    todayLog.meals.forEach(m => { if (m.logged) set.add(m.name); });
    return set;
  });

  const totalConsumed = todayMeals
    .filter(m => loggedIds.has(m.name))
    .reduce((acc, m) => acc + m.calories, 0);

  const totalProtein = todayMeals.filter(m => loggedIds.has(m.name)).reduce((a, m) => a + m.protein, 0);
  const totalCarbs   = todayMeals.filter(m => loggedIds.has(m.name)).reduce((a, m) => a + m.carbs, 0);
  const totalFat     = todayMeals.filter(m => loggedIds.has(m.name)).reduce((a, m) => a + m.fat, 0);

  const handleToggleMeal = (mealName: string) => {
    setLoggedIds(prev => {
      const next = new Set(prev);
      if (next.has(mealName)) next.delete(mealName);
      else next.add(mealName);
      return next;
    });
  };

  // Persist log change to user
  React.useEffect(() => {
    if (!user) return;
    const updatedLog = {
      date: today,
      caloriesConsumed: totalConsumed,
      meals: todayMeals.map(m => ({ name: m.name, calories: m.calories, logged: loggedIds.has(m.name) })),
    };
    const existingIdx = user.nutritionLogs.findIndex(l => l.date === today);
    const newLogs = [...user.nutritionLogs];
    if (existingIdx >= 0) newLogs[existingIdx] = updatedLog;
    else newLogs.push(updatedLog);
    refreshUser({ ...user, nutritionLogs: newLogs });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIds]);

  const statCards = [
    { label: 'Calories Today', value: totalConsumed.toString(), unit: 'kcal', sub: `of ${plan.targetCalories}`, color: '#22c55e', bg: 'rgba(34,197,94,0.1)', icon: '🔥', pct: totalConsumed / plan.targetCalories },
    { label: 'Protein', value: `${totalProtein}g`, unit:'', sub: `of ${plan.targetProtein}g target`, color: '#3b82f6', bg: 'rgba(59,130,246,0.1)', icon: '💪', pct: totalProtein / plan.targetProtein },
    { label: 'Water Intake', value: '1.8', unit: 'L', sub: 'of 2.5L goal', color: '#06b6d4', bg: 'rgba(6,182,212,0.1)', icon: '💧', pct: 0.72 },
    { label: 'Meals Logged', value: `${loggedIds.size}`, unit:`/${todayMeals.length}`, sub: 'today', color: '#f97316', bg: 'rgba(249,115,22,0.1)', icon: '🍽️', pct: loggedIds.size / Math.max(1, todayMeals.length) },
  ];

  const dateStr = new Date().toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric' });

  return (
    <>
      {/* Top bar */}
      <div className="dash-top-bar">
        <div className="dash-greeting">
          <h1>Good {getTimeOfDay()}, {user?.username.split(' ')[0] ?? 'there'} 👋</h1>
          <p>Here's your nutrition snapshot for today</p>
        </div>
        <div className="dash-date-badge">{dateStr}</div>
      </div>

      {/* Stat cards */}
      <div className="dash-stats-row">
        {statCards.map(card => (
          <StatCard
            key={card.label}
            label={card.label}
            value={card.value}
            unit={card.unit}
            sub={card.sub}
            color={card.color}
            bg={card.bg}
            icon={card.icon}
            pct={card.pct}
          />
        ))}
      </div>

      {/* Two column: calorie ring + macros | today's meals */}
      <div className="dash-two-col">
        {/* Left: calorie ring + macros */}
        <div className="dash-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <PanelHeader title="🍩 Today's Calories" badge={plan.name} badgeVariant="green" />
          <CalorieRing consumed={totalConsumed} target={plan.targetCalories} />
          <div className="macro-bars">
            <MacroBar name="Protein" value={totalProtein} target={plan.targetProtein} color="#3b82f6" />
            <MacroBar name="Carbohydrates" value={totalCarbs} target={plan.targetCarbs} color="#f97316" />
            <MacroBar name="Fats" value={totalFat} target={plan.targetFat} color="#a855f7" />
          </div>
        </div>

        {/* Right: today's meals */}
        <div className="dash-panel">
          <PanelHeader title="🍽️ Today's Meals" badge={`${loggedIds.size}/${todayMeals.length} logged`} badgeVariant="orange" />
          <div className="meal-list">
            {todayMeals.map(meal => {
              const isLogged = loggedIds.has(meal.name);
              return (
                <div key={meal.id} className={`meal-card${isLogged ? ' logged' : ''}`}>
                  <div className="meal-card-icon">{meal.emoji}</div>
                  <div className="meal-card-info">
                    <div className="meal-card-name">{meal.name}</div>
                    <div className="meal-card-desc">{meal.time} · {meal.items.slice(0,2).join(', ')}</div>
                  </div>
                  <div className="meal-card-cal">{meal.calories} kcal</div>
                  <button
                    className={`meal-log-btn${isLogged ? ' logged' : ''}`}
                    onClick={() => handleToggleMeal(meal.name)}
                  >
                    {isLogged ? '✓ Done' : '+ Log'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

function getTimeOfDay(): string {
  const h = new Date().getHours();
  if (h < 12) return 'morning';
  if (h < 17) return 'afternoon';
  return 'evening';
}

export default DashboardOverview;
