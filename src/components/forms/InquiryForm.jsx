import { useState } from 'react';
import { Send } from 'lucide-react';
import { getWhatsAppLink } from '../../utils/whatsapp';

export const InquiryForm = () => {
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryBusiness, setInquiryBusiness] = useState('');
  const [inquiryDuration, setInquiryDuration] = useState('45s (₹749)');
  const [inquiryNote, setInquiryNote] = useState('');

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    const message =
      `Hi ANU! I want to order an AI Cinematic Ad for my business.\n\n` +
      `👤 Name: ${inquiryName || 'Not specified'}\n` +
      `🏢 Business: ${inquiryBusiness || 'Not specified'}\n` +
      `⏱️ Package: ${inquiryDuration}\n` +
      `💬 Details: ${inquiryNote || 'No additional details'}`;

    window.open(getWhatsAppLink(message), '_blank');
  };

  return (
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
              onClick={() => setInquiryDuration('30s (₹99)')}
            >
              30s — ₹99
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
  );
};

export default InquiryForm;
