import React from 'react';
import { motion } from 'framer-motion';
import HeroText from './components/HeroText';
import HeroStats from './components/HeroStats';
import HeroButtons from './components/HeroButtons';
import HeroImage from './components/HeroImage';
import './Hero.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.3, staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

const Hero = () => (
  <motion.section
    id="home"
    className="hero"
    initial="hidden"
    animate="visible"
    variants={containerVariants}
  >
    <div className="container">
      <div className="hero-content">
        <motion.div className="hero-left" variants={itemVariants}>
          <HeroText variants={itemVariants} />
          <HeroStats variants={itemVariants} />
          <HeroButtons variants={itemVariants} />
        </motion.div>
        <HeroImage variants={itemVariants} />
      </div>
    </div>
  </motion.section>
);

export default Hero;
