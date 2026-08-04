import React, { useState } from "react";
import { Plane, Ship, Calendar, User, MapPin, Search, ArrowRightLeft, ShieldCheck, Ticket } from "lucide-react";

export default function TransportBooking() {
  const [activeTab, setActiveTab] = useState("flight"); // 'flight' | 'ferry'
  const [isBooked, setIsBooked] = useState(false);
  const [ticketData, setTicketData] = useState(null);

  // Flight form state
  const [flightTripType, setFlightTripType] = useState("roundtrip");
  const [flightFrom, setFlightFrom] = useState("TP. Hồ Chí Minh (SGN)");
  const [flightDate, setFlightDate] = useState("");
  const [flightReturnDate, setFlightReturnDate] = useState("");
  const [airline, setAirline] = useState("Vietnam Airlines");
  const [ticketClass, setTicketClass] = useState("Economy");
  const [flightGuests, setFlightGuests] = useState(1);

  // Ferry form state
  const [ferryRoute, setFerryRoute] = useState("Rạch Giá - Phú Quốc");
  const [ferryDate, setFerryDate] = useState("");
  const [ferryBrand, setFerryBrand] = useState("Phú Quốc Express (5 sao)");
  const [vehicleType, setVehicleType] = useState("Hành khách (không kèm xe)");
  const [ferryGuests, setFerryGuests] = useState(1);

  // Contact info
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleFlightSubmit = (e) => {
    e.preventDefault();
    if (!flightDate || !name || !phone || !email) return;

    const ticketNo = "PQC-FL" + Math.floor(1000 + Math.random() * 9000);
    const flightNo = (airline === "Vietnam Airlines" ? "VN" : airline === "VietJet Air" ? "VJ" : "QH") + Math.floor(100 + Math.random() * 900);
    const seatNo = String.fromCharCode(65 + Math.floor(Math.random() * 6)) + Math.floor(1 + Math.random() * 30);
    
    setTicketData({
      type: "flight",
      ticketNo,
      flightNo,
      seatNo,
      name,
      phone,
      email,
      from: flightFrom,
      to: "Phú Quốc (PQC)",
      date: flightDate,
      returnDate: flightTripType === "roundtrip" ? flightReturnDate : null,
      airline,
      ticketClass,
      guests: flightGuests,
      price: flightGuests * (ticketClass === "Business" ? 2500000 : 1200000)
    });
    setIsBooked(true);
  };

  const handleFerrySubmit = (e) => {
    e.preventDefault();
    if (!ferryDate || !name || !phone || !email) return;

    const ticketNo = "PQC-FR" + Math.floor(1000 + Math.random() * 9000);
    const ferryNo = (ferryBrand.includes("Express") ? "PQE-" : "SD-") + Math.floor(10 + Math.random() * 90);
    const seatNo = "S" + Math.floor(10 + Math.random() * 90);

    let basePrice = 340000;
    if (vehicleType.includes("Xe máy")) basePrice += 150000;
    if (vehicleType.includes("Ô tô")) basePrice += 1000000;

    setTicketData({
      type: "ferry",
      ticketNo,
      ferryNo,
      seatNo,
      name,
      phone,
      email,
      route: ferryRoute,
      date: ferryDate,
      brand: ferryBrand,
      vehicleType,
      guests: ferryGuests,
      price: (ferryGuests * 340000) + (vehicleType !== "Hành khách (không kèm xe)" ? basePrice - 340000 : 0)
    });
    setIsBooked(true);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  const resetForm = () => {
    setIsBooked(false);
    setTicketData(null);
    setName("");
    setPhone("");
    setEmail("");
  };

  return (
    <section id="transport" className="tours-section" style={{ background: "linear-gradient(180deg, rgba(0, 168, 150, 0.02) 0%, var(--background) 100%)", borderTop: "1px solid rgba(13, 44, 84, 0.03)" }}>
      <div className="container">
        <h2 className="section-title">Đặt Vé Máy Bay & Tàu Phà</h2>
        <p className="section-subtitle">
          Tìm kiếm hành trình, đặt vé máy bay khứ hồi hoặc tàu cao tốc vượt biển kết nối đất liền đến Đảo Ngọc Phú Quốc dễ dàng.
        </p>

        {!isBooked ? (
          <div className="glass-panel" style={{ borderRadius: "24px", overflow: "hidden", maxWidth: "900px", margin: "0 auto", padding: "30px" }}>
            {/* Tabs */}
            <div style={{ display: "flex", gap: "16px", borderBottom: "2px solid rgba(13, 44, 84, 0.08)", paddingBottom: "16px", marginBottom: "30px" }}>
              <button
                className={`btn ${activeTab === "flight" ? "btn-primary" : "btn-outline"}`}
                onClick={() => setActiveTab("flight")}
                style={{ borderRadius: "12px", padding: "10px 24px" }}
              >
                <Plane size={18} />
                Vé Máy Bay Đến Phú Quốc
              </button>
              <button
                className={`btn ${activeTab === "ferry" ? "btn-primary" : "btn-outline"}`}
                onClick={() => setActiveTab("ferry")}
                style={{ borderRadius: "12px", padding: "10px 24px" }}
              >
                <Ship size={18} />
                Tàu Phà Cao Tốc
              </button>
            </div>

            {/* Flight Booking Form */}
            {activeTab === "flight" && (
              <form onSubmit={handleFlightSubmit}>
                <div style={{ display: "flex", gap: "16px", marginBottom: "20px" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.9rem", fontWeight: 600, cursor: "pointer" }}>
                    <input
                      type="radio"
                      name="flight-type"
                      checked={flightTripType === "roundtrip"}
                      onChange={() => setFlightTripType("roundtrip")}
                    />
                    Khứ hồi
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.9rem", fontWeight: 600, cursor: "pointer" }}>
                    <input
                      type="radio"
                      name="flight-type"
                      checked={flightTripType === "oneway"}
                      onChange={() => setFlightTripType("oneway")}
                    />
                    Một chiều
                  </label>
                </div>

                <div className="form-grid" style={{ marginBottom: "24px" }}>
                  <div className="form-group">
                    <label>Điểm khởi hành</label>
                    <select value={flightFrom} onChange={(e) => setFlightFrom(e.target.value)}>
                      <option value="TP. Hồ Chí Minh (SGN)">TP. Hồ Chí Minh (SGN)</option>
                      <option value="Hà Nội (HAN)">Hà Nội (HAN)</option>
                      <option value="Đà Nẵng (DAD)">Đà Nẵng (DAD)</option>
                      <option value="Cần Thơ (VCA)">Cần Thơ (VCA)</option>
                      <option value="Hải Phòng (HPH)">Hải Phòng (HPH)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Điểm đến (Mặc định)</label>
                    <input type="text" value="Phú Quốc (PQC)" disabled style={{ background: "#f0f4f8", fontWeight: 600 }} />
                  </div>

                  <div className="form-group">
                    <label>Ngày đi</label>
                    <input
                      type="date"
                      required
                      value={flightDate}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setFlightDate(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Ngày về {flightTripType === "oneway" && "(Không áp dụng)"}</label>
                    <input
                      type="date"
                      required={flightTripType === "roundtrip"}
                      disabled={flightTripType === "oneway"}
                      value={flightReturnDate}
                      min={flightDate || new Date().toISOString().split("T")[0]}
                      onChange={(e) => setFlightReturnDate(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Hãng hàng không</label>
                    <select value={airline} onChange={(e) => setAirline(e.target.value)}>
                      <option value="Vietnam Airlines">Vietnam Airlines</option>
                      <option value="VietJet Air">VietJet Air</option>
                      <option value="Bamboo Airways">Bamboo Airways</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Hạng ghế</label>
                    <select value={ticketClass} onChange={(e) => setTicketClass(e.target.value)}>
                      <option value="Economy">Phổ thông (Economy)</option>
                      <option value="Business">Thương gia (Business)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Số lượng hành khách</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={flightGuests}
                      onChange={(e) => setFlightGuests(parseInt(e.target.value) || 1)}
                    />
                  </div>
                </div>

                {/* Contact information details */}
                <h4 style={{ borderTop: "1px solid rgba(13, 44, 84, 0.08)", paddingTop: "20px", marginBottom: "16px", color: "var(--primary)" }}>Thông Tin Liên Hệ Nhận Vé</h4>
                
                <div className="form-grid" style={{ marginBottom: "30px" }}>
                  <div className="form-group">
                    <label>Họ và tên người đặt</label>
                    <input type="text" required placeholder="Nguyễn Văn A" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Số điện thoại liên hệ</label>
                    <input type="tel" required placeholder="0901234567" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>
                  <div className="form-group form-group-full">
                    <label>Email nhận vé điện tử</label>
                    <input type="email" required placeholder="email@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button type="submit" className="btn btn-accent">
                    <Search size={18} />
                    Tìm & Đặt Vé Máy Bay
                  </button>
                </div>
              </form>
            )}

            {/* Ferry Booking Form */}
            {activeTab === "ferry" && (
              <form onSubmit={handleFerrySubmit}>
                <div className="form-grid" style={{ marginBottom: "24px" }}>
                  <div className="form-group">
                    <label>Tuyến chạy</label>
                    <select value={ferryRoute} onChange={(e) => setFerryRoute(e.target.value)}>
                      <option value="Rạch Giá - Phú Quốc">Rạch Giá → Phú Quốc</option>
                      <option value="Hà Tiên - Phú Quốc">Hà Tiên → Phú Quốc</option>
                      <option value="Phú Quốc - Rạch Giá">Phú Quốc → Rạch Giá</option>
                      <option value="Phú Quốc - Hà Tiên">Phú Quốc → Hà Tiên</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Hãng tàu phà</label>
                    <select value={ferryBrand} onChange={(e) => setFerryBrand(e.target.value)}>
                      <option value="Phú Quốc Express (5 sao)">Phú Quốc Express (Tàu 5 sao)</option>
                      <option value="Tàu cao tốc Superdong">Tàu cao tốc Superdong</option>
                      <option value="Phà cao tốc Thạnh Thới (Mang xe ô tô)">Phà cao tốc Thạnh Thới (Được mang ô tô/xe máy)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Ngày khởi hành</label>
                    <input
                      type="date"
                      required
                      value={ferryDate}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setFerryDate(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Phương tiện mang theo</label>
                    <select value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}>
                      <option value="Hành khách (không kèm xe)">Chỉ hành khách (Không mang xe)</option>
                      <option value="Xe máy đi kèm">Xe máy đi kèm (+150k)</option>
                      <option value="Ô tô từ 4-7 chỗ">Ô tô con 4-7 chỗ (+1.000k)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Số lượng hành khách</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={ferryGuests}
                      onChange={(e) => setFerryGuests(parseInt(e.target.value) || 1)}
                    />
                  </div>
                </div>

                {/* Contact information details */}
                <h4 style={{ borderTop: "1px solid rgba(13, 44, 84, 0.08)", paddingTop: "20px", marginBottom: "16px", color: "var(--primary)" }}>Thông Tin Liên Hệ Nhận Vé</h4>
                
                <div className="form-grid" style={{ marginBottom: "30px" }}>
                  <div className="form-group">
                    <label>Họ và tên người đặt</label>
                    <input type="text" required placeholder="Nguyễn Văn A" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Số điện thoại liên hệ</label>
                    <input type="tel" required placeholder="0901234567" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>
                  <div className="form-group form-group-full">
                    <label>Email nhận vé điện tử</label>
                    <input type="email" required placeholder="email@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button type="submit" className="btn btn-accent">
                    <Search size={18} />
                    Đặt Vé Tàu Cao Tốc
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          /* DIGITAL BOARDING PASS E-TICKET */
          <div style={{ maxWidth: "650px", margin: "0 auto", animation: "fadeInUp 0.5s ease" }}>
            <div className="boarding-pass-ticket">
              <div className="boarding-pass-header" style={{ background: "var(--primary)", color: "var(--white)", padding: "20px 30px", borderTopLeftRadius: "24px", borderTopRightRadius: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  {ticketData.type === "flight" ? <Plane size={24} style={{ color: "var(--secondary)" }} /> : <Ship size={24} style={{ color: "var(--secondary)" }} />}
                  <span style={{ fontWeight: 800, fontSize: "1.1rem", letterSpacing: "1px" }}>
                    {ticketData.type === "flight" ? "E-BOARDING PASS" : "E-FERRY PASS"}
                  </span>
                </div>
                <div style={{ fontSize: "0.85rem", opacity: 0.9, textAlign: "right" }}>
                  <strong>MÃ VÉ:</strong> {ticketData.ticketNo}
                </div>
              </div>

              <div className="boarding-pass-body" style={{ background: "var(--white)", borderLeft: "2px dashed rgba(13, 44, 84, 0.15)", borderRight: "2px dashed rgba(13, 44, 84, 0.15)", padding: "30px", position: "relative" }}>
                {/* Route Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
                  <div>
                    <h3 style={{ fontSize: "1.8rem", color: "var(--primary)" }}>
                      {ticketData.type === "flight" ? ticketData.from.match(/\(([^)]+)\)/)?.[1] || "SGN" : ticketData.route.split(" - ")[0]}
                    </h3>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>
                      {ticketData.type === "flight" ? ticketData.from.split(" (")[0] : "Điểm khởi hành"}
                    </span>
                  </div>
                  
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                    {ticketData.type === "flight" ? <Plane size={20} style={{ color: "var(--secondary)" }} /> : <Ship size={20} style={{ color: "var(--secondary)" }} />}
                    <div style={{ width: "100px", height: "2px", background: "dashed rgba(13, 44, 84, 0.2)", position: "relative" }}>
                      <span style={{ position: "absolute", top: "-8px", left: "40%", width: "16px", height: "16px", borderRadius: "50%", background: "#e2e8f0", display: "flex", alignItems: "center", justifyCenter: "center" }} />
                    </div>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <h3 style={{ fontSize: "1.8rem", color: "var(--secondary)" }}>PQC</h3>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>Phú Quốc</span>
                  </div>
                </div>

                {/* Details Grid */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px 16px", borderBottom: "1px dashed #cbd5e1", paddingBottom: "24px", marginBottom: "24px" }}>
                  <div>
                    <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", display: "block", textTransform: "uppercase" }}>
                      {ticketData.type === "flight" ? "Chuyến Bay" : "Mã Số Tàu"}
                    </span>
                    <strong style={{ fontSize: "1rem", color: "var(--primary)" }}>{ticketData.type === "flight" ? ticketData.flightNo : ticketData.ferryNo}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", display: "block", textTransform: "uppercase" }}>Ghế Ngồi</span>
                    <strong style={{ fontSize: "1rem", color: "var(--primary)" }}>{ticketData.seatNo}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", display: "block", textTransform: "uppercase" }}>Hạng Vé</span>
                    <strong style={{ fontSize: "1rem", color: "var(--secondary)" }}>{ticketData.type === "flight" ? ticketData.ticketClass : "Tiêu Chuẩn"}</strong>
                  </div>
                  
                  <div>
                    <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", display: "block", textTransform: "uppercase" }}>Ngày đi</span>
                    <strong style={{ fontSize: "0.9rem", color: "var(--primary)" }}>{new Date(ticketData.date).toLocaleDateString("vi-VN")}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", display: "block", textTransform: "uppercase" }}>Hãng vận chuyển</span>
                    <strong style={{ fontSize: "0.9rem", color: "var(--primary)" }}>{ticketData.type === "flight" ? ticketData.airline : ticketData.brand.split(" (")[0]}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", display: "block", textTransform: "uppercase" }}>Số Khách</span>
                    <strong style={{ fontSize: "0.9rem", color: "var(--primary)" }}>{ticketData.guests} Khách</strong>
                  </div>

                  {ticketData.type === "ferry" && ticketData.vehicleType !== "Hành khách (không kèm xe)" && (
                    <div style={{ gridColumn: "1 / -1" }}>
                      <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", display: "block", textTransform: "uppercase" }}>Phương tiện đi kèm</span>
                      <strong style={{ fontSize: "0.9rem", color: "var(--primary)" }}>{ticketData.vehicleType}</strong>
                    </div>
                  )}

                  {ticketData.returnDate && (
                    <div style={{ gridColumn: "1 / -1" }}>
                      <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", display: "block", textTransform: "uppercase" }}>Ngày về (Khứ hồi)</span>
                      <strong style={{ fontSize: "0.9rem", color: "var(--primary)" }}>{new Date(ticketData.returnDate).toLocaleDateString("vi-VN")}</strong>
                    </div>
                  )}
                </div>

                {/* Passenger & Price info */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                  <div>
                    <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", display: "block", textTransform: "uppercase" }}>Hành khách</span>
                    <strong style={{ fontSize: "1.1rem", color: "var(--primary)" }}>{ticketData.name}</strong>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", display: "block", textTransform: "uppercase" }}>Tổng thanh toán</span>
                    <strong style={{ fontSize: "1.3rem", color: "var(--secondary)" }}>{formatPrice(ticketData.price)} đ</strong>
                  </div>
                </div>

                {/* Barcode and support info */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", paddingTop: "20px", borderTop: "1px dashed #cbd5e1" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.75rem", color: "#10b981", fontWeight: 700 }}>
                    <ShieldCheck size={16} />
                    Vé đã xác nhận & thanh toán
                  </div>
                  <div className="receipt-barcode" style={{ margin: 0 }}>
                    <div className="barcode-lines" style={{ width: "120px", height: "30px" }} />
                    <span className="barcode-text" style={{ fontSize: "0.6rem" }}>{ticketData.ticketNo}</span>
                  </div>
                </div>
              </div>

              {/* Reset action button */}
              <div style={{ background: "#f8fafc", padding: "20px 30px", borderBottomLeftRadius: "24px", borderBottomRightRadius: "24px", borderTop: "2px dashed #cbd5e1", display: "flex", justifyCenter: "center", alignItems: "center" }}>
                <button className="btn btn-outline" onClick={resetForm} style={{ width: "100%", borderRadius: "12px" }}>
                  Tạo Lượt Đặt Vé Mới
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
