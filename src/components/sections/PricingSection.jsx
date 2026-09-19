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
        badge="TRANSPARENT & SIMPLE"
        title="One Irresistible Price: ₹99"
        subtitle="Full cinematic AI commercial ad crafted for your brand. No hidden fees, no complicated tiers — just movie-grade quality delivered fast."
      />

      {/* Centered Single Pricing Presentation for Desktop & Mobile */}
      <div className="pricing-single-wrapper">
        {PRICING_PACKAGES.map((pkg) => (
          <PricingCard
            key={pkg.id}
            {...pkg}
            onSelectPlan={(plan) => setSelectedPlan(plan)}
          />
        ))}
      </div>

      {/* Centralized Checkout Modal */}
      <Modal
        isOpen={Boolean(selectedPlan)}
        onClose={handleCloseCheckout}
        title="Complete Your Booking & Payment"
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
