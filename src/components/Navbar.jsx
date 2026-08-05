import React, { useState, useEffect } from "react";
import { Compass, ShoppingCart, Menu, X, Shield } from "lucide-react";
import { translations } from "../data/translations";

export default function Navbar({ cartCount, onCartClick, activeSection, setActiveSection, userSession, onLoginClick, onLogout, language, onLanguageToggle }) {
  const t = translations[language || "vi"];
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
    { id: "hero", label: t.nav_home },
    { id: "tours", label: t.nav_tours },
    { id: "builder", label: t.nav_builder },
    { id: "ai-planner", label: t.nav_ai }
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

        {/* Mobile Header Actions (Visible on Mobile only) */}
        <div className="mobile-header-actions">
          <button 
            className="cart-icon-btn" 
            onClick={onCartClick}
            aria-label="Giỏ hàng tour"
            style={{ width: "36px", height: "36px" }}
          >
            <ShoppingCart size={18} />
            {cartCount > 0 && <span className="cart-badge" style={{ width: "16px", height: "16px", fontSize: "0.6rem" }}>{cartCount}</span>}
          </button>
          
          <button 
            className="mobile-menu-btn" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Desktop Links (Hidden on Mobile) */}
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

        {/* Desktop Actions (Hidden on Mobile) */}
        <div className="nav-actions">
          <button 
            className="btn btn-outline"
            onClick={onLanguageToggle}
            style={{ padding: "6px 12px", fontSize: "0.8rem", fontWeight: "bold", border: "1px solid rgba(13, 44, 84, 0.15)", background: "#f8fafc", color: "var(--primary)", display: "flex", alignItems: "center", gap: "4px" }}
          >
            🌐 {language === "vi" ? "EN" : "VI"}
          </button>

          <button 
            className="cart-icon-btn" 
            onClick={onCartClick}
            aria-label="Giỏ hàng tour"
            id="btn-cart-toggle"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
          
          {userSession.role === "guest" ? (
            <button 
              className="btn btn-outline"
              onClick={onLoginClick}
              style={{ padding: "8px 16px", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "4px" }}
            >
              <Shield size={16} />
              {t.nav_login}
            </button>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "0.8rem", background: "rgba(0,168,150,0.08)", padding: "6px 12px", borderRadius: "20px", color: "var(--secondary)", fontWeight: 700 }}>
                {userSession.role === "admin" ? "🔑 Admin" : `👤 HDV: ${userSession.details.name.split(" ").pop()}`}
              </span>
              <button 
                className="btn btn-primary"
                onClick={onLogout}
                style={{ padding: "8px 14px", fontSize: "0.8rem" }}
              >
                {t.nav_logout}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-menu-drawer animate-fade-in">
          <div className="mobile-drawer-links">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`mobile-drawer-link ${activeSection === item.id ? "active" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="mobile-drawer-actions">
            <button 
              className="btn btn-outline" 
              onClick={() => { onLanguageToggle(); setMobileMenuOpen(false); }}
              style={{ width: "100%", justifyContent: "center", display: "flex", gap: "8px" }}
            >
              🌐 {language === "vi" ? "Switch to English" : "Chuyển sang Tiếng Việt"}
            </button>

            {userSession.role === "guest" ? (
              <button 
                className="btn btn-primary" 
                onClick={() => { onLoginClick(); setMobileMenuOpen(false); }}
                style={{ width: "100%", justifyContent: "center" }}
              >
                <Shield size={16} /> {t.nav_login}
              </button>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%" }}>
                <span style={{ textAlign: "center", fontSize: "0.85rem", background: "rgba(0,168,150,0.08)", padding: "10px", borderRadius: "10px", color: "var(--secondary)", fontWeight: 700 }}>
                  {userSession.role === "admin" ? "🔑 Admin Account" : `👤 Guide: ${userSession.details.name}`}
                </span>
                <button 
                  className="btn btn-primary" 
                  onClick={() => { onLogout(); setMobileMenuOpen(false); }}
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  {t.nav_logout}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
