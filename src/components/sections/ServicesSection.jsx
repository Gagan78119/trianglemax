import React, { useState, useRef, useEffect } from 'react';
import { ArrowUpRight, Volume2, VolumeX, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { SERVICES } from '../../data/services';
import './ServicesSection.css';

export const ServicesSection = ({ onOpenModal }) => {
  const scrollRef = useRef(null);
  const [unmutedId, setUnmutedId] = useState(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Monitor scroll state for left / right buttons
  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 15);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 15);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const handleScroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = 340; // Card width + gap
    const target = direction === 'left' ? -scrollAmount : scrollAmount;
    scrollRef.current.scrollBy({ left: target, behavior: 'smooth' });
  };

  const handleToggleSound = (e, id) => {
    e.stopPropagation();
    setUnmutedId((prev) => (prev === id ? null : id));
  };

  const handleCardClick = (service) => {
    if (onOpenModal) {
      onOpenModal({
        title: service.modalTitle || service.title,
        desc: service.modalDesc || service.description,
        videoUrl: service.videoUrl,
      });
    }
  };

  return (
    <section className="tm-services-section" id="services">
      {/* Subtle Glow */}
      <div className="tm-services-ambient-glow" />

      {/* Section Header */}
      <div className="tm-services-header">
        <div className="tm-services-badge">
          <Sparkles size={13} className="tm-badge-sparkle" />
          <span>OUR SPECIALIZED SERVICES</span>
        </div>
        <h2 className="tm-services-title">
          create cinematic ads <br />
          <span className="tm-title-highlight">for your brand.</span>
        </h2>
        <p className="tm-services-subtitle">
          This program turns your raw ideas into polished, attention-grabbing cinematic advertisements that speak directly to your audience.
        </p>
      </div>

      {/* Gallery Carousel Container */}
      <div className="tm-gallery-stage">
        {/* Floating Left Button */}
        <button
          type="button"
          className={"tm-gallery-arrow tm-arrow-left" + (!canScrollLeft ? " is-disabled" : "")}
          onClick={() => handleScroll('left')}
          disabled={!canScrollLeft}
          aria-label="Scroll left to previous video"
          title="Previous Video"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Floating Right Button */}
        <button
          type="button"
          className={"tm-gallery-arrow tm-arrow-right" + (!canScrollRight ? " is-disabled" : "")}
          onClick={() => handleScroll('right')}
          disabled={!canScrollRight}
          aria-label="Scroll right to next video"
          title="Next Video"
        >
          <ChevronRight size={24} />
        </button>

        {/* Horizontal Scroll Track */}
        <div className="tm-gallery-track" ref={scrollRef}>
          {SERVICES.map((service) => {
            const isUnmuted = unmutedId === service.id;
            return (
              <div
                key={service.id}
                className="tm-video-card"
                onClick={() => handleCardClick(service)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick(service);
                  }
                }}
              >
                {/* Background Video */}
                <div className="tm-card-video-wrap">
                  <video
                    src={service.videoUrl}
                    className="tm-card-video-el"
                    loop
                    autoPlay
                    muted={!isUnmuted}
                    playsInline
                  />
                  <div className="tm-card-vignette" />
                </div>

                {/* Top Overlay Row */}
                <div className="tm-card-top-bar">
                  <span className="tm-card-tag-left">TRIANGLEMAX</span>
                  <div className="tm-card-top-actions">
                    <span className="tm-card-tag-right">{service.tag}</span>
                    <button
                      type="button"
                      className={"tm-card-sound-btn" + (isUnmuted ? " unmuted" : "")}
                      onClick={(e) => handleToggleSound(e, service.id)}
                      aria-label={isUnmuted ? "Mute" : "Unmute"}
                      title={isUnmuted ? "Mute Audio" : "Unmute Audio"}
                    >
                      {isUnmuted ? <Volume2 size={13} /> : <VolumeX size={13} />}
                    </button>
                  </div>
                </div>

                {/* Bottom Overlay Row */}
                <div className="tm-card-bottom-bar">
                  <div className="tm-card-info">
                    <span className="tm-card-category-pill">AI COMMERCIAL</span>
                    <h3 className="tm-card-video-title">{service.title}</h3>
                  </div>
                  <div className="tm-card-arrow-circle" aria-hidden="true">
                    <ArrowUpRight size={18} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
