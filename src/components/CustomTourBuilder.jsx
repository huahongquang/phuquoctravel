import React, { useState } from "react";
import { Plane, Ship, Hotel, Utensils, Compass, Plus, Trash2, ArrowUp, ArrowDown, ShoppingBag, Sparkles, AlertCircle, X, ChevronLeft, ChevronRight } from "lucide-react";
import { translations } from "../data/translations";

export default function CustomTourBuilder({ onBookCustomItinerary, servicesDatabase, language }) {
  const [activeCategory, setActiveCategory] = useState("hotel");
  const [timeline, setTimeline] = useState([]);
  const [showMediaId, setShowMediaId] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const t = translations[language || "vi"];
  const isEn = language === "en";
  const l = (vi, en, hi) => {
    if (language === "vi") return vi;
    if (language === "en") return en;
    return hi || en;
  };

  const addItemToTimeline = (item) => {
    const newItem = {
      ...item,
      uniqueId: `${item.id}-${Date.now()}` // Generate unique ID for list ordering
    };
    setTimeline((prev) => [...prev, newItem]);
  };

  const removeItem = (uniqueId) => {
    setTimeline((prev) => prev.filter((item) => item.uniqueId !== uniqueId));
  };

  const moveItemUp = (index) => {
    if (index === 0) return;
    setTimeline((prev) => {
      const newList = [...prev];
      const temp = newList[index];
      newList[index] = newList[index - 1];
      newList[index - 1] = temp;
      return newList;
    });
  };

  const moveItemDown = (index) => {
    setTimeline((prev) => {
      if (index === prev.length - 1) return prev;
      const newList = [...prev];
      const temp = newList[index];
      newList[index] = newList[index + 1];
      newList[index + 1] = temp;
      return newList;
    });
  };

  // Compute total cost
  const totalCost = timeline.reduce((acc, item) => acc + item.price, 0);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  const handleCheckout = () => {
    if (timeline.length === 0) return;
    
    const configuredTour = {
      tourId: "custom-tour",
      tourName: isEn ? "Custom Personalized Phu Quoc Itinerary" : "Hành Trình Tự Thiết Kế Phú Quốc",
      price: totalCost,
      date: new Date().toISOString().split("T")[0],
      adults: 1,
      children: 0,
      totalPrice: totalCost,
      isCustom: true,
      customItems: timeline.map(item => ({
        name: isEn ? (item.name_en || item.name) : item.name,
        price: item.price,
        category: item.category
      }))
    };

    onBookCustomItinerary(configuredTour);
  };

  const categoryTabs = [
    { id: "hotel", label: t.tab_hotel },
    { id: "dining", label: t.tab_dining },
    { id: "activity", label: t.tab_activity }
  ];

  // Helper to translate timeline categories
  const getTimelineCategoryLabel = (category) => {
    switch (category) {
      case "flight":
        return isEn ? "Flight" : "Vé máy bay";
      case "transport":
        return isEn ? "Transport" : "Vận chuyển";
      case "hotel":
        return isEn ? "Stay (Night)" : "Nghỉ ngơi (Đêm)";
      case "dining":
        return isEn ? "Dining" : "Ẩm thực";
      case "activity":
        return isEn ? "Activity" : "Trải nghiệm";
      default:
        return category;
    }
  };

  return (
    <section id="builder" className="builder-section">
      <div className="container animate-fade-in-up">
        <h2 className="section-title">{t.builder_title}</h2>
        <p className="section-subtitle">{t.builder_subtitle}</p>

        <div className="builder-container" style={{ gridTemplateColumns: "1fr" }}>
          {/* Expanded Services Bank */}
          <div className="builder-bank" style={{ width: "100%" }}>
            <div className="bank-tabs">
              {categoryTabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`bank-tab-btn ${activeCategory === tab.id ? "active" : ""}`}
                  onClick={() => setActiveCategory(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginBottom: "16px" }}>
              {t.builder_tip}
            </p>

            <div className="bank-items-grid" style={{ maxHeight: "none", overflowY: "visible" }}>
              {servicesDatabase[activeCategory]?.map((item) => {
                const displayName = isEn ? (item.name_en || item.name) : item.name;
                const displayDesc = isEn ? (item.desc_en || item.desc) : item.desc;
                return (
                  <div
                    key={item.id}
                    className="bank-item-card"
                  >
                    {/* Render Image directly on Card */}
                    {item.image && (
                      <div className="bank-item-image-wrapper">
                        <img src={item.image} alt={displayName} className="bank-item-thumbnail" />
                        <span className="bank-item-category-icon">
                          {activeCategory === "hotel" && <Hotel size={14} />}
                          {activeCategory === "dining" && <Utensils size={14} />}
                          {activeCategory === "activity" && <Compass size={14} />}
                        </span>
                      </div>
                    )}

                    <div className="bank-item-info-body" style={{ padding: "16px 16px 0 16px", flexGrow: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
                      <h4 className="bank-item-name">{displayName}</h4>
                      <p className="bank-item-desc">{displayDesc}</p>

                      <button
                        type="button"
                        onClick={() => { setSelectedService(item); setActiveImageIdx(0); }}
                        style={{
                          background: "none",
                          border: "none",
                          color: "var(--secondary)",
                          fontSize: "0.78rem",
                          fontWeight: 700,
                          cursor: "pointer",
                          padding: 0,
                          textAlign: "left",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                          width: "fit-content"
                        }}
                      >
                        🔎 {isEn ? "View Details" : "Xem chi tiết"}
                      </button>

                      {/* Video/Youtube indicator stay clean */}
                      {item.youtube && (
                        <div style={{ marginTop: "10px" }}>
                          <button
                            type="button"
                            className="btn btn-outline"
                            onClick={() => setShowMediaId(showMediaId === item.id ? null : item.id)}
                            style={{ padding: "4px 10px", fontSize: "0.7rem", display: "flex", gap: "4px", borderColor: "var(--primary)", color: "var(--primary)" }}
                          >
                            <span>🎥 {showMediaId === item.id ? (isEn ? "Hide Video" : "Ẩn video") : (isEn ? "Watch Video" : "Xem video")}</span>
                          </button>
                        </div>
                      )}

                      {/* Collapsible Youtube Video Player */}
                      {showMediaId === item.id && item.youtube && (
                        <div style={{ marginTop: "10px" }}>
                          <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", borderRadius: "8px" }}>
                            <iframe
                              src={item.youtube.includes("watch?v=") 
                                ? item.youtube.replace("watch?v=", "embed/").split("&")[0] 
                                : item.youtube.includes("youtu.be/") 
                                  ? item.youtube.replace("youtu.be/", "youtube.com/embed/") 
                                  : item.youtube}
                              title="YouTube player"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="bank-item-footer" style={{ padding: "0 16px 16px 16px", marginTop: "12px" }}>
                      <span className="bank-item-price">{formatPrice(item.price)} đ</span>
                      <button
                        type="button"
                        onClick={() => addItemToTimeline(item)}
                        style={{
                          background: "var(--primary)",
                          color: "var(--white)",
                          border: "none",
                          width: "36px",
                          height: "36px",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          transition: "var(--transition)"
                        }}
                        title={t.btn_add_timeline}
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Horizontal Timeline Summary (Phần Timeline tích hợp ở dưới phần mở rộng) */}
            <div className="builder-timeline-horizontal">
              <div className="timeline-horizontal-header">
                <h3 style={{ fontSize: "1.2rem", display: "flex", alignItems: "center", gap: "8px", color: "var(--primary)" }}>
                  <Sparkles size={20} style={{ color: "var(--accent)" }} />
                  {t.builder_timeline_title}
                </h3>
                <span className="timeline-horizontal-badge">
                  {timeline.length} {l("dịch vụ đã chọn", "selected services", "चयनित सेवाएं")}
                </span>
              </div>

              {timeline.length === 0 ? (
                <div className="timeline-horizontal-empty">
                  <AlertCircle size={32} style={{ color: "var(--text-muted)", opacity: 0.5, marginBottom: "8px" }} />
                  <p style={{ fontSize: "0.88rem", fontWeight: 600 }}>{l("Hành trình tự thiết kế đang trống.", "Your custom timeline is empty.", "आपका कस्टम समयरेखा खाली है।")}</p>
                  <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                    {l(
                      "Vui lòng click chọn dấu (+) ở các dịch vụ bên trên để thiết kế gói dịch vụ.",
                      "Select services above by clicking (+) to build your package.",
                      "अपने पैकेज बनाने के लिए ऊपर से सेवाएं जोड़ने के लिए (+) पर क्लिक करें。"
                    )}
                  </p>
                </div>
              ) : (
                <div className="timeline-horizontal-wrapper">
                  <div className="timeline-horizontal-list">
                    {timeline.map((item, idx) => (
                      <div key={item.uniqueId} className="timeline-horizontal-card animate-fade-in">
                        <div className="timeline-card-header">
                          <span className="timeline-card-category">{getTimelineCategoryLabel(item.category)}</span>
                          <button
                            type="button"
                            className="timeline-card-remove"
                            onClick={() => removeItem(item.uniqueId)}
                            title="Xóa"
                          >
                            <X size={14} />
                          </button>
                        </div>
                        <h4 className="timeline-card-title">{isEn ? (item.name_en || item.name) : item.name}</h4>
                        <div className="timeline-card-footer">
                          <span className="timeline-card-price">{formatPrice(item.price)} đ</span>
                          <div className="timeline-card-nav">
                            <button
                              type="button"
                              className="timeline-nav-btn"
                              onClick={() => moveItemUp(idx)}
                              disabled={idx === 0}
                              style={{ opacity: idx === 0 ? 0.3 : 1 }}
                            >
                              <ArrowUp size={12} />
                            </button>
                            <button
                              type="button"
                              className="timeline-nav-btn"
                              onClick={() => moveItemDown(idx)}
                              disabled={idx === timeline.length - 1}
                              style={{ opacity: idx === timeline.length - 1 ? 0.3 : 1 }}
                            >
                              <ArrowDown size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="timeline-horizontal-checkout">
                    <div className="checkout-cost-box">
                      <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>{t.builder_total_cost}</span>
                      <strong style={{ fontSize: "1.5rem", color: "var(--secondary)", fontWeight: 800 }}>
                        {formatPrice(totalCost)} đ
                      </strong>
                    </div>
                    <button className="btn btn-accent checkout-book-btn" onClick={handleCheckout}>
                      <ShoppingBag size={20} />
                      {t.builder_btn_book}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* SERVICE DETAIL MODAL */}
      {selectedService && (
        <div className="modal-overlay open" onClick={() => setSelectedService(null)} style={{ zIndex: 1500 }}>
          <div className="booking-modal animate-scale-up" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "650px", width: "100%" }}>
            
            {/* Modal Header */}
            <div className="modal-header" style={{ background: "var(--primary)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span className="badge" style={{ background: "var(--secondary)", color: "var(--white)", textTransform: "uppercase", fontSize: "0.7rem", fontWeight: 700 }}>
                  {getTimelineCategoryLabel(selectedService.category)}
                </span>
                <h3 style={{ margin: 0, color: "var(--white)", fontSize: "1.15rem", fontWeight: 700 }}>
                  {isEn ? "Service Details" : "Chi Tiết Dịch Vụ"}
                </h3>
              </div>
              <button className="close-modal-btn" onClick={() => setSelectedService(null)}>
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="modal-body" style={{ padding: "24px 30px", maxHeight: "75vh", overflowY: "auto" }}>
              {selectedService.gallery && selectedService.gallery.length > 0 ? (
                <div>
                  <div style={{ position: "relative", width: "100%", height: "260px", borderRadius: "12px", overflow: "hidden", marginBottom: "12px" }}>
                    <img 
                      src={selectedService.gallery[activeImageIdx] || selectedService.image} 
                      alt={selectedService.name} 
                      style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                    />
                    
                    {/* Prev Button Overlay */}
                    <button
                      type="button"
                      onClick={() => setActiveImageIdx((prev) => (prev === 0 ? selectedService.gallery.length - 1 : prev - 1))}
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "12px",
                        transform: "translateY(-50%)",
                        background: "rgba(13, 44, 84, 0.65)",
                        border: "none",
                        color: "var(--white)",
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        transition: "var(--transition)",
                        zIndex: 10,
                        backdropFilter: "blur(4px)"
                      }}
                      title={l("Hình trước", "Previous Image", "पिछला चित्र")}
                      className="gallery-nav-overlay-btn"
                    >
                      <ChevronLeft size={20} />
                    </button>

                    {/* Next Button Overlay */}
                    <button
                      type="button"
                      onClick={() => setActiveImageIdx((prev) => (prev === selectedService.gallery.length - 1 ? 0 : prev + 1))}
                      style={{
                        position: "absolute",
                        top: "50%",
                        right: "12px",
                        transform: "translateY(-50%)",
                        background: "rgba(13, 44, 84, 0.65)",
                        border: "none",
                        color: "var(--white)",
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        transition: "var(--transition)",
                        zIndex: 10,
                        backdropFilter: "blur(4px)"
                      }}
                      title={l("Hình tiếp theo", "Next Image", "अगला चित्र")}
                      className="gallery-nav-overlay-btn"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                  
                  {/* Thumbnail Row */}
                  <div style={{ display: "flex", gap: "10px", marginBottom: "20px", overflowX: "auto", paddingBottom: "6px" }}>
                    {selectedService.gallery.map((img, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveImageIdx(idx)}
                        style={{
                          width: "70px",
                          height: "50px",
                          borderRadius: "6px",
                          overflow: "hidden",
                          border: activeImageIdx === idx ? "2px solid var(--secondary)" : "1px solid rgba(0,0,0,0.08)",
                          padding: 0,
                          cursor: "pointer",
                          transition: "var(--transition)",
                          opacity: activeImageIdx === idx ? 1 : 0.7,
                          flexShrink: 0
                        }}
                      >
                        <img src={img} alt={`Thumb ${idx}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                selectedService.image && (
                  <div style={{ width: "100%", height: "220px", borderRadius: "12px", overflow: "hidden", marginBottom: "20px" }}>
                    <img src={selectedService.image} alt={selectedService.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                )
              )}

              <h3 style={{ color: "var(--primary)", fontSize: "1.4rem", fontWeight: 800, marginBottom: "8px" }}>
                {language === "vi" ? selectedService.name : (selectedService.name_en || selectedService.name)}
              </h3>

              <p style={{ fontSize: "0.95rem", color: "var(--text)", lineHeight: 1.6, marginBottom: "20px" }}>
                {language === "vi" ? selectedService.desc : (selectedService.desc_en || selectedService.desc)}
              </p>

              {/* Dynamic details section depending on category */}
              <div style={{ background: "#f8fafc", padding: "16px 20px", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.02)", marginBottom: "24px" }}>
                <h4 style={{ color: "var(--primary)", fontSize: "0.9rem", fontWeight: 700, marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  {l("Thông Tin Chi Tiết & Tiện Nghi", "Specifications & Amenities", "विवरण और सुविधाएं")}
                </h4>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", fontSize: "0.88rem" }}>
                  {selectedService.category === "hotel" && (
                    <>
                      <div><strong>🔑 {l("Chủ nhà:", "Host:", "मेजबान:")}</strong> {selectedService.host || l("Chính chủ", "Verified Host", "सत्यापित मेजबान")}</div>
                      <div><strong>⭐ {l("Đánh giá:", "Rating:", "मूल्यांकन:")}</strong> {selectedService.rating || "4.8"} / 5</div>
                      <div><strong>📍 {l("Khu vực:", "Location:", "स्थान:")}</strong> {selectedService.address || "Phú Quốc"}</div>
                      <div><strong>👥 {l("Sức chứa:", "Capacity:", "अतिथि:")}</strong> {l(`Tối đa ${selectedService.maxGuests || 2} khách`, `Max ${selectedService.maxGuests || 2} guests`, `अधिकतम ${selectedService.maxGuests || 2} अतिथि`)}</div>
                      <div style={{ gridColumn: "1 / -1", marginTop: "4px" }}>
                        <strong>✨ {l("Tiện nghi phòng:", "Included Amenities:", "शामिल सुविधाएं:")}</strong> Wifi tốc độ cao, Điều hòa, Nước suối miễn phí, Dịch vụ dọn phòng hàng ngày.
                      </div>
                    </>
                  )}

                  {selectedService.category === "dining" && (
                    <>
                      <div style={{ gridColumn: "1 / -1" }}><strong>🍽️ {l("Thực đơn tiêu chuẩn:", "Sample Menu:", "मानक मेनू:")}</strong> {selectedService.menu || l("Hải sản tươi sống, ghẹ hấp sả, tôm nướng", "Fresh Seafood, Squid, hotpot", "ताजा समुद्री भोजन, स्क्विड, हॉटपॉट")}</div>
                      <div><strong>📍 {l("Địa chỉ:", "Address:", "पता:")}</strong> {selectedService.address || "Phú Quốc"}</div>
                      <div><strong>🕒 {l("Giờ hoạt động:", "Open Hours:", "खुलने का समय:")}</strong> 10:00 - 22:00</div>
                      <div style={{ gridColumn: "1 / -1", marginTop: "4px" }}>
                        <strong>✨ {l("Không gian:", "Atmosphere:", "वातावरण:")}</strong> {l("Nhà bè hải sản tự nhiên mát mẻ, phục vụ tại bàn, hải sản bắt sống trực tiếp từ lồng bè.", "Fresh seafood floating raft, tableside service, seafood caught live.", "ताजा समुद्री भोजन फ्लोटिंग राफ्ट, टेबलसाइड सेवा, जीवित पकड़ी गई समुद्री भोजन।")}
                      </div>
                    </>
                  )}

                  {selectedService.category === "activity" && (
                    <>
                      <div><strong>🕒 {l("Thời lượng:", "Duration:", "अवधि:")}</strong> {l("Khoảng 4 - 8 tiếng", "Approx. 4-8 hours", "लगभग 4-8 घंटे")}</div>
                      <div><strong>🎒 {l("Chuẩn bị:", "Preparation:", "तैयारी:")}</strong> {l("Đồ bơi, kem chống nắng", "Swimwear, sunscreen", "तैरने की पोशाक, सनस्क्रीन")}</div>
                      <div style={{ gridColumn: "1 / -1", marginTop: "4px" }}>
                        <strong>✨ {l("Trải nghiệm nổi bật:", "Highlights:", "प्रमुख विशेषताएं:")}</strong> {l("Có hướng dẫn viên đi kèm, hỗ trợ quay phim chụp ảnh Flycam miễn phí, bảo hiểm du lịch trọn gói.", "English guide, flycam photography, tour insurance.", "गाइड शामिल, मुफ्त फ्लाईकैम फोटो/वीडियो, यात्रा बीमा।")}
                      </div>
                    </>
                  )}

                  {selectedService.category === "transport" && (
                    <>
                      <div><strong>🚗 {l("Loại xe:", "Type:", "वाहन प्रकार:")}</strong> {selectedService.type || l("Xe máy / Ô tô", "Motorbike / Car", "मोटरबाइक / कार")}</div>
                      <div><strong>🏢 {l("Nhà cung cấp:", "Provider:", "प्रदाता:")}</strong> {selectedService.provider || "Phú Quốc Travel"}</div>
                      <div style={{ gridColumn: "1 / -1", marginTop: "4px" }}>
                        <strong>✨ {l("Điều khoản thuê xe:", "Terms:", "किराए की शर्तें:")}</strong> {l("Đã bao gồm mũ bảo hiểm/bản đồ du lịch, giao nhận xe tận nơi tại khách sạn hoặc sân bay miễn phí.", "Helmet and map included, free pick up.", "हेलमेट और नक्शा शामिल, मुफ्त पिकअप और ड्रॉप।")}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* YouTube video player inside modal if available */}
              {selectedService.youtube && (
                <div style={{ marginBottom: "24px" }}>
                  <h4 style={{ color: "var(--primary)", fontSize: "0.9rem", fontWeight: 700, marginBottom: "10px", textTransform: "uppercase" }}>
                    🎥 {l("Video Thực Tế Trải Nghiệm", "Tour / Accommodation Video", "टूर / आवास वीडियो")}
                  </h4>
                  <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", borderRadius: "12px" }}>
                    <iframe
                      src={selectedService.youtube.includes("watch?v=") 
                        ? selectedService.youtube.replace("watch?v=", "embed/").split("&")[0] 
                        : selectedService.youtube.includes("youtu.be/") 
                          ? selectedService.youtube.replace("youtu.be/", "youtube.com/embed/") 
                          : selectedService.youtube}
                      title="YouTube player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                    />
                  </div>
                </div>
              )}

              {/* Modal Footer Actions */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: "20px", marginTop: "10px" }}>
                <div>
                  <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", display: "block" }}>{l("Đơn giá dịch vụ:", "Price per person/night:", "सेवा मूल्य:")}</span>
                  <strong style={{ fontSize: "1.4rem", color: "var(--secondary)", fontWeight: 800 }}>{formatPrice(selectedService.price)} đ</strong>
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button className="btn btn-outline" onClick={() => setSelectedService(null)} style={{ padding: "10px 20px" }}>
                    {l("Đóng lại", "Close", "बंद करें")}
                  </button>
                  <button 
                    className="btn btn-primary" 
                    onClick={() => { addItemToTimeline(selectedService); setSelectedService(null); }}
                    style={{ display: "flex", gap: "6px", padding: "10px 24px" }}
                  >
                    <Plus size={16} />
                    {l("Chọn Dịch Vụ", "Add to Itinerary", "सेवा का चयन करें")}
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
}
