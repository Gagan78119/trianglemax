import { Video, Zap, Star, Award, ShieldCheck } from 'lucide-react';

export const PRICING_PACKAGES = [
  {
    id: '30s',
    durationBadge: '30s',
    title: '30 Seconds',
    subtitle: 'PERFECT FOR Quick Promotions',
    price: '₹99',
    amountInPaise: 9900,
    isPayableOnline: true,
    popular: false,
    features: [
      'AI Cinematic Ad',
      'High-Quality Visuals',
      'Fast Delivery (24-48 Hrs)',
      'Social Media Ready (9:16 & 16:9)',
    ],
    whatsappMessage: 'Hi ANU, I want to order the 30 Seconds AI Cinematic Ad package for ₹1,199.',
    ctaLabel: 'BOOK & PAY NOW',
  },
];

export const TRUST_ITEMS = [
  {
    icon: Video,
    label: 'PROFESSIONAL AI ADS',
  },
  {
    icon: Zap,
    label: 'FAST DELIVERY',
  },
  {
    icon: Star,
    label: 'PREMIUM QUALITY',
  },
  {
    icon: Award,
    label: 'AFFORDABLE PRICES',
  },
  {
    icon: ShieldCheck,
    label: '100% SATISFACTION',
  },
];
