import React from 'react';

export interface ToggleOption {
  value: string;
  label: React.ReactNode;
}

export interface ToggleGroupProps {
  options: ToggleOption[];
  value: string;
  onChange: (value: string) => void;
  /** Extra className on the wrapper (default: uses mc-toggle-row styles) */
  className?: string;
  /** Extra className on each button */
  btnClassName?: string;
}

/**
 * Generic segmented toggle group.
 * Renders a row of buttons; the active one gets the `.active` modifier.
 * Relies on `.mc-toggle-row` / `.mc-toggle-btn` CSS classes by default.
 * Pass `className` / `btnClassName` to override with other style sets.
 */
const ToggleGroup: React.FC<ToggleGroupProps> = ({
  options,
  value,
  onChange,
  className = 'mc-toggle-row',
  btnClassName = 'mc-toggle-btn',
}) => (
  <div className={className}>
    {options.map((opt, i) => (
      <button
        key={opt.value}
        type="button"
        className={`${btnClassName}${value === opt.value ? ' active' : ''}`}
        style={i > 0 ? {} : undefined}
        onClick={() => onChange(opt.value)}
      >
        {opt.label}
      </button>
    ))}
  </div>
);

export default ToggleGroup;
