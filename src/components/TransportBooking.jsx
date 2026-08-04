import React, { useState } from "react";
import { Plane, Ship, Calendar, User, MapPin, Search, ArrowRightLeft, ShieldCheck, Ticket } from "lucide-react";
import { translations } from "../data/translations";

export default function TransportBooking({ language }) {
  const [activeTab, setActiveTab] = useState("flight"); // 'flight' | 'ferry'
  const [isBooked, setIsBooked] = useState(false);
  const [ticketData, setTicketData] = useState(null);
  const t = translations[language || "vi"];
  const isEn = language === "en";

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
  const [ferryBrand, setFerryBrand] = useState("Phú Quốc Express");
  const [vehicleType, setVehicleType] = useState("Hành khách (không kèm xe)");
  const [ferryGuests, setFerryGuests] = useState(1);

  // Contact info
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  const handleFlightSubmit = (e) => {
    e.preventDefault();
    if (!flightDate || !name || !phone || !email) return;

    const ticketNo = "PQC-FL" + Math.floor(1000 + Math.random() * 9000);
    const flightNo = (airline.includes("Vietnam") ? "VN" : airline.includes("VietJet") ? "VJ" : "QH") + Math.floor(100 + Math.random() * 900);
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

    const ticketNo = "PQC-FE" + Math.floor(1000 + Math.random() * 9000);
    const seatNo = "DECK-" + Math.floor(10 + Math.random() * 80);
    
    setTicketData({
      type: "ferry",
      ticketNo,
      flightNo: ferryBrand,
      seatNo,
      name,
      phone,
      email,
      from: ferryRoute.split(" - ")[0],
      to: "Phú Quốc",
      date: ferryDate,
      returnDate: null,
      airline: ferryBrand,
      ticketClass: vehicleType,
      guests: ferryGuests,
      price: ferryGuests * 350000
    });
    setIsBooked(true);
  };

  const handleReset = () => {
    setIsBooked(false);
    setTicketData(null);
    setFlightDate("");
    setFlightReturnDate("");
    setFerryDate("");
    setName("");
    setPhone("");
    setEmail("");
  };

  return (
    <section id="transport" className="tours-section" style={{ background: "linear-gradient(180deg, rgba(0, 168, 150, 0.02) 0%, var(--background) 100%)", borderTop: "1px solid rgba(13, 44, 84, 0.03)" }}>
      <div className="container">
        <h2 className="section-title">{t.trans_title}</h2>
        <p className="section-subtitle">{t.trans_subtitle}</p>

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
                {isEn ? "Book Flights" : "Vé Máy Bay Đến Phú Quốc"}
              </button>
              <button
                className={`btn ${activeTab === "ferry" ? "btn-primary" : "btn-outline"}`}
                onClick={() => setActiveTab("ferry")}
                style={{ borderRadius: "12px", padding: "10px 24px" }}
              >
                <Ship size={18} />
                {isEn ? "Book Ferries" : "Tàu Phà Cao Tốc"}
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
                    {isEn ? "Round Trip" : "Khứ hồi"}
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.9rem", fontWeight: 600, cursor: "pointer" }}>
                    <input
                      type="radio"
                      name="flight-type"
                      checked={flightTripType === "oneway"}
                      onChange={() => setFlightTripType("oneway")}
                    />
                    {isEn ? "One Way" : "Một chiều"}
                  </label>
                </div>

                <div className="form-grid" style={{ marginBottom: "20px" }}>
                  <div className="form-group">
                    <label>{t.form_from}</label>
                    <select value={flightFrom} onChange={(e) => setFlightFrom(e.target.value)}>
                      <option value="TP. Hồ Chí Minh (SGN)">TP. Hồ Chí Minh (SGN)</option>
                      <option value="Hà Nội (HAN)">Hà Nội (HAN)</option>
                      <option value="Đà Nẵng (DAD)">Đà Nẵng (DAD)</option>
                      <option value="Cần Thơ (VCA)">Cần Thơ (VCA)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>{t.form_to}</label>
                    <input type="text" readOnly value="Phú Quốc (PQC)" style={{ background: "#f1f5f9" }} />
                  </div>
                  <div className="form-group">
                    <label>{t.form_date_dep}</label>
                    <input type="date" required value={flightDate} onChange={(e) => setFlightDate(e.target.value)} />
                  </div>
                  {flightTripType === "roundtrip" && (
                    <div className="form-group">
                      <label>{t.form_date_ret}</label>
                      <input type="date" required={flightTripType === "roundtrip"} value={flightReturnDate} onChange={(e) => setFlightReturnDate(e.target.value)} />
                    </div>
                  )}
                </div>

                <div className="form-grid" style={{ marginBottom: "30px" }}>
                  <div className="form-group">
                    <label>{t.form_airline}</label>
                    <select value={airline} onChange={(e) => setAirline(e.target.value)}>
                      <option value="Vietnam Airlines">Vietnam Airlines</option>
                      <option value="VietJet Air">VietJet Air</option>
                      <option value="Bamboo Airways">Bamboo Airways</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>{t.form_seat_class}</label>
                    <select value={ticketClass} onChange={(e) => setTicketClass(e.target.value)}>
                      <option value="Economy">Economy (Phổ thông)</option>
                      <option value="Business">Business (Thương gia)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>{isEn ? "Number of Passengers" : "Số lượng khách"}</label>
                    <input type="number" min="1" max="10" value={flightGuests} onChange={(e) => setFlightGuests(parseInt(e.target.value) || 1)} />
                  </div>
                </div>

                {/* Contact information */}
                <h3 style={{ fontSize: "1.05rem", color: "var(--primary)", borderTop: "1px solid rgba(13,44,84,0.08)", paddingTop: "20px", marginBottom: "16px" }}>
                  {isEn ? "Passenger Contact Details" : "Thông tin liên hệ người đặt vé"}
                </h3>
                <div className="form-grid" style={{ marginBottom: "30px" }}>
                  <div className="form-group">
                    <label>{t.form_fullname}</label>
                    <input type="text" required placeholder={isEn ? "Passenger name" : "Họ tên hành khách"} value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>{t.form_phone}</label>
                    <input type="tel" required placeholder="090..." value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>
                  <div className="form-group" style={{ gridColumn: "span 2" }}>
                    <label>{t.form_email}</label>
                    <input type="email" required placeholder="example@mail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: "100%", padding: "14px", borderRadius: "12px", display: "flex", justifyCenter: "center", gap: "8px", fontWeight: "bold" }}>
                  <Search size={18} /> {t.form_btn_search}
                </button>
              </form>
            )}

            {/* Ferry Booking Form */}
            {activeTab === "ferry" && (
              <form onSubmit={handleFerrySubmit}>
                <div className="form-grid" style={{ marginBottom: "20px" }}>
                  <div className="form-group">
                    <label>{isEn ? "Route Option" : "Tuyến tàu chạy"}</label>
                    <select value={ferryRoute} onChange={(e) => setFerryRoute(e.target.value)}>
                      <option value="Rạch Giá - Phú Quốc">Rạch Giá - Phú Quốc</option>
                      <option value="Hà Tiên - Phú Quốc">Hà Tiên - Phú Quốc</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>{t.form_date_dep}</label>
                    <input type="date" required value={ferryDate} onChange={(e) => setFerryDate(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>{t.form_ferry_line}</label>
                    <select value={ferryBrand} onChange={(e) => setFerryBrand(e.target.value)}>
                      <option value="Phú Quốc Express">Phú Quốc Express (5 sao)</option>
                      <option value="Superdong">Superdong (Tốc hành)</option>
                    </select>
                  </div>
                </div>

                <div className="form-grid" style={{ marginBottom: "30px" }}>
                  <div className="form-group">
                    <label>{t.form_ferry_vehicle}</label>
                    <select value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}>
                      <option value="Hành khách (không kèm xe)">Hành khách (không kèm xe)</option>
                      <option value="Kèm Xe máy">Kèm Xe máy (+150k)</option>
                      <option value="Kèm Ô tô">Kèm Ô tô (+1M)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>{isEn ? "Number of Passengers" : "Số lượng khách"}</label>
                    <input type="number" min="1" max="10" value={ferryGuests} onChange={(e) => setFerryGuests(parseInt(e.target.value) || 1)} />
                  </div>
                </div>

                {/* Contact information */}
                <h3 style={{ fontSize: "1.05rem", color: "var(--primary)", borderTop: "1px solid rgba(13,44,84,0.08)", paddingTop: "20px", marginBottom: "16px" }}>
                  {isEn ? "Passenger Contact Details" : "Thông tin liên hệ người đặt vé"}
                </h3>
                <div className="form-grid" style={{ marginBottom: "30px" }}>
                  <div className="form-group">
                    <label>{t.form_fullname}</label>
                    <input type="text" required placeholder={isEn ? "Passenger name" : "Họ tên hành khách"} value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>{t.form_phone}</label>
                    <input type="tel" required placeholder="090..." value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>
                  <div className="form-group" style={{ gridColumn: "span 2" }}>
                    <label>{t.form_email}</label>
                    <input type="email" required placeholder="example@mail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: "100%", padding: "14px", borderRadius: "12px", display: "flex", justifyCenter: "center", gap: "8px", fontWeight: "bold" }}>
                  <Search size={18} /> {t.form_btn_search}
                </button>
              </form>
            )}
          </div>
        ) : (
          /* ELECTRONIC TICKET BOARDING PASS VIEW */
          <div style={{ maxWidth: "680px", margin: "0 auto" }}>
            <div className="boarding-pass-ticket">
              <div className="ticket-header" style={{ background: ticketData.type === "flight" ? "var(--primary)" : "linear-gradient(135deg, #028090, #00a896)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  {ticketData.type === "flight" ? <Plane size={20} /> : <Ship size={20} />}
                  <span className="ticket-header-title">{t.ticket_virtual_pass}</span>
                </div>
                <span style={{ fontSize: "0.8rem", fontWeight: 700, letterSpacing: "1px" }}>{ticketData.ticketNo}</span>
              </div>

              <div className="ticket-body">
                <div className="ticket-row-grid">
                  <div className="ticket-field">
                    <span className="ticket-lbl">{t.ticket_passenger}</span>
                    <span className="ticket-val" style={{ textTransform: "uppercase", fontWeight: 700 }}>{ticketData.name}</span>
                  </div>
                  <div className="ticket-field">
                    <span className="ticket-lbl">{t.ticket_flight}</span>
                    <span className="ticket-val" style={{ color: "var(--secondary)", fontWeight: 700 }}>{ticketData.flightNo}</span>
                  </div>
                  <div className="ticket-field">
                    <span className="ticket-lbl">{t.ticket_seat}</span>
                    <span className="ticket-val" style={{ fontWeight: 700 }}>{ticketData.seatNo}</span>
                  </div>
                </div>

                <div className="ticket-route-row">
                  <div className="ticket-route-node">
                    <span className="route-city">{ticketData.from}</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexGrow: 1, position: "relative" }}>
                    <ArrowRightLeft size={18} style={{ color: "var(--secondary)" }} />
                    <div style={{ width: "100%", height: "2px", borderBottom: "2px dashed #cbd5e1", marginTop: "4px" }} />
                  </div>
                  <div className="ticket-route-node" style={{ alignItems: "flex-end" }}>
                    <span className="route-city">{ticketData.to}</span>
                  </div>
                </div>

                <div className="ticket-row-grid">
                  <div className="ticket-field">
                    <span className="ticket-lbl">{t.ticket_date}</span>
                    <span className="ticket-val">{new Date(ticketData.date).toLocaleDateString("vi-VN")}</span>
                  </div>
                  <div className="ticket-field">
                    <span className="ticket-lbl">{t.ticket_time}</span>
                    <span className="ticket-val">{ticketData.type === "flight" ? "07:30" : "08:00"}</span>
                  </div>
                  <div className="ticket-field">
                    <span className="ticket-lbl">{t.ticket_class}</span>
                    <span className="ticket-val">{ticketData.ticketClass}</span>
                  </div>
                </div>

                {ticketData.returnDate && (
                  <div style={{ marginTop: "12px", padding: "8px 12px", background: "#f8fafc", borderRadius: "8px", fontSize: "0.8rem", color: "var(--text-muted)", border: "1px solid rgba(0,0,0,0.03)" }}>
                    🔄 {isEn ? "Return Flight Departure Date" : "Ngày bay khứ hồi khứ hồi"}: <strong>{new Date(ticketData.returnDate).toLocaleDateString("vi-VN")}</strong> (Được xuất kèm tự động)
                  </div>
                )}

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "24px", paddingTop: "16px", borderTop: "1px dashed #cbd5e1" }}>
                  <div>
                    <span className="ticket-lbl">{isEn ? "Total Price Paid" : "Tổng tiền đã thanh toán"}</span>
                    <strong style={{ fontSize: "1.3rem", color: "var(--secondary)" }}>{formatPrice(ticketData.price)} VNĐ</strong>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#10b981", fontSize: "0.8rem", fontWeight: 700 }}>
                    <ShieldCheck size={18} />
                    {isEn ? "E-Ticket Verified" : "Đã Xác Thực Đặt"}
                  </div>
                </div>

                <div className="ticket-barcode" style={{ marginTop: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div className="barcode-lines" style={{ width: "100%", height: "40px", background: "repeating-linear-gradient(90deg, #000, #000 2px, #fff 2px, #fff 8px)" }} />
                  <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "4px" }}>{ticketData.ticketNo} - {t.ticket_warning}</span>
                </div>
              </div>
            </div>

            <button className="btn btn-outline" onClick={handleReset} style={{ width: "100%", marginTop: "20px", padding: "12px", borderRadius: "10px", fontWeight: "bold" }}>
              {isEn ? "Book Another Trip" : "Đặt Vé Khác / Trở Lại"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
