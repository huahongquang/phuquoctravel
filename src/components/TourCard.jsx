import React, { useState } from "react";
import { Star, Clock, CheckCircle2, ChevronDown, ChevronUp, Compass, Utensils, MapPin } from "lucide-react";
import { translations } from "../data/translations";

export default function TourCard({ tour, onBookClick, onDetailClick, language }) {
  const [showDetails, setShowDetails] = useState(false);
  const t = translations[language || "vi"];

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  const isEn = language === "en";

  // Translate Category badge
  const categoryLabel = () => {
    switch (tour.category) {
      case "adventure":
        return isEn ? "Adventure" : "Mạo Hiểm";
      case "nature":
        return isEn ? "Nature" : "Thiên Nhiên";
      case "culture":
        return isEn ? "Culture" : "Văn Hóa";
      case "leisure":
        return isEn ? "Leisure" : "Nghỉ Dưỡng";
      default:
        return isEn ? "Tour" : "Tour";
    }
  };

  return (
    <div className="tour-card glass-panel" style={{ height: "auto" }}>
      <div 
        className="tour-img-wrapper" 
        onClick={() => onDetailClick && onDetailClick(tour)}
        style={{ cursor: "pointer" }}
      >
        <img src={tour.image} alt={isEn ? (tour.name_en || tour.name) : tour.name} loading="lazy" />
        {tour.tag && <span className="badge tour-tag">{isEn ? (tour.tag_en || tour.tag) : tour.tag}</span>}
        <span className="badge tour-category-badge">
          {categoryLabel()}
        </span>
      </div>

      <div className="tour-content" style={{ gap: "12px" }}>
        <div>
          <div className="tour-meta">
            <div className="tour-rating">
              <Star size={16} fill="#ffb703" stroke="#ffb703" />
              <span>{tour.rating} ({tour.reviewsCount} {isEn ? "reviews" : "đánh giá"})</span>
            </div>
            <div className="tour-duration">
              <Clock size={16} />
              <span>{isEn ? (tour.duration_en || tour.duration) : tour.duration}</span>
            </div>
          </div>

          <h3 
            className="tour-title" 
            onClick={() => onDetailClick && onDetailClick(tour)}
            style={{ cursor: "pointer" }}
          >
            {isEn ? (tour.name_en || tour.name) : tour.name}
          </h3>
          <p className="tour-desc" style={{ marginBottom: "12px" }}>{isEn ? (tour.description_en || tour.description) : tour.description}</p>
          
          <div style={{ marginBottom: "16px" }}>
            <ul style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {((isEn && tour.highlights_en) ? tour.highlights_en : (tour.highlights || [])).slice(0, 2).map((highlight, idx) => (
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
              <>{isEn ? "Hide service details" : "Thu gọn thông tin dịch vụ"} <ChevronUp size={16} /></>
            ) : (
              <>{isEn ? "Transport, meals, stops details" : "Chi tiết đi lại, ăn uống, điểm dừng"} <ChevronDown size={16} /></>
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
                  <Compass size={14} style={{ color: "var(--secondary)" }} /> {isEn ? "Transportation details" : "Đi lại bằng gì?"}
                </strong>
                <span style={{ color: "var(--text)" }}>{isEn ? (tour.transportation_en || tour.transportation) : tour.transportation}</span>
              </div>
              
              <div>
                <strong style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--primary)", marginBottom: "4px" }}>
                  <Utensils size={14} style={{ color: "var(--secondary)" }} /> {isEn ? "Meals & Dining menu" : "Thực đơn ăn uống?"}
                </strong>
                <ul style={{ paddingLeft: "14px", listStyleType: "disc", color: "var(--text-muted)" }}>
                  {(isEn ? (tour.meals_en || tour.meals) : tour.meals).map((dish, i) => (
                    <li key={i}>{dish}</li>
                  ))}
                </ul>
              </div>

              <div>
                <strong style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--primary)", marginBottom: "4px" }}>
                  <MapPin size={14} style={{ color: "var(--secondary)" }} /> {isEn ? "Stops & Accommodations" : "Điểm dừng chân & Lưu trú?"}
                </strong>
                <span style={{ color: "var(--text)" }}>{isEn ? (tour.accommodationStops_en || tour.accommodationStops) : tour.accommodationStops}</span>
              </div>
            </div>
          )}
        </div>

        <div className="tour-footer" style={{ borderTop: "1px solid rgba(13, 44, 84, 0.08)", paddingTop: "12px", marginTop: "auto" }}>
          <div className="tour-price-box">
            <span className="price-label">{isEn ? "Price from" : "Giá từ"}</span>
            <span className="price-value">
              {formatPrice(tour.price)}
              <span>{isEn ? " VND/guest" : " VNĐ/khách"}</span>
            </span>
          </div>
          <div style={{ display: "flex", gap: "6px" }}>
            <button 
              className="btn btn-outline" 
              onClick={() => onDetailClick && onDetailClick(tour)} 
              style={{ padding: "8px 12px", fontSize: "0.82rem", fontWeight: "bold" }}
            >
              {isEn ? "Details" : "Chi Tiết"}
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
