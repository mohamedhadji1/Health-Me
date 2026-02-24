import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

const GOAL_LABELS: Record<string, string> = {
  muscle_gain: 'Muscle Gain',
  weight_loss: 'Weight Loss',
  endurance: 'Endurance',
  flexibility: 'Flexibility',
  general: 'General Wellness',
};

const DashboardSidebar: React.FC<SidebarProps> = ({ activePage, onNavigate }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const initials = user
    ? user.username.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    : '?';

  const navItems = [
    { id: 'overview',   icon: '📊', label: 'Overview' },
    { id: 'nutrition',  icon: '🥗', label: 'Nutrition Program' },
    { id: 'training',   icon: '🏋️', label: 'Training' },
    { id: 'progress',   icon: '📈', label: 'My Progress' },
    { id: 'macros',     icon: '⊞',  label: 'Macro Calculator' },
  ];

  return (
    <nav className="dash-sidebar">
      {/* Logo */}
      <div className="dash-logo">
        <div className="dash-logo-icon">💪</div>
        <div className="dash-logo-text">Health<span>Me</span></div>
      </div>

      {/* Nav Items */}
      <div className="dash-nav">
        {navItems.map(item => (
          <button
            key={item.id}
            className={`dash-nav-item${activePage === item.id ? ' active' : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
          </button>
        ))}

        {/* Switch program */}
        <div style={{ margin: '0.5rem 0', borderTop: '1px solid #2a2a2a', paddingTop: '0.75rem' }}>
          <button
            className="dash-nav-item"
            onClick={() => navigate('/select-program')}
            style={{ color: '#a855f7' }}
          >
            <span className="nav-icon">🔄</span>
            Switch Program
          </button>
        </div>
      </div>

      {/* User block */}
      <div className="dash-user-block">
        <div className="dash-user-info">
          <div className="dash-avatar">{initials}</div>
          <div>
            <div className="dash-user-name">{user?.username}</div>
            <div className="dash-user-goal">
              {GOAL_LABELS[user?.goal ?? ''] ?? 'Wellness'}
            </div>
          </div>
        </div>
        <button className="dash-logout-btn" onClick={handleLogout}>
          <span>↩</span> Sign out
        </button>
      </div>
    </nav>
  );
};

export default DashboardSidebar;
