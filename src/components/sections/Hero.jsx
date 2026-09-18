import { Sparkles, Zap, MessageCircle, Play, Star } from 'lucide-react';
import { SITE_CONFIG } from '../../config/site';
import { getWhatsAppLink } from '../../utils/whatsapp';

export const Hero = ({ onOpenModal }) => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-tag">
          <Sparkles size={16} />
          {SITE_CONFIG.studioTag}
        </div>

        <h1 className="hero-title">
          CINEMATIC AI ADS
          <span className="hero-title-highlight">THAT GROW YOUR BUSINESS</span>
        </h1>

        <p className="hero-description">{SITE_CONFIG.shortTagline}</p>

        <div className="hero-price-anchor">
          <div>
            <div className="price-label">STARTING AT JUST</div>
            <div className="price-amount">{SITE_CONFIG.startingPrice}</div>
          </div>
          <Sparkles size={24} color="#FF4FA3" />
        </div>

        <div className="hero-actions">
          <a href="#pricing" className="btn-primary">
            <Zap size={18} />
            Explore Pricing
          </a>
          <a
            href={getWhatsAppLink("Hi ANU, I'm interested in ordering a cinematic AI advertisement!")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            <MessageCircle size={18} color="#25D366" />
            Chat on WhatsApp
          </a>
        </div>
      </div>

      <div className="hero-visual-container">
        <div className="hero-visual-card">
          <div className="hero-preview-screen">
            <div className="hero-preview-glow"></div>
            <div
              className="hero-play-trigger"
              onClick={() =>
                onOpenModal?.({
                  title: 'TRIANGLEMAX AI Commercial Demo',
                  type: 'Hero Showcase',
                })
              }
            >
              <Play size={32} fill="#FFFFFF" style={{ marginLeft: 4 }} />
            </div>
            <p className="hero-preview-caption">Click to Watch Showcase</p>
          </div>

          <div className="duration-pills">
            <span className="dur-pill">30 SECONDS</span>
            <span className="dur-pill active">45 SECONDS</span>
            <span className="dur-pill">60 SECONDS</span>
          </div>
        </div>

        {/* Floating Feature Badges */}
        <div className="floating-badge floating-badge-1">
          <Zap size={18} color="#FF4FA3" />
          <span>Fast 24-48h Delivery</span>
        </div>
        <div className="floating-badge floating-badge-2">
          <Star size={18} color="#FF4FA3" />
          <span>High-Quality Visuals</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
