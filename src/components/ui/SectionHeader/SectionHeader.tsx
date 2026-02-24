import React from 'react';
import { motion } from 'framer-motion';

export interface SectionHeaderProps {
  /** Text before the highlight, e.g. "DISCOVER YOUR" */
  preText?: string;
  /** Gradient-coloured highlighted words, e.g. "WELLNESS PATH" */
  highlight: string;
  /** Text after the highlight, e.g. "FOR A BETTER TOMORROW" */
  postText?: string;
  /** Paragraph beneath the title */
  subtitle: string;
  /** Center-aligns the text (default: true) */
  center?: boolean;
  /** Extra className on the root div */
  className?: string;
}

/**
 * Shared section heading used across Programs, Plans, Testimonials, WhyUs.
 * Renders:  preText · <gradient highlight> · postText
 *           subtitle paragraph
 *
 * Relies on `.section-title`, `.title-highlight`, `.section-subtitle` global
 * classes defined in `src/index.css`.
 */
const SectionHeader = ({
  preText,
  highlight,
  postText,
  subtitle,
  center = true,
  className = '',
}: SectionHeaderProps) => (
  <div className={`${center ? 'section-header-center' : ''} ${className}`.trim()}>
    <h2 className="section-title">
      {preText}
      <motion.span
        className="title-highlight"
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {highlight}
      </motion.span>
      {postText}
    </h2>
    <p className="section-subtitle">{subtitle}</p>
  </div>
);

export default SectionHeader;
