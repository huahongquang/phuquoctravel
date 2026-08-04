import React, { useState, useEffect } from "react";
import { Compass, ShoppingCart, Menu, X } from "lucide-react";

export default function Navbar({ cartCount, onCartClick, activeSection, setActiveSection }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "hero", label: "Trang Chủ" },
    { id: "tours", label: "Tour Du Lịch" },
    { id: "builder", label: "Tự Thiết Kế Tour" },
    { id: "transport", label: "Vé Máy Bay & Phà" },
    { id: "ai-planner", label: "Trợ Lý AI" }
  ];

  const handleNavClick = (id) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
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
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container">
        <a href="#hero" className="logo" onClick={(e) => { e.preventDefault(); handleNavClick("hero"); }}>
          <Compass size={28} className="logo-icon animate-spin-slow" />
          <span>PHÚ QUỐC</span> TRAVEL
        </a>

        {/* Desktop Links */}
        <div className="nav-links">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`nav-link ${activeSection === item.id ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.id);
              }}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="nav-actions">
          <button 
            className="cart-icon-btn" 
            onClick={onCartClick}
            aria-label="Giỏ hàng tour"
            id="btn-cart-toggle"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
          <button 
            className="btn btn-primary"
            onClick={() => handleNavClick("ai-planner")}
            style={{ padding: "8px 20px", fontSize: "0.9rem" }}
          >
            Tư vấn AI
          </button>
        </div>
      </div>
    </nav>
  );
}
