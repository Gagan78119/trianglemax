import { Video, Zap, Star, Award, ShieldCheck } from 'lucide-react';

export const PRICING_PACKAGES = [
  {
    id: '30s',
    durationBadge: 'FULL AD',
    title: 'AI Cinematic Ad Package',
    subtitle: 'PERFECT FOR Business Growth & Brand Conversions',
    price: '₹99',
    originalPrice: '₹1,999',
    discountBadge: '95% OFF LAUNCH SPECIAL',
    amountInPaise: 9900,
    isPayableOnline: true,
    popular: true,
    ribbonText: 'LIMITED TIME LAUNCH DEAL',
    features: [
      'Ultra-Realistic AI Cinematic Video Ad',
      'Custom Script & Compelling Visual Storytelling',
      'Multi-Format Delivery (9:16 Reels & 16:9 Landscape)',
      'High-Energy Sound Design & Background Music',
      'Fast 24 - 48 Hours Express Delivery',
      'Full Commercial Rights for Ads & Social Media',
      '100% Satisfaction & Revision Support',
    ],
    whatsappMessage: 'Hi ANU, I want to order the AI Cinematic Ad package for ₹99.',
    ctaLabel: 'BOOK & PAY NOW (₹99)',
  },
];

export const TRUST_ITEMS = [
  {
    icon: Video,
    label: 'PROFESSIONAL AI ADS',
  },
  {
    icon: Zap,
    label: 'FAST DELIVERY (24-48H)',
  },
  {
    icon: Star,
    label: 'PREMIUM 4K QUALITY',
  },
  {
    icon: Award,
    label: 'AFFORDABLE ₹99 PRICE',
  },
  {
    icon: ShieldCheck,
    label: '100% SATISFACTION',
  },
];
