import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, cardEntrance } from '../../utils/animations';
import PlanCard from './components/PlanCard';
import SectionHeader from '../ui/SectionHeader';
import './Plans.css';

const PLANS = [
  {
    name: 'WELLNESS STARTER',
    price: '29',
    period: 'month',
    features: [
      'Access to all group classes',
      'Monthly health assessment',
      'Nutrition guidance basics',
      'Community support access',
    ],
    popular: false,
  },
  {
    name: 'HEALTH OPTIMIZER',
    price: '59',
    period: 'month',
    features: [
      'Unlimited facility access',
      'Personal wellness coaching',
      'Custom meal planning',
      'Stress management sessions',
      'Progress tracking tools',
    ],
    popular: true,
  },
  {
    name: 'TOTAL TRANSFORMATION',
    price: '89',
    period: 'month',
    features: [
      'One-on-one health coaching',
      'Comprehensive health screening',
      'Personalized supplement plan',
      'Recovery & spa services',
      'VIP member benefits',
    ],
    popular: false,
  },
];

const Plans = () => (
  <motion.section
    id="plans"
    className="plans"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    variants={staggerContainer}
  >
    <div className="container">
      <motion.div className="plans-header" variants={cardEntrance}>
        <SectionHeader
          preText="INVEST IN YOUR"
          highlight="HEALTH TODAY"
          postText="FOR A BETTER TOMORROW"
          subtitle="Select the wellness plan that aligns with your health goals and lifestyle. Every plan includes access to our expert-led programs and supportive community."
        />
      </motion.div>

      <div className="plans-grid">
        {PLANS.map((plan) => (
          <PlanCard key={plan.name} {...plan} />
        ))}
      </div>
    </div>
  </motion.section>
);

export default Plans;
