import { Film, MessageCircle, Mail, User, MapPin, Phone } from 'lucide-react';
import { SITE_CONFIG } from '../../config/site';
import { NAV_LINKS } from '../../data/navigation';
import { getWhatsAppLink } from '../../utils/whatsapp';
import InstagramIcon from '../ui/InstagramIcon';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-main">
          {/* Brand & About Column */}
          <div className="footer-brand-col">
            <div className="footer-logo">
              <Film size={26} color="#FF4FA3" />
              <span>
                TRIANGLE<span className="logo-accent">MAX</span>
              </span>
            </div>
            <p className="footer-tagline">{SITE_CONFIG.tagline}</p>
            <div className="footer-socials">
              <a
                href={getWhatsAppLink('Hi ANU!')}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                title="WhatsApp"
                aria-label="WhatsApp"
              >
                <MessageCircle size={20} />
              </a>
              <a
                href={SITE_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                title="Instagram"
                aria-label="Instagram"
              >
                <InstagramIcon size={20} />
              </a>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="social-icon-btn"
                title="Email"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="footer-nav-col">
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-links">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.footerLabel || link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="footer-contact-col">
            <h4 className="footer-col-title">Contact Details</h4>
            <div className="footer-contact-cards">
              <div className="footer-contact-card">
                <div className="contact-icon-pill">
                  <User size={16} />
                </div>
                <div className="contact-meta">
                  <span className="contact-meta-label">Founder</span>
                  <span className="contact-meta-val">{SITE_CONFIG.founder.name}</span>
                </div>
              </div>

              <div className="footer-contact-card">
                <div className="contact-icon-pill">
                  <MapPin size={16} />
                </div>
                <div className="contact-meta">
                  <span className="contact-meta-label">Location</span>
                  <span className="contact-meta-val">{SITE_CONFIG.location}</span>
                </div>
              </div>

              <a href={`tel:${SITE_CONFIG.displayPhone}`} className="footer-contact-card is-link">
                <div className="contact-icon-pill">
                  <Phone size={16} />
                </div>
                <div className="contact-meta">
                  <span className="contact-meta-label">Contact / Phone</span>
                  <span className="contact-meta-val">{SITE_CONFIG.displayPhone}</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">{SITE_CONFIG.copyright}</p>
          <p className="footer-subtext">{SITE_CONFIG.footerSubtext}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
