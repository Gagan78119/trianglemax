import { checkOrderStatus } from './_phonepeHelper.js';

const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || '';

// In-memory deduplication set to prevent duplicate logging within warm serverless container instances
const recordedOrders = new Set();

async function logToGoogleSheet({ orderId, clientName, clientPhone, clientEmail, company, packageTitle, amount }) {
  if (!GOOGLE_SCRIPT_URL) return;
  
  // Container-level duplicate check
  if (recordedOrders.has(orderId)) {
    return;
  }
  recordedOrders.add(orderId);

  try {
    const payload = new URLSearchParams({
      'Order ID': orderId,
      orderId: orderId,
      'Client Name': clientName || 'Client',
      clientName: clientName || 'Client',
      'Phone Number': clientPhone || 'N/A',
      phone: clientPhone || 'N/A',
      'Email': clientEmail || 'N/A',
      email: clientEmail || 'N/A',
      'Company': company || 'N/A',
      company: company || 'N/A',
      'Package': packageTitle || 'AI Cinematic Ad',
      package: packageTitle || 'AI Cinematic Ad',
      'Amount': amount ? `₹${amount / 100}` : 'N/A',
      'Status': 'PAYMENT_COMPLETED',
      'Timestamp': new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      'dedupeKey': orderId,
    });

    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: payload.toString(),
    });
  } catch (err) {
    console.warn('Failed to post payment details to Google Sheets:', err.message);
  }
}

export default async function handler(req, res) {
  try {
    // Read orderId from query params or URL
    const headers = req.headers || {};
    const host = headers['x-forwarded-host'] || headers['host'] || 'localhost';
    const proto = headers['x-forwarded-proto'] || 'http';
    const reqUrl = req.url ? new URL(req.url, `${proto}://${host}`) : null;

    const orderId =
      req.query?.orderId ||
      req.query?.merchantOrderId ||
      reqUrl?.searchParams?.get('orderId') ||
      reqUrl?.searchParams?.get('merchantOrderId');

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: 'Missing orderId or merchantOrderId in query parameters.',
      });
    }

    const phonePeResponse = await checkOrderStatus(orderId);

    // According to PhonePe Standard Checkout specs:
    // State will be one of: 'PENDING', 'COMPLETED', 'FAILED'
    const state =
      phonePeResponse?.state ||
      phonePeResponse?.payload?.state ||
      phonePeResponse?.data?.state ||
      'PENDING';

    const isCompleted = state === 'COMPLETED';
    const isFailed = state === 'FAILED' || state === 'EXPIRED';

    // Surface human-readable error on failure
    const errorCode =
      phonePeResponse?.errorCode ||
      phonePeResponse?.payload?.errorCode ||
      null;

    const errorDescription =
      phonePeResponse?.errorContext?.description ||
      phonePeResponse?.payload?.errorContext?.description ||
      phonePeResponse?.message ||
      null;

    // Client and package metaInfo stored during checkout initiation
    const metaInfo = phonePeResponse?.metaInfo || phonePeResponse?.payload?.metaInfo || {};
    const clientName = metaInfo.udf1 || metaInfo.clientName || '';
    const clientPhone = metaInfo.udf2 || metaInfo.clientPhone || '';
    const clientEmail = metaInfo.udf3 || metaInfo.clientEmail || '';
    const company = metaInfo.udf4 || metaInfo.company || '';
    const packageTitle = metaInfo.packageTitle || metaInfo.udf5 || 'AI Cinematic Ad';
    const amount =
      phonePeResponse?.amount ||
      phonePeResponse?.payload?.amount ||
      phonePeResponse?.data?.amount ||
      0;

    // Strictly gate sheet logging to confirmed COMPLETED transactions
    if (isCompleted) {
      logToGoogleSheet({
        orderId,
        clientName,
        clientPhone,
        clientEmail,
        company,
        packageTitle,
        amount,
      }).catch(() => {});
    }

    return res.status(200).json({
      success: true,
      orderId,
      gatewayOrderId: phonePeResponse?.orderId,
      state,
      isCompleted,
      isFailed,
      errorCode,
      errorDescription,
      amount,
      clientName,
      clientPhone,
      clientEmail,
      company,
      packageTitle,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error('Error in /api/payment/status:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to verify payment status with PhonePe.',
    });
  }
}
