import SectionHeading from '../ui/SectionHeading';
import WhyCard from '../cards/WhyCard';
import { WHY_US_ITEMS } from '../../data/whyUs';

export const WhyUsSection = () => {
  return (
    <section id="why-us" className="section why-us-section">
      <SectionHeading
        badge="THE TRIANGLEMAX ADVANTAGE"
        title="Why Choose TRIANGLEMAX"
        subtitle="We combine high-end aesthetic vision with affordable pricing to deliver commercial-grade AI video ads that deliver real results."
      />

      <div className="why-grid">
        {WHY_US_ITEMS.map((item, idx) => (
          <WhyCard key={idx} {...item} />
        ))}
      </div>
    </section>
  );
};

export default WhyUsSection;
