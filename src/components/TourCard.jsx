import React from "react";
import { Star, Clock, CheckCircle2 } from "lucide-react";

export default function TourCard({ tour, onBookClick }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  return (
    <div className="tour-card glass-panel">
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

      <div className="tour-content">
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
          <p className="tour-desc">{tour.description}</p>
          
          <div style={{ marginBottom: "20px" }}>
            <p style={{ fontWeight: 600, fontSize: "0.85rem", marginBottom: "8px", color: "var(--primary)" }}>Điểm nhấn hành trình:</p>
            <ul style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {tour.highlights.slice(0, 2).map((highlight, idx) => (
                <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "6px", fontSize: "0.8rem", color: "var(--text-muted)", lineHeight: 1.3 }}>
                  <CheckCircle2 size={14} style={{ color: "var(--secondary)", flexShrink: 0, marginTop: "2px" }} />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="tour-footer">
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
