import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '../../utils/animations';
import TestimonialCard from './components/TestimonialCard';
import NavDots from './components/NavDots';
import SectionHeader from '../ui/SectionHeader';
import './Testimonials.css';

const TESTIMONIALS = [
  {
    name: 'SARAH MARTINEZ',
    role: 'Working Mom',
    image: '👩‍💼',
    text: 'Health Me helped me find balance in my busy life. The holistic approach to wellness has transformed not just my body, but my entire mindset!',
  },
  {
    name: 'DAVID CHEN',
    role: 'Health Coach',
    image: '👨‍⚕️',
    text: "As a health professional, I appreciate Health Me's evidence-based approach. The programs are scientifically sound and deliver real, lasting results.",
  },
  {
    name: 'MARIA RODRIGUEZ',
    role: 'Wellness Enthusiast',
    image: '👩‍🌾',
    text: 'The personalized nutrition and mindfulness programs at Health Fit have completely changed my relationship with food and stress. I feel amazing!',
  },
];

const Testimonials = () => (
  <motion.section
    id="testimonials"
    className="testimonials"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
    variants={staggerContainer}
  >
    <div className="container">
      <motion.div className="testimonials-header" variants={fadeInUp}>
        <SectionHeader
          preText="REAL STORIES FROM"
          highlight="REAL CUSTOMERS"
          subtitle="Hear what our members have to say about their transformation journey with Health Fit."
        />
      </motion.div>

      <motion.div className="testimonials-grid" variants={staggerContainer}>
        {TESTIMONIALS.map((testimonial, index) => (
          <TestimonialCard key={testimonial.name} {...testimonial} index={index} />
        ))}
      </motion.div>

      <NavDots />
    </div>
  </motion.section>
);

export default Testimonials;
