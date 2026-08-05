import React, { useState, useEffect } from "react";
import { X, Calendar, User, Phone, Mail, Ticket, CheckCircle2, ShoppingBag } from "lucide-react";
import { translations } from "../data/translations";

export default function BookingModal({
  isOpen,
  onClose,
  tour,
  view, // 'add-to-cart' | 'checkout' | 'receipt'
  cartItems,
  onAddToCart,
  onCheckoutSubmit,
  bookingDetails, // Details of completed booking for receipt
  language
}) {
  const t = translations[language || "vi"];
  const isEn = language === "en";
  const l = (vi, en, hi) => {
    if (language === "vi") return vi;
    if (language === "en") return en;
    return hi || en;
  };

  // Add to cart form state
  const [date, setDate] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  // Checkout form state
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  // Min date is today
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
  }, [isOpen]);

  if (!isOpen) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  // Live calculation for the selected tour (add-to-cart view)
  const childPrice = tour ? tour.price * 0.7 : 0;
  const tourTotal = tour ? (adults * tour.price) + (children * childPrice) : 0;

  // Calculation for checkout view
  const cartTotal = cartItems ? cartItems.reduce((acc, item) => acc + item.totalPrice, 0) : 0;

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!tour) return;
    
    const cartItem = {
      tourId: tour.id,
      tourName: language === "vi" ? tour.name : (tour.name_en || tour.name),
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

  const handleCheckoutFormSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !phone || !email) return;

    const bookingId = "PQT-" + Math.floor(100000 + Math.random() * 900000);
    const bookingDate = new Date().toLocaleDateString("vi-VN");

    onCheckoutSubmit({
      bookingId,
      bookingDate,
      fullName,
      phone,
      email
    });
  };

  return (
    <div className={`modal-overlay ${isOpen ? "open" : ""}`} onClick={onClose}>
      <div className="booking-modal" onClick={(e) => e.stopPropagation()}>
        {/* Modal Close Button */}
        <button className="close-modal-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {/* 1. VIEW ADD TO CART */}
        {view === "add-to-cart" && tour && (
          <div>
            <div className="modal-header">
              <Ticket size={24} style={{ color: "var(--secondary)" }} />
              <div>
                <h3 style={{ margin: 0, color: "var(--primary)", fontSize: "1.15rem", fontWeight: 700 }}>
                  {t.modal_title_add}
                </h3>
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                  {language === "vi" ? tour.name : (tour.name_en || tour.name)}
                </span>
              </div>
            </div>

            <div className="modal-body">
              <form onSubmit={handleAddSubmit}>
                <div className="form-group">
                  <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <Calendar size={16} />
                    {t.form_date_start}
                  </label>
                  <input type="date" required value={date} onChange={(e) => setDate(e.target.value)} />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "16px" }}>
                  <div className="form-group">
                    <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <User size={16} />
                      {t.form_qty_adult}
                    </label>
                    <input type="number" min="1" max="50" value={adults} onChange={(e) => setAdults(parseInt(e.target.value) || 1)} />
                  </div>
                  <div className="form-group">
                    <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <User size={16} />
                      {t.form_qty_child}
                    </label>
                    <input type="number" min="0" max="50" value={children} onChange={(e) => setChildren(parseInt(e.target.value) || 0)} />
                  </div>
                </div>

                {/* Live total display */}
                <div style={{ borderTop: "1px solid rgba(13,44,84,0.08)", marginTop: "24px", paddingTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "block" }}>{t.cart_total}</span>
                    <strong style={{ fontSize: "1.4rem", color: "var(--secondary)", fontWeight: 800 }}>
                      {formatPrice(tourTotal)} VNĐ
                    </strong>
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ padding: "12px 24px", borderRadius: "10px", fontWeight: "bold" }}>
                    {t.btn_add_to_cart}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* 2. VIEW CHECKOUT FORM */}
        {view === "checkout" && (
          <div>
            <div className="modal-header">
              <ShoppingBag size={24} style={{ color: "var(--secondary)" }} />
              <div>
                <h3 style={{ margin: 0, color: "var(--primary)", fontSize: "1.15rem", fontWeight: 700 }}>
                  {t.modal_title_checkout}
                </h3>
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                  {cartItems.length} {l("dịch vụ đã chọn", "selected services", "चयनित सेवाएं")}
                </span>
              </div>
            </div>

            <div className="modal-body">
              <form onSubmit={handleCheckoutFormSubmit}>
                {/* Cart summary list */}
                <div style={{ background: "#f8fafc", padding: "16px", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.02)", marginBottom: "20px" }}>
                  <strong style={{ color: "var(--primary)", fontSize: "0.8rem", display: "block", marginBottom: "8px", textTransform: "uppercase" }}>
                    {l("Tóm tắt hành trình đã chọn", "Selected Itineraries Summary", "चयनित यात्रा कार्यक्रम का सारांश")}
                  </strong>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {cartItems.map((item, idx) => (
                      <div key={idx} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem" }}>
                        <span style={{ color: "var(--text)", maxWidth: "70%" }}>• {item.tourName}</span>
                        <span style={{ fontWeight: 600, color: "var(--secondary)" }}>{formatPrice(item.totalPrice)} đ</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label>{t.form_fullname}</label>
                  <input type="text" required placeholder={l("Nhập họ và tên của bạn", "Your full name", "अपना पूरा नाम दर्ज करें")} value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "12px" }}>
                  <div className="form-group">
                    <label>{t.form_phone}</label>
                    <input type="tel" required placeholder="090..." value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>{t.form_email}</label>
                    <input type="email" required placeholder="example@mail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                </div>

                <div style={{ borderTop: "1px solid rgba(13,44,84,0.08)", marginTop: "24px", paddingTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "block" }}>{t.cart_total}</span>
                    <strong style={{ fontSize: "1.4rem", color: "var(--secondary)", fontWeight: 800 }}>
                      {formatPrice(cartTotal)} VNĐ
                    </strong>
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ padding: "12px 24px", borderRadius: "10px", fontWeight: "bold" }}>
                    {t.btn_confirm_booking}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* 3. VIEW TICKET RECEIPT */}
        {view === "receipt" && bookingDetails && (
          <div>
            <div className="modal-header" style={{ background: "var(--primary)", borderBottom: "none" }}>
              <CheckCircle2 size={24} style={{ color: "#10b981" }} />
              <div>
                <h3 style={{ margin: 0, color: "var(--white)", fontSize: "1.15rem", fontWeight: 700 }}>
                  {t.modal_title_receipt}
                </h3>
                <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.8)" }}>
                  {l("Biên lai mã vé điện tử", "E-Ticket confirmation pass", "ई-टिकट रसीद")}
                </span>
              </div>
            </div>

            <div className="modal-body" style={{ padding: "30px 40px", background: "var(--white)", borderRadius: "0 0 24px 24px" }}>
              <p className="receipt-subtitle" style={{ fontSize: "0.82rem", color: "var(--text-muted)", textAlign: "center", marginBottom: "20px", fontWeight: 500 }}>
                {t.receipt_subtitle}
              </p>

              <div className="receipt-info-grid">
                <div className="receipt-field">
                  <span className="field-label">{t.receipt_code}</span>
                  <span className="field-val" style={{ color: "var(--secondary)", fontWeight: 700 }}>{bookingDetails.bookingId}</span>
                </div>
                <div className="receipt-field">
                  <span className="field-label">{t.receipt_date}</span>
                  <span className="field-val">{bookingDetails.bookingDate}</span>
                </div>
                <div className="receipt-field">
                  <span className="field-label">{t.receipt_customer}</span>
                  <span className="field-val">{bookingDetails.fullName}</span>
                </div>
                <div className="receipt-field">
                  <span className="field-label">{t.receipt_phone}</span>
                  <span className="field-val">{bookingDetails.phone}</span>
                </div>
                <div className="receipt-field" style={{ gridColumn: "1 / -1" }}>
                  <span className="field-label">{t.receipt_email}</span>
                  <span className="field-val">{bookingDetails.email}</span>
                </div>
              </div>

              <div className="receipt-tours-list" style={{ marginTop: "24px" }}>
                <span className="field-label" style={{ marginBottom: "8px", textTransform: "uppercase", fontSize: "0.78rem" }}>
                  {t.receipt_details}
                </span>
                {bookingDetails.items.map((item, idx) => (
                  <div key={idx} className="receipt-tour-row" style={{ flexDirection: "column", borderBottom: item.isCustom ? "1px dashed rgba(13, 44, 84, 0.1)" : "none", paddingBottom: item.isCustom ? "12px" : "0", marginBottom: "12px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                      <div>
                        <span className="tour-name" style={{ fontWeight: 600, color: "var(--primary)" }}>{item.tourName}</span>
                        {!item.isCustom && <span className="tour-qty" style={{ color: "var(--text-muted)", marginLeft: "6px" }}>({item.adults} {l("NL", "Ad", "वयस्क")}, {item.children} {l("TE", "Ch", "बच्चे")})</span>}
                        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "2px" }}>
                          {item.isCustom ? l("Hành trình cá nhân hóa tự chọn", "Personalized custom itinerary", "व्यक्तिगत कस्टम यात्रा कार्यक्रम") : `${l("Khởi hành", "Departure", "प्रस्थान")}: ${new Date(item.date).toLocaleDateString("vi-VN")}`}
                        </div>
                      </div>
                      <span className="tour-price" style={{ fontWeight: 600 }}>{formatPrice(item.totalPrice)} đ</span>
                    </div>
                    {item.isCustom && item.customItems && (
                      <div style={{ background: "#f8fafc", padding: "10px 14px", borderRadius: "10px", marginTop: "8px", width: "100%", fontSize: "0.75rem", border: "1px solid rgba(13, 44, 84, 0.04)" }}>
                        <strong style={{ color: "var(--primary)", display: "block", marginBottom: "6px" }}>{l("Lịch trình chi tiết:", "Custom details:", "कस्टम विवरण:")}</strong>
                        <ul style={{ paddingLeft: "12px", listStyleType: "circle", color: "var(--text-muted)", display: "flex", flexDirection: "column", gap: "4px" }}>
                          {item.customItems.map((cItem, cIdx) => (
                            <li key={cIdx} style={{ display: "flex", justifyContent: "space-between" }}>
                              <span>{cItem.name}</span>
                              <span style={{ fontWeight: 600 }}>{formatPrice(cItem.price)} đ</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="receipt-total-row" style={{ display: "flex", justifyContent: "space-between", borderTop: "2px solid var(--primary)", paddingTop: "16px", marginTop: "20px" }}>
                <span style={{ fontWeight: 600, color: "var(--primary)" }}>{l("Tổng cộng đã thanh toán", "Total Amount Paid", "कुल भुगतान किया गया")}</span>
                <span className="total-amount" style={{ fontSize: "1.3rem", color: "var(--secondary)", fontWeight: 800 }}>{formatPrice(bookingDetails.totalAmount)} VNĐ</span>
              </div>

              <div className="receipt-barcode" style={{ marginTop: "24px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div className="barcode-lines" style={{ width: "100%", height: "40px", background: "repeating-linear-gradient(90deg, #000, #000 2px, #fff 2px, #fff 8px)" }} />
                <span className="barcode-text" style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "6px" }}>{bookingDetails.bookingId} - {t.receipt_barcode_text}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
