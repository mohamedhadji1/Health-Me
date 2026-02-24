import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Dashboard.css';
import DashboardSidebar from './components/DashboardSidebar';
import DashboardOverview from './components/DashboardOverview';
import NutritionProgram from './components/NutritionProgram';
import ProgressTracker from './components/ProgressTracker';
import TrainingProgram from './components/TrainingProgram';
import MacroCalculator from './components/MacroCalculator';

type Page = 'overview' | 'nutrition' | 'progress' | 'training' | 'macros';

const NAV_ITEMS: { id: Page; icon: string; label: string }[] = [
  { id: 'overview',  icon: '📊', label: 'Overview' },
  { id: 'nutrition', icon: '🥗', label: 'Nutrition' },
  { id: 'training',  icon: '🏋️', label: 'Training' },
  { id: 'progress',  icon: '📈', label: 'Progress' },
  { id: 'macros',    icon: '⊞',  label: 'Macros' },
];

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

const Dashboard: React.FC = () => {
  const [page, setPage] = React.useState<Page>('overview');

  return (
    <div className="dashboard">
      <DashboardSidebar activePage={page} onNavigate={(p) => setPage(p as Page)} />

      <main className="dash-main">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {page === 'overview'  && <DashboardOverview />}
            {page === 'nutrition' && <NutritionProgram />}
            {page === 'progress'  && <ProgressTracker />}
            {page === 'training'  && <TrainingProgram />}
            {page === 'macros'    && <MacroCalculator />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ── Mobile bottom nav (visible ≤900px) ── */}
      <nav className="dash-mobile-nav">
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            className={`dash-mobile-nav-btn${page === item.id ? ' active' : ''}`}
            onClick={() => setPage(item.id)}
          >
            <span className="dash-mobile-nav-icon">{item.icon}</span>
            <span className="dash-mobile-nav-label">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Dashboard;
