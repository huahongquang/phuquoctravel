import React, { useState, useEffect } from "react";
import { Compass, ShoppingCart, Menu, X, Shield, ChevronDown } from "lucide-react";
import { translations } from "../data/translations";

export default function Navbar({ cartCount, onCartClick, activeSection, setActiveSection, userSession, onLoginClick, onLogout, language, onLanguageChange }) {
  const t = translations[language || "vi"];
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

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

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest(".lang-dropdown-container")) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
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
            aria-label={language === "vi" ? "Hành trình đã chọn" : "Selected itinerary"}
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
          <div className="lang-dropdown-container" style={{ position: "relative" }}>
            <button 
              className="btn btn-outline lang-dropdown-trigger"
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              style={{ padding: "6px 12px", fontSize: "0.8rem", fontWeight: "bold", border: "1px solid rgba(13, 44, 84, 0.15)", background: "#f8fafc", color: "var(--primary)", display: "flex", alignItems: "center", gap: "6px" }}
            >
              🌐 {language === "vi" ? "VI" : language === "en" ? "EN" : "HI"}
              <ChevronDown size={12} style={{ transform: langDropdownOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
            </button>
            {langDropdownOpen && (
              <div 
                className="lang-dropdown-menu"
                style={{
                  position: "absolute",
                  top: "calc(100% + 6px)",
                  right: 0,
                  background: "var(--white)",
                  borderRadius: "10px",
                  border: "1px solid rgba(13, 44, 84, 0.08)",
                  boxShadow: "0 10px 25px -5px rgba(13, 44, 84, 0.1), 0 8px 10px -6px rgba(13, 44, 84, 0.05)",
                  padding: "6px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "2px",
                  zIndex: 1000,
                  minWidth: "130px"
                }}
              >
                <button 
                  onClick={() => { onLanguageChange("vi"); setLangDropdownOpen(false); }}
                  style={{
                    padding: "8px 12px",
                    background: language === "vi" ? "rgba(0, 168, 150, 0.08)" : "transparent",
                    color: language === "vi" ? "var(--secondary)" : "var(--primary)",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    textAlign: "left",
                    cursor: "pointer",
                    transition: "var(--transition)",
                    width: "100%"
                  }}
                >
                  🇻🇳 Tiếng Việt
                </button>
                <button 
                  onClick={() => { onLanguageChange("en"); setLangDropdownOpen(false); }}
                  style={{
                    padding: "8px 12px",
                    background: language === "en" ? "rgba(0, 168, 150, 0.08)" : "transparent",
                    color: language === "en" ? "var(--secondary)" : "var(--primary)",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    textAlign: "left",
                    cursor: "pointer",
                    transition: "var(--transition)",
                    width: "100%"
                  }}
                >
                  🇺🇸 English
                </button>
                <button 
                  onClick={() => { onLanguageChange("hi"); setLangDropdownOpen(false); }}
                  style={{
                    padding: "8px 12px",
                    background: language === "hi" ? "rgba(0, 168, 150, 0.08)" : "transparent",
                    color: language === "hi" ? "var(--secondary)" : "var(--primary)",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    textAlign: "left",
                    cursor: "pointer",
                    transition: "var(--transition)",
                    width: "100%"
                  }}
                >
                  🇮🇳 हिन्दी (Ấn Độ)
                </button>
              </div>
            )}
          </div>

          <button 
            className="cart-icon-btn" 
            onClick={onCartClick}
            aria-label={language === "vi" ? "Hành trình đã chọn" : "Selected itinerary"}
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
            <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "8px", marginBottom: "8px" }}>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                {language === "vi" ? "Ngôn ngữ" : language === "en" ? "Language" : "भाषा"}
              </span>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
                <button
                  type="button"
                  className={`btn ${language === "vi" ? "btn-primary" : "btn-outline"}`}
                  onClick={() => { onLanguageChange("vi"); setMobileMenuOpen(false); }}
                  style={{ padding: "8px 0", fontSize: "0.75rem", fontWeight: 700 }}
                >
                  🇻🇳 VI
                </button>
                <button
                  type="button"
                  className={`btn ${language === "en" ? "btn-primary" : "btn-outline"}`}
                  onClick={() => { onLanguageChange("en"); setMobileMenuOpen(false); }}
                  style={{ padding: "8px 0", fontSize: "0.75rem", fontWeight: 700 }}
                >
                  🇺🇸 EN
                </button>
                <button
                  type="button"
                  className={`btn ${language === "hi" ? "btn-primary" : "btn-outline"}`}
                  onClick={() => { onLanguageChange("hi"); setMobileMenuOpen(false); }}
                  style={{ padding: "8px 0", fontSize: "0.75rem", fontWeight: 700 }}
                >
                  🇮🇳 HI
                </button>
              </div>
            </div>

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
