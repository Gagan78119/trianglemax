import { useState, useEffect, useCallback } from 'react';
import {
  CheckCircle2,
  XCircle,
  Clock,
  ArrowLeft,
  MessageCircle,
  RotateCcw,
  ShieldCheck,
  Receipt,
  Sparkles,
  Loader2,
} from 'lucide-react';
import { getWhatsAppLink } from '../../utils/whatsapp';
import './PaymentStatus.css';

export const PaymentStatus = ({ orderId: propOrderId, onBackToHome }) => {
  // Extract orderId from prop or URL
  const orderId = propOrderId || (typeof window !== 'undefined'
    ? new URLSearchParams(window.location.search).get('orderId') || new URLSearchParams(window.location.search).get('merchantOrderId') || ''
    : '');

  const [loading, setLoading] = useState(() => Boolean(orderId));
  const [statusData, setStatusData] = useState(null);
  const [error, setError] = useState(() => (!orderId ? 'No Order ID found in the payment return URL.' : ''));

  const fetchStatus = useCallback(async () => {
    if (!orderId) {
      setError('No Order ID found in the payment return URL.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch(`/api/payment/status?orderId=${encodeURIComponent(orderId)}`);
      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.success) {
        throw new Error(data?.message || 'Unable to retrieve payment status from PhonePe.');
      }

      setStatusData(data);
    } catch (err) {
      console.error('Payment status fetch failed:', err);
      setError(err.message || 'Error checking payment status. Please try refreshing.');
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    if (!orderId) return;

    let ignore = false;
    const runFetch = async () => {
      try {
        const res = await fetch(`/api/payment/status?orderId=${encodeURIComponent(orderId)}`);
        const data = await res.json().catch(() => null);

        if (ignore) return;

        if (!res.ok || !data?.success) {
          throw new Error(data?.message || 'Unable to retrieve payment status from PhonePe.');
        }

        setStatusData(data);
      } catch (err) {
        if (!ignore) {
          console.error('Payment status fetch failed:', err);
          setError(err.message || 'Error checking payment status. Please try refreshing.');
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    runFetch();

    return () => {
      ignore = true;
    };
  }, [orderId]);

  const isCompleted = statusData?.isCompleted;
  const isFailed = statusData?.isFailed;
  const isPending = !loading && !error && !isCompleted && !isFailed;

  // Prefilled WhatsApp message on successful payment
  const whatsappConfirmationText = statusData
    ? `Hi ANU, I have successfully paid for the ${statusData.packageTitle || 'AI Cinematic Ad'} package via PhonePe!
• Order ID: ${statusData.orderId}
• Name: ${statusData.clientName || 'Client'}
• Phone: ${statusData.clientPhone || 'N/A'}
• Amount: ₹${(statusData.amount || 0) / 100}
Please let me know the next steps to start production!`
    : 'Hi ANU, I just completed my payment on PhonePe.';

  return (
    <div className="payment-status-overlay">
      <div className="payment-status-container">
        {/* Loading State */}
        {loading && (
          <div className="status-card status-loading-card">
            <div className="status-spinner-wrap">
              <Loader2 size={48} className="spin-icon" color="#FF4FA3" />
            </div>
            <h3 className="status-title">Verifying Payment</h3>
            <p className="status-desc">
              Checking transaction status securely with PhonePe gateway...
            </p>
            <div className="status-order-tag">Order ID: {orderId || '...'}</div>
          </div>
        )}

        {/* Network / Query Error */}
        {!loading && error && (
          <div className="status-card status-failed-card">
            <div className="status-icon-wrap icon-fail">
              <XCircle size={44} />
            </div>
            <h3 className="status-title">Verification Error</h3>
            <p className="status-desc">{error}</p>
            <div className="status-actions">
              <button type="button" className="btn-status-primary" onClick={fetchStatus}>
                <RotateCcw size={16} />
                <span>Try Again</span>
              </button>
              <button type="button" className="btn-status-outline" onClick={onBackToHome}>
                <ArrowLeft size={16} />
                <span>Return to Homepage</span>
              </button>
            </div>
          </div>
        )}

        {/* 1. SUCCESS: COMPLETED */}
        {!loading && !error && isCompleted && (
          <div className="status-card status-success-card">
            <div className="status-icon-wrap icon-success">
              <CheckCircle2 size={46} />
            </div>
            <div className="status-badge-success">
              <Sparkles size={14} />
              <span>PAYMENT CONFIRMED</span>
            </div>
            <h2 className="status-title">Order Booked Successfully!</h2>
            <p className="status-desc">
              Thank you, <strong>{statusData.clientName || 'valued client'}</strong>! Your payment has been securely verified by PhonePe. Our production team is excited to craft your AI Cinematic Ad.
            </p>

            {/* Receipt Summary Box */}
            <div className="status-receipt-box">
              <div className="receipt-header">
                <Receipt size={18} />
                <span>Transaction Receipt</span>
              </div>
              <div className="receipt-row">
                <span className="r-label">Order ID:</span>
                <span className="r-val mono">{statusData.orderId}</span>
              </div>
              {statusData.gatewayOrderId && (
                <div className="receipt-row">
                  <span className="r-label">Gateway Ref:</span>
                  <span className="r-val mono">{statusData.gatewayOrderId}</span>
                </div>
              )}
              <div className="receipt-row">
                <span className="r-label">Package:</span>
                <span className="r-val bold">{statusData.packageTitle}</span>
              </div>
              {statusData.company && (
                <div className="receipt-row">
                  <span className="r-label">Company / Brand:</span>
                  <span className="r-val">{statusData.company}</span>
                </div>
              )}
              <div className="receipt-row">
                <span className="r-label">Amount Paid:</span>
                <span className="r-val bold price">₹{statusData.amount / 100}</span>
              </div>
              <div className="receipt-row">
                <span className="r-label">Payment Method:</span>
                <span className="r-val">PhonePe Standard Checkout</span>
              </div>
            </div>

            {/* Onboarding Next Steps CTA */}
            <div className="status-actions">
              <a
                href={getWhatsAppLink(whatsappConfirmationText)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-status-whatsapp"
              >
                <MessageCircle size={20} />
                <span>Start Production on WhatsApp</span>
              </a>
              <button type="button" className="btn-status-outline" onClick={onBackToHome}>
                <ArrowLeft size={16} />
                <span>Back to TRIANGLEMAX</span>
              </button>
            </div>

            <div className="status-security-note">
              <ShieldCheck size={14} />
              <span>Transaction verified & encrypted via PhonePe Payment Gateway</span>
            </div>
          </div>
        )}

        {/* 2. FAILURE: FAILED or EXPIRED */}
        {!loading && !error && isFailed && (
          <div className="status-card status-failed-card">
            <div className="status-icon-wrap icon-fail">
              <XCircle size={46} />
            </div>
            <h2 className="status-title">Payment Unsuccessful</h2>
            <p className="status-desc">
              {statusData?.errorDescription ||
                'The transaction was not completed or was cancelled by the user. If money was debited from your bank account, it will be automatically refunded by PhonePe within 3-5 business days.'}
            </p>

            <div className="status-receipt-box">
              <div className="receipt-row">
                <span className="r-label">Order ID:</span>
                <span className="r-val mono">{statusData?.orderId || orderId}</span>
              </div>
              <div className="receipt-row">
                <span className="r-label">Status:</span>
                <span className="r-val status-tag-fail">{statusData?.state || 'FAILED'}</span>
              </div>
            </div>

            <div className="status-actions">
              <button type="button" className="btn-status-primary" onClick={onBackToHome}>
                <RotateCcw size={16} />
                <span>Choose Plan & Try Again</span>
              </button>
              <a
                href={getWhatsAppLink(
                  `Hi ANU, I had an issue with payment for Order ID: ${orderId}. Can you help me?`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-status-outline"
              >
                <MessageCircle size={16} />
                <span>Help on WhatsApp</span>
              </a>
            </div>
          </div>
        )}

        {/* 3. PENDING */}
        {isPending && (
          <div className="status-card status-pending-card">
            <div className="status-icon-wrap icon-pending">
              <Clock size={46} />
            </div>
            <h2 className="status-title">Payment Processing</h2>
            <p className="status-desc">
              Your payment is currently being confirmed by the issuing bank. Please wait a moment and refresh status.
            </p>

            <div className="status-receipt-box">
              <div className="receipt-row">
                <span className="r-label">Order ID:</span>
                <span className="r-val mono">{statusData?.orderId || orderId}</span>
              </div>
              <div className="receipt-row">
                <span className="r-label">State:</span>
                <span className="r-val status-tag-pending">{statusData?.state || 'PENDING'}</span>
              </div>
            </div>

            <div className="status-actions">
              <button type="button" className="btn-status-primary" onClick={fetchStatus}>
                <RotateCcw size={16} />
                <span>Check Status Again</span>
              </button>
              <button type="button" className="btn-status-outline" onClick={onBackToHome}>
                <ArrowLeft size={16} />
                <span>Return to Homepage</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentStatus;
