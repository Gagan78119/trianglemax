import { useEffect, useRef } from 'react';
import { X, Film, Zap, MessageCircle } from 'lucide-react';
import { getWhatsAppLink } from '../../utils/whatsapp';

export const Modal = ({ isOpen, modal, onClose, title, children }) => {
  const showModal = isOpen !== undefined ? isOpen : Boolean(modal);
  const videoRef = useRef(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && showModal) {
        onClose?.();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showModal, onClose]);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showModal]);

  if (!showModal) return null;

  // If children provided (e.g. CheckoutForm)
  if (children) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content checkout-modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
          {title && (
            <div className="modal-header">
              <h3 className="modal-title">{title}</h3>
            </div>
          )}
          {children}
        </div>
      </div>
    );
  }

  const orderMessage = `Hi ANU! I liked the ${modal?.title || 'demo'} style and want to order an AI ad for ₹99 for my brand.`;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-video-showcase-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="modal-header">
          <h3 className="modal-title">{modal?.title}</h3>
          {modal?.desc && <p className="modal-subtitle">{modal.desc}</p>}
        </div>

        {modal?.videoUrl ? (
          <div className="modal-video-player-container">
            <video
              ref={videoRef}
              src={modal.videoUrl}
              className="modal-video-element"
              autoPlay
              controls
              playsInline
            />

            <div className="modal-video-actions">
              <a
                href="#pricing"
                onClick={onClose}
                className="btn-card-checkout"
                style={{ textDecoration: 'none' }}
              >
                <Zap size={18} />
                <span>BOOK & PAY NOW (₹99)</span>
              </a>

              <a
                href={getWhatsAppLink(orderMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-card-whatsapp-secondary"
              >
                <MessageCircle size={16} />
                <span>Order this Style on WhatsApp</span>
              </a>
            </div>
          </div>
        ) : (
          <div className="modal-video-placeholder">
            <Film size={48} color="#FF85C8" />
            <h4 style={{ fontSize: 18 }}>{modal?.desc || 'AI Cinematic Commercial Demonstration'}</h4>
            <a
              href="#pricing"
              onClick={onClose}
              className="btn-primary"
              style={{ marginTop: 10, padding: '12px 24px', fontSize: 14 }}
            >
              <Zap size={18} />
              BOOK & PAY NOW (₹99)
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
