import React, { useState, useEffect } from "react";
import { X, Star, Clock, MapPin, CheckCircle2, XCircle, Calendar, User, Compass, Utensils, Award } from "lucide-react";
import { translations } from "../data/translations";

export default function TourDetailModal({ isOpen, onClose, tour, onAddToCart, language }) {
  const t = translations[language || "vi"];
  const isEn = language === "en";

  // Tab State: 'overview' | 'itinerary' | 'meals' | 'inclusions'
  const [activeTab, setActiveTab] = useState("overview");

  // Booking Card State
  const [date, setDate] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  // Itinerary accordion state (tracks index of open day/step)
  const [openItineraryIdx, setOpenItineraryIdx] = useState(0);

  // Min date is today
  useEffect(() => {
    if (isOpen) {
      const today = new Date().toISOString().split("T")[0];
      setDate(today);
      setActiveTab("overview");
      setOpenItineraryIdx(0);
      setAdults(2);
      setChildren(0);
    }
  }, [isOpen]);

  if (!isOpen || !tour) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  // Pricing math
  const childPrice = tour.price * 0.7;
  const tourTotal = (adults * tour.price) + (children * childPrice);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const cartItem = {
      tourId: tour.id,
      tourName: isEn ? (tour.name_en || tour.name) : tour.name,
      price: tour.price,
      date,
      adults,
      children,
      totalPrice: tourTotal,
      isCustom: false
    };
    onAddToCart(cartItem);
    onClose();
  };

  return (
    <div className={`modal-overlay ${isOpen ? "open" : ""}`} onClick={onClose}>
      <div className="tour-detail-modal animate-scale-up" onClick={(e) => e.stopPropagation()}>
        
        {/* Modal Close Icon */}
        <button className="close-detail-modal-btn" onClick={onClose} aria-label="Close modal">
          <X size={24} />
        </button>

        {/* Hero Gallery Slider */}
        <div className="detail-hero-banner" style={{ backgroundImage: `url(${tour.image})` }}>
          <div className="detail-hero-overlay">
            <div className="detail-hero-info">
              {tour.tag && (
                <span className="badge detail-tag-badge">
                  🔥 {isEn ? (tour.tag_en || tour.tag) : tour.tag}
                </span>
              )}
              <h2>{isEn ? (tour.name_en || tour.name) : tour.name}</h2>
              
              <div className="detail-quick-meta">
                <span className="meta-item rating">
                  <Star size={16} fill="var(--secondary)" stroke="var(--secondary)" />
                  <strong>{tour.rating}</strong> ({tour.reviewsCount} {isEn ? "reviews" : "đánh giá"})
                </span>
                <span className="meta-item">
                  <Clock size={16} />
                  {isEn ? (tour.duration_en || tour.duration) : tour.duration}
                </span>
                <span className="meta-item">
                  <MapPin size={16} />
                  Phú Quốc, Việt Nam
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Breadcrumb Navigation */}
        <div className="detail-breadcrumbs">
          <span>{isEn ? "Home" : "Trang chủ"}</span> &gt; 
          <span>{isEn ? "Tours" : "Tour Du Lịch"}</span> &gt; 
          <span className="active">{isEn ? (tour.name_en || tour.name) : tour.name}</span>
        </div>

        {/* Content Layout: 70% Left Columns, 30% Right Sticky booking column */}
        <div className="detail-main-layout">
          
          {/* Left Contents (70%) */}
          <div className="detail-content-column">
            
            {/* Tabs Selector Bar */}
            <div className="detail-tabs-bar">
              <button 
                className={`tab-btn ${activeTab === "overview" ? "active" : ""}`}
                onClick={() => setActiveTab("overview")}
              >
                📁 {isEn ? "Overview" : "Tổng quan"}
              </button>
              <button 
                className={`tab-btn ${activeTab === "itinerary" ? "active" : ""}`}
                onClick={() => setActiveTab("itinerary")}
              >
                🗺️ {isEn ? "Itinerary" : "Lịch trình"}
              </button>
              <button 
                className={`tab-btn ${activeTab === "inclusions" ? "active" : ""}`}
                onClick={() => setActiveTab("inclusions")}
              >
                ✔️ {isEn ? "Inclusions" : "Dịch vụ đi kèm"}
              </button>
              <button 
                className={`tab-btn ${activeTab === "meals" ? "active" : ""}`}
                onClick={() => setActiveTab("meals")}
              >
                🍽️ {isEn ? "Menu" : "Thực đơn"}
              </button>
            </div>

            {/* Tab Panels */}
            <div className="detail-tab-panel">
              
              {/* Tab 1: OVERVIEW */}
              {activeTab === "overview" && (
                <div className="animate-fade-in">
                  <h4 className="panel-title">{isEn ? "About This Tour" : "Mô tả hành trình"}</h4>
                  <p className="panel-desc">
                    {isEn ? (tour.description_en || tour.description) : tour.description}
                  </p>

                  <h4 className="panel-title" style={{ marginTop: "24px" }}>
                    ⭐ {isEn ? "Tour Highlights" : "Điểm nổi bật của Tour"}
                  </h4>
                  <div className="highlights-grid">
                    {(isEn ? (tour.highlights_en || []) : (tour.highlights || [])).map((hl, i) => (
                      <div key={i} className="highlight-item">
                        <CheckCircle2 size={18} className="success-icon" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>

                  {tour.gallery && tour.gallery.length > 1 && (
                    <div style={{ marginTop: "30px" }}>
                      <h4 className="panel-title">{isEn ? "Tour Gallery" : "Hình ảnh thực tế"}</h4>
                      <div className="detail-gallery-grid">
                        {tour.gallery.map((img, idx) => (
                          <div key={idx} className="gallery-img-card">
                            <img src={img} alt={`Gallery ${idx}`} />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: ITINERARY */}
              {activeTab === "itinerary" && tour.itinerary && (
                <div className="animate-fade-in">
                  <h4 className="panel-title">{isEn ? "Day Itinerary Schedule" : "Lịch trình chi tiết theo giờ"}</h4>
                  
                  <div className="itinerary-timeline">
                    {(isEn ? tour.itinerary_en : tour.itinerary).map((step, idx) => {
                      const isOpen = openItineraryIdx === idx;
                      return (
                        <div key={idx} className={`timeline-item ${isOpen ? "active" : ""}`}>
                          <div className="timeline-marker">
                            <div className="timeline-dot"></div>
                          </div>
                          
                          <div className="timeline-content-card">
                            <div 
                              className="timeline-header" 
                              onClick={() => setOpenItineraryIdx(isOpen ? -1 : idx)}
                            >
                              <span className="time-bubble">{step.time}</span>
                              <h5>{step.title}</h5>
                              <span className="expand-indicator">{isOpen ? "−" : "+"}</span>
                            </div>
                            
                            {isOpen && (
                              <div className="timeline-body animate-slide-down">
                                <p>{step.desc}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Tab 3: INCLUSIONS & EXCLUSIONS */}
              {activeTab === "inclusions" && (
                <div className="animate-fade-in">
                  <div className="inclusions-columns">
                    {/* What's Included */}
                    <div className="inclusion-column">
                      <h4 className="panel-title inclusion-title">
                        <CheckCircle2 size={20} className="success-icon" />
                        {isEn ? "What's Included" : "Dịch vụ bao gồm"}
                      </h4>
                      <ul className="inc-list">
                        {(isEn ? (tour.included_en || []) : (tour.included || [])).map((item, i) => (
                          <li key={i}>
                            <CheckCircle2 size={14} className="success-icon list-bullet" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* What's Excluded */}
                    <div className="inclusion-column">
                      <h4 className="panel-title exclusion-title">
                        <XCircle size={20} className="danger-icon" />
                        {isEn ? "What's Excluded" : "Không bao gồm"}
                      </h4>
                      <ul className="inc-list">
                        {(isEn ? (tour.excluded_en || []) : (tour.excluded || [])).map((item, i) => (
                          <li key={i}>
                            <XCircle size={14} className="danger-icon list-bullet" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="inclusion-notice-box" style={{ marginTop: "24px" }}>
                    <p style={{ margin: 0, fontSize: "0.8rem", color: "var(--text-muted)", lineHeight: 1.4 }}>
                      ⚠️ <strong>{isEn ? "Important Note" : "Lưu ý quan trọng"}:</strong> {isEn ? "Pick-up time may slightly vary by 10-15 minutes depending on traffic. Please be ready at your hotel lobby on time." : "Giờ đón thực tế có thể xê dịch từ 10-15 phút tùy thuộc vào vị trí giao thông khách sạn. Quý khách vui lòng có mặt tại sảnh trước 15 phút."}
                    </p>
                  </div>
                </div>
              )}

              {/* Tab 4: MEALS MENU */}
              {activeTab === "meals" && (
                <div className="animate-fade-in">
                  <h4 className="panel-title">{isEn ? "Tour Dining Seafood Menu" : "Thực đơn ăn uống hải sản Phú Quốc"}</h4>
                  <p className="panel-desc">
                    {isEn ? "Enjoy fresh seafood dishes prepared under local traditional recipes served on floating houses." : "Hành trình có chuẩn bị thực đơn trưa hải sản vô cùng thịnh soạn được đánh bắt tươi sống tại đảo An Thới/Rạch Vẹm:"}
                  </p>
                  
                  <div className="meals-menu-grid">
                    {(isEn ? (tour.meals_en || []) : (tour.meals || [])).map((meal, idx) => (
                      <div key={idx} className="menu-dish-card">
                        <Utensils size={16} style={{ color: "var(--primary)", opacity: 0.8 }} />
                        <span>{meal}</span>
                      </div>
                    ))}
                  </div>

                  <div className="meals-note" style={{ marginTop: "24px", background: "rgba(255, 170, 13, 0.08)", padding: "16px", borderRadius: "12px", border: "1px solid rgba(255,170,13,0.15)" }}>
                    <p style={{ margin: 0, fontSize: "0.8rem", color: "var(--heading)", display: "flex", alignItems: "center", gap: "6px" }}>
                      🌱 <strong>{isEn ? "Vegetarian Options Available" : "Có phục vụ thực đơn chay"}:</strong> {isEn ? "Please notify us in advance if you have any food allergies or require a vegetarian meal." : "Vui lòng thông báo trước cho HDV nếu bạn bị dị ứng hải sản hoặc muốn đổi sang thực đơn ăn chay."}
                    </p>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Right Column: Sticky Booking Widget (30%) */}
          <div className="detail-sidebar-column">
            <div className="booking-widget-card">
              <div className="widget-header">
                <span className="price-tag">
                  {isEn ? "Price from" : "Giá từ"}
                </span>
                <h3>
                  {formatPrice(tour.price)}
                  <span>{isEn ? " VND/guest" : " VNĐ/khách"}</span>
                </h3>
              </div>

              <form onSubmit={handleBookingSubmit} className="widget-form">
                <div className="form-item">
                  <label>
                    <Calendar size={14} />
                    {isEn ? "Departure Date" : "Ngày khởi hành"}
                  </label>
                  <input 
                    type="date" 
                    required 
                    value={date} 
                    onChange={(e) => setDate(e.target.value)} 
                  />
                </div>

                <div className="form-item quantity-item">
                  <label>
                    <User size={14} />
                    {isEn ? "Adults" : "Người lớn"}
                    <span className="sub-label">({isEn ? "Age 12+" : "Từ 12 tuổi"})</span>
                  </label>
                  <div className="quantity-controller">
                    <button 
                      type="button" 
                      onClick={() => setAdults(Math.max(1, adults - 1))}
                    >
                      −
                    </button>
                    <span className="qty-value">{adults}</span>
                    <button 
                      type="button" 
                      onClick={() => setAdults(adults + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="form-item quantity-item">
                  <label>
                    <User size={14} />
                    {isEn ? "Children" : "Trẻ em"}
                    <span className="sub-label">({isEn ? "Age 4-11 (70% price)" : "4 - 11 tuổi (70% giá)"})</span>
                  </label>
                  <div className="quantity-controller">
                    <button 
                      type="button" 
                      onClick={() => setChildren(Math.max(0, children - 1))}
                    >
                      −
                    </button>
                    <span className="qty-value">{children}</span>
                    <button 
                      type="button" 
                      onClick={() => setChildren(children + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Pricing Summary */}
                <div className="widget-total-summary">
                  <div className="summary-row">
                    <span>{isEn ? "Adult price" : "Giá người lớn"}</span>
                    <span>{adults} × {formatPrice(tour.price)} đ</span>
                  </div>
                  {children > 0 && (
                    <div className="summary-row">
                      <span>{isEn ? "Child price" : "Giá trẻ em"}</span>
                      <span>{children} × {formatPrice(childPrice)} đ</span>
                    </div>
                  )}
                  <div className="summary-row divider"></div>
                  <div className="summary-row total-row">
                    <span>{isEn ? "Total Amount" : "Tổng chi phí"}</span>
                    <span className="total-val">{formatPrice(tourTotal)} đ</span>
                  </div>
                </div>

                <button type="submit" className="widget-submit-btn">
                  🛒 {isEn ? "Book Tour Now" : "Đặt Tour Ngay"}
                </button>
              </form>

              <div className="widget-assurances">
                <div className="assurance-item">
                  <Compass size={14} />
                  <span>{isEn ? "Instant booking confirmation" : "Xác nhận đặt tour tức thì"}</span>
                </div>
                <div className="assurance-item">
                  <Award size={14} />
                  <span>{isEn ? "No hidden fees, local support 24/7" : "Không phí ẩn, hỗ trợ bản địa 24/7"}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
