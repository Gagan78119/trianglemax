import SectionHeading from '../ui/SectionHeading';
import ServiceCard from '../cards/ServiceCard';
import { SERVICES } from '../../data/services';

export const ServicesSection = ({ onOpenModal }) => {
  return (
    <section id="services" className="section">
      <SectionHeading
        badge="OUR EXPERTISE"
        title="What We Create For You"
        subtitle="Tailored AI video production services built specifically to increase customer engagement and drive conversions across all digital platforms."
      />

      <div className="services-grid">
        {SERVICES.map((service) => (
          <ServiceCard
            key={service.id}
            {...service}
            onPreview={onOpenModal}
          />
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
