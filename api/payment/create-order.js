import { createPaymentOrder } from './_phonepeHelper.js';

// Canonical package catalog for server-side validation & anti-tampering
const CANONICAL_PACKAGES = {
  '30s': {
    id: '30s',
    title: '30 Seconds AI Cinematic Ad',
    amountInPaise: 9900,
    isPayableOnline: true,
  },
  '45s': {
    id: '45s',
    title: '45 Seconds AI Cinematic Ad (Most Popular)',
    amountInPaise: 74900,
    isPayableOnline: true,
  },
  '60s': {
    id: '60s',
    title: '60 Seconds AI Cinematic Ad',
    amountInPaise: 99900,
    isPayableOnline: true,
  },
};

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const { fullName = '', phone = '', email = '', companyName = '', packageId = '' } = body;

    const trimmedName = fullName.trim();
    const trimmedPhone = phone.trim().replace(/[^0-9]/g, '');
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedCompany = companyName.trim();
    const cleanPackageId = (packageId || '').trim();

    if (!trimmedName) {
      return res.status(400).json({ success: false, message: 'Client full name is required.' });
    }

    if (!trimmedPhone || trimmedPhone.length < 10) {
      return res.status(400).json({ success: false, message: 'A valid 10-digit phone / WhatsApp number is required.' });
    }

    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      return res.status(400).json({ success: false, message: 'A valid email address is required.' });
    }

    if (!cleanPackageId || !CANONICAL_PACKAGES[cleanPackageId]) {
      return res.status(400).json({
        success: false,
        message: 'Invalid pricing package selected. Please choose a valid plan.',
      });
    }

    const selectedPkg = CANONICAL_PACKAGES[cleanPackageId];

    // Anti-Tampering Check: Reject inquiries or custom tiers not flagged for online payment
    if (!selectedPkg.isPayableOnline) {
      return res.status(400).json({
        success: false,
        message: 'This package requires a custom inquiry and cannot be paid directly online. Please contact us on WhatsApp.',
      });
    }

    // Dynamic price derived strictly from server definition (in paise)
    const amountInPaise = selectedPkg.amountInPaise;

    // Generate unique Merchant Order ID (letters, numbers, underscores, max 38 chars)
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 7).toUpperCase();
    const merchantOrderId = `TM_${timestamp}_${randomSuffix}`;

    // Compute merchant redirect URL where PhonePe returns the user after payment
    const host = req.headers['x-forwarded-host'] || req.headers['host'] || 'localhost:5173';
    const proto = req.headers['x-forwarded-proto'] || (host.includes('localhost') ? 'http' : 'https');
    const origin = process.env.FRONTEND_URL || `${proto}://${host}`;
    const merchantRedirectUrl = `${origin.replace(/\/$/, '')}/?orderId=${merchantOrderId}`;

    const metaInfo = {
      udf1: trimmedName,
      udf2: trimmedPhone,
      udf3: trimmedEmail,
      udf4: trimmedCompany,
      udf5: cleanPackageId,
      clientName: trimmedName,
      clientPhone: trimmedPhone,
      clientEmail: trimmedEmail,
      company: trimmedCompany,
      packageId: cleanPackageId,
      packageTitle: selectedPkg.title,
    };

    const phonePeResponse = await createPaymentOrder({
      merchantOrderId,
      amountInPaise,
      redirectUrl: merchantRedirectUrl,
      metaInfo,
    });

    // Extract the PhonePe-hosted checkout page URL (NOT merchant redirect URL)
    const phonePeCheckoutUrl =
      phonePeResponse?.redirectUrl ||
      phonePeResponse?.data?.redirectUrl;

    if (!phonePeCheckoutUrl) {
      console.error('Missing redirectUrl in PhonePe response:', phonePeResponse);
      return res.status(502).json({
        success: false,
        message: 'Unable to initiate PhonePe payment page. Please check gateway configuration.',
        details: phonePeResponse,
      });
    }

    // Return PhonePe-hosted checkout URL for full-page navigation
    return res.status(200).json({
      success: true,
      orderId: phonePeResponse?.orderId,
      merchantOrderId,
      redirectUrl: phonePeCheckoutUrl,
    });
  } catch (error) {
    console.error('Error in /api/payment/create-order:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to initiate payment. Please try again.',
    });
  }
}
