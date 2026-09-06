import React, { useState } from 'react';
import {
  MessageCircle,
  Play,
  CheckCircle2,
  Sparkles,
  Zap,
  Award,
  Video,
  Film,
  Mail,
  Phone,
  ChevronRight,
  ShieldCheck,
  Star,
  Clock,
  Send,
  X,
  Menu,
  Clapperboard,
  MapPin,
  User
} from 'lucide-react';
import logo from "./assets/trianglemax_logo-removebg-preview.png"
import './App.css';

const InstagramIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  
  // Interactive Inquiry Form State
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryBusiness, setInquiryBusiness] = useState('');
  const [inquiryDuration, setInquiryDuration] = useState('45s (₹749)');
  const [inquiryNote, setInquiryNote] = useState('');

  const WHATSAPP_NUMBER = '917989736006';
  const INSTAGRAM_URL = 'https://www.instagram.com/trianglemax?igsh=MWQ5b21zZHFreGh0ZQ==';

  const getWhatsAppLink = (customText) => {
    const text = customText || "Hi ANU, I'd like to get a high-converting AI Cinematic Ad for my business from TRIANGLEMAX!";
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    const message = `Hi ANU! I want to order an AI Cinematic Ad for my business.\n\n` +
      `👤 Name: ${inquiryName || 'Not specified'}\n` +
      `🏢 Business: ${inquiryBusiness || 'Not specified'}\n` +
      `⏱️ Package: ${inquiryDuration}\n` +
      `💬 Details: ${inquiryNote || 'No additional details'}`;
    
    window.open(getWhatsAppLink(message), '_blank');
  };

  return (
    <div className="app-container">
      {/* 1. STICKY HEADER */}
      <header className="header">
        <div className="header-container">
          <a href="#" className="logo-link">
            <div className="logo-icon-wrap">
              <img src={logo} alt="" width={42} height={42}/>
            </div>
            <div className="logo-text">
              TRIANGLE<span>MAX</span>
            </div>
          </a>

          <nav className="nav-links">
            <div className="nav-item"><a href="#pricing">Pricing</a></div>
            <div className="nav-item"><a href="#services">Services</a></div>
            <div className="nav-item"><a href="#why-us">Why Choose Us</a></div>
            <div className="nav-item"><a href="#about">About CEO</a></div>
            <div className="nav-item"><a href="#contact">Contact</a></div>
          </nav>

          <div className="header-cta">
            <a
              href={getWhatsAppLink("Hi ANU! SAY HI from TRIANGLEMAX website.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp-sm"
            >
              <MessageCircle size={18} />
              SAY HI
            </a>
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
            <a href="#pricing" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
            <a href="#services" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Services</a>
            <a href="#why-us" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Why Choose Us</a>
            <a href="#about" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>About CEO</a>
            <a href="#contact" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Contact</a>
          </div>
        )}
      </header>

      {/* 2. HERO SECTION */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-tag">
            <Sparkles size={16} />
            AI CINEMATIC ADVERTISING STUDIO
          </div>

          <h1 className="hero-title">
            CINEMATIC AI ADS
            <span className="hero-title-highlight">THAT GROW YOUR BUSINESS</span>
          </h1>

          <p className="hero-description">
            Turning Ideas Into Cinematic AI Experiences. We craft premium, high-converting AI commercial video ads that help businesses stand out and drive massive growth.
          </p>

          <div className="hero-price-anchor">
            <div>
              <div className="price-label">STARTING AT JUST</div>
              <div className="price-amount">₹499/-</div>
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
                onClick={() => setActiveModal({
                  title: 'TRIANGLEMAX AI Commercial Demo',
                  type: 'Hero Showcase'
                })}
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

      {/* 3. PRICING CARDS SECTION (IMMEDIATELY AFTER HERO) */}
      <section id="pricing" className="section pricing-section">
        <div className="section-header">
          <div className="section-badge">TRANSPARENT PRICING</div>
          <h2 className="section-title">Affordable AI Cinematic Packages</h2>
          <p className="section-subtitle">
            Get ultra-high-quality cinematic video advertisements crafted to boost your brand conversions without breaking the bank.
          </p>
        </div>

        <div className="pricing-grid">
          {/* Card 1: 30 Seconds */}
          <div className="pricing-card">
            <div className="card-header">
              <div className="duration-badge">30s</div>
              <h3 className="card-title">30 Seconds</h3>
              <div className="card-subtitle">PERFECT FOR Quick Promotions</div>
              <div className="card-price">₹499<span>/-</span></div>
            </div>

            <ul className="features-list">
              <li className="feature-item">
                <div className="feature-icon"><CheckCircle2 size={14} /></div>
                <span>AI Cinematic Ad</span>
              </li>
              <li className="feature-item">
                <div className="feature-icon"><CheckCircle2 size={14} /></div>
                <span>High-Quality Visuals</span>
              </li>
              <li className="feature-item">
                <div className="feature-icon"><CheckCircle2 size={14} /></div>
                <span>Fast Delivery</span>
              </li>
              <li className="feature-item">
                <div className="feature-icon"><CheckCircle2 size={14} /></div>
                <span>Social Media Ready</span>
              </li>
            </ul>

            <a
              href={getWhatsAppLink("Hi ANU, I want to order the 30 Seconds AI Cinematic Ad package for ₹499.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-card-whatsapp"
            >
              <MessageCircle size={18} />
              GET STARTED
            </a>
          </div>

          {/* Card 2: 45 Seconds (MOST POPULAR) */}
          <div className="pricing-card popular">
            <div className="popular-ribbon">MOST POPULAR</div>
            <div className="card-header">
              <div className="duration-badge">45s</div>
              <h3 className="card-title">45 Seconds</h3>
              <div className="card-subtitle">PERFECT FOR Business Growth</div>
              <div className="card-price">₹749<span>/-</span></div>
            </div>

            <ul className="features-list">
              <li className="feature-item">
                <div className="feature-icon"><CheckCircle2 size={14} /></div>
                <span>AI Cinematic Ad</span>
              </li>
              <li className="feature-item">
                <div className="feature-icon"><CheckCircle2 size={14} /></div>
                <span>Premium Quality Visuals</span>
              </li>
              <li className="feature-item">
                <div className="feature-icon"><CheckCircle2 size={14} /></div>
                <span>Fast Delivery (24-48 Hrs)</span>
              </li>
              <li className="feature-item">
                <div className="feature-icon"><CheckCircle2 size={14} /></div>
                <span>Social Media Ready (9:16 & 16:9)</span>
              </li>
            </ul>

            <a
              href={getWhatsAppLink("Hi ANU, I want to order the 45 Seconds (Most Popular) AI Cinematic Ad package for ₹749.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-card-whatsapp"
            >
              <MessageCircle size={18} />
              GET STARTED NOW
            </a>
          </div>

          {/* Card 3: 60 Seconds */}
          <div className="pricing-card">
            <div className="card-header">
              <div className="duration-badge">60s</div>
              <h3 className="card-title">60 Seconds</h3>
              <div className="card-subtitle">PERFECT FOR Brand Impact</div>
              <div className="card-price">₹999<span>/-</span></div>
            </div>

            <ul className="features-list">
              <li className="feature-item">
                <div className="feature-icon"><CheckCircle2 size={14} /></div>
                <span>AI Cinematic Ad</span>
              </li>
              <li className="feature-item">
                <div className="feature-icon"><CheckCircle2 size={14} /></div>
                <span>Ultra Premium Quality</span>
              </li>
              <li className="feature-item">
                <div className="feature-icon"><CheckCircle2 size={14} /></div>
                <span>Fast Delivery</span>
              </li>
              <li className="feature-item">
                <div className="feature-icon"><CheckCircle2 size={14} /></div>
                <span>Social Media Ready</span>
              </li>
            </ul>

            <a
              href={getWhatsAppLink("Hi ANU, I want to order the 60 Seconds AI Cinematic Ad package for ₹999.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-card-whatsapp"
            >
              <MessageCircle size={18} />
              GET STARTED
            </a>
          </div>
        </div>

        {/* Trust Badges Ribbon */}
        <div className="trust-ribbon-bar">
          <div className="trust-item">
            <Video size={20} />
            <span>PROFESSIONAL AI ADS</span>
          </div>
          <div className="trust-item">
            <Zap size={20} />
            <span>FAST DELIVERY</span>
          </div>
          <div className="trust-item">
            <Star size={20} />
            <span>PREMIUM QUALITY</span>
          </div>
          <div className="trust-item">
            <Award size={20} />
            <span>AFFORDABLE PRICES</span>
          </div>
          <div className="trust-item">
            <ShieldCheck size={20} />
            <span>100% SATISFACTION</span>
          </div>
        </div>
      </section>

      {/* 4. SERVICES SECTION */}
      <section id="services" className="section">
        <div className="section-header">
          <div className="section-badge">OUR EXPERTISE</div>
          <h2 className="section-title">What We Create For You</h2>
          <p className="section-subtitle">
            Tailored AI video production services built specifically to increase customer engagement and drive conversions across all digital platforms.
          </p>
        </div>

        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon-box">
              <Clapperboard size={28} />
            </div>
            <h3 className="service-title">AI Cinematic Ads</h3>
            <p className="service-desc">
              Stunning AI generated cinematic videos with movie-grade lighting, camera motion, and compelling visual storytelling.
            </p>
            <button
              className="service-action-btn"
              onClick={() => setActiveModal({
                title: 'AI Cinematic Ads',
                desc: 'Stunning AI generated cinematic videos tailored for high brand engagement.'
              })}
            >
              Preview Style <ChevronRight size={16} />
            </button>
          </div>

          <div className="service-card">
            <div className="service-icon-box">
              <Sparkles size={28} />
            </div>
            <h3 className="service-title">Brand Promotions</h3>
            <p className="service-desc">
              Creative promo commercials designed to build brand authority, trust, and lasting customer awareness.
            </p>
            <button
              className="service-action-btn"
              onClick={() => setActiveModal({
                title: 'Brand Promotions',
                desc: 'Creative promos designed to establish strong brand presence.'
              })}
            >
              Preview Style <ChevronRight size={16} />
            </button>
          </div>

          <div className="service-card">
            <div className="service-icon-box">
              <Video size={28} />
            </div>
            <h3 className="service-title">Social Media Ads</h3>
            <p className="service-desc">
              High converting ads optimized for Instagram Reels, YouTube Shorts, TikTok, and Meta Ad campaigns.
            </p>
            <button
              className="service-action-btn"
              onClick={() => setActiveModal({
                title: 'Social Media Ads',
                desc: 'Vertical 9:16 and 16:9 formats optimized for viral social media Reach.'
              })}
            >
              Preview Style <ChevronRight size={16} />
            </button>
          </div>

          <div className="service-card">
            <div className="service-icon-box">
              <Award size={28} />
            </div>
            <h3 className="service-title">Product Ads</h3>
            <p className="service-desc">
              Showcase your e-commerce or physical products in a mesmerizing 3D cinematic style that boosts sales.
            </p>
            <button
              className="service-action-btn"
              onClick={() => setActiveModal({
                title: 'Product Ads',
                desc: 'Product showcases designed to highlight features and drive sales.'
              })}
            >
              Preview Style <ChevronRight size={16} />
            </button>
          </div>

          <div className="service-card">
            <div className="service-icon-box">
              <Zap size={28} />
            </div>
            <h3 className="service-title">Business Launch</h3>
            <p className="service-desc">
              Perfect grand opening video commercials designed to announce your new business, launch, or startup.
            </p>
            <button
              className="service-action-btn"
              onClick={() => setActiveModal({
                title: 'Business Launch Videos',
                desc: 'Impactful launch commercials for grand openings and brand launches.'
              })}
            >
              Preview Style <ChevronRight size={16} />
            </button>
          </div>

          <div className="service-card">
            <div className="service-icon-box">
              <Film size={28} />
            </div>
            <h3 className="service-title">Festival Offers</h3>
            <p className="service-desc">
              High-energy promotional commercials tailored specifically for festival discounts, holiday sales, and special campaigns.
            </p>
            <button
              className="service-action-btn"
              onClick={() => setActiveModal({
                title: 'Festival Offers & Campaigns',
                desc: 'Special seasonal and festival promotional videos for quick customer conversions.'
              })}
            >
              Preview Style <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE TRIANGLEMAX */}
      <section id="why-us" className="section why-us-section">
        <div className="section-header">
          <div className="section-badge">THE TRIANGLEMAX ADVANTAGE</div>
          <h2 className="section-title">Why Choose TRIANGLEMAX</h2>
          <p className="section-subtitle">
            We combine high-end aesthetic vision with affordable pricing to deliver commercial-grade AI video ads that deliver real results.
          </p>
        </div>

        <div className="why-grid">
          <div className="why-card">
            <div className="why-icon-wrap">
              <Award size={28} />
            </div>
            <h3 className="why-title">Affordable Luxury</h3>
            <p className="why-desc">
              Agency-quality AI cinematic video ads starting at just ₹499. Big brand looks without the massive budget.
            </p>
          </div>

          <div className="why-card">
            <div className="why-icon-wrap">
              <Clock size={28} />
            </div>
            <h3 className="why-title">Rapid Turnaround</h3>
            <p className="why-desc">
              We respect your timelines. Receive your fully edited, polished AI video commercial within 24 to 48 hours.
            </p>
          </div>

          <div className="why-card">
            <div className="why-icon-wrap">
              <Video size={28} />
            </div>
            <h3 className="why-title">Social Media Ready</h3>
            <p className="why-desc">
              Delivered in multi-platform resolutions (9:16 portrait for Reels/Shorts and 16:9 widescreen for Web/YouTube).
            </p>
          </div>

          <div className="why-card">
            <div className="why-icon-wrap">
              <Sparkles size={28} />
            </div>
            <h3 className="why-title">Custom AI Storytelling</h3>
            <p className="why-desc">
              Tailored visual narratives, professional AI voiceovers, sound design, and custom background scoring.
            </p>
          </div>

          <div className="why-card">
            <div className="why-icon-wrap">
              <ShieldCheck size={28} />
            </div>
            <h3 className="why-title">100% Satisfaction</h3>
            <p className="why-desc">
              We focus on perfection. We ensure every frame aligns with your vision and business growth goals.
            </p>
          </div>

          <div className="why-card">
            <div className="why-icon-wrap">
              <Zap size={28} />
            </div>
            <h3 className="why-title">Conversion Focused</h3>
            <p className="why-desc">
              Designed from the ground up to hook viewers in the first 3 seconds and drive clicks, calls, and sales.
            </p>
          </div>
        </div>
      </section>

      {/* 6. ABOUT SECTION (CEO ANU) */}
      <section id="about" className="section">
        <div className="section-header">
          <div className="section-badge">BEHIND THE BRAND</div>
          <h2 className="section-title">About TRIANGLEMAX</h2>
        </div>

        <div className="about-card">
          <div className="about-founder-box">
            <div className="founder-avatar-wrap">
              <div className="founder-avatar-inner">
                S
              </div>
            </div>
            <h3 className="founder-name">SURENDRA CHOWDARY RAVIPATI</h3>
            <span className="founder-title">CEO & Founder</span>
          </div>

          <div className="about-content">
            <div className="quote-box">
              "Creative AI Ads That Make Your Brand Unstoppable."
            </div>

            <p className="about-text">
              At <strong>TRIANGLEMAX</strong>, we bridge the gap between creative storytelling and cutting-edge artificial intelligence. We create premium AI-powered cinematic advertisements that help businesses stand out, attract more customers, and grow their brand with powerful visual storytelling.
            </p>

            <div className="about-points">
              <div className="about-point-item">
                <CheckCircle2 size={18} color="#FF4FA3" />
                <span>Freelancer Agility & Dedication</span>
              </div>
              <div className="about-point-item">
                <CheckCircle2 size={18} color="#FF4FA3" />
                <span>Quality & Creativity in Every Project</span>
              </div>
              <div className="about-point-item">
                <CheckCircle2 size={18} color="#FF4FA3" />
                <span>Your Vision, Our AI Creation</span>
              </div>
              <div className="about-point-item">
                <CheckCircle2 size={18} color="#FF4FA3" />
                <span>Fast & Reliable Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CONTACT SECTION */}
      <section id="contact" className="section">
        <div className="section-header">
          <div className="section-badge">GET IN TOUCH</div>
          <h2 className="section-title">Let's Create Your Next Cinematic Ad</h2>
          <p className="section-subtitle">
            Ready to transform your business with powerful AI commercials? Message us directly on WhatsApp or drop us an email!
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-channels">
            <a
              href={getWhatsAppLink("Hi ANU! I'd like to get in touch about an AI cinematic ad.")}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card-item"
            >
              <div className="contact-icon-wrap wa">
                <MessageCircle size={26} />
              </div>
              <div className="contact-info-text">
                <label>WhatsApp Us (Say HI)</label>
                <p>7989736006</p>
              </div>
            </a>

            <a
              href="mailto:trianglemaxx@gmail.com"
              className="contact-card-item"
            >
              <div className="contact-icon-wrap mail">
                <Mail size={26} />
              </div>
              <div className="contact-info-text">
                <label>Email Support</label>
                <p>trianglemaxx@gmail.com</p>
              </div>
            </a>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card-item"
            >
              <div className="contact-icon-wrap ig">
                <InstagramIcon size={26} />
              </div>
              <div className="contact-info-text">
                <label>Follow On Instagram</label>
                <p>@trianglemax</p>
              </div>
            </a>
          </div>

          {/* Quick Inquiry Form */}
          <div className="inquiry-builder-card">
            <h3 className="inquiry-title">Quick Project Inquiry</h3>
            <p className="inquiry-desc">
              Fill in your project details to build an instant WhatsApp inquiry message.
            </p>

            <form onSubmit={handleInquirySubmit}>
              <div className="form-group">
                <label className="form-label">Your Name</label>
                <input
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  className="form-input"
                  value={inquiryName}
                  onChange={(e) => setInquiryName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Business / Brand Name</label>
                <input
                  type="text"
                  placeholder="e.g. Apex Fitness Studio"
                  className="form-input"
                  value={inquiryBusiness}
                  onChange={(e) => setInquiryBusiness(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Select Package</label>
                <div className="duration-selector-btns">
                  <button
                    type="button"
                    className={`dur-select-btn ${inquiryDuration.startsWith('30s') ? 'selected' : ''}`}
                    onClick={() => setInquiryDuration('30s (₹499)')}
                  >
                    30s — ₹499
                  </button>
                  <button
                    type="button"
                    className={`dur-select-btn ${inquiryDuration.startsWith('45s') ? 'selected' : ''}`}
                    onClick={() => setInquiryDuration('45s (₹749)')}
                  >
                    45s — ₹749
                  </button>
                  <button
                    type="button"
                    className={`dur-select-btn ${inquiryDuration.startsWith('60s') ? 'selected' : ''}`}
                    onClick={() => setInquiryDuration('60s (₹999)')}
                  >
                    60s — ₹999
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Ad Goals / Notes (Optional)</label>
                <textarea
                  placeholder="Tell us a little bit about what you want to promote..."
                  rows="3"
                  className="form-textarea"
                  value={inquiryNote}
                  onChange={(e) => setInquiryNote(e.target.value)}
                ></textarea>
              </div>

              <button type="submit" className="btn-card-whatsapp" style={{ width: '100%' }}>
                <Send size={18} />
                Send Inquiry via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 8. MINIMAL FOOTER */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-main">
            {/* Brand & About Column */}
            <div className="footer-brand-col">
              <div className="footer-logo">
                <Film size={26} color="#FF4FA3" />
                <span>TRIANGLE<span className="logo-accent">MAX</span></span>
              </div>
              <p className="footer-tagline">
                Turning Ideas Into Cinematic AI Experiences. High-converting video ads engineered for modern brands.
              </p>
              <div className="footer-socials">
                <a
                  href={getWhatsAppLink("Hi ANU!")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn"
                  title="WhatsApp"
                  aria-label="WhatsApp"
                >
                  <MessageCircle size={20} />
                </a>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn"
                  title="Instagram"
                  aria-label="Instagram"
                >
                  <InstagramIcon size={20} />
                </a>
                <a
                  href="mailto:trianglemaxx@gmail.com"
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
                <li><a href="#pricing">Pricing Plans</a></li>
                <li><a href="#services">Our Services</a></li>
                <li><a href="#why-us">Why Choose Us</a></li>
                <li><a href="#about">About CEO</a></li>
                <li><a href="#contact">Get In Touch</a></li>
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
                    <span className="contact-meta-val">SURENDRA CHOWDARY RAVIPATI</span>
                  </div>
                </div>

                <div className="footer-contact-card">
                  <div className="contact-icon-pill">
                    <MapPin size={16} />
                  </div>
                  <div className="contact-meta">
                    <span className="contact-meta-label">Location</span>
                    <span className="contact-meta-val">ONGOLE</span>
                  </div>
                </div>

                <a href="tel:7989736006" className="footer-contact-card is-link">
                  <div className="contact-icon-pill">
                    <Phone size={16} />
                  </div>
                  <div className="contact-meta">
                    <span className="contact-meta-label">Contact / Phone</span>
                    <span className="contact-meta-val">7989736006</span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="copyright">
              © 2026 TRIANGLEMAX. All Rights Reserved.
            </p>
            <p className="footer-subtext">
              Cinematic AI Commercials & Ad Production
            </p>
          </div>
        </div>
      </footer>

      {/* DEMO / STYLE PREVIEW MODAL */}
      {activeModal && (
        <div className="modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setActiveModal(null)}>
              <X size={20} />
            </button>
            <div className="modal-header">
              <h3 className="modal-title">{activeModal.title}</h3>
            </div>
            <div className="modal-video-placeholder">
              <Film size={48} color="#FF85C8" />
              <h4 style={{ fontSize: 18 }}>{activeModal.desc || 'AI Cinematic Commercial Demonstration'}</h4>
              <p style={{ fontSize: 13, color: '#FFD8EC' }}>
                Custom video files can be easily linked here by replacing this video preview frame.
              </p>
              <a
                href={getWhatsAppLink(`Hi ANU! I liked the ${activeModal.title} style and want to order an ad for my brand.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ marginTop: 10, padding: '12px 24px', fontSize: 14 }}
              >
                Order This Ad Style on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
