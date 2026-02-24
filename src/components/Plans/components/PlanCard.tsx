import React from 'react';
import { useNavigate } from 'react-router-dom';
import SubmitButton from '../../ui/SubmitButton';

interface PlanCardProps {
  name: string;
  price: string;
  period: string;
  features: string[];
  popular: boolean;
}

const PlanCard = ({ name, price, period, features, popular }: PlanCardProps) => {
  const navigate = useNavigate();

  return (
    <div className={`plan-card ${popular ? 'popular' : ''}`}>
      {popular && <div className="popular-badge">MOST POPULAR</div>}

      <div className="plan-header">
        <h3 className="plan-name">{name}</h3>
        <div className="plan-price">
          <span className="price-amount">${price}</span>
          <span className="price-period">/{period}</span>
        </div>
      </div>

      <div className="plan-features">
        {features.map((feature, i) => (
          <div key={i} className="feature-item">
            <div className="feature-check">
              <svg width="12" height="12" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="feature-text">{feature}</span>
          </div>
        ))}
      </div>

      <SubmitButton
        isLoading={false}
        text="Join now"
        loadingText=""
        className={`plan-button ${popular ? 'primary' : 'secondary'}`}
        animDelay={0}
        onClick={() => navigate('/signup')}
      />
    </div>
  );
};

export default PlanCard;

