import { useState } from 'react';
import { Lock, ShieldCheck, ArrowRight, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import './CheckoutForm.css';

export const CheckoutForm = ({ plan }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    companyName: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const trimmedName = formData.fullName.trim();
    const trimmedPhone = formData.phone.trim().replace(/[^0-9]/g, '');
    const trimmedEmail = formData.email.trim();

    if (!trimmedName) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    if (!trimmedPhone || trimmedPhone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit WhatsApp / phone number.');
      return;
    }

    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          packageId: plan.id,
          fullName: trimmedName,
          phone: trimmedPhone,
          email: trimmedEmail,
          companyName: formData.companyName.trim(),
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.success) {
        throw new Error(data?.message || 'Failed to initiate PhonePe payment. Please try again.');
      }

      if (!data.redirectUrl) {
        throw new Error('No redirect URL received from payment gateway.');
      }

      // Perform strict full-page redirect to PhonePe Standard Checkout
      window.location.href = data.redirectUrl;
    } catch (err) {
      console.error('Payment checkout error:', err);
      setErrorMessage(err.message || 'Payment initiation failed. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="checkout-form-container">
      {/* Selected Package Header */}
      <div className="checkout-plan-summary">
        <div className="checkout-plan-badge">
          <Sparkles size={14} />
          <span>{plan.durationBadge} AI Cinematic Package</span>
        </div>
        <div className="checkout-plan-row">
          <div>
            <h4 className="checkout-plan-title">{plan.title}</h4>
          </div>
          <div className="checkout-plan-price">
            <span className="checkout-price-val">{plan.price}</span>
            <span className="checkout-price-unit">/-</span>
          </div>
        </div>
      </div>

      {errorMessage && (
        <div className="checkout-error-banner">
          <AlertCircle size={18} />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Checkout Inputs */}
      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="checkout-input-group">
          <label htmlFor="checkout-name" className="checkout-label">
            Full Name <span className="req">*</span>
          </label>
          <input
            id="checkout-name"
            type="text"
            name="fullName"
            placeholder="e.g. Rahul Sharma"
            value={formData.fullName}
            onChange={handleChange}
            disabled={isLoading}
            required
            className="checkout-input"
          />
        </div>

        <div className="checkout-row-2">
          <div className="checkout-input-group">
            <label htmlFor="checkout-phone" className="checkout-label">
              WhatsApp / Phone <span className="req">*</span>
            </label>
            <input
              id="checkout-phone"
              type="tel"
              name="phone"
              placeholder="10-digit mobile number"
              value={formData.phone}
              onChange={handleChange}
              disabled={isLoading}
              maxLength={15}
              required
              className="checkout-input"
            />
          </div>

          <div className="checkout-input-group">
            <label htmlFor="checkout-email" className="checkout-label">
              Email Address <span className="req">*</span>
            </label>
            <input
              id="checkout-email"
              type="email"
              name="email"
              placeholder="e.g. rahul@brand.com"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
              required
              className="checkout-input"
            />
          </div>
        </div>

        <button
          type="submit"
          className="checkout-submit-btn"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 size={18} className="spin-icon" />
              <span>Connecting to PhonePe...</span>
            </>
          ) : (
            <>
              <span>Pay Now {plan.price}</span>
              <ArrowRight size={18} />
            </>
          )}
        </button>

        {/* Security Trust Badges */}
        <div className="checkout-security-bar">
          <div className="sec-item">
            <Lock size={13} />
            <span>256-Bit SSL Encrypted</span>
          </div>
          <div className="sec-divider">•</div>
          <div className="sec-item">
            <ShieldCheck size={14} />
            <span>Official PhonePe Gateway</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
