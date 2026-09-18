import { CheckCircle2 } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { SITE_CONFIG } from '../../config/site';
import { ABOUT_POINTS } from '../../data/about';

export const AboutSection = () => {
  return (
    <section id="about" className="section">
      <SectionHeading
        badge="BEHIND THE BRAND"
        title="About TRIANGLEMAX"
      />

      <div className="about-card">
        <div className="about-founder-box">
          <div className="founder-avatar-wrap">
            <div className="founder-avatar-inner">
              {SITE_CONFIG.founder.initial}
            </div>
          </div>
          <h3 className="founder-name">{SITE_CONFIG.founder.name}</h3>
          <span className="founder-title">{SITE_CONFIG.founder.title}</span>
        </div>

        <div className="about-content">
          <div className="quote-box">
            {SITE_CONFIG.founder.quote}
          </div>

          <p className="about-text">
            At <strong>{SITE_CONFIG.companyName}</strong>, we bridge the gap between creative storytelling and cutting-edge artificial intelligence. We create premium AI-powered cinematic advertisements that help businesses stand out, attract more customers, and grow their brand with powerful visual storytelling.
          </p>

          <div className="about-points">
            {ABOUT_POINTS.map((point, idx) => (
              <div key={idx} className="about-point-item">
                <CheckCircle2 size={18} color="#FF4FA3" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
