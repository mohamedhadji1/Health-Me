import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SubmitButton from '../../ui/SubmitButton';

interface HeroButtonsProps {
  variants: object;
}

const HeroButtons = ({ variants }: HeroButtonsProps) => {
  const navigate = useNavigate();

  return (
    <motion.div className="hero-buttons" variants={variants}>
      <SubmitButton
        isLoading={false}
        text="Get Started"
        loadingText=""
        className="btn-primary"
        animDelay={0.6}
        onClick={() => navigate('/signup')}
      />
      <SubmitButton
        isLoading={false}
        text="Learn More"
        loadingText=""
        className="btn-secondary"
        animDelay={0.7}
      />
    </motion.div>
  );
};

export default HeroButtons;

