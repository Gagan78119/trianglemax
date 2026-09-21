import React, { useState, useRef } from 'react';
import { 
  Sparkles, 
  Zap, 
  MessageCircle, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  Clock, 
  ArrowDown, 
  Maximize2 
} from 'lucide-react';
import { getWhatsAppLink } from '../../utils/whatsapp';
import './Hero.css';

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
      title: 'AI Commercial Showcase Demo',
      desc: 'Watch our flagship AI commercial in full high-definition quality.',
      videoUrl: '/aivideosdemo/CinematicAds7.mp4',
    });
  };

  const whatsappMessage = "Hi ANU! I saw your ₹99 AI Video launch offer and I want to order for my business.";

  return (
    <section className="tm-hero-section">
      {/* Ambient background glow */}
      <div className="tm-hero-glow" />

      <div className="tm-hero-container">
        {/* Left Column: Offer Content */}
        <div className="tm-hero-left">
          {/* Top Launch Pill */}
          <div className="tm-hero-launch-badge">
            <span className="tm-hero-badge-icon">🎬</span>
            <span className="tm-hero-badge-text">AI VIDEO – JUST ₹99/-</span>
            <span className="tm-hero-badge-sub">(First time in the world!)</span>
          </div>

          {/* Greeting */}
          <div className="tm-hero-greeting">
            Hello <span className="tm-wave-hand">👋</span>
          </div>

          {/* Subtitle statement */}
          <p className="tm-hero-lead">
            We are a startup company launching AI video creation at only <strong className="tm-price-highlight">₹99/-</strong> per video.
          </p>

          {/* Narrative & Reasoning Box */}
          <div className="tm-hero-story-box">
            <p className="tm-story-text">
              Bayata okka AI video ki <span className="tm-strike">₹499</span>, <span className="tm-strike">₹999</span>, <span className="tm-strike">₹2000</span>, <span className="tm-strike">₹3000</span> varaku charge chesthunnaru. 
              Memu okka AI video ni <strong className="tm-accent-bold">₹99/-</strong> ki istunnam.
            </p>
            <p className="tm-story-reason">
              99/- ki maku profit undadhu, kani memu <strong>BUSINESS client collection</strong> build chesthunnam. Andhuke ee special price.
            </p>
          </div>

          {/* Guarantee Checklist */}
          <div className="tm-hero-guarantees">
            <div className="tm-guarantee-item">
              <CheckCircle2 size={18} className="tm-check-icon" />
              <span>Demo videos check cheyandi</span>
            </div>
            <div className="tm-guarantee-item">
              <CheckCircle2 size={18} className="tm-check-icon" />
              <span>Neeku nachithe matrame payment cheyandi</span>
            </div>
          </div>

          {/* Urgency Pill */}
          <div className="tm-hero-urgency-banner">
            <Clock size={16} className="tm-clock-icon" />
            <span>This offer ends in <strong>24 hours</strong> only!</span>
          </div>

          {/* Gratitude Sign-off */}
          <div className="tm-hero-signoff">
            Thank you <span className="tm-namaste">🙏</span>
          </div>
        </div>


      </div>
    </section>
  );
};

export default Hero;
