import React, { useState } from "react";
import { User, Copy, DollarSign, Award, ShoppingBag, ArrowLeft, Check, Compass, Share2 } from "lucide-react";

export default function GuideDashboard({
  guide,
  bookings,
  tours,
  onLogout
}) {
  const [selectedTourId, setSelectedTourId] = useState(tours[0]?.id || "");
  const [copied, setCopied] = useState(false);

  // Filter bookings referred by this guide
  const referredBookings = bookings.filter(
    (booking) => booking.referrer === guide.code
  );

  // Math metrics
  const totalSales = referredBookings.reduce((acc, b) => acc + b.totalAmount, 0);
  const totalCommission = (totalSales * guide.commissionRate) / 100;

  const pendingSales = referredBookings
    .filter(b => b.status === "pending")
    .reduce((acc, b) => acc + b.totalAmount, 0);
  const pendingCommission = (pendingSales * guide.commissionRate) / 100;

  const approvedSales = referredBookings
    .filter(b => b.status === "confirmed")
    .reduce((acc, b) => acc + b.totalAmount, 0);
  const approvedCommission = (approvedSales * guide.commissionRate) / 100;

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  // Generate affiliate link
  const rootUrl = window.location.origin;
  const affiliateLink = selectedTourId 
    ? `${rootUrl}/?tour=${selectedTourId}&ref=${guide.code}`
    : `${rootUrl}/?ref=${guide.code}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(affiliateLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f3f4f6", paddingBottom: "60px" }}>
      {/* Header */}
      <header style={{ background: "linear-gradient(135deg, var(--secondary), #028090)", color: "var(--white)", padding: "20px 0", boxShadow: "0 4px 15px rgba(0,168,150,0.15)" }}>
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Award size={26} style={{ color: "var(--accent)" }} />
            <h1 style={{ color: "var(--white)", fontSize: "1.3rem", margin: 0, fontWeight: 800 }}>
              CỔNG HƯỚNG DẪN VIÊN • PHÚ QUỐC TRAVEL
            </h1>
          </div>
          <button className="btn btn-outline" onClick={onLogout} style={{ color: "var(--white)", borderColor: "var(--white)", padding: "8px 18px", fontSize: "0.85rem" }}>
            <ArrowLeft size={16} /> Đăng Xuất
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="container" style={{ marginTop: "40px" }}>
        {/* Guide Profile & Overview card */}
        <div style={{ background: "var(--white)", padding: "24px 30px", borderRadius: "20px", boxShadow: "0 4px 15px rgba(0,0,0,0.02)", marginBottom: "30px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "#e0f2fe", display: "flex", alignItems: "center", justifyCenter: "center", color: "var(--secondary)" }}>
              <User size={30} style={{ margin: "auto" }} />
            </div>
            <div>
              <h2 style={{ fontSize: "1.3rem", color: "var(--primary)", margin: 0 }}>HDV. {guide.name}</h2>
              <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 500 }}>
                Cấp bậc: <strong style={{ color: guide.level === 1 ? "#10b981" : "var(--accent)" }}>Cấp {guide.level} ({guide.level === 1 ? "VIP" : "Tiêu chuẩn"})</strong>
              </span>
            </div>
          </div>

          <div style={{ display: "flex", gap: "12px", background: "#f8fafc", padding: "12px 24px", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.03)" }}>
            <DollarSign size={20} style={{ color: "#10b981", marginTop: "2px" }} />
            <div>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>Tỷ lệ chiết khấu (%)</span>
              <strong style={{ fontSize: "1.2rem", color: "var(--primary)" }}>{guide.commissionRate}% Doanh thu</strong>
            </div>
          </div>
        </div>

        {/* Stats KPIs row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "30px" }}>
          <div style={{ background: "var(--white)", padding: "24px", borderRadius: "16px", boxShadow: "0 4px 15px rgba(0,0,0,0.02)" }}>
            <ShoppingBag size={22} style={{ color: "var(--secondary)", marginBottom: "8px" }} />
            <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", display: "block" }}>SỐ ĐƠN GIỚI THIỆU</span>
            <strong style={{ fontSize: "1.4rem", color: "var(--primary)" }}>{referredBookings.length} Đơn hàng</strong>
          </div>
          
          <div style={{ background: "var(--white)", padding: "24px", borderRadius: "16px", boxShadow: "0 4px 15px rgba(0,0,0,0.02)" }}>
            <DollarSign size={22} style={{ color: "#10b981", marginBottom: "8px" }} />
            <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", display: "block" }}>DOANH SỐ ĐEM LẠI</span>
            <strong style={{ fontSize: "1.4rem", color: "var(--primary)" }}>{formatPrice(totalSales)} đ</strong>
          </div>

          <div style={{ background: "var(--white)", padding: "24px", borderRadius: "16px", boxShadow: "0 4px 15px rgba(0,0,0,0.02)", borderLeft: "4px solid var(--accent)" }}>
            <DollarSign size={22} style={{ color: "var(--accent)", marginBottom: "8px" }} />
            <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", display: "block" }}>HOA HỒNG CHỜ DUYỆT</span>
            <strong style={{ fontSize: "1.4rem", color: "var(--accent)" }}>{formatPrice(pendingCommission)} đ</strong>
          </div>

          <div style={{ background: "var(--white)", padding: "24px", borderRadius: "16px", boxShadow: "0 4px 15px rgba(0,0,0,0.02)", borderLeft: "4px solid #10b981" }}>
            <DollarSign size={22} style={{ color: "#10b981", marginBottom: "8px" }} />
            <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", display: "block" }}>HOA HỒNG ĐƯỢC DUYỆT</span>
            <strong style={{ fontSize: "1.4rem", color: "#10b981" }}>{formatPrice(approvedCommission)} đ</strong>
          </div>
        </div>

        {/* Dynamic Affiliate Link Generator */}
        <div style={{ background: "var(--white)", padding: "30px", borderRadius: "20px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", marginBottom: "30px" }}>
          <h3 style={{ fontSize: "1.1rem", color: "var(--primary)", display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
            <Share2 size={18} style={{ color: "var(--secondary)" }} />
            Tạo Link Giới Thiệu Affiliate của bạn
          </h3>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "20px" }}>
            <div className="form-group">
              <label>Chọn Trang / Tour du lịch</label>
              <select value={selectedTourId} onChange={(e) => setSelectedTourId(e.target.value)}>
                <option value="">Trang chủ chính thức (Tất cả)</option>
                {tours.map(tour => (
                  <option key={tour.id} value={tour.id}>{tour.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Đường link giới thiệu Affiliate của bạn</label>
              <div style={{ display: "flex", gap: "10px" }}>
                <input
                  type="text"
                  readOnly
                  value={affiliateLink}
                  style={{ flexGrow: 1, background: "#f8fafc", border: "1px solid rgba(13,44,84,0.15)", padding: "10px 14px", borderRadius: "8px", outline: "none", fontSize: "0.85rem" }}
                />
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleCopyLink}
                  style={{ display: "flex", gap: "6px", whiteSpace: "nowrap", padding: "10px 20px" }}
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  {copied ? "Đã copy!" : "Copy Link"}
                </button>
              </div>
            </div>
          </div>
          <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "12px" }}>
            *Hướng dẫn: Sao chép đường link trên gửi cho khách hàng của bạn qua mạng xã hội. Khi khách click đặt tour thành công trên web, bạn sẽ tự động được ghi nhận % hoa hồng doanh thu.*
          </p>
        </div>

        {/* Referred Bookings log */}
        <div style={{ background: "var(--white)", padding: "30px", borderRadius: "20px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
          <h3 style={{ fontSize: "1.1rem", color: "var(--primary)", marginBottom: "20px" }}>
            Lịch sử hoa hồng giới thiệu
          </h3>

          {referredBookings.length === 0 ? (
            <div style={{ textAlign: "center", padding: "30px", color: "var(--text-muted)" }}>
              <Compass size={36} style={{ opacity: 0.3, marginBottom: "8px" }} />
              <p style={{ fontSize: "0.85rem" }}>Chưa ghi nhận đơn hàng giới thiệu nào phát sinh từ link của bạn.</p>
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.85rem" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #cbd5e1", color: "var(--primary)" }}>
                    <th style={{ padding: "10px" }}>Mã Booking</th>
                    <th style={{ padding: "10px" }}>Khách Hàng</th>
                    <th style={{ padding: "10px" }}>Các dịch vụ đã đặt</th>
                    <th style={{ padding: "10px" }}>Tổng Giá Trị</th>
                    <th style={{ padding: "10px" }}>Mức chiết khấu</th>
                    <th style={{ padding: "10px" }}>Hoa hồng nhận được</th>
                    <th style={{ padding: "10px" }}>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {referredBookings.map((order, idx) => {
                    const orderCommission = (order.totalAmount * guide.commissionRate) / 100;
                    return (
                      <tr key={idx} style={{ borderBottom: "1px solid #e2e8f0" }}>
                        <td style={{ padding: "12px 10px", fontWeight: 700 }}>{order.bookingId}</td>
                        <td style={{ padding: "12px 10px" }}>{order.fullName}</td>
                        <td style={{ padding: "12px 10px" }}>
                          {order.items.map((it, i) => (
                            <span key={i} style={{ display: "block", fontSize: "0.75rem", color: "var(--text-muted)" }}>
                              • {it.tourName}
                            </span>
                          ))}
                        </td>
                        <td style={{ padding: "12px 10px", fontWeight: 600 }}>{formatPrice(order.totalAmount)} đ</td>
                        <td style={{ padding: "12px 10px" }}>{guide.commissionRate}%</td>
                        <td style={{ padding: "12px 10px", fontWeight: 700, color: order.status === "confirmed" ? "#10b981" : "var(--accent)" }}>
                          {formatPrice(orderCommission)} đ
                        </td>
                        <td style={{ padding: "12px 10px" }}>
                          <span style={{ fontSize: "0.75rem", fontWeight: 700, padding: "2px 8px", borderRadius: "10px", background: order.status === "confirmed" ? "rgba(16, 185, 129, 0.1)" : "rgba(255, 140, 66, 0.1)", color: order.status === "confirmed" ? "#10b981" : "var(--accent)" }}>
                            {order.status === "confirmed" ? "Đã xác nhận" : "Chờ duyệt"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
