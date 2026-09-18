import { useState } from 'react';
import { MessageCircle, Menu, X } from 'lucide-react';
import logo from '../../assets/trianglemax_logo-removebg-preview.png';
import { NAV_LINKS } from '../../data/navigation';
import { getWhatsAppLink } from '../../utils/whatsapp';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        <a href="#" className="logo-link">
          <div className="logo-icon-wrap">
            <img src={logo} alt="TRIANGLEMAX logo" width={42} height={42} />
          </div>
          <div className="logo-text">
            TRIANGLE<span>MAX</span>
          </div>
        </a>

        <nav className="nav-links">
          {NAV_LINKS.map((link) => (
            <div key={link.href} className="nav-item">
              <a href={link.href}>{link.label}</a>
            </div>
          ))}
        </nav>

        <div className="header-cta">

          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="mobile-nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
