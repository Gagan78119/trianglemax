import { useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import PricingSection from '../components/sections/PricingSection';
import ServicesSection from '../components/sections/ServicesSection';
import WhyUsSection from '../components/sections/WhyUsSection';
import AboutSection from '../components/sections/AboutSection';
import ContactSection from '../components/sections/ContactSection';
import Modal from '../components/ui/Modal';

export const Home = () => {
  const [activeModal, setActiveModal] = useState(null);

  return (
    <div className="app-container">
      <Header />
      <main>
        <Hero onOpenModal={setActiveModal} />
        <PricingSection />
        <ServicesSection onOpenModal={setActiveModal} />
        <WhyUsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />

      <Modal modal={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
};

export default Home;
