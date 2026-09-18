import { useState, useRef } from 'react';
import { Sparkles, Zap, MessageCircle, Play, Pause, Volume2, VolumeX, Star, ArrowRight, Maximize2 } from 'lucide-react';
import { SITE_CONFIG } from '../../config/site';
import { getWhatsAppLink } from '../../utils/whatsapp';

export const Hero = ({ onOpenModal }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleOpenShowcase = () => {
    onOpenModal?.({
      title: 'TRIANGLEMAX AI Cinematic Ad Demo',
      type: 'Hero Showcase',
      videoUrl: '/aivideosdemo/CinematicAds7.mp4',
      desc: 'Watch our flagship ultra-high-definition AI commercial in full cinematic quality.',
    });
  };

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
          <a href="#pricing" className="btn-primary btn-book-pay-hero">
            <Zap size={18} />
            <span>BOOK & PAY NOW</span>
            <ArrowRight size={16} />
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
          <div className="hero-video-player-frame">
            {/* Ambient Background Glow */}
            <div className="hero-video-ambient-glow" />

            {/* Video Element */}
            <video
              ref={videoRef}
              src="/aivideosdemo/CinematicAds7.mp4"
              className="hero-video-element"
              autoPlay
              muted={isMuted}
              loop
              playsInline
              onClick={togglePlay}
            />

            {/* Top Glass Info Pill */}
            <div className="hero-video-top-bar">
              <div className="live-status-badge">
                <span className="live-dot"></span>
                <span>AI CINEMATIC REEL</span>
              </div>
              <div className="resolution-badge">4K UHD</div>
            </div>

            {/* Center Play Overlay when Paused */}
            {!isPlaying && (
              <div className="hero-video-center-overlay" onClick={togglePlay}>
                <div className="hero-play-icon-wrap">
                  <Play size={32} fill="#FFFFFF" style={{ marginLeft: 3 }} />
                </div>
                <span className="hero-overlay-text">Paused • Tap to Play</span>
              </div>
            )}

            {/* Bottom Controls Bar */}
            <div className="hero-video-controls-bar">
              <div className="controls-left">
                <button
                  type="button"
                  className="hero-control-btn"
                  onClick={togglePlay}
                  title={isPlaying ? 'Pause' : 'Play'}
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} fill="currentColor" />}
                </button>

                <button
                  type="button"
                  className={`hero-control-btn ${!isMuted ? 'active-audio' : ''}`}
                  onClick={toggleMute}
                  title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  <span className="control-btn-label">{isMuted ? 'Tap for Sound' : 'Audio On'}</span>
                </button>
              </div>

              <div className="controls-right">
                <button
                  type="button"
                  className="hero-control-btn expand-btn"
                  onClick={handleOpenShowcase}
                  title="Expand Fullscreen Showcase"
                  aria-label="Expand Showcase"
                >
                  <Maximize2 size={15} />
                  <span className="control-btn-label">Full Showcase</span>
                </button>
              </div>
            </div>
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
