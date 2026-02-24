import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SubmitButton from '../../ui/SubmitButton';

const CTAButton = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="cta-button"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
    >
      <SubmitButton
        isLoading={false}
        text="Join Now"
        loadingText=""
        className="btn-primary"
        animDelay={0.5}
        onClick={() => navigate('/signup')}
      />
    </motion.div>
  );
};

export default CTAButton;

