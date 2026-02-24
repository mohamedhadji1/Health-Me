import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { staggerContainer, fadeInLeft } from '../../utils/animations';
import FeatureItem from './components/FeatureItem';
import WhyUsImages from './components/WhyUsImages';
import SubmitButton from '../ui/SubmitButton';
import SectionHeader from '../ui/SectionHeader';
import './WhyUs.css';

const FEATURES = [
  {
    icon: '👩‍⚕️',
    title: 'CERTIFIED HEALTH PROFESSIONALS',
    description: 'Our team includes nutritionists, wellness coaches, and certified trainers dedicated to your holistic health journey.',
  },
  {
    icon: '🧠',
    title: 'SCIENCE-BASED APPROACH',
    description: 'Every program is backed by the latest research in nutrition, exercise science, and behavioral psychology.',
  },
  {
    icon: '🎁',
    title: 'FREE WELLNESS ASSESSMENT',
    description: 'Start with a comprehensive health evaluation to create your personalized wellness roadmap.',
  },
  {
    icon: '🌟',
    title: 'PROVEN SUCCESS METHODS',
    description: 'Join thousands who have achieved lasting health transformations through our evidence-based programs.',
  },
];

const WhyUs = () => {
  const navigate = useNavigate();

  return (
  <motion.section
    id="why-us"
    className="why-us"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
    variants={staggerContainer}
  >
    <div className="container">
      <motion.div className="why-us-content" variants={staggerContainer}>
        <motion.div className="why-us-left" variants={fadeInLeft}>
          <div className="why-us-header">
            <SectionHeader
              preText="WHY HEALTH ME IS"
              highlight="YOUR BEST CHOICE"
              subtitle="We're committed to your long-term wellness success through personalized programs, expert guidance, and a supportive community."
              center={false}
            />
          </div>

          <motion.div className="features-list" variants={staggerContainer}>
            {FEATURES.map((feature) => (
              <FeatureItem key={feature.title} {...feature} />
            ))}
          </motion.div>

          <div className="why-us-buttons">
            <SubmitButton isLoading={false} text="Join Now" loadingText="" className="btn-primary" animDelay={0.5} onClick={() => navigate('/signup')} />
            <SubmitButton isLoading={false} text="Learn More" loadingText="" className="btn-secondary" animDelay={0.6} />
          </div>
        </motion.div>

        <WhyUsImages />
      </motion.div>
    </div>
  </motion.section>
  );
};

export default WhyUs;

