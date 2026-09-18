import { CheckCircle2, MessageCircle } from 'lucide-react';
import { getWhatsAppLink } from '../../utils/whatsapp';

export const PricingCard = ({
  durationBadge,
  title,
  subtitle,
  price,
  features,
  popular = false,
  ribbonText = 'MOST POPULAR',
  whatsappMessage,
  ctaLabel = 'GET STARTED',
}) => {
  return (
    <div className={`pricing-card ${popular ? 'popular' : ''}`}>
      {popular && <div className="popular-ribbon">{ribbonText}</div>}
      <div className="card-header">
        <div className="duration-badge">{durationBadge}</div>
        <h3 className="card-title">{title}</h3>
        <div className="card-subtitle">{subtitle}</div>
        <div className="card-price">
          {price}<span>/-</span>
        </div>
      </div>

      <ul className="features-list">
        {features.map((feature, idx) => (
          <li key={idx} className="feature-item">
            <div className="feature-icon">
              <CheckCircle2 size={14} />
            </div>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <a
        href={getWhatsAppLink(whatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-card-whatsapp"
      >
        <MessageCircle size={18} />
        {ctaLabel}
      </a>
    </div>
  );
};

export default PricingCard;
