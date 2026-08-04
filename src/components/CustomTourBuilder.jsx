import React, { useState } from "react";
import { Plane, Ship, Hotel, Utensils, Compass, Plus, Trash2, ArrowUp, ArrowDown, ShoppingBag, Sparkles, AlertCircle } from "lucide-react";

const SERVICES_BANK = {
  flight: [
    { id: "fl-vn", category: "flight", name: "Vé bay khứ hồi Vietnam Airlines", desc: "Hãng bay truyền thống, đã gồm 23kg ký gửi & suất ăn.", price: 1200000, icon: Plane },
    { id: "fl-vj", category: "flight", name: "Vé bay khứ hồi VietJet Air", desc: "Hãng bay giá rẻ, vé phổ thông, chưa gồm hành lý ký gửi.", price: 900000, icon: Plane },
    { id: "fl-qh", category: "flight", name: "Vé bay khứ hồi Bamboo Airways", desc: "Hãng hàng không thân thiện, dịch vụ chất lượng cao.", price: 1100000, icon: Plane }
  ],
  transport: [
    { id: "tr-bike", category: "transport", name: "Thuê xe máy tự lái (24h)", desc: "Xe ga/xe số tự chọn, giao xe tại khách sạn/sân bay.", price: 120000, icon: Ship },
    { id: "tr-car4", category: "transport", name: "Thuê ô tô 4 chỗ kèm tài xế (Ngày)", desc: "Hành trình tự chọn đi các điểm Bắc/Nam Đảo.", price: 800000, icon: Ship },
    { id: "tr-transit", category: "transport", name: "Thuê xe Ford Transit 16 chỗ (Ngày)", desc: "Phù hợp cho gia đình đông người, hội nhóm.", price: 1200000, icon: Ship },
    { id: "tr-limo", category: "transport", name: "Thuê xe Limousine VIP 9 chỗ (Ngày)", desc: "Trải nghiệm sang trọng đẳng cấp, tài xế phục vụ chu đáo.", price: 2000000, icon: Ship }
  ],
  hotel: [
    { id: "ht-vin", category: "hotel", name: "Vinpearl Resort & Spa Phú Quốc 5*", desc: "Phòng Deluxe gồm buffet sáng, hồ bơi vô cực lớn.", price: 2200000, icon: Hotel },
    { id: "ht-novo", category: "hotel", name: "Novotel Phu Quoc Resort 5*", desc: "Nằm ở Bãi Trường, không gian hiện đại, yên tĩnh.", price: 1800000, icon: Hotel },
    { id: "ht-3star", category: "hotel", name: "Khách sạn Dương Đông 3*", desc: "Gần chợ đêm, thuận tiện đi lại ăn uống vui chơi.", price: 600000, icon: Hotel },
    { id: "ht-home", category: "hotel", name: "Homestay ven biển Hàm Ninh", desc: "Trải nghiệm mộc mạc đón bình minh làng chài.", price: 350000, icon: Hotel }
  ],
  dining: [
    { id: "dn-rach", category: "dining", name: "Ăn hải sản bè nổi Rạch Vẹm", desc: "Lẩu hải sản chua cay, ghẹ hấp, tôm nướng tươi roi rói.", price: 350000, icon: Utensils },
    { id: "dn-market", category: "dining", name: "Buffet lẩu nướng Chợ đêm", desc: "Hơn 50 món ăn đường phố hải sản đa dạng.", price: 250000, icon: Utensils },
    { id: "dn-ganh", category: "dining", name: "Cơm niêu truyền thống Gành Dầu", desc: "Cơm cháy nóng giòn ăn kèm cá biển kho tộ và rau luộc.", price: 150000, icon: Utensils },
    { id: "dn-fine", category: "dining", name: "Bữa tối Fine Dining ven biển", desc: "Thưởng thức ẩm thực cao cấp dưới ánh nến rì rào sóng vỗ.", price: 800000, icon: Utensils }
  ],
  activity: [
    { id: "ac-5islands", category: "activity", name: "Trải nghiệm Cano 5 Đảo VIP", desc: "Cáp treo Hòn Thơm, lặn san hô, chụp ảnh SUP & Flycam.", price: 1090000, icon: Compass },
    { id: "ac-starfish", category: "activity", name: "Ngắm sao biển bãi Rạch Vẹm", desc: "Chụp hình cùng sao biển đỏ tự nhiên bên cát trắng mịn.", price: 790000, icon: Compass },
    { id: "ac-trekking", category: "activity", name: "Trekking xuyên Rừng Quốc Gia", desc: "Khám phá thảm thực vật rừng nguyên sinh Phú Quốc.", price: 890000, icon: Compass },
    { id: "ac-squid", category: "activity", name: "Ngắm hoàng hôn & Câu mực đêm", desc: "Trải nghiệm làm ngư dân câu mực trên tàu gỗ lớn.", price: 450000, icon: Compass },
    { id: "ac-safari", category: "activity", name: "Vé VinWonders & Safari Phú Quốc", desc: "Vui chơi thế giới nước, ngắm động vật bán hoang dã.", price: 1350000, icon: Compass }
  ]
};

export default function CustomTourBuilder({ onBookCustomItinerary }) {
  const [activeCategory, setActiveCategory] = useState("flight");
  const [timeline, setTimeline] = useState([]);

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
      console.error("Error drop", err);
    }
  };

  // Add item
  const addItemToTimeline = (item) => {
    const uniqueItem = {
      ...item,
      uniqueId: `${item.id}-${Date.now()}`
    };
    setTimeline((prev) => [...prev, uniqueItem]);
  };

  // Delete item
  const removeItem = (uniqueId) => {
    setTimeline((prev) => prev.filter((item) => item.uniqueId !== uniqueId));
  };

  // Move item up
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

  // Move item down
  const moveItemDown = (index) => {
    if (index === timeline.length - 1) return;
    setTimeline((prev) => {
      const newList = [...prev];
      const temp = newList[index];
      newList[index] = newList[index + 1];
      newList[index + 1] = temp;
      return newList;
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  const totalCost = timeline.reduce((acc, item) => acc + item.price, 0);

  const handleCheckout = () => {
    if (timeline.length === 0) return;
    
    // Format custom itinerary to match cart item standard
    const configuredTour = {
      tourId: "custom-tour",
      tourName: "Hành Trình Tự Thiết Kế Phú Quốc",
      price: totalCost,
      date: new Date().toISOString().split("T")[0], // Default today
      adults: 1,
      children: 0,
      totalPrice: totalCost,
      isCustom: true,
      customItems: timeline.map(t => ({ name: t.name, price: t.price, category: t.category }))
    };

    onBookCustomItinerary(configuredTour);
  };

  const categoryTabs = [
    { id: "flight", label: "✈️ Vé Máy Bay" },
    { id: "transport", label: "🚗 Di Chuyển" },
    { id: "hotel", label: "🏨 Chỗ Ở" },
    { id: "dining", label: "🍽️ Ăn Uống" },
    { id: "activity", label: "🏄 Trải Nghiệm" }
  ];

  return (
    <section id="transport" className="builder-section">
      <div className="container">
        <h2 className="section-title">Tự Thiết Kế Tour Cá Nhân</h2>
        <p className="section-subtitle">
          Kéo thả hoặc nhấn chọn các dịch vụ riêng lẻ dưới đây để tự xây dựng một tour nghỉ dưỡng độc đáo phù hợp nhất với kế hoạch của bạn.
        </p>

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
              💡 *Mẹo: Bạn có thể kéo thả các thẻ dịch vụ bên dưới sang khung lịch trình bên phải hoặc nhấn nút (+) để thêm.*
            </p>

            <div className="bank-items-grid">
              {SERVICES_BANK[activeCategory].map((item) => {
                const IconComponent = item.icon;
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
                      <h4 className="bank-item-name">{item.name}</h4>
                      <p className="bank-item-desc">{item.desc}</p>
                    </div>

                    <div className="bank-item-footer">
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
                Dòng Thời Gian Lịch Trình
              </h3>
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                {timeline.length} dịch vụ đã chọn
              </span>
            </div>

            {timeline.length === 0 ? (
              <div className="builder-empty-state">
                <AlertCircle size={44} style={{ color: "var(--text-muted)", opacity: 0.5 }} />
                <p style={{ fontSize: "0.9rem" }}>Lịch trình trống.</p>
                <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                  Hãy kéo thả các dịch vụ từ cột bên trái hoặc nhấn nút (+) để bắt đầu thiết kế lịch trình của riêng bạn.
                </p>
              </div>
            ) : (
              <div className="timeline-list">
                {timeline.map((item, idx) => (
                  <div key={item.uniqueId} className="timeline-item">
                    <div className="timeline-item-info">
                      <span className="timeline-item-category">
                        {item.category === "flight" && "Vé máy bay"}
                        {item.category === "transport" && "Vận chuyển"}
                        {item.category === "hotel" && "Nghỉ ngơi (Đêm)"}
                        {item.category === "dining" && "Ẩm thực"}
                        {item.category === "activity" && "Trải nghiệm"}
                      </span>
                      <h4 className="timeline-item-title">{item.name}</h4>
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
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "block" }}>Tạm tính tổng cộng</span>
                  <strong style={{ fontSize: "1.4rem", color: "var(--secondary)", fontWeight: 800 }}>
                    {formatPrice(totalCost)} đ
                  </strong>
                </div>
                <button className="btn btn-accent" onClick={handleCheckout} style={{ display: "flex", gap: "6px" }}>
                  <ShoppingBag size={18} />
                  Đặt Hành Trình Tự Chọn
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
