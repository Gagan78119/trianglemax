import { CheckCircle2, MessageCircle, ArrowRight, Zap, ShieldCheck, Sparkles, Lock } from 'lucide-react';
import { getWhatsAppLink } from '../../utils/whatsapp';

export const PricingCard = ({
  id,
  durationBadge,
  title,
  subtitle,
  price,
  originalPrice,
  discountBadge,
  amountInPaise,
  isPayableOnline = true,
  features,
  popular = true,
  ribbonText = 'LIMITED TIME LAUNCH DEAL',
  whatsappMessage,
  ctaLabel = 'BOOK & PAY NOW (₹99)',
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
    <div className={`pricing-card single-flagship-card ${popular ? 'popular' : ''}`}>
      {popular && (
        <div className="popular-ribbon">
          <Sparkles size={13} style={{ marginRight: 5 }} />
          {ribbonText}
        </div>
      )}

      <div className="card-header single-card-header">
        <div className="single-card-top-meta">
          <div className="duration-badge">{durationBadge}</div>
          {discountBadge && <div className="discount-tag-pill">{discountBadge}</div>}
        </div>

        <h3 className="card-title">{title}</h3>
        <div className="card-subtitle">{subtitle}</div>

        <div className="card-price-wrap">
          {originalPrice && <span className="card-original-price">{originalPrice}</span>}
          <div className="card-price">
            {price}
            <span className="card-price-suffix">/ complete ad</span>
          </div>
        </div>

        <div className="card-delivery-banner">
          <Zap size={15} color="#FF4FA3" />
          <span>Express 24-48h Delivery • 100% Commercial Rights</span>
        </div>
      </div>

      <div className="single-features-header">
        <span>WHAT'S INCLUDED IN YOUR PACKAGE:</span>
      </div>

      <ul className="features-list single-features-grid">
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
            className="btn-card-checkout single-card-btn"
            onClick={() => onSelectPlan && onSelectPlan(planData)}
            aria-label={`Pay ${price} for ${title}`}
          >
            <Zap size={20} />
            <span>{ctaLabel}</span>
            <ArrowRight size={18} />
          </button>

          <div className="pricing-security-strip">
            <div className="sec-pill">
              <Lock size={12} />
              <span>Instant Confirmation</span>
            </div>
            <div className="sec-pill">
              <ShieldCheck size={13} />
              <span>PhonePe 256-bit Encrypted</span>
            </div>
          </div>
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
