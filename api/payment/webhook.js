import crypto from 'crypto';

// Server-to-server PhonePe Webhook Callback Handler (Backup signal)
const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || '';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  // Verify PhonePe Webhook Authorization if configured
  const webhookUser = process.env.PHONEPE_WEBHOOK_USERNAME;
  const webhookPass = process.env.PHONEPE_WEBHOOK_PASSWORD;

  if (webhookUser && webhookPass) {
    const authHeader = req.headers['authorization'] || '';
    const expectedSha256 = crypto
      .createHash('sha256')
      .update(`${webhookUser}:${webhookPass}`)
      .digest('hex');
    const expectedBase64 = Buffer.from(`${webhookUser}:${webhookPass}`).toString('base64');

    const matches =
      authHeader === expectedSha256 ||
      authHeader === `SHA256 ${expectedSha256}` ||
      authHeader === `Basic ${expectedBase64}`;

    if (!matches) {
      console.warn('Rejected PhonePe Webhook: Invalid Authorization Header.');
      return res.status(401).json({ success: false, message: 'Unauthorized webhook request' });
    }
  }

  try {
    const eventData = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const event = eventData.event || '';
    const payload = eventData.payload || {};
    const state = payload.state || '';
    const orderId = payload.merchantOrderId || payload.orderId || '';

    // Fast 200 OK acknowledgment to PhonePe
    res.status(200).json({ success: true, message: 'Webhook received successfully' });

    // Asynchronous non-blocking background logging
    if (event === 'checkout.order.completed' || state === 'COMPLETED') {
      console.log(`PhonePe Webhook: Confirmed completion for order ${orderId}`);

      if (GOOGLE_SCRIPT_URL) {
        const metaInfo = payload.metaInfo || {};
        const clientName = metaInfo.udf1 || metaInfo.clientName || 'Client';
        const clientPhone = metaInfo.udf2 || metaInfo.clientPhone || 'N/A';
        const clientEmail = metaInfo.udf3 || metaInfo.clientEmail || 'N/A';
        const company = metaInfo.udf4 || metaInfo.company || 'N/A';
        const packageTitle = metaInfo.packageTitle || metaInfo.udf5 || 'AI Cinematic Ad';
        const amount = payload.amount || 0;

        const sheetPayload = new URLSearchParams({
          'Order ID': orderId,
          orderId: orderId,
          'Client Name': clientName,
          clientName: clientName,
          'Phone Number': clientPhone,
          phone: clientPhone,
          'Email': clientEmail,
          email: clientEmail,
          'Company': company,
          company: company,
          'Package': packageTitle,
          package: packageTitle,
          'Amount': amount ? `₹${amount / 100}` : 'N/A',
          'Status': 'WEBHOOK_VERIFIED_PAID',
          'Timestamp': new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
          'dedupeKey': orderId,
        });

        fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: sheetPayload.toString(),
        }).catch((err) => console.warn('Webhook background Google Sheet error:', err.message));
      }
    }
  } catch (err) {
    console.error('Error handling PhonePe Webhook:', err);
    if (!res.headersSent) {
      return res.status(200).json({ success: true, message: 'Acknowledged' });
    }
  }
}
