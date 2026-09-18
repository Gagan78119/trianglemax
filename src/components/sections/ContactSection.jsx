import { MessageCircle, Mail } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import ContactCard from '../cards/ContactCard';
import InquiryForm from '../forms/InquiryForm';
import InstagramIcon from '../ui/InstagramIcon';
import { SITE_CONFIG } from '../../config/site';
import { getWhatsAppLink } from '../../utils/whatsapp';

export const ContactSection = () => {
  return (
    <section id="contact" className="section">
      <SectionHeading
        badge="GET IN TOUCH"
        title="Let's Create Your Next Cinematic Ad"
        subtitle="Ready to transform your business with powerful AI commercials? Message us directly on WhatsApp or drop us an email!"
      />

      <div className="contact-grid">
        <div className="contact-channels">
          <ContactCard
            href={getWhatsAppLink("Hi ANU! I'd like to get in touch about an AI cinematic ad.")}
            target="_blank"
            rel="noopener noreferrer"
            icon={MessageCircle}
            iconType="wa"
            label="WhatsApp Us (Say HI)"
            value={SITE_CONFIG.displayPhone}
          />

          <ContactCard
            href={`mailto:${SITE_CONFIG.email}`}
            icon={Mail}
            iconType="mail"
            label="Email Support"
            value={SITE_CONFIG.email}
          />

          <ContactCard
            href={SITE_CONFIG.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            icon={InstagramIcon}
            iconType="ig"
            label="Follow On Instagram"
            value={SITE_CONFIG.instagramHandle}
          />
        </div>

        <InquiryForm />
      </div>
    </section>
  );
};

export default ContactSection;
