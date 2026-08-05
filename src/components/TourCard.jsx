import React, { useState } from "react";
import { Star, Clock, CheckCircle2, ChevronDown, ChevronUp, Compass, Utensils, MapPin } from "lucide-react";
import { translations } from "../data/translations";

export default function TourCard({ tour, onBookClick, onDetailClick, language }) {
  const [showDetails, setShowDetails] = useState(false);
  const t = translations[language || "vi"];

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  const l = (vi, en, hi) => {
    if (language === "vi") return vi;
    if (language === "en") return en;
    return hi || en;
  };

  const getProp = (viVal, enVal, hiVal) => {
    if (language === "vi") return viVal;
    if (language === "en") return enVal;
    return hiVal || enVal;
  };

  // Translate Category badge
  const categoryLabel = () => {
    switch (tour.category) {
      case "adventure":
        return l("Mạo Hiểm", "Adventure", "रोमांच");
      case "nature":
        return l("Thiên Nhiên", "Nature", "प्रकृति");
      case "culture":
        return l("Văn Hóa", "Culture", "संस्कृति");
      case "leisure":
        return l("Nghỉ Dưỡng", "Leisure", "विश्राम");
      default:
        return l("Tour", "Tour", "टूर");
    }
  };

  return (
    <div className="tour-card glass-panel" style={{ height: "auto" }}>
      <div 
        className="tour-img-wrapper" 
        onClick={() => onDetailClick && onDetailClick(tour)}
        style={{ cursor: "pointer" }}
      >
        <img src={tour.image} alt={getProp(tour.name, tour.name_en, tour.name_hi)} loading="lazy" />
        {tour.tag && <span className="badge tour-tag">{getProp(tour.tag, tour.tag_en, tour.tag_hi)}</span>}
        <span className="badge tour-category-badge">
          {categoryLabel()}
        </span>
      </div>

      <div className="tour-content" style={{ gap: "12px" }}>
        <div>
          <div className="tour-meta">
            <div className="tour-rating">
              <Star size={16} fill="#ffb703" stroke="#ffb703" />
              <span>{tour.rating} ({tour.reviewsCount} {l("đánh giá", "reviews", "समीक्षाएं")})</span>
            </div>
            <div className="tour-duration">
              <Clock size={16} />
              <span>{getProp(tour.duration, tour.duration_en, tour.duration_hi)}</span>
            </div>
          </div>

          <h3 
            className="tour-title" 
            onClick={() => onDetailClick && onDetailClick(tour)}
            style={{ cursor: "pointer" }}
          >
            {getProp(tour.name, tour.name_en, tour.name_hi)}
          </h3>
          <p className="tour-desc" style={{ marginBottom: "12px" }}>{getProp(tour.description, tour.description_en, tour.description_hi)}</p>
          
          <div style={{ marginBottom: "16px" }}>
            <ul style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {(getProp(tour.highlights, tour.highlights_en, tour.highlights_hi) || []).slice(0, 2).map((highlight, idx) => (
                <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "6px", fontSize: "0.8rem", color: "var(--text-muted)", lineHeight: 1.3 }}>
                  <CheckCircle2 size={14} style={{ color: "var(--secondary)", flexShrink: 0, marginTop: "2px" }} />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Toggle details section */}
          <button 
            type="button" 
            className="btn-link"
            onClick={() => setShowDetails(!showDetails)}
            style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "4px", 
              background: "transparent", 
              border: "none", 
              color: "var(--secondary)", 
              fontWeight: 600, 
              fontSize: "0.85rem", 
              cursor: "pointer",
              padding: 0,
              marginBottom: "12px"
            }}
          >
            {showDetails ? (
              <>{l("Thu gọn thông tin dịch vụ", "Hide service details", "जानकारी छुपाएं")} <ChevronUp size={16} /></>
            ) : (
              <>{l("Chi tiết đi lại, ăn uống, điểm dừng", "Transport, meals, stops details", "परिवहन, भोजन, स्टॉप विवरण")} <ChevronDown size={16} /></>
            )}
          </button>

          {/* Collapsible Details */}
          {showDetails && (
            <div 
              style={{ 
                background: "rgba(13, 44, 84, 0.03)", 
                padding: "16px", 
                borderRadius: "12px", 
                border: "1px solid rgba(13, 44, 84, 0.05)", 
                marginBottom: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                fontSize: "0.82rem",
                lineHeight: 1.4,
                animation: "fadeInUp 0.3s ease forwards"
              }}
            >
              <div>
                <strong style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--primary)", marginBottom: "4px" }}>
                  <Compass size={14} style={{ color: "var(--secondary)" }} /> {l("Đi lại bằng gì?", "Transportation details", "परिवहन विवरण")}
                </strong>
                <span style={{ color: "var(--text)" }}>{getProp(tour.transportation, tour.transportation_en, tour.transportation_hi)}</span>
              </div>
              
              <div>
                <strong style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--primary)", marginBottom: "4px" }}>
                  <Utensils size={14} style={{ color: "var(--secondary)" }} /> {l("Thực đơn ăn uống?", "Meals & Dining menu", "भोजन और भोजन मेनू")}
                </strong>
                <ul style={{ paddingLeft: "14px", listStyleType: "disc", color: "var(--text-muted)" }}>
                  {(getProp(tour.meals, tour.meals_en, tour.meals_hi) || []).map((dish, i) => (
                    <li key={i}>{dish}</li>
                  ))}
                </ul>
              </div>

              <div>
                <strong style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--primary)", marginBottom: "4px" }}>
                  <MapPin size={14} style={{ color: "var(--secondary)" }} /> {l("Điểm dừng chân & Lưu trú?", "Stops & Accommodations", "स्टॉप और आवास")}
                </strong>
                <span style={{ color: "var(--text)" }}>{getProp(tour.accommodationStops, tour.accommodationStops_en, tour.accommodationStops_hi)}</span>
              </div>
            </div>
          )}
        </div>

        <div className="tour-footer" style={{ borderTop: "1px solid rgba(13, 44, 84, 0.08)", paddingTop: "12px", marginTop: "auto" }}>
          <div className="tour-price-box">
            <span className="price-label">{l("Giá từ", "Price from", "कीमत से")}</span>
            <span className="price-value">
              {formatPrice(tour.price)}
              <span>{l(" VNĐ/khách", " VND/guest", " रुपये/अतिथि")}</span>
            </span>
          </div>
          <div style={{ display: "flex", gap: "6px" }}>
            <button 
              className="btn btn-outline" 
              onClick={() => onDetailClick && onDetailClick(tour)} 
              style={{ padding: "8px 12px", fontSize: "0.82rem", fontWeight: "bold" }}
            >
              {l("Chi Tiết", "Details", "विवरण")}
            </button>
            <button 
              className="btn btn-primary" 
              onClick={() => onBookClick(tour)} 
              style={{ padding: "8px 12px", fontSize: "0.82rem" }}
            >
              {t.tour_btn_book}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
