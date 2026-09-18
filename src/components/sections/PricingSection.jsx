import SectionHeading from '../ui/SectionHeading';
import PricingCard from '../cards/PricingCard';
import { PRICING_PACKAGES, TRUST_ITEMS } from '../../data/pricing';

export const PricingSection = () => {
  return (
    <section id="pricing" className="section pricing-section">
      <SectionHeading
        badge="TRANSPARENT PRICING"
        title="Affordable AI Cinematic Packages"
        subtitle="Get ultra-high-quality cinematic video advertisements crafted to boost your brand conversions without breaking the bank."
      />

      <div className="pricing-grid">
        {PRICING_PACKAGES.map((pkg) => (
          <PricingCard key={pkg.id} {...pkg} />
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
    </section>
  );
};

export default PricingSection;
