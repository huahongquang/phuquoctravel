import React, { useState } from "react";
import { Plane, Ship, Hotel, Utensils, Compass, Plus, Trash2, ArrowUp, ArrowDown, ShoppingBag, Sparkles, AlertCircle } from "lucide-react";
import { translations } from "../data/translations";

export default function CustomTourBuilder({ onBookCustomItinerary, servicesDatabase, language }) {
  const [activeCategory, setActiveCategory] = useState("hotel");
  const [timeline, setTimeline] = useState([]);
  const [showMediaId, setShowMediaId] = useState(null);
  const t = translations[language || "vi"];
  const isEn = language === "en";

  // Drag and drop HTML5 setup
  const handleDragStart = (e, item) => {
    e.dataTransfer.setData("application/json", JSON.stringify(item));
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Required to allow drop
  };

  const handleDrop = (e) => {
    e.preventDefault();
    try {
      const dataStr = e.dataTransfer.getData("application/json");
      if (dataStr) {
        const item = JSON.parse(dataStr);
        addItemToTimeline(item);
      }
    } catch (err) {
      console.error("Drop error", err);
    }
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
      <div className="container">
        <h2 className="section-title">{t.builder_title}</h2>
        <p className="section-subtitle">{t.builder_subtitle}</p>

        <div className="builder-container">
          {/* Left Side: Services Bank */}
          <div className="builder-bank">
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

            <div className="bank-items-grid">
              {servicesDatabase[activeCategory]?.map((item) => {
                const displayName = isEn ? (item.name_en || item.name) : item.name;
                const displayDesc = isEn ? (item.desc_en || item.desc) : item.desc;
                return (
                  <div
                    key={item.id}
                    className="bank-item-card"
                    draggable
                    onDragStart={(e) => handleDragStart(e, item)}
                    style={{ cursor: "grab" }}
                  >
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                        <span style={{ background: "rgba(0,168,150,0.08)", padding: "6px", borderRadius: "8px", color: "var(--secondary)" }}>
                          {activeCategory === "flight" && <Plane size={18} />}
                          {activeCategory === "transport" && <Ship size={18} />}
                          {activeCategory === "hotel" && <Hotel size={18} />}
                          {activeCategory === "dining" && <Utensils size={18} />}
                          {activeCategory === "activity" && <Compass size={18} />}
                        </span>
                      </div>
                      <h4 className="bank-item-name">{displayName}</h4>
                      <p className="bank-item-desc">{displayDesc}</p>

                      {/* Media indicators & Toggle button */}
                      {(item.image || item.video || item.youtube) && (
                        <div style={{ marginTop: "10px", display: "flex", flexWrap: "wrap", gap: "6px", alignItems: "center" }}>
                          {item.image && <span style={{ fontSize: "0.65rem", background: "rgba(16,185,129,0.08)", color: "#10b981", padding: "2px 4px", borderRadius: "3px", fontWeight: 600 }}>🖼️ Ảnh</span>}
                          {item.video && <span style={{ fontSize: "0.65rem", background: "rgba(59,130,246,0.08)", color: "#3b82f6", padding: "2px 4px", borderRadius: "3px", fontWeight: 600 }}>🎥 Video</span>}
                          {item.youtube && <span style={{ fontSize: "0.65rem", background: "rgba(239,68,68,0.08)", color: "#ef4444", padding: "2px 4px", borderRadius: "3px", fontWeight: 600 }}>▶️ YT</span>}
                          
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowMediaId(showMediaId === item.id ? null : item.id);
                            }}
                            style={{
                              marginLeft: "auto",
                              background: "none",
                              border: "none",
                              color: "var(--secondary)",
                              fontSize: "0.72rem",
                              fontWeight: 700,
                              cursor: "pointer",
                              padding: "2px 0"
                            }}
                          >
                            {showMediaId === item.id ? (isEn ? "Hide" : "Ẩn media") : (isEn ? "Media" : "Xem media")}
                          </button>
                        </div>
                      )}

                      {/* Collapsible Media Player */}
                      {showMediaId === item.id && (
                        <div style={{ marginTop: "12px", borderTop: "1px dashed rgba(0,0,0,0.08)", paddingTop: "10px" }}>
                          {item.image && (
                            <div style={{ borderRadius: "8px", overflow: "hidden", marginBottom: "8px", maxHeight: "110px" }}>
                              <img src={item.image} alt={displayName} style={{ width: "100%", height: "100px", objectFit: "cover" }} />
                            </div>
                          )}
                          {item.video && (
                            <div style={{ borderRadius: "8px", overflow: "hidden", marginBottom: "8px" }}>
                              <video src={item.video} controls style={{ width: "100%", maxHeight: "100px", background: "#000" }} />
                            </div>
                          )}
                          {item.youtube && (
                            <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", borderRadius: "8px", marginBottom: "8px" }}>
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
                          )}
                        </div>
                      )}
                    </div>

                    <div className="bank-item-footer" style={{ borderTop: "1px solid rgba(0,0,0,0.04)", paddingTop: "10px", marginTop: "10px" }}>
                      <span className="bank-item-price">{formatPrice(item.price)} đ</span>
                      <button
                        type="button"
                        onClick={() => addItemToTimeline(item)}
                        style={{
                          background: "var(--primary)",
                          color: "var(--white)",
                          border: "none",
                          width: "28px",
                          height: "28px",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer"
                        }}
                        title={t.btn_add_timeline}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Side: Timeline / Custom Itinerary */}
          <div
            className="builder-timeline"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="timeline-header">
              <h3 style={{ fontSize: "1.15rem", display: "flex", alignItems: "center", gap: "8px" }}>
                <Sparkles size={18} style={{ color: "var(--accent)" }} />
                {t.builder_timeline_title}
              </h3>
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                {timeline.length} {isEn ? "selected items" : "dịch vụ đã chọn"}
              </span>
            </div>

            {timeline.length === 0 ? (
              <div className="builder-empty-state">
                <AlertCircle size={44} style={{ color: "var(--text-muted)", opacity: 0.5 }} />
                <p style={{ fontSize: "0.9rem" }}>{isEn ? "Timeline is empty." : "Lịch trình trống."}</p>
                <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                  {isEn 
                    ? "Drag and drop services from the left pane or click (+) to start." 
                    : "Hãy kéo thả các dịch vụ từ cột bên trái hoặc nhấn nút (+) để bắt đầu thiết kế."}
                </p>
              </div>
            ) : (
              <div className="timeline-list">
                {timeline.map((item, idx) => (
                  <div key={item.uniqueId} className="timeline-item">
                    <div className="timeline-item-info">
                      <span className="timeline-item-category">
                        {getTimelineCategoryLabel(item.category)}
                      </span>
                      <h4 className="timeline-item-title">{isEn ? (item.name_en || item.name) : item.name}</h4>
                      <span className="timeline-item-price">{formatPrice(item.price)} đ</span>
                    </div>

                    <div className="timeline-item-actions">
                      <button
                        type="button"
                        className="timeline-action-btn"
                        onClick={() => moveItemUp(idx)}
                        disabled={idx === 0}
                        style={{ opacity: idx === 0 ? 0.3 : 1 }}
                      >
                        <ArrowUp size={14} />
                      </button>
                      <button
                        type="button"
                        className="timeline-action-btn"
                        onClick={() => moveItemDown(idx)}
                        disabled={idx === timeline.length - 1}
                        style={{ opacity: idx === timeline.length - 1 ? 0.3 : 1 }}
                      >
                        <ArrowDown size={14} />
                      </button>
                      <button
                        type="button"
                        className="timeline-action-btn delete"
                        onClick={() => removeItem(item.uniqueId)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {timeline.length > 0 && (
              <div className="builder-footer">
                <div>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "block" }}>{t.builder_total_cost}</span>
                  <strong style={{ fontSize: "1.4rem", color: "var(--secondary)", fontWeight: 800 }}>
                    {formatPrice(totalCost)} đ
                  </strong>
                </div>
                <button className="btn btn-accent" onClick={handleCheckout} style={{ display: "flex", gap: "6px" }}>
                  <ShoppingBag size={18} />
                  {t.builder_btn_book}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
