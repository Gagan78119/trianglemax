import { Video, Zap, Star, Award, ShieldCheck } from 'lucide-react';

export const PRICING_PACKAGES = [
  {
    id: '30s',
    durationBadge: '30s',
    title: '30 Seconds',
    subtitle: 'PERFECT FOR Quick Promotions',
    price: '₹99',
    popular: false,
    features: [
      'AI Cinematic Ad',
      'High-Quality Visuals',
      'Fast Delivery',
      'Social Media Ready',
    ],
    whatsappMessage: 'Hi ANU, I want to order the 30 Seconds AI Cinematic Ad package for ₹99.',
    ctaLabel: 'GET STARTED',
  },
  {
    id: '45s',
    durationBadge: '45s',
    title: '45 Seconds',
    subtitle: 'PERFECT FOR Business Growth',
    price: '₹749',
    popular: true,
    ribbonText: 'MOST POPULAR',
    features: [
      'AI Cinematic Ad',
      'Premium Quality Visuals',
      'Fast Delivery (24-48 Hrs)',
      'Social Media Ready (9:16 & 16:9)',
    ],
    whatsappMessage: 'Hi ANU, I want to order the 45 Seconds (Most Popular) AI Cinematic Ad package for ₹749.',
    ctaLabel: 'GET STARTED NOW',
  },
  {
    id: '60s',
    durationBadge: '60s',
    title: '60 Seconds',
    subtitle: 'PERFECT FOR Brand Impact',
    price: '₹999',
    popular: false,
    features: [
      'AI Cinematic Ad',
      'Ultra Premium Quality',
      'Fast Delivery',
      'Social Media Ready',
    ],
    whatsappMessage: 'Hi ANU, I want to order the 60 Seconds AI Cinematic Ad package for ₹999.',
    ctaLabel: 'GET STARTED',
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
