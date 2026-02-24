import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, cardEntrance } from '../../utils/animations';
import ProgramCard from './components/ProgramCard';
import SectionHeader from '../ui/SectionHeader';
import './Programs.css';

const PROGRAMS = [
  {
    icon: '🏃‍♀️',
    title: 'Cardio Wellness',
    description: 'Boost your cardiovascular health with dynamic workouts designed to improve endurance and heart health.',
    gradient: 'orange-red',
  },
  {
    icon: '🧘‍♂️',
    title: 'Mindful Movement',
    description: 'Combine physical activity with mindfulness through yoga, pilates, and meditation-based exercises.',
    gradient: 'blue-purple',
  },
  {
    icon: '🏋️',
    title: 'Strength & Mobility',
    description: 'Build functional strength while improving flexibility and joint mobility for everyday activities.',
    gradient: 'green-blue',
  },
  {
    icon: '🌱',
    title: 'Holistic Health',
    description: 'A comprehensive approach to wellness including nutrition guidance, stress management, and lifestyle coaching.',
    gradient: 'purple-pink',
  },
];

const Programs = () => (
  <motion.section
    id="programs"
    className="programs"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
    variants={staggerContainer}
  >
    <div className="container">
      <motion.div className="programs-header" variants={cardEntrance}>
        <SectionHeader
          preText="DISCOVER YOUR"
          highlight="WELLNESS PATH"
          subtitle="Choose from our scientifically-backed wellness programs designed to support your unique health journey and lifestyle goals."
        />
      </motion.div>

      <motion.div className="programs-grid" variants={staggerContainer}>
        {PROGRAMS.map((program, index) => (
          <ProgramCard key={program.title} {...program} index={index} variants={cardEntrance} />
        ))}
      </motion.div>
    </div>
  </motion.section>
);

export default Programs;
