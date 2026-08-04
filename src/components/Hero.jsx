import React, { useState } from "react";
import { Compass, Sparkles, MapPin, Search } from "lucide-react";
import { translations } from "../data/translations";

export default function Hero({ onExploreClick, onAiClick, onSearch, language }) {
  const t = translations[language || "vi"];
  const isEn = language === "en";

  const [destination, setDestination] = useState("");
  const [type, setType] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({ destination, type });
    }
  };

  return (
    <section 
      id="hero" 
      className="hero" 
      style={{ backgroundImage: `url('/images/phu_quoc_hero.jpg')` }}
    >
      <div className="container animate-fade-in-up">
        <p className="hero-tagline">{isEn ? "🌴 Tropical Vacation Paradise" : "🌴 Thiên Đường Nghỉ Dưỡng Nhiệt Đới"}</p>
        <h1>{t.hero_title}</h1>
        <p className="hero-desc">{t.hero_subtitle}</p>

        {/* Travlla Search Engine Panel */}
        <form onSubmit={handleSearchSubmit} className="hero-search-card">
          <div className="search-field">
            <div className="search-field-icon">
              <MapPin size={20} style={{ color: "var(--primary)" }} />
            </div>
            <div className="search-field-inputs">
              <label>{isEn ? "Destination" : "Điểm đến"}</label>
              <select value={destination} onChange={(e) => setDestination(e.target.value)}>
                <option value="">{isEn ? "All Regions" : "Tất cả khu vực"}</option>
                <option value="Dương Đông">Dương Đông</option>
                <option value="An Thới">An Thới / Cảng</option>
                <option value="Bãi Trường">Bãi Trường</option>
                <option value="Bắc Đảo">Bắc Đảo</option>
              </select>
            </div>
          </div>

          <div className="search-field-divider"></div>

          <div className="search-field">
            <div className="search-field-icon">
              <Compass size={20} style={{ color: "var(--primary)" }} />
            </div>
            <div className="search-field-inputs">
              <label>{isEn ? "Tour Type" : "Loại hình"}</label>
              <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="">{isEn ? "All activities" : "Tất cả trải nghiệm"}</option>
                <option value="Cano">{isEn ? "Cano Cruising" : "Cano đi đảo"}</option>
                <option value="Câu mực">{isEn ? "Squid Fishing" : "Câu mực đêm"}</option>
                <option value="Hoàng hôn">{isEn ? "Sunset Tour" : "Ngắm hoàng hôn"}</option>
                <option value="Bắc Đảo">{isEn ? "North Island Forest" : "Bắc đảo / Rừng"}</option>
              </select>
            </div>
          </div>

          <button type="submit" className="search-submit-btn">
            <Search size={18} />
            <span>{isEn ? "Search" : "Tìm Tour"}</span>
          </button>
        </form>

        <div className="hero-ctas" style={{ marginTop: "30px" }}>
          <button className="btn btn-primary" onClick={onExploreClick}>
            <Compass size={18} />
            {t.hero_btn_explore}
          </button>
          <button className="btn btn-accent" onClick={onAiClick}>
            <Sparkles size={18} />
            {t.hero_btn_ai}
          </button>
        </div>
      </div>
    </section>
  );
}
