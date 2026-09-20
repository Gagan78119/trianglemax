import { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import PricingSection from '../components/sections/PricingSection';
import ServicesSection from '../components/sections/ServicesSection';
import AboutSection from '../components/sections/AboutSection';
import ContactSection from '../components/sections/ContactSection';
import BottomStickyBar from '../components/layout/BottomStickyBar';
import Modal from '../components/ui/Modal';
import CheckoutForm from '../components/forms/CheckoutForm';
import PaymentStatus from '../components/sections/PaymentStatus';
import { PRICING_PACKAGES } from '../data/pricing';

export const Home = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [checkoutPlan, setCheckoutPlan] = useState(null);
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

  const handleOpenCheckout = (plan) => {
    setCheckoutPlan(plan || PRICING_PACKAGES[0]);
  };

  const handleCloseCheckout = () => {
    setCheckoutPlan(null);
  };

  return (
    <div className="app-container">
      <Header />
      <main>
        <Hero onOpenModal={setActiveModal} />
        <ServicesSection onOpenModal={setActiveModal} />
        <PricingSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />

      {/* Persistent Bottom Sticky Bar for Desktop & Mobile */}
      <BottomStickyBar onBuyNow={() => handleOpenCheckout(PRICING_PACKAGES[0])} />

      {/* Centralized Checkout Modal */}
      <Modal
        isOpen={Boolean(checkoutPlan)}
        onClose={handleCloseCheckout}
        title="Complete Your Booking & Payment"
      >
        {checkoutPlan && (
          <CheckoutForm
            plan={checkoutPlan}
            onCancel={handleCloseCheckout}
          />
        )}
      </Modal>

      {/* Video Demo Showcase Modal */}
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
