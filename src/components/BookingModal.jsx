import React, { useState, useEffect } from "react";
import { X, Calendar, User, Phone, Mail, Ticket, CheckCircle2, ShoppingBag } from "lucide-react";
import { translations } from "../data/translations";

export default function BookingModal({
  isOpen,
  onClose,
  tour,
  view, // 'add-to-cart' | 'checkout' | 'payment' | 'receipt'
  cartItems,
  onAddToCart,
  onCheckoutSubmit,
  bookingDetails, // Details of completed booking for receipt
  language,
  onConfirmPayment,
  paymentSettings
}) {
  const t = translations[language || "vi"];
  const isEn = language === "en";
  const l = (vi, en, hi) => {
    if (language === "vi") return vi;
    if (language === "en") return en;
    return hi || en;
  };

  const bankName = paymentSettings?.bankName || "MB Bank (Ngân hàng Quân đội)";
  const accountNo = paymentSettings?.accountNo || "0987654321";
  const accountName = paymentSettings?.accountName || "CONG TY CO PHAN DU LICH PHU QUOC";
  const bankId = paymentSettings?.bankId || "mb";
  const qrType = paymentSettings?.qrType || "api";
  const customQr = paymentSettings?.base64Qr || paymentSettings?.customQrUrl || "";

  // Add to cart form state
  const [date, setDate] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  // Checkout form state
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("bank"); // 'bank' | 'cod'

  // Min date is today
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
  }, [isOpen]);

  if (!isOpen) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  const handlePrintBooking = (order) => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert(isEn ? "Popup blocker is enabled. Please allow popups to download ticket." : "Trình chặn popup đang bật. Vui lòng cho phép popup để tải xuống vé.");
      return;
    }
    const invoiceHtml = `
      <html>
        <head>
          <title>Phú Quốc Travel - E-Ticket #${order.bookingId}</title>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px; color: #1e293b; background: #fff; line-height: 1.5; }
            .invoice-card { max-width: 800px; margin: 0 auto; border: 1px solid #e2e8f0; padding: 30px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.02); }
            .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #00a896; padding-bottom: 20px; margin-bottom: 30px; }
            .company-info h1 { margin: 0; color: #0d2c54; font-size: 24px; font-weight: 800; }
            .company-info p { margin: 4px 0 0; color: #64748b; font-size: 13px; }
            .invoice-meta { text-align: right; font-size: 13px; color: #475569; }
            .invoice-meta h2 { margin: 0 0 8px; color: #00a896; font-size: 20px; font-weight: 700; text-transform: uppercase; }
            .section { margin-bottom: 25px; }
            .section-title { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #0f172a; border-bottom: 1px solid #cbd5e1; padding-bottom: 6px; margin-bottom: 12px; }
            .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; font-size: 14px; }
            .info-item strong { color: #475569; }
            table { width: 100%; border-collapse: collapse; margin-top: 15px; }
            th, td { padding: 12px; border-bottom: 1px solid #e2e8f0; text-align: left; font-size: 13px; }
            th { background-color: #f8fafc; font-weight: 600; color: #334155; }
            .total-row { font-weight: 700; font-size: 15px; background-color: #f1f5f9; }
            .total-row td { border-top: 2px solid #cbd5e1; }
            .signature-section { margin-top: 50px; display: flex; justify-content: space-between; page-break-inside: avoid; }
            .signature-box { text-align: center; width: 220px; font-size: 13px; }
            .footer { margin-top: 60px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px dashed #e2e8f0; padding-top: 20px; }
            @media print {
              body { padding: 0; background: #fff; }
              .invoice-card { border: none; box-shadow: none; padding: 0; max-width: 100%; }
            }
          </style>
        </head>
        <body>
          <div class="invoice-card">
            <div class="header">
              <div class="company-info">
                <h1>PHÚ QUỐC TRAVEL</h1>
                <p>${isEn ? "Address: Tran Hung Dao Street, Duong Dong, Phu Quoc Island, Vietnam" : "Địa chỉ: Đường Trần Hưng Đạo, Dương Đông, Phú Quốc, Kiên Giang"}</p>
                <p>Hotline: 0987.654.321 • Email: info@phuquoctravel.com</p>
              </div>
              <div class="invoice-meta">
                <h2>${isEn ? "E-Ticket E-Pass" : "Vé Điện Tử Trải Nghiệm"}</h2>
                <div>${isEn ? "Order ID" : "Mã đặt vé"}: <strong>${order.bookingId}</strong></div>
                <div>${isEn ? "Status" : "Trạng thái"}: <strong>${order.status === "confirmed" ? (isEn ? "PAID" : "ĐÃ THANH TOÁN") : order.status === "unpaid_cod" ? (isEn ? "COD PENDING" : "THANH TOÁN COD") : (isEn ? "UNPAID" : "CHỜ THANH TOÁN")}</strong></div>
                <div>${isEn ? "Date" : "Ngày đặt"}: ${order.bookingDate}</div>
              </div>
            </div>
            
            <div class="section">
              <div class="section-title">${isEn ? "Passenger Details" : "Thông tin hành khách"}</div>
              <div class="info-grid">
                <div class="info-item"><strong>${isEn ? "Full Name" : "Khách hàng"}:</strong> ${order.fullName}</div>
                <div class="info-item"><strong>${isEn ? "Phone Number" : "Số điện thoại"}:</strong> ${order.phone}</div>
                <div class="info-item" style="grid-column: span 2;"><strong>Email:</strong> ${order.email}</div>
              </div>
            </div>
 
            <div class="section">
              <div class="section-title">${isEn ? "Itinerary Sightseeing List" : "Danh sách dịch vụ trong hành trình"}</div>
              <table>
                <thead>
                  <tr>
                    <th>${isEn ? "Sightseeing Service / Package" : "Dịch vụ / Gói Tour"}</th>
                    <th>${isEn ? "Itinerary Details / Options" : "Chi tiết hành trình / Tùy chọn"}</th>
                    <th style="text-align: right; width: 150px;">${isEn ? "Total Price" : "Thành tiền"}</th>
                  </tr>
                </thead>
                <tbody>
                  ${order.items.map(item => `
                    <tr>
                      <td><strong>${item.tourName}</strong></td>
                      <td style="color: #475569; font-size: 12px;">
                        ${!item.isCustom 
                          ? `${isEn ? "Departure" : "Khởi hành"}: ${new Date(item.date).toLocaleDateString(isEn ? "en-US" : "vi-VN")} • ${item.adults} ${isEn ? "Ad" : "NL"}, ${item.children} ${isEn ? "Ch" : "TE"}`
                          : `${isEn ? "Custom Itinerary: " : "Tự thiết kế gồm: "}${item.customItems?.map(c => c.name).join(", ")}`
                        }
                      </td>
                      <td style="text-align: right; font-weight: 700; color: #00a896;">
                        ${new Intl.NumberFormat("vi-VN").format(item.totalPrice)} đ
                      </td>
                    </tr>
                  `).join("")}
                  <tr class="total-row">
                    <td colspan="2" style="text-align: right;">${isEn ? "TOTAL AMOUNT" : "TỔNG CỘNG THANH TOÁN"}:</td>
                    <td style="text-align: right; color: #ffb703;">
                      ${new Intl.NumberFormat("vi-VN").format(order.totalAmount)} đ
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style="margin-top: 24px; text-align: center;">
              <div style="width: 100%; height: 40px; background: repeating-linear-gradient(90deg, #000, #000 2px, #fff 2px, #fff 8px);"></div>
              <span style="font-size: 12px; color: #64748b;">${order.bookingId} - ${isEn ? "PRESENT THIS E-PASS AT BOARDING" : "HÃY XUẤT TRÌNH VÉ NÀY TẠI ĐIỂM ĐÓN KHÁCH"}</span>
            </div>
 
            <div class="footer">
              <p>${isEn ? "Thank you for choosing Phu Quoc Travel!" : "Cảm ơn quý khách đã tin tưởng và lựa chọn dịch vụ của Phú Quốc Travel!"}</p>
              <p>${isEn ? "We wish you a wonderful and memorable holiday!" : "Chúc quý khách có một chuyến đi vui vẻ và ý nghĩa!"}</p>
            </div>
          </div>
 
          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() { window.close(); }, 500);
            };
          </script>
        </body>
      </html>
    `;
    printWindow.document.write(invoiceHtml);
    printWindow.document.close();
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

        {/* 2.5. VIEW PAYMENT METHOD & PDF DOWNLOAD */}
        {view === "payment" && bookingDetails && (
          <div>
            <div className="modal-header" style={{ background: "var(--primary)", borderBottom: "none" }}>
              <CheckCircle2 size={24} style={{ color: "#10b981" }} />
              <div>
                <h3 style={{ margin: 0, color: "var(--white)", fontSize: "1.15rem", fontWeight: 700 }}>
                  {t.payment_title}
                </h3>
                <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.8)" }}>
                  {l("Mã đặt vé: ", "Booking ID: ", "बुकिंग आईडी: ")}{bookingDetails.bookingId}
                </span>
              </div>
            </div>

            <div className="modal-body" style={{ padding: "30px 40px", background: "var(--white)", borderRadius: "0 0 24px 24px" }}>
              {/* Step 1: Export PDF */}
              <div style={{ background: "rgba(0, 168, 150, 0.05)", border: "1px solid rgba(0, 168, 150, 0.15)", borderRadius: "12px", padding: "16px 20px", marginBottom: "24px" }}>
                <h4 style={{ color: "var(--primary)", fontSize: "0.95rem", fontWeight: 700, margin: "0 0 8px 0" }}>
                  {t.payment_step1}
                </h4>
                <p style={{ margin: "0 0 12px 0", fontSize: "0.8rem", color: "var(--text-muted)", lineHeight: 1.4 }}>
                  {l(
                    "Hành trình của bạn đã được ghi nhận. Vui lòng tải xuống bản in Vé điện tử (PDF) để lưu trữ và xuất trình khi khởi hành.",
                    "Your itinerary has been saved. Please download the printed E-Ticket (PDF) for boarding.",
                    "आपकी यात्रा कार्यक्रम सहेज लिया गया है। कृपया बोर्डिंग के लिए मुद्रित ई-टिकट (पीडीएफ) डाउनलोड करें।"
                  )}
                </p>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => handlePrintBooking(bookingDetails)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    borderColor: "var(--secondary)",
                    color: "var(--secondary)",
                    padding: "10px 20px",
                    fontWeight: 700,
                    borderRadius: "8px",
                    fontSize: "0.82rem",
                    cursor: "pointer"
                  }}
                >
                  <Ticket size={16} /> {t.payment_step1_btn}
                </button>
              </div>

              {/* Step 2: Choose Payment Method */}
              <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: "20px" }}>
                <h4 style={{ color: "var(--primary)", fontSize: "0.95rem", fontWeight: 700, margin: "0 0 16px 0" }}>
                  {t.payment_step2}
                </h4>

                {/* Tabs */}
                <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("bank")}
                    style={{
                      flex: 1,
                      padding: "12px",
                      borderRadius: "10px",
                      border: paymentMethod === "bank" ? "2px solid var(--secondary)" : "1px solid rgba(0,0,0,0.08)",
                      background: paymentMethod === "bank" ? "rgba(255, 183, 3, 0.05)" : "transparent",
                      color: paymentMethod === "bank" ? "var(--secondary)" : "var(--text-muted)",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                      cursor: "pointer",
                      transition: "var(--transition)"
                    }}
                  >
                    🏦 {t.payment_bank}
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("cod")}
                    style={{
                      flex: 1,
                      padding: "12px",
                      borderRadius: "10px",
                      border: paymentMethod === "cod" ? "2px solid var(--secondary)" : "1px solid rgba(0,0,0,0.08)",
                      background: paymentMethod === "cod" ? "rgba(255, 183, 3, 0.05)" : "transparent",
                      color: paymentMethod === "cod" ? "var(--secondary)" : "var(--text-muted)",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                      cursor: "pointer",
                      transition: "var(--transition)"
                    }}
                  >
                    💵 {t.payment_cod}
                  </button>
                </div>

                {/* Tab content 1: Bank Transfer */}
                {paymentMethod === "bank" && (
                  <div style={{ background: "#f8fafc", border: "1px solid rgba(0,0,0,0.04)", borderRadius: "12px", padding: "20px", display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "20px", alignItems: "center" }}>
                    {/* QR MB VietQR */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", background: "#fff", padding: "12px", borderRadius: "10px", border: "1px solid rgba(0,0,0,0.05)" }}>
                      <img
                        src={qrType === "custom" && customQr ? customQr : `https://img.vietqr.io/image/${bankId}-${accountNo}-compact.png?amount=${bookingDetails.totalAmount}&addInfo=${bookingDetails.bookingId}&accountName=${encodeURIComponent(accountName)}`}
                        alt="Bank Transfer QR Code"
                        style={{ width: "100%", maxHeight: "170px", objectFit: "contain" }}
                      />
                      <span style={{ fontSize: "0.68rem", color: "var(--text-muted)", marginTop: "8px", fontWeight: 600 }}>Quét mã QR để chuyển khoản nhanh</span>
                    </div>

                    {/* Details */}
                    <div>
                      <h5 style={{ margin: "0 0 10px 0", color: "var(--primary)", fontSize: "0.85rem", fontWeight: 700 }}>{t.bank_title}</h5>
                      <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "0.78rem", color: "var(--text)" }}>
                        <div><strong>Ngân hàng:</strong> {bankName}</div>
                        <div><strong>{t.bank_account_no}</strong> {accountNo}</div>
                        <div><strong>{t.bank_account_name}</strong> {accountName}</div>
                        <div><strong>{t.bank_amount}</strong> <span style={{ color: "var(--secondary)", fontWeight: 700 }}>{formatPrice(bookingDetails.totalAmount)} đ</span></div>
                        <div><strong>{t.bank_memo}</strong> <span style={{ background: "rgba(255, 183, 3, 0.15)", padding: "2px 6px", borderRadius: "4px", fontWeight: 700, color: "var(--primary)" }}>{bookingDetails.bookingId}</span></div>
                      </div>
                      
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => onConfirmPayment(bookingDetails.bookingId, "confirmed")}
                        style={{ width: "100%", marginTop: "16px", padding: "10px 14px", borderRadius: "8px", fontSize: "0.8rem", fontWeight: 700 }}
                      >
                        {t.bank_btn_confirm}
                      </button>
                    </div>
                  </div>
                )}

                {/* Tab content 2: COD */}
                {paymentMethod === "cod" && (
                  <div style={{ background: "#f8fafc", border: "1px solid rgba(0,0,0,0.04)", borderRadius: "12px", padding: "20px" }}>
                    <h5 style={{ margin: "0 0 8px 0", color: "var(--primary)", fontSize: "0.85rem", fontWeight: 700 }}>{t.cod_title}</h5>
                    <p style={{ margin: "0 0 16px 0", fontSize: "0.8rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
                      {t.cod_desc}
                    </p>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => onConfirmPayment(bookingDetails.bookingId, "unpaid_cod")}
                      style={{ padding: "10px 20px", borderRadius: "8px", fontSize: "0.8rem", fontWeight: 700 }}
                    >
                      {t.cod_btn_confirm}
                    </button>
                  </div>
                )}
              </div>
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
              {/* Payment status badge */}
              <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                <span style={{
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  padding: "6px 16px",
                  borderRadius: "20px",
                  background: bookingDetails.status === "confirmed" ? "rgba(16, 185, 129, 0.1)" : bookingDetails.status === "unpaid_cod" ? "rgba(100, 64, 251, 0.1)" : "rgba(255, 170, 13, 0.1)",
                  color: bookingDetails.status === "confirmed" ? "#10b981" : bookingDetails.status === "unpaid_cod" ? "#6440FB" : "#FFAA0D"
                }}>
                  {bookingDetails.status === "confirmed" 
                    ? l("● Trạng thái: ĐÃ THANH TOÁN (Vé Đã Kích Hoạt)", "● Status: PAID (E-Ticket Activated)", "● स्थिति: भुगतान किया गया")
                    : bookingDetails.status === "unpaid_cod"
                      ? l("● Trạng thái: CHỜ THANH TOÁN COD (Khi Nhận Khách)", "● Status: COD PENDING (On Arrival)", "● स्थिति: सीओडी लंबित")
                      : l("● Trạng thái: CHỜ CHUYỂN KHOẢN (Chưa Thanh Toán)", "● Status: PENDING BANK TRANSFER (Unpaid)", "● स्थिति: बैंक ट्रांसफर लंबित")
                  }
                </span>
              </div>

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
                <span style={{ fontWeight: 600, color: "var(--primary)" }}>
                  {bookingDetails.status === "confirmed"
                    ? l("Tổng cộng đã thanh toán", "Total Amount Paid", "कुल भुगतान किया गया")
                    : l("Tổng chi phí cần thanh toán", "Total Amount Due", "कुल देय राशि")
                  }
                </span>
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
