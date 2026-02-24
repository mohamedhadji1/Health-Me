import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import { getPlanForGoal } from '../../../utils/nutritionData';
import StatCard from '../../ui/StatCard';
import PanelHeader from '../../ui/PanelHeader';
import MacroSplitBar from '../../ui/MacroSplitBar';

const DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

const NutritionProgram: React.FC = () => {
  const { user } = useAuth();
  const plan = getPlanForGoal(user?.goal ?? 'general');

  // Default to current day of week
  const todayIdx = (new Date().getDay() + 6) % 7;
  const [selectedDay, setSelectedDay] = React.useState(todayIdx);

  const dayPlan = plan.days[selectedDay];

  return (
    <div>
      {/* Top bar */}
      <div className="dash-top-bar">
        <div className="dash-greeting">
          <h1>🥗 Nutrition Program</h1>
          <p>{plan.name} · {plan.targetCalories} kcal/day · {plan.targetProtein}g protein</p>
        </div>
        <div className="dash-date-badge">{plan.targetCalories} kcal target</div>
      </div>

      {/* Weekly summary row */}
      <div className="dash-stats-row" style={{ marginBottom: '1.5rem' }}>
        {[
          { label: 'Daily Target', val: `${plan.targetCalories}`, unit: ' kcal', icon: '🔥' },
          { label: 'Protein Goal', val: `${plan.targetProtein}`, unit: 'g', icon: '💪' },
          { label: 'Carbs Goal',   val: `${plan.targetCarbs}`,   unit: 'g', icon: '🌾' },
          { label: 'Fat Goal',     val: `${plan.targetFat}`,     unit: 'g', icon: '🫒' },
        ].map(s => (
          <StatCard
            key={s.label}
            label={s.label}
            value={s.val}
            unit={s.unit}
            sub="per day"
            bg="#1e1e1e"
            icon={s.icon}
          />
        ))}
      </div>

      {/* Day navigation */}
      <div className="plan-day-nav">
        {DAYS.map((day, i) => (
          <button
            key={day}
            className={`plan-day-btn${selectedDay === i ? ' active' : ''}`}
            onClick={() => setSelectedDay(i)}
          >
            {day.slice(0, 3)}
            {i === todayIdx ? ' •' : ''}
          </button>
        ))}
      </div>

      {/* Meal grid */}
      <div className="plan-meal-grid">
        {dayPlan.meals.map(meal => (
          <div className="plan-meal-card" key={meal.id}>
              <div className="plan-meal-header">
                <span style={{ fontSize: '1.3rem' }}>{meal.emoji}</span>
                <span className="plan-meal-time">{meal.time}</span>
              </div>
              <div className="plan-meal-name">{meal.name}</div>
              <ul className="plan-meal-items">
                {meal.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              <div className="plan-meal-footer">
                <span className="plan-meal-cal">🔥 {meal.calories} kcal</span>
                <span className="plan-meal-macros">
                  P: {meal.protein}g · C: {meal.carbs}g · F: {meal.fat}g
                </span>
              </div>
              {/* Mini macro split bar */}
              <div style={{ padding: '0 1rem 0.875rem', background: '#1a1a1a' }}>
                <MacroSplitBar protein={meal.protein} carbs={meal.carbs} fat={meal.fat} height={5} />
              </div>
            </div>
        ))}
      </div>

      {/* Daily total summary */}
      <div className="dash-panel" style={{ marginTop: '1.5rem' }}>
        <PanelHeader
          title={`📋 ${DAYS[selectedDay]} – Daily Summary`}
          badge={`${dayPlan.meals.reduce((a, m) => a + m.calories, 0)} kcal total`}
          badgeVariant="green"
        />
        <div className="nutrition-summary-grid">
          {[
            { label: 'Total Calories', val: dayPlan.meals.reduce((a, m) => a + m.calories, 0), unit: 'kcal', color: '#22c55e' },
            { label: 'Total Protein', val: dayPlan.meals.reduce((a, m) => a + m.protein, 0), unit: 'g', color: '#3b82f6' },
            { label: 'Total Carbs', val: dayPlan.meals.reduce((a, m) => a + m.carbs, 0), unit: 'g', color: '#f97316' },
            { label: 'Total Fat', val: dayPlan.meals.reduce((a, m) => a + m.fat, 0), unit: 'g', color: '#a855f7' },
          ].map(s => (
            <div key={s.label} style={{ background: '#1a1a1a', borderRadius: 12, padding: '1rem', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: s.color }}>{s.val}<span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 500 }}>{s.unit}</span></div>
              <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NutritionProgram;
