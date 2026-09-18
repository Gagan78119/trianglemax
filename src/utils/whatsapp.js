import { SITE_CONFIG } from '../config/site';

/**
 * Generates a direct WhatsApp link with encoded prefilled message text.
 * @param {string} [customText] 
 * @returns {string}
 */
export const getWhatsAppLink = (customText) => {
  const text = customText || "Hi ANU, I'd like to get a high-converting AI Cinematic Ad for my business from TRIANGLEMAX!";
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
};
