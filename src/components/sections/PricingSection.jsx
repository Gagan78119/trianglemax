import { useState } from 'react';
import SectionHeading from '../ui/SectionHeading';
import PricingCard from '../cards/PricingCard';
import Modal from '../ui/Modal';
import CheckoutForm from '../forms/CheckoutForm';
import { PRICING_PACKAGES, TRUST_ITEMS } from '../../data/pricing';

export const PricingSection = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleCloseCheckout = () => {
    setSelectedPlan(null);
  };

  return (
    <section id="pricing" className="section pricing-section">
      <SectionHeading
        badge="TRANSPARENT PRICING"
        title="Affordable AI Cinematic Packages"
        subtitle="Get ultra-high-quality cinematic video advertisements crafted to boost your brand conversions without breaking the bank."
      />

      <div className="pricing-grid">
        {PRICING_PACKAGES.map((pkg) => (
          <PricingCard
            key={pkg.id}
            {...pkg}
            onSelectPlan={(plan) => setSelectedPlan(plan)}
          />
        ))}
      </div>

      {/* Trust Badges Ribbon */}
      <div className="trust-ribbon-bar">
        {TRUST_ITEMS.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="trust-item">
              <Icon size={20} />
              <span>{item.label}</span>
            </div>
          );
        })}
      </div>

      {/* Centralized Checkout Modal */}
      <Modal
        isOpen={Boolean(selectedPlan)}
        onClose={handleCloseCheckout}
        title="Complete Your Booking"
      >
        {selectedPlan && (
          <CheckoutForm
            plan={selectedPlan}
            onCancel={handleCloseCheckout}
          />
        )}
      </Modal>
    </section>
  );
};

export default PricingSection;
