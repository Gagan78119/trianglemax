// Helper for PhonePe Standard Checkout API (v2) - Redirect Mode
// Works seamlessly in Node 18+ (Vercel Serverless Functions) with built-in fetch.

let cachedToken = null;
let cachedTokenType = 'O-Bearer';
let tokenExpiresAt = 0;

export function getPhonePeConfig() {
  const env = (process.env.PHONEPE_ENV || 'sandbox').toLowerCase().trim();
  const isProd = env === 'production' || env === 'prod';

  const clientId = process.env.PHONEPE_CLIENT_ID || '';
  const clientSecret = process.env.PHONEPE_CLIENT_SECRET || '';
  const clientVersion = process.env.PHONEPE_CLIENT_VERSION || '1';

  // Base URLs as per PhonePe Standard Checkout v2 spec:
  // Sandbox: https://api-preprod.phonepe.com/apis/pg-sandbox for both Auth & Pay
  // Production: https://api.phonepe.com/apis/identity-manager for Auth, https://api.phonepe.com/apis/pg for Pay/Status
  const authUrl = isProd
    ? 'https://api.phonepe.com/apis/identity-manager/v1/oauth/token'
    : 'https://api-preprod.phonepe.com/apis/pg-sandbox/v1/oauth/token';

  const pgBaseUrl = isProd
    ? 'https://api.phonepe.com/apis/pg'
    : 'https://api-preprod.phonepe.com/apis/pg-sandbox';

  return {
    isProd,
    env,
    clientId,
    clientSecret,
    clientVersion,
    authUrl,
    pgBaseUrl,
  };
}

/**
 * Retrieves a valid PhonePe OAuth 2.0 Access Token, caching until expiry.
 */
export async function getAuthHeader() {
  const config = getPhonePeConfig();

  if (!config.clientId || !config.clientSecret) {
    throw new Error('PHONEPE_CLIENT_ID and PHONEPE_CLIENT_SECRET must be configured in environment variables.');
  }

  const now = Math.floor(Date.now() / 1000);
  // Re-use token if still valid for at least 60 seconds
  if (cachedToken && tokenExpiresAt > now + 60) {
    return `${cachedTokenType} ${cachedToken}`;
  }

  const bodyParams = new URLSearchParams({
    client_id: config.clientId,
    client_version: String(config.clientVersion),
    client_secret: config.clientSecret,
    grant_type: 'client_credentials',
  });

  const response = await fetch(config.authUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: bodyParams.toString(),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('PhonePe OAuth Token Error:', response.status, errorText);
    throw new Error(`Failed to authenticate with PhonePe (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  cachedToken = data.access_token;
  cachedTokenType = data.token_type || 'O-Bearer';

  if (data.expires_at) {
    tokenExpiresAt = typeof data.expires_at === 'number' && data.expires_at > now + 360000
      ? data.expires_at
      : now + Number(data.expires_in || 3600);
  } else {
    tokenExpiresAt = now + 3600;
  }

  return `${cachedTokenType} ${cachedToken}`;
}

/**
 * Creates a payment order on PhonePe Standard Checkout (Redirect Mode)
 * Request body strictly follows:
 * {
 *   merchantOrderId,
 *   amount,
 *   expireAfter,
 *   paymentFlow: {
 *     type: "PG_CHECKOUT",
 *     merchantUrls: {
 *       redirectUrl: "..."
 *     }
 *   }
 * }
 */
export async function createPaymentOrder({ merchantOrderId, amountInPaise, redirectUrl, metaInfo = {} }) {
  const config = getPhonePeConfig();
  const authHeader = await getAuthHeader();

  const payload = {
    merchantOrderId,
    amount: amountInPaise,
    expireAfter: 1200, // 20 minutes expiration (valid range 300 - 3600 seconds)
    paymentFlow: {
      type: 'PG_CHECKOUT',
      merchantUrls: {
        redirectUrl: redirectUrl,
      },
    },
    metaInfo,
  };

  const createPayUrl = `${config.pgBaseUrl}/checkout/v2/pay`;

  const response = await fetch(createPayUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader,
    },
    body: JSON.stringify(payload),
  });

  const responseData = await response.json().catch(() => null);

  if (!response.ok) {
    console.error('PhonePe Create Pay Error:', response.status, responseData);
    throw new Error(
      responseData?.message ||
      responseData?.error_description ||
      `PhonePe order creation failed with status ${response.status}`
    );
  }

  return responseData;
}

/**
 * Checks order payment status on PhonePe
 * GET /checkout/v2/order/{merchantOrderId}/status
 */
export async function checkOrderStatus(merchantOrderId) {
  const config = getPhonePeConfig();
  const authHeader = await getAuthHeader();

  const statusUrl = `${config.pgBaseUrl}/checkout/v2/order/${encodeURIComponent(merchantOrderId)}/status`;

  const response = await fetch(statusUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader,
    },
  });

  const responseData = await response.json().catch(() => null);

  if (!response.ok) {
    console.error('PhonePe Order Status Error:', response.status, responseData);
    throw new Error(
      responseData?.message ||
      responseData?.errorContext?.description ||
      `PhonePe status query failed with status ${response.status}`
    );
  }

  return responseData;
}
