import React from 'react';
import { ArrowRight, Zap, Sparkles } from 'lucide-react';
import './BottomStickyBar.css';

export default function BottomStickyBar({ onBuyNow }) {
  const handleBuyNowClick = (e) => {
    if (e) e.preventDefault();
    if (onBuyNow) {
      onBuyNow();
    } else {
      const el = document.getElementById('pricing');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="tm-sticky-bottom-bar" role="region" aria-label="Special Launch Offer Bar">
      <div className="tm-sticky-bar-container">
        {/* Left Side: Offer Badge & Website Info (Desktop & Tablet) */}
        <div className="tm-sticky-bar-left">
          <div className="tm-sticky-live-badge">
            <span className="tm-sticky-pulse-dot" />
            <span className="tm-sticky-badge-text">SPECIAL LAUNCH OFFER</span>
          </div>
          <div className="tm-sticky-info-group">
            <h4 className="tm-sticky-title">AI Video Creation – Launch Special</h4>
            <span className="tm-sticky-perks-text">
              4K Cinematic Quality <span className="tm-sticky-sep">•</span> 24-48h Delivery <span className="tm-sticky-sep">•</span> Full Commercial Rights
            </span>
          </div>
        </div>

        {/* Right Side: Price + Buy Now CTA (Desktop & Mobile) */}
        <div className="tm-sticky-bar-right">
          <div
            className="tm-sticky-price-wrap"
            onClick={handleBuyNowClick}
            role="button"
            tabIndex={0}
            title="Click to Order at ₹99"
          >
            <div className="tm-sticky-price-top">
              <span className="tm-sticky-strike-price">₹1,999</span>
              <span className="tm-sticky-discount-pill">95% OFF</span>
            </div>
            <div className="tm-sticky-current-price">
              <span className="tm-sticky-currency">₹</span>
              <span className="tm-sticky-amount">99</span>
              <span className="tm-sticky-period">/ video</span>
            </div>
          </div>

          <button
            type="button"
            className="tm-sticky-cta-btn"
            onClick={handleBuyNowClick}
            aria-label="Buy Now for ₹99"
          >
            <Zap size={16} className="tm-sticky-btn-icon" />
            <span className="tm-sticky-cta-text">Buy Now</span>
            <span className="tm-sticky-cta-arrow">
              <ArrowRight size={18} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
