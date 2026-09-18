import { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import PricingSection from '../components/sections/PricingSection';
import ServicesSection from '../components/sections/ServicesSection';
import AboutSection from '../components/sections/AboutSection';
import ContactSection from '../components/sections/ContactSection';
import Modal from '../components/ui/Modal';
import PaymentStatus from '../components/sections/PaymentStatus';

export const Home = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [activeOrderId, setActiveOrderId] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('orderId') || params.get('merchantOrderId') || null;
    }
    return null;
  });

  // Listen for browser navigation / popstate
  useEffect(() => {
    const checkOrderId = () => {
      const params = new URLSearchParams(window.location.search);
      const id = params.get('orderId') || params.get('merchantOrderId');
      if (id) {
        setActiveOrderId(id);
      }
    };
    window.addEventListener('popstate', checkOrderId);
    return () => window.removeEventListener('popstate', checkOrderId);
  }, []);

  const handleBackToHome = () => {
    if (typeof window !== 'undefined') {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
    setActiveOrderId(null);
  };

  return (
    <div className="app-container">
      <Header />
      <main>
        <Hero onOpenModal={setActiveModal} />
        <PricingSection />
        <ServicesSection onOpenModal={setActiveModal} />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />

      {/* Legacy Video Demo Modal */}
      <Modal modal={activeModal} onClose={() => setActiveModal(null)} />

      {/* Payment Return Status Overlay */}
      {activeOrderId && (
        <PaymentStatus
          orderId={activeOrderId}
          onBackToHome={handleBackToHome}
        />
      )}
    </div>
  );
};

export default Home;
