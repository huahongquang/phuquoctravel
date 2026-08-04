import React, { useState } from "react";
import { Star, Clock, CheckCircle2, ChevronDown, ChevronUp, Compass, Utensils, MapPin } from "lucide-react";

export default function TourCard({ tour, onBookClick }) {
  const [showDetails, setShowDetails] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  return (
    <div className="tour-card glass-panel" style={{ height: "auto" }}>
      <div className="tour-img-wrapper">
        <img src={tour.image} alt={tour.name} loading="lazy" />
        {tour.tag && <span className="badge tour-tag">{tour.tag}</span>}
        <span className="badge tour-category-badge">
          {tour.category === "adventure" && "Mạo Hiểm"}
          {tour.category === "nature" && "Thiên Nhiên"}
          {tour.category === "culture" && "Văn Hóa"}
          {tour.category === "leisure" && "Nghỉ Dưỡng"}
        </span>
      </div>

      <div className="tour-content" style={{ gap: "12px" }}>
        <div>
          <div className="tour-meta">
            <div className="tour-rating">
              <Star size={16} fill="#ffb703" stroke="#ffb703" />
              <span>{tour.rating} ({tour.reviewsCount} đánh giá)</span>
            </div>
            <div className="tour-duration">
              <Clock size={16} />
              <span>{tour.duration}</span>
            </div>
          </div>

          <h3 className="tour-title">{tour.name}</h3>
          <p className="tour-desc" style={{ marginBottom: "12px" }}>{tour.description}</p>
          
          {/* Highlights summary */}
          <div style={{ marginBottom: "16px" }}>
            <ul style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {tour.highlights.slice(0, 2).map((highlight, idx) => (
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
              <>Thu gọn thông tin dịch vụ <ChevronUp size={16} /></>
            ) : (
              <>Chi tiết đi lại, ăn uống, điểm dừng <ChevronDown size={16} /></>
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
                  <Compass size={14} style={{ color: "var(--secondary)" }} /> Đi lại bằng gì?
                </strong>
                <span style={{ color: "var(--text)" }}>{tour.transportation}</span>
              </div>
              
              <div>
                <strong style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--primary)", marginBottom: "4px" }}>
                  <Utensils size={14} style={{ color: "var(--secondary)" }} /> Thực đơn ăn uống?
                </strong>
                <ul style={{ paddingLeft: "14px", listStyleType: "disc", color: "var(--text-muted)" }}>
                  {tour.meals.map((dish, i) => (
                    <li key={i}>{dish}</li>
                  ))}
                </ul>
              </div>

              <div>
                <strong style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--primary)", marginBottom: "4px" }}>
                  <MapPin size={14} style={{ color: "var(--secondary)" }} /> Điểm dừng chân & Lưu trú?
                </strong>
                <span style={{ color: "var(--text)" }}>{tour.accommodationStops}</span>
              </div>
            </div>
          )}
        </div>

        <div className="tour-footer" style={{ borderTop: "1px solid rgba(13, 44, 84, 0.08)", paddingTop: "12px", marginTop: "auto" }}>
          <div className="tour-price-box">
            <span className="price-label">Giá từ</span>
            <span className="price-value">
              {formatPrice(tour.price)}
              <span> VNĐ/khách</span>
            </span>
          </div>
          <button className="btn btn-primary" onClick={() => onBookClick(tour)} style={{ padding: "10px 20px", fontSize: "0.9rem" }}>
            Đặt Ngay
          </button>
        </div>
      </div>
    </div>
  );
}
