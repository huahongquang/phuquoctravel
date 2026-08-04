import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TourList from "./components/TourList";
import AIChatbot from "./components/AIChatbot";
import CustomTourBuilder from "./components/CustomTourBuilder";
import BookingModal from "./components/BookingModal";
import TourDetailModal from "./components/TourDetailModal";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import AdminDashboard from "./components/AdminDashboard";
import GuideDashboard from "./components/GuideDashboard";
import BlogSection from "./components/BlogSection";
import { apiService } from "./services/api";
import { translations } from "./data/translations";
import { X, Eye, EyeOff } from "lucide-react";

// Initialize localStorage databases
apiService.initDatabase();

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  
  // Global Bilingual Language State
  const [language, setLanguage] = useState(() => localStorage.getItem("pq_lang") || "vi");
  const t = translations[language];
  const isEn = language === "en";

  // Dynamic database states loaded from mock backend API
  const [builderDatabase, setBuilderDatabase] = useState(() => apiService.getDbServices());
  const [bookings, setBookings] = useState(() => apiService.getBookings());
  const [tours, setTours] = useState(() => apiService.getTours());
  const [blogs, setBlogs] = useState(() => apiService.getBlogs());
  const [guides, setGuides] = useState(() => apiService.getGuides());

  // Cart & checkout states
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalView, setModalView] = useState("add-to-cart"); // 'add-to-cart' | 'checkout' | 'receipt'
  const [selectedTour, setSelectedTour] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [tourSearch, setTourSearch] = useState({ destination: "", type: "" });
  const [selectedDetailTour, setSelectedDetailTour] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleOpenDetailModal = (tour) => {
    setSelectedDetailTour(tour);
    setIsDetailModalOpen(true);
  };

  // Portal Authentication states (Username & Password)
  const [userSession, setUserSession] = useState({ role: "guest", details: null });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [activeReferrer, setActiveReferrer] = useState("");

  // Detect URL Affiliate query parameters (e.g. ?ref=NAM10 or ?aff=NAM10)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const refParam = params.get("ref") || params.get("aff");
    if (refParam) {
      const code = refParam.trim().toUpperCase();
      setActiveReferrer(code);
      sessionStorage.setItem("pq_referrer", code);
      console.log(`[Affiliate] Referral detected: ${code}`);
    } else {
      const savedRef = sessionStorage.getItem("pq_referrer");
      if (savedRef) {
        setActiveReferrer(savedRef);
      }
    }
  }, []);

  // Language toggle handler
  const handleLanguageToggle = () => {
    const newLang = language === "vi" ? "en" : "vi";
    setLanguage(newLang);
    localStorage.setItem("pq_lang", newLang);
  };

  // --- CRUD ACTIONS & PERSISTENCE ---
  const handleAddDbItem = (category, item) => {
    const updated = {
      ...builderDatabase,
      [category]: [...builderDatabase[category], item]
    };
    setBuilderDatabase(updated);
    apiService.saveDbServices(updated);
  };

  const handleDeleteDbItem = (category, itemId) => {
    const updated = {
      ...builderDatabase,
      [category]: builderDatabase[category].filter(it => it.id !== itemId)
    };
    setBuilderDatabase(updated);
    apiService.saveDbServices(updated);
  };

  const handleUpdateDbItem = (category, updatedItem) => {
    const updated = {
      ...builderDatabase,
      [category]: builderDatabase[category].map(it => it.id === updatedItem.id ? updatedItem : it)
    };
    setBuilderDatabase(updated);
    apiService.saveDbServices(updated);
  };

  const handleSyncFlights = (newFlights) => {
    const updated = {
      ...builderDatabase,
      flight: newFlights
    };
    setBuilderDatabase(updated);
    apiService.saveDbServices(updated);
  };

  const handleConfirmBooking = (bookingId) => {
    const updated = bookings.map(b => 
      b.bookingId === bookingId ? { ...b, status: "confirmed" } : b
    );
    setBookings(updated);
    apiService.saveBookings(updated);
  };

  const handleAddBlog = (newBlog) => {
    const updated = [newBlog, ...blogs];
    setBlogs(updated);
    apiService.saveBlogs(updated);
  };

  const handleDeleteBlog = (postId) => {
    const updated = blogs.filter(b => b.id !== postId);
    setBlogs(updated);
    apiService.saveBlogs(updated);
  };

  const handleAddTour = (newTour) => {
    const updated = [newTour, ...tours];
    setTours(updated);
    apiService.saveTours(updated);
  };

  const handleDeleteTour = (tourId) => {
    const updated = tours.filter(t => t.id !== tourId);
    setTours(updated);
    apiService.saveTours(updated);
  };

  const handleAddGuide = (newGuide) => {
    const updated = [...guides, newGuide];
    setGuides(updated);
    apiService.saveGuides(updated);
  };

  const handleDeleteGuide = (guideId) => {
    const updated = guides.filter(g => g.id !== guideId);
    setGuides(updated);
    apiService.saveGuides(updated);
  };

  // --- CART HANDLERS ---
  const handleAddToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (indexToRemove) => {
    setCart((prevCart) => prevCart.filter((_, idx) => idx !== indexToRemove));
  };

  const handleOpenCheckout = () => {
    setIsCartOpen(false);
    setModalView("checkout");
    setIsModalOpen(true);
  };

  const handleOpenAddToCart = (tour) => {
    setSelectedTour(tour);
    setModalView("add-to-cart");
    setIsModalOpen(true);
  };

  // Handle successful customer checkout and attribute referrer
  const handleCheckoutSubmit = (contactInfo) => {
    const totalAmount = cart.reduce((acc, item) => acc + item.totalPrice, 0);
    
    const finalReceipt = {
      ...contactInfo,
      items: [...cart],
      totalAmount: totalAmount,
      status: "pending",
      referrer: activeReferrer || null
    };

    setBookingDetails(finalReceipt);
    
    // Save to App State and localStorage Backend
    const updatedBookings = [...bookings, finalReceipt];
    setBookings(updatedBookings);
    apiService.saveBookings(updatedBookings);

    setModalView("receipt");
    setCart([]);
  };

  // --- SECURE AUTH PORTAL HANDLERS ---
  const handlePortalLogin = (e) => {
    e.preventDefault();
    const username = loginUsername.trim().toLowerCase();
    const password = loginPassword.trim();

    if (username === "admin" && password === "admin123") {
      setUserSession({ role: "admin", details: null });
      setIsLoginModalOpen(false);
      setLoginUsername("");
      setLoginPassword("");
    } else {
      const foundGuide = guides.find(
        (g) => g.username?.toLowerCase() === username && g.password === password
      );
      if (foundGuide) {
        setUserSession({ role: "guide", details: foundGuide });
        setIsLoginModalOpen(false);
        setLoginUsername("");
        setLoginPassword("");
      } else {
        alert(
          language === "vi" 
            ? "Tên tài khoản hoặc mật khẩu không chính xác! Vui lòng thử lại." 
            : "Invalid username or password! Please try again."
        );
      }
    }
  };

  const handleLogout = () => {
    setUserSession({ role: "guest", details: null });
  };

  // Scroll helper
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

  // --- SCREEN RENDERS ---
  if (userSession.role === "admin") {
    return (
      <AdminDashboard
        db={builderDatabase}
        language={language}
        onAddItem={handleAddDbItem}
        onDeleteItem={handleDeleteDbItem}
        onUpdateItem={handleUpdateDbItem}
        onSyncFlights={handleSyncFlights}
        bookings={bookings}
        onConfirmBooking={handleConfirmBooking}
        onCloseAdmin={handleLogout}
        blogs={blogs}
        onAddBlog={handleAddBlog}
        onDeleteBlog={handleDeleteBlog}
        tours={tours}
        onAddTour={handleAddTour}
        onDeleteTour={handleDeleteTour}
        guides={guides}
        onAddGuide={handleAddGuide}
        onDeleteGuide={handleDeleteGuide}
      />
    );
  }

  if (userSession.role === "guide") {
    return (
      <GuideDashboard
        guide={userSession.details}
        bookings={bookings}
        tours={tours}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <div>
      {/* Navigation Bar */}
      <Navbar 
        cartCount={cart.length} 
        onCartClick={() => setIsCartOpen(true)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        userSession={userSession}
        onLoginClick={() => setIsLoginModalOpen(true)}
        onLogout={handleLogout}
        language={language}
        onLanguageToggle={handleLanguageToggle}
      />

      {/* Hero Banner Section */}
      <Hero 
        onExploreClick={() => scrollToSection("tours")}
        onAiClick={() => scrollToSection("ai-planner")}
        onSearch={(search) => {
          setTourSearch(search);
          const el = document.getElementById("tours");
          if (el) {
            const offset = 80;
            const pos = el.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top: pos, behavior: "smooth" });
          }
        }}
        language={language}
      />

      {/* Tours Section (uses dynamic tours state and bilingual translation) */}
      <TourList 
        onBookClick={handleOpenAddToCart} 
        tours={tours.filter(tour => {
          if (tourSearch.destination) {
            const dest = tourSearch.destination.toLowerCase();
            const matchesName = tour.name.toLowerCase().includes(dest);
            const matchesDesc = tour.description?.toLowerCase().includes(dest) || tour.duration?.toLowerCase().includes(dest);
            if (!matchesName && !matchesDesc) return false;
          }
          if (tourSearch.type) {
            const type = tourSearch.type.toLowerCase();
            const matchesName = tour.name.toLowerCase().includes(type);
            const matchesDesc = tour.description?.toLowerCase().includes(type) || tour.duration?.toLowerCase().includes(type);
            if (!matchesName && !matchesDesc) return false;
          }
          return true;
        })} 
        onDetailClick={handleOpenDetailModal}
        language={language} 
      />

      {/* Custom Tour Builder Section */}
      <CustomTourBuilder onBookCustomItinerary={handleAddToCart} servicesDatabase={builderDatabase} language={language} />

      {/* AI Recommendation Chatbot Section */}
      <AIChatbot onBookTour={handleOpenAddToCart} language={language} />

      {/* Blog & Articles Section */}
      <BlogSection blogs={blogs} language={language} />

      {/* Footer Details */}
      <Footer setActiveSection={setActiveSection} language={language} />

      {/* Cart Drawer */}
      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onRemoveItem={handleRemoveFromCart}
        onCheckoutClick={handleOpenCheckout}
        language={language}
      />

      {/* Tour Detail Fullscreen Modal (Travlla Style) */}
      <TourDetailModal 
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        tour={selectedDetailTour}
        onAddToCart={handleAddToCart}
        language={language}
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
        language={language}
      />

      {/* PORTAL LOGIN MODAL (Username & Password) */}
      {isLoginModalOpen && (
        <div className="modal-overlay open" onClick={() => setIsLoginModalOpen(false)} style={{ zIndex: 2000 }}>
          <div className="portal-login-card" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <h3 style={{ margin: 0, color: "var(--primary)", fontSize: "1.2rem", fontWeight: 700 }}>{t.login_title}</h3>
              <button onClick={() => setIsLoginModalOpen(false)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--text-muted)" }}>
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handlePortalLogin}>
              <div className="form-group">
                <label>{t.login_username}</label>
                <input 
                  type="text" 
                  required 
                  placeholder={isEn ? "Enter username" : "Nhập tên tài khoản"} 
                  value={loginUsername} 
                  onChange={(e) => setLoginUsername(e.target.value)} 
                  style={{ width: "100%" }}
                />
              </div>

              <div className="form-group" style={{ position: "relative" }}>
                <label>{t.login_password}</label>
                <input 
                  type={showPassword ? "text" : "password"} 
                  required 
                  placeholder={isEn ? "Enter password" : "Nhập mật khẩu"} 
                  value={loginPassword} 
                  onChange={(e) => setLoginPassword(e.target.value)} 
                  style={{ width: "100%", paddingRight: "40px" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: "absolute", right: "12px", top: "34px", background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              
              <button type="submit" className="btn btn-primary" style={{ width: "100%", padding: "12px", borderRadius: "8px", fontWeight: "bold", marginTop: "12px" }}>
                {t.login_btn_submit}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
