import React from 'react';
import FormField from '../../ui/FormField';

const GOALS = [
  { value: '',           label: 'Select your goal…' },
  { value: 'weight_loss', label: 'Weight Loss'           },
  { value: 'muscle_gain', label: 'Muscle Gain'           },
  { value: 'endurance',   label: 'Improve Endurance'     },
  { value: 'flexibility', label: 'Flexibility & Mobility'},
  { value: 'general',     label: 'General Wellness'      },
] as const;

interface GoalSelectProps {
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  animDelay?: number;
}

/**
 * Fitness-goal dropdown wrapped in a FormField.
 * Relies on `.select-wrapper`, `.form-select`, `.select-arrow` CSS classes.
 */
const GoalSelect = ({ value, error, onChange, animDelay = 0.57 }: GoalSelectProps) => (
  <FormField label="Fitness Goal" htmlFor="signup-goal" error={error} animDelay={animDelay}>
    <div className="select-wrapper">
      <select
        id="signup-goal"
        name="goal"
        value={value}
        onChange={onChange}
        className={`form-select${error ? ' input-error' : ''}`}
      >
        {GOALS.map(g => (
          <option key={g.value} value={g.value} disabled={g.value === ''}>
            {g.label}
          </option>
        ))}
      </select>
      <span className="select-arrow">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </span>
    </div>
  </FormField>
);

export default GoalSelect;
