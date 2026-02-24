import React from 'react';
import { motion } from 'framer-motion';
import { scaleIn } from '../../../utils/animations';

interface TestimonialCardProps {
  name: string;
  role: string;
  image: string;
  text: string;
  index: number;
}

const TestimonialCard = ({ name, role, image, text, index }: TestimonialCardProps) => (
  <motion.div
    className="testimonial-card"
    variants={scaleIn}
    whileHover={{ y: -10, scale: 1.02, boxShadow: '0 25px 50px rgba(0,0,0,0.15)' }}
    transition={{ type: 'spring', stiffness: 300 }}
  >
    <motion.div
      className="quote-icon"
      initial={{ rotate: -180, scale: 0 }}
      whileInView={{ rotate: 0, scale: 1 }}
      transition={{ delay: index * 0.2, type: 'spring' }}
    >
      <motion.svg
        width="32"
        height="32"
        fill="currentColor"
        viewBox="0 0 24 24"
        whileHover={{ scale: 1.2, rotate: 15 }}
        transition={{ type: 'spring', stiffness: 400 }}
      >
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </motion.svg>
    </motion.div>

    <motion.p
      className="testimonial-text"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 + 0.3 }}
    >
      "{text}"
    </motion.p>

    <motion.div
      className="testimonial-author"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 + 0.5 }}
    >
      <motion.div
        className="author-avatar"
        whileHover={{ scale: 1.2, rotate: 360 }}
        transition={{ duration: 0.6 }}
      >
        <span>{image}</span>
      </motion.div>
      <div className="author-info">
        <div className="author-name">{name}</div>
        <div className="author-role">{role}</div>
      </div>
    </motion.div>
  </motion.div>
);

export default TestimonialCard;
