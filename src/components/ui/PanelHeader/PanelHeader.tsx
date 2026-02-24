import React from 'react';

export type BadgeVariant = 'green' | 'orange' | 'blue' | 'gray';

export interface PanelHeaderProps {
  title: React.ReactNode;
  badge?: React.ReactNode;
  badgeVariant?: BadgeVariant;
}

const BADGE_CLASS: Record<BadgeVariant, string> = {
  green:  'badge-green',
  orange: 'badge-orange',
  blue:   'badge-blue',
  gray:   'badge-gray',
};

/**
 * Reusable panel header row: title on the left, optional coloured badge on the right.
 * Relies on `.dash-panel-header`, `.dash-panel-title`, `.dash-panel-badge` CSS classes.
 */
const PanelHeader: React.FC<PanelHeaderProps> = ({
  title, badge, badgeVariant = 'green',
}) => (
  <div className="dash-panel-header">
    <span className="dash-panel-title">{title}</span>
    {badge !== undefined && (
      <span className={`dash-panel-badge ${BADGE_CLASS[badgeVariant]}`}>{badge}</span>
    )}
  </div>
);

export default PanelHeader;
