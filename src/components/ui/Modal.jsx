import { X, Film } from 'lucide-react';
import { getWhatsAppLink } from '../../utils/whatsapp';

export const Modal = ({ modal, onClose }) => {
  if (!modal) return null;

  const orderMessage = `Hi ANU! I liked the ${modal.title} style and want to order an ad for my brand.`;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>
        <div className="modal-header">
          <h3 className="modal-title">{modal.title}</h3>
        </div>
        <div className="modal-video-placeholder">
          <Film size={48} color="#FF85C8" />
          <h4 style={{ fontSize: 18 }}>{modal.desc || 'AI Cinematic Commercial Demonstration'}</h4>
          <p style={{ fontSize: 13, color: '#FFD8EC' }}>
            Custom video files can be easily linked here by replacing this video preview frame.
          </p>
          <a
            href={getWhatsAppLink(orderMessage)}
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
  );
};

export default Modal;
