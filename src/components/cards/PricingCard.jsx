import { CheckCircle2, MessageCircle, ArrowRight, Zap } from 'lucide-react';
import { getWhatsAppLink } from '../../utils/whatsapp';

export const PricingCard = ({
  id,
  durationBadge,
  title,
  subtitle,
  price,
  amountInPaise,
  isPayableOnline = true,
  features,
  popular = false,
  ribbonText = 'MOST POPULAR',
  whatsappMessage,
  ctaLabel = 'BOOK & PAY NOW',
  onSelectPlan,
}) => {
  const planData = {
    id,
    durationBadge,
    title,
    subtitle,
    price,
    amountInPaise,
    features,
  };

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

      {isPayableOnline ? (
        <div className="pricing-card-actions">
          <button
            type="button"
            className="btn-card-checkout"
            onClick={() => onSelectPlan && onSelectPlan(planData)}
            aria-label={`Pay ${price} for ${title}`}
          >
            <Zap size={18} />
            <span>{ctaLabel}</span>
            <ArrowRight size={16} />
          </button>

          <a
            href={getWhatsAppLink(whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-card-whatsapp-secondary"
            title="Chat with us on WhatsApp"
          >
            <MessageCircle size={15} />
            <span>Inquire on WhatsApp</span>
          </a>
        </div>
      ) : (
        <a
          href={getWhatsAppLink(whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-card-whatsapp"
        >
          <MessageCircle size={18} />
          <span>{ctaLabel}</span>
        </a>
      )}
    </div>
  );
};

export default PricingCard;
