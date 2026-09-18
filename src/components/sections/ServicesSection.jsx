import SectionHeading from '../ui/SectionHeading';
import ServiceCard from '../cards/ServiceCard';
import { SERVICES } from '../../data/services';

export const ServicesSection = ({ onOpenModal }) => {
  return (
    <section id="services" className="section services-section">
      <SectionHeading
        badge="OUR EXPERTISE"
        title="What We Create For You"
        subtitle="Explore real cinematic AI commercials we craft for modern businesses — from product spotlights to viral social media ads."
      />

      <div className="services-grid services-video-grid">
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
