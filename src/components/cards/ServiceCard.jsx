import { useRef, useState } from 'react';
import { ChevronRight, Play, Volume2 } from 'lucide-react';

export const ServiceCard = ({
  icon: Icon,
  tag,
  title,
  description,
  videoUrl,
  modalTitle,
  modalDesc,
  onPreview,
}) => {
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleCardClick = () => {
    onPreview?.({
      title: modalTitle || title,
      desc: modalDesc || description,
      videoUrl: videoUrl,
    });
  };

  return (
    <div
      className="service-card service-card-with-video"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Video Preview Header */}
      {videoUrl && (
        <div className="service-video-wrapper" onClick={handleCardClick}>
          <video
            ref={videoRef}
            src={videoUrl}
            className="service-video-element"
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="service-video-overlay">
            {tag && <span className="service-video-tag">{tag}</span>}
            <div className={`service-play-hint ${isHovered ? 'hovered' : ''}`}>
              <div className="service-play-circle">
                <Play size={18} fill="#FFFFFF" style={{ marginLeft: 2 }} />
              </div>
              <span className="service-play-text">Watch Demo</span>
            </div>
            <div className="service-sound-hint">
              <Volume2 size={13} />
            </div>
          </div>
        </div>
      )}

      {/* Card Content */}
      <div className="service-card-body">
        <div className="service-header-row">
          <div className="service-icon-box">
            {Icon && <Icon size={24} />}
          </div>
          <h3 className="service-title">{title}</h3>
        </div>

        <p className="service-desc">{description}</p>

        <button
          type="button"
          className="service-action-btn"
          onClick={handleCardClick}
          aria-label={`Preview style for ${title}`}
        >
          <span>Watch Showcase</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
