import React, { useState, useEffect } from "react";
import { X, Star, Clock, MapPin, CheckCircle2, XCircle, Calendar, User, Compass, Utensils, Award } from "lucide-react";
import { translations } from "../data/translations";

export default function TourDetailModal({ isOpen, onClose, tour, onAddToCart, language }) {
  const t = translations[language || "vi"];
  const isEn = language === "en";
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
      tourName: getProp(tour.name, tour.name_en, tour.name_hi),
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
                  🔥 {getProp(tour.tag, tour.tag_en, tour.tag_hi)}
                </span>
              )}
              <h2>{getProp(tour.name, tour.name_en, tour.name_hi)}</h2>
              
              <div className="detail-quick-meta">
                <span className="meta-item rating">
                  <Star size={16} fill="var(--secondary)" stroke="var(--secondary)" />
                  <strong>{tour.rating}</strong> ({tour.reviewsCount} {l("đánh giá", "reviews", "समीक्षाएं")})
                </span>
                <span className="meta-item">
                  <Clock size={16} />
                  {getProp(tour.duration, tour.duration_en, tour.duration_hi)}
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
          <span>{l("Trang chủ", "Home", "होम")}</span> &gt; 
          <span>{l("Tour Du Lịch", "Tours", "पर्यटन")}</span> &gt; 
          <span className="active">{getProp(tour.name, tour.name_en, tour.name_hi)}</span>
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
                📁 {l("Tổng quan", "Overview", "अवलोकन")}
              </button>
              <button 
                className={`tab-btn ${activeTab === "itinerary" ? "active" : ""}`}
                onClick={() => setActiveTab("itinerary")}
              >
                🗺️ {l("Lịch trình", "Itinerary", "यात्रा कार्यक्रम")}
              </button>
              <button 
                className={`tab-btn ${activeTab === "inclusions" ? "active" : ""}`}
                onClick={() => setActiveTab("inclusions")}
              >
                ✔️ {l("Dịch vụ đi kèm", "Inclusions", "समावेश")}
              </button>
              <button 
                className={`tab-btn ${activeTab === "meals" ? "active" : ""}`}
                onClick={() => setActiveTab("meals")}
              >
                🍽️ {l("Thực đơn", "Menu", "मेनू")}
              </button>
            </div>

            {/* Tab Panels */}
            <div className="detail-tab-panel">
              
              {/* Tab 1: OVERVIEW */}
              {activeTab === "overview" && (
                <div className="animate-fade-in">
                  <h4 className="panel-title">{l("Mô tả hành trình", "About This Tour", "दौरे के बारे में")}</h4>
                  <p className="panel-desc">
                    {getProp(tour.description, tour.description_en, tour.description_hi)}
                  </p>

                  <h4 className="panel-title" style={{ marginTop: "24px" }}>
                    ⭐ {l("Điểm nổi bật của Tour", "Tour Highlights", "दौरे की मुख्य विशेषताएं")}
                  </h4>
                  <div className="highlights-grid">
                    {(getProp(tour.highlights, tour.highlights_en, tour.highlights_hi) || []).map((hl, i) => (
                      <div key={i} className="highlight-item">
                        <CheckCircle2 size={18} className="success-icon" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>

                  {tour.gallery && tour.gallery.length > 1 && (
                    <div style={{ marginTop: "30px" }}>
                      <h4 className="panel-title">{l("Hình ảnh thực tế", "Tour Gallery", "दौरे की तस्वीरें")}</h4>
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
                  <h4 className="panel-title">{l("Lịch trình chi tiết theo giờ", "Day Itinerary Schedule", "विस्तृत दैनिक कार्यक्रम")}</h4>
                  
                  <div className="itinerary-timeline">
                    {(getProp(tour.itinerary, tour.itinerary_en, tour.itinerary_hi) || []).map((step, idx) => {
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
                        {l("Dịch vụ bao gồm", "What's Included", "शामिल सेवाएं")}
                      </h4>
                      <ul className="inc-list">
                        {(getProp(tour.included, tour.included_en, tour.included_hi) || []).map((item, i) => (
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
                        {l("Không bao gồm", "What's Excluded", "शामिल नहीं")}
                      </h4>
                      <ul className="inc-list">
                        {(getProp(tour.excluded, tour.excluded_en, tour.excluded_hi) || []).map((item, i) => (
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
                      ⚠️ <strong>{l("Lưu ý quan trọng", "Important Note", "महत्वपूर्ण सूचना")}:</strong> {l("Giờ đón thực tế có thể xê dịch từ 10-15 phút tùy thuộc vào vị trí giao thông khách sạn. Quý khách vui lòng có mặt tại sảnh trước 15 phút.", "Pick-up time may slightly vary by 10-15 minutes depending on traffic. Please be ready at your hotel lobby on time.", "यातायात के आधार पर पिकअप का समय 10-15 मिनट भिन्न हो सकता है। कृपया समय पर तैयार रहें।")}
                    </p>
                  </div>
                </div>
              )}

              {/* Tab 4: MEALS MENU */}
              {activeTab === "meals" && (
                <div className="animate-fade-in">
                  <h4 className="panel-title">{l("Thực đơn ăn uống hải sản Phú Quốc", "Tour Dining Seafood Menu", "समुद्री भोजन मेनू")}</h4>
                  <p className="panel-desc">
                    {l("Hành trình có chuẩn bị thực đơn trưa hải sản vô cùng thịnh soạn được đánh bắt tươi sống tại đảo An Thới/Rạch Vẹm:", "Enjoy fresh seafood dishes prepared under local traditional recipes served on floating houses.", "स्थानीय तैरते घरों में परोसे जाने वाले पारंपरिक समुद्री भोजन व्यंजनों का आनंद लें:")}
                  </p>
                  
                  <div className="meals-menu-grid">
                    {(getProp(tour.meals, tour.meals_en, tour.meals_hi) || []).map((meal, idx) => (
                      <div key={idx} className="menu-dish-card">
                        <Utensils size={16} style={{ color: "var(--primary)", opacity: 0.8 }} />
                        <span>{meal}</span>
                      </div>
                    ))}
                  </div>

                  <div className="meals-note" style={{ marginTop: "24px", background: "rgba(255, 170, 13, 0.08)", padding: "16px", borderRadius: "12px", border: "1px solid rgba(255,170,13,0.15)" }}>
                    <p style={{ margin: 0, fontSize: "0.8rem", color: "var(--heading)", display: "flex", alignItems: "center", gap: "6px" }}>
                      🌱 <strong>{l("Có phục vụ thực đơn chay", "Vegetarian Options Available", "शाकाहारी विकल्प उपलब्ध")}:</strong> {l("Vui lòng thông báo trước cho HDV nếu bạn bị dị ứng hải sản hoặc muốn đổi sang thực đơn ăn chay.", "Please notify us in advance if you have any food allergies or require a vegetarian meal.", "यदि आपको कोई भोजन एलर्जी है या शाकाहारी भोजन की आवश्यकता है तो कृपया हमें पहले सूचित करें।")}
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
                  {l("Giá từ", "Price from", "कीमत से")}
                </span>
                <h3>
                  {formatPrice(tour.price)}
                  <span>{l(" VNĐ/khách", " VND/guest", " रुपये/अतिथि")}</span>
                </h3>
              </div>

              <form onSubmit={handleBookingSubmit} className="widget-form">
                <div className="form-item">
                  <label>
                    <Calendar size={14} />
                    {l("Ngày khởi hành", "Departure Date", "प्रस्थान तिथि")}
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
                    {l("Người lớn", "Adults", "वयस्क")}
                    <span className="sub-label">({l("Từ 12 tuổi", "Age 12+", "आयु 12+")})</span>
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
                    {l("Trẻ em", "Children", "बच्चे")}
                    <span className="sub-label">({l("4 - 11 tuổi (70% giá)", "Age 4-11 (70% price)", "आयु 4-11 (70% कीमत)")})</span>
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
                    <span>{l("Giá người lớn", "Adult price", "वयस्क टिकट")}</span>
                    <span>{adults} × {formatPrice(tour.price)} đ</span>
                  </div>
                  {children > 0 && (
                    <div className="summary-row">
                      <span>{l("Giá trẻ em", "Child price", "बच्चे का टिकट")}</span>
                      <span>{children} × {formatPrice(childPrice)} đ</span>
                    </div>
                  )}
                  <div className="summary-row divider"></div>
                  <div className="summary-row total-row">
                    <span>{l("Tổng chi phí", "Total Amount", "कुल लागत")}</span>
                    <span className="total-val">{formatPrice(tourTotal)} đ</span>
                  </div>
                </div>

                <button type="submit" className="widget-submit-btn">
                  🛒 {l("Đặt Tour Ngay", "Book Tour Now", "अभी बुक करें")}
                </button>
              </form>

              <div className="widget-assurances">
                <div className="assurance-item">
                  <Compass size={14} />
                  <span>{l("Xác nhận đặt tour tức thì", "Instant booking confirmation", "तत्काल बुकिंग पुष्टि")}</span>
                </div>
                <div className="assurance-item">
                  <Award size={14} />
                  <span>{l("Không phí ẩn, hỗ trợ bản địa 24/7", "No hidden fees, local support 24/7", "कोई छिपी हुई फीस नहीं, 24/7 सहायता")}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
