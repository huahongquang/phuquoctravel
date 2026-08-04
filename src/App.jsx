import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TourList from "./components/TourList";
import AIChatbot from "./components/AIChatbot";
import TransportBooking from "./components/TransportBooking";
import BookingModal from "./components/BookingModal";
import Cart from "./components/Cart";
import Footer from "./components/Footer";

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  
  // Cart state
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalView, setModalView] = useState("add-to-cart"); // 'add-to-cart' | 'checkout' | 'receipt'
  const [selectedTour, setSelectedTour] = useState(null);

  // Success booking detail state
  const [bookingDetails, setBookingDetails] = useState(null);

  // Handle open modal to add a tour to cart
  const handleOpenAddToCart = (tour) => {
    setSelectedTour(tour);
    setModalView("add-to-cart");
    setIsModalOpen(true);
  };

  // Add tour configuration to the cart
  const handleAddToCart = (configuredTour) => {
    setCart((prev) => [...prev, configuredTour]);
    setIsModalOpen(false);
    setSelectedTour(null);
    // Auto open cart to show the added tour
    setTimeout(() => {
      setIsCartOpen(true);
    }, 300);
  };

  // Remove tour from cart
  const handleRemoveFromCart = (indexToRemove) => {
    setCart((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  // Open checkout modal from cart
  const handleOpenCheckout = () => {
    setIsCartOpen(false);
    setModalView("checkout");
    setIsModalOpen(true);
  };

  // Handle form submission and show ticket receipt
  const handleCheckoutSubmit = (contactInfo) => {
    const totalAmount = cart.reduce((acc, item) => acc + item.totalPrice, 0);
    
    // Combine contact information and cart items into a booking receipt
    const finalReceipt = {
      ...contactInfo,
      items: [...cart],
      totalAmount: totalAmount
    };

    setBookingDetails(finalReceipt);
    setModalView("receipt");
    // Clear cart upon successful checkout
    setCart([]);
  };

  // Helper to scroll smoothly to a section
  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div>
      {/* Navigation Bar */}
      <Navbar 
        cartCount={cart.length} 
        onCartClick={() => setIsCartOpen(true)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Hero Banner Section */}
      <Hero 
        onExploreClick={() => scrollToSection("tours")}
        onAiClick={() => scrollToSection("ai-planner")}
      />

      {/* Tours Section */}
      <TourList onBookClick={handleOpenAddToCart} />

      {/* Transport Booking Section */}
      <TransportBooking />

      {/* AI Recommendation Chatbot Section */}
      <AIChatbot onBookTour={handleOpenAddToCart} />

      {/* Footer Details */}
      <Footer setActiveSection={setActiveSection} />

      {/* Cart Drawer */}
      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onRemoveItem={handleRemoveFromCart}
        onCheckoutClick={handleOpenCheckout}
      />

      {/* Booking Form and Ticket Receipt Modal */}
      <BookingModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        tour={selectedTour}
        view={modalView}
        cartItems={cart}
        onAddToCart={handleAddToCart}
        onCheckoutSubmit={handleCheckoutSubmit}
        bookingDetails={bookingDetails}
      />
    </div>
  );
}
