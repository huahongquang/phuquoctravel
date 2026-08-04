import React, { useState, useEffect } from "react";
import { X, Calendar, User, Phone, Mail, Ticket, CheckCircle2, ShoppingBag } from "lucide-react";

export default function BookingModal({
  isOpen,
  onClose,
  tour,
  view, // 'add-to-cart' | 'checkout' | 'receipt'
  cartItems,
  onAddToCart,
  onCheckoutSubmit,
  bookingDetails, // Details of completed booking for receipt
}) {
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

  const handleAddToCartSubmit = (e) => {
    e.preventDefault();
    if (!date) return;
    onAddToCart({
      tourId: tour.id,
      tourName: tour.name,
      price: tour.price,
      date: date,
      adults: adults,
      children: children,
      totalPrice: tourTotal
    });
  };

  const handleCheckoutFormSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !phone || !email) return;
    onCheckoutSubmit({
      fullName,
      phone,
      email,
      bookingId: "PQ-" + Math.floor(100000 + Math.random() * 900000),
      bookingDate: new Date().toLocaleDateString("vi-VN") + " " + new Date().toLocaleTimeString("vi-VN")
    });
  };

  return (
    <div className={`modal-overlay ${isOpen ? "open" : ""}`} onClick={onClose}>
      <div className="booking-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>
            {view === "add-to-cart" && "Lên Kế Hoạch Trải Nghiệm"}
            {view === "checkout" && "Thông Tin Đặt Tour"}
            {view === "receipt" && "Biên Lai Đặt Tour"}
          </h3>
          <button className="close-modal-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {/* VIEW 1: ADD TO CART */}
          {view === "add-to-cart" && tour && (
            <form onSubmit={handleAddToCartSubmit}>
              <div className="booking-summary-card">
                <h4>{tour.name}</h4>
                <p>Thời lượng: {tour.duration}</p>
                <p style={{ marginTop: "4px", fontWeight: 700, color: "var(--secondary)" }}>
                  {formatPrice(tour.price)} VNĐ / người lớn • {formatPrice(tour.price * 0.7)} VNĐ / trẻ em (70%)
                </p>
              </div>

              <div className="form-grid" style={{ marginBottom: "24px" }}>
                <div className="form-group form-group-full">
                  <label htmlFor="travel-date">Ngày khởi hành</label>
                  <div style={{ position: "relative" }}>
                    <input
                      type="date"
                      id="travel-date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Người lớn (Từ 10 tuổi)</label>
                  <div className="guest-counter-wrapper">
                    <span>{formatPrice(tour.price)} đ</span>
                    <div className="counter-controls">
                      <button
                        type="button"
                        className="counter-btn"
                        onClick={() => setAdults(prev => Math.max(1, prev - 1))}
                        disabled={adults <= 1}
                      >
                        -
                      </button>
                      <span className="counter-value">{adults}</span>
                      <button
                        type="button"
                        className="counter-btn"
                        onClick={() => setAdults(prev => prev + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>Trẻ em (4 - 9 tuổi)</label>
                  <div className="guest-counter-wrapper">
                    <span>{formatPrice(tour.price * 0.7)} đ</span>
                    <div className="counter-controls">
                      <button
                        type="button"
                        className="counter-btn"
                        onClick={() => setChildren(prev => Math.max(0, prev - 1))}
                        disabled={children <= 0}
                      >
                        -
                      </button>
                      <span className="counter-value">{children}</span>
                      <button
                        type="button"
                        className="counter-btn"
                        onClick={() => setChildren(prev => prev + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer" style={{ padding: "16px 0 0 0", borderTop: "1px solid rgba(13, 44, 84, 0.08)" }}>
                <div className="booking-total-box">
                  <span className="total-label">Tổng tiền tạm tính</span>
                  <div className="booking-total-box .total-val" style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--secondary)" }}>
                    {formatPrice(tourTotal)} đ
                  </div>
                </div>
                <button type="submit" className="btn btn-accent">
                  <ShoppingBag size={18} />
                  Thêm Vào Hành Trình
                </button>
              </div>
            </form>
          )}

          {/* VIEW 2: CHECKOUT */}
          {view === "checkout" && (
            <form onSubmit={handleCheckoutFormSubmit}>
              <div className="booking-summary-card" style={{ maxHeight: "150px", overflowY: "auto" }}>
                <h4 style={{ marginBottom: "8px" }}>Tóm tắt hành trình ({cartItems.length} tour)</h4>
                {cartItems.map((item, idx) => (
                  <div key={idx} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", marginBottom: "4px", color: "var(--text-muted)" }}>
                    <span>{item.tourName} ({item.adults} NL, {item.children} TE)</span>
                    <span>{formatPrice(item.totalPrice)} đ</span>
                  </div>
                ))}
              </div>

              <div className="form-grid">
                <div className="form-group form-group-full">
                  <label htmlFor="fullname">Họ và tên khách hàng</label>
                  <input
                    type="text"
                    id="fullname"
                    required
                    placeholder="Nguyễn Văn A"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Số điện thoại</label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    placeholder="0901234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email liên hệ</label>
                  <input
                    type="email"
                    id="email"
                    required
                    placeholder="example@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="modal-footer" style={{ padding: "16px 0 0 0", borderTop: "1px solid rgba(13, 44, 84, 0.08)" }}>
                <div className="booking-total-box">
                  <span className="total-label">Tổng thanh toán</span>
                  <div className="booking-total-box .total-val" style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--secondary)" }}>
                    {formatPrice(cartTotal)} đ
                  </div>
                </div>
                <button type="submit" className="btn btn-accent">
                  Xác Nhận Đặt Tour
                </button>
              </div>
            </form>
          )}

          {/* VIEW 3: VIRTUAL TICKET RECEIPT */}
          {view === "receipt" && bookingDetails && (
            <div className="receipt-wrapper">
              <div className="receipt-badge-success">
                <CheckCircle2 size={20} />
                <span>Đặt Chỗ Thành Công!</span>
              </div>
              <h4 className="receipt-title">Vé Trải Nghiệm Phú Quốc</h4>
              <p className="receipt-subtitle">Vui lòng xuất trình vé này tại điểm đón khách</p>

              <div className="receipt-info-grid">
                <div className="receipt-field">
                  <span className="field-label">Mã Đặt Chỗ</span>
                  <span className="field-val" style={{ color: "var(--secondary)" }}>{bookingDetails.bookingId}</span>
                </div>
                <div className="receipt-field">
                  <span className="field-label">Ngày Đặt</span>
                  <span className="field-val">{bookingDetails.bookingDate}</span>
                </div>
                <div className="receipt-field">
                  <span className="field-label">Khách Hàng</span>
                  <span className="field-val">{bookingDetails.fullName}</span>
                </div>
                <div className="receipt-field">
                  <span className="field-label">Số Điện Thoại</span>
                  <span className="field-val">{bookingDetails.phone}</span>
                </div>
                <div className="receipt-field" style={{ gridColumn: "1 / -1" }}>
                  <span className="field-label">Email Liên Hệ</span>
                  <span className="field-val">{bookingDetails.email}</span>
                </div>
              </div>

              <div className="receipt-tours-list">
                <span className="field-label" style={{ marginBottom: "8px" }}>Chi tiết dịch vụ</span>
                {bookingDetails.items.map((item, idx) => (
                  <div key={idx} className="receipt-tour-row" style={{ flexDirection: "column", borderBottom: item.isCustom ? "1px dashed rgba(13, 44, 84, 0.1)" : "none", paddingBottom: item.isCustom ? "12px" : "0", marginBottom: "12px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                      <div>
                        <span className="tour-name" style={{ fontWeight: 600, color: "var(--primary)" }}>{item.tourName}</span>
                        {!item.isCustom && <span className="tour-qty" style={{ color: "var(--text-muted)", marginLeft: "6px" }}>({item.adults} NL, {item.children} TE)</span>}
                        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "2px" }}>
                          {item.isCustom ? "Hành trình cá nhân hóa tự chọn" : `Khởi hành: ${new Date(item.date).toLocaleDateString("vi-VN")}`}
                        </div>
                      </div>
                      <span className="tour-price" style={{ fontWeight: 600 }}>{formatPrice(item.totalPrice)} đ</span>
                    </div>
                    {item.isCustom && item.customItems && (
                      <div style={{ background: "#f8fafc", padding: "10px 14px", borderRadius: "10px", marginTop: "8px", width: "100%", fontSize: "0.75rem", border: "1px solid rgba(13, 44, 84, 0.04)" }}>
                        <strong style={{ color: "var(--primary)", display: "block", marginBottom: "6px" }}>Lịch trình chi tiết:</strong>
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

              <div className="receipt-total-row">
                <span>Tổng cộng đã thanh toán</span>
                <span className="total-amount">{formatPrice(bookingDetails.totalAmount)} VNĐ</span>
              </div>

              <div className="receipt-barcode">
                <div className="barcode-lines" />
                <span className="barcode-text">{bookingDetails.bookingId}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
