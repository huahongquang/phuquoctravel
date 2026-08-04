import React, { useState } from "react";
import { Database, ShoppingBag, Plus, Trash2, CheckCircle2, X, ArrowLeft, BarChart2, Shield, Users, FileText, Compass, DollarSign, Award, Edit, Printer } from "lucide-react";

export default function AdminDashboard({
  db,
  onAddItem,
  onUpdateItem,
  onDeleteItem,
  onSyncFlights,
  bookings,
  onConfirmBooking,
  onCloseAdmin,
  blogs,
  onAddBlog,
  onDeleteBlog,
  tours,
  onAddTour,
  onDeleteTour,
  guides,
  onAddGuide,
  onDeleteGuide
}) {
  const [activeTab, setActiveTab] = useState("services"); // 'services' | 'bookings' | 'tours' | 'blogs' | 'guides'
  const [serviceCategory, setServiceCategory] = useState("hotel");
  const [showAddForm, setShowAddForm] = useState(false);

  const [editingItem, setEditingItem] = useState(null);

  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStep, setSyncStep] = useState(0);

  const handleStartSync = () => {
    setIsSyncing(true);
    setSyncStep(1);

    setTimeout(() => {
      setSyncStep(2);
    }, 1000);

    setTimeout(() => {
      setSyncStep(3);
    }, 2200);

    setTimeout(() => {
      setSyncStep(4);
    }, 3400);

    setTimeout(() => {
      const matchedRealtimeFlights = [
        { id: "fl-vn-1", category: "flight", name: "Vietnam Airlines VN1822", name_en: "Vietnam Airlines VN1822", desc: "Giờ đi: 07:30 • Vé khứ hồi • Đã gồm 23kg hành lý • 🟢 Live Synced via GDS Amadeus", desc_en: "Dep: 07:30 • Round-trip • 23kg baggage included • 🟢 Live Synced via GDS Amadeus", price: Math.floor(1050 + Math.random() * 400) * 1000, flightNo: "VN1822", time: "07:30", isRealtime: true },
        { id: "fl-vn-2", category: "flight", name: "Vietnam Airlines VN1826", name_en: "Vietnam Airlines VN1826", desc: "Giờ đi: 13:45 • Vé khứ hồi • Đã gồm 23kg hành lý • 🟢 Live Synced via GDS Amadeus", desc_en: "Dep: 13:45 • Round-trip • 23kg baggage included • 🟢 Live Synced via GDS Amadeus", price: Math.floor(1250 + Math.random() * 450) * 1000, flightNo: "VN1826", time: "13:45", isRealtime: true },
        { id: "fl-vj-1", category: "flight", name: "VietJet Air VJ321", name_en: "VietJet Air VJ321", desc: "Giờ đi: 06:00 • Vé khứ hồi • Chưa gồm hành lý ký gửi • 🟢 Live Synced via Skyscanner", desc_en: "Dep: 06:00 • Round-trip • Baggage extra • 🟢 Live Synced via Skyscanner", price: Math.floor(750 + Math.random() * 250) * 1000, flightNo: "VJ321", time: "06:00", isRealtime: true },
        { id: "fl-vj-2", category: "flight", name: "VietJet Air VJ325", name_en: "VietJet Air VJ325", desc: "Giờ đi: 18:20 • Vé khứ hồi • Chưa gồm hành lý ký gửi • 🟢 Live Synced via Skyscanner", desc_en: "Dep: 18:20 • Round-trip • Baggage extra • 🟢 Live Synced via Skyscanner", price: Math.floor(850 + Math.random() * 300) * 1000, flightNo: "VJ325", time: "18:20", isRealtime: true },
        { id: "fl-qh-1", category: "flight", name: "Bamboo Airways QH242", name_en: "Bamboo Airways QH242", desc: "Giờ đi: 10:15 • Vé khứ hồi • Đã gồm 7kg xách tay • 🟢 Live Synced via GDS Sabre", desc_en: "Dep: 10:15 • Round-trip • 7kg carry-on included • 🟢 Live Synced via GDS Sabre", price: Math.floor(950 + Math.random() * 350) * 1000, flightNo: "QH242", time: "10:15", isRealtime: true }
      ];
      onSyncFlights(matchedRealtimeFlights);
      setIsSyncing(false);
      setSyncStep(0);
    }, 4200);
  };

  // --- FORM STATES ---
  // 1. Service Forms
  const [formFlightNo, setFormFlightNo] = useState("");
  const [formFlightTime, setFormFlightTime] = useState("");
  const [formFlightPrice, setFormFlightPrice] = useState("");
  const [formAirline, setFormAirline] = useState("Vietnam Airlines");

  const [formServiceImage, setFormServiceImage] = useState("");
  const [formServiceVideo, setFormServiceVideo] = useState("");
  const [formServiceYoutube, setFormServiceYoutube] = useState("");

  const [formTransName, setFormTransName] = useState("");
  const [formTransProvider, setFormTransProvider] = useState("");
  const [formTransPrice, setFormTransPrice] = useState("");
  const [formTransType, setFormTransType] = useState("Xe máy");

  const [formHotelName, setFormHotelName] = useState("");
  const [formHotelHost, setFormHotelHost] = useState("");
  const [formHotelRating, setFormHotelRating] = useState("4.9");
  const [formHotelAddress, setFormHotelAddress] = useState("Bãi Trường");
  const [formHotelGuests, setFormHotelGuests] = useState(2);
  const [formHotelPrice, setFormHotelPrice] = useState("");

  const [formDiningName, setFormDiningName] = useState("");
  const [formDiningMenu, setFormDiningMenu] = useState("");
  const [formDiningAddress, setFormDiningAddress] = useState("Dương Đông");
  const [formDiningPrice, setFormDiningPrice] = useState("");

  // 2. Tour Form
  const [formTourName, setFormTourName] = useState("");
  const [formTourPrice, setFormTourPrice] = useState("");
  const [formTourDuration, setFormTourDuration] = useState("1 ngày");
  const [formTourDesc, setFormTourDesc] = useState("");
  const [formTourTransport, setFormTourTransport] = useState("Cano cao tốc");
  const [formTourMeals, setFormTourMeals] = useState("Hải sản nướng tám món");
  const [formTourStops, setFormTourStops] = useState("Hòn Móng Tay, Hòn Mây Rút");
  const [formTourImage, setFormTourImage] = useState("tour_4_islands.jpg");

  // 3. Blog Form
  const [formBlogTitle, setFormBlogTitle] = useState("");
  const [formBlogCategory, setFormBlogCategory] = useState("Cẩm Nang");
  const [formBlogSummary, setFormBlogSummary] = useState("");
  const [formBlogContent, setFormBlogContent] = useState("");
  const [formBlogAuthor, setFormBlogAuthor] = useState("Admin");

  // 4. Guide Form
  const [formGuideName, setFormGuideName] = useState("");
  const [formGuideCode, setFormGuideCode] = useState("");
  const [formGuideLevel, setFormGuideLevel] = useState(2); // 1 = VIP (10%), 2 = Standard (5%)
  const [formGuidePhone, setFormGuidePhone] = useState("");
  const [formGuideEmail, setFormGuideEmail] = useState("");

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  // --- SUBMIT HANDLERS ---
  const handleAddServiceSubmit = (e) => {
    e.preventDefault();
    let newItem = {
      id: editingItem ? editingItem.id : `custom-${serviceCategory}-${Date.now()}`,
      category: serviceCategory
    };

    if (serviceCategory === "flight") {
      if (!formFlightNo || !formFlightTime || !formFlightPrice) return;
      newItem.flightNo = formFlightNo;
      newItem.time = formFlightTime;
      newItem.name = `${formAirline} ${formFlightNo}`;
      newItem.desc = `Giờ đi: ${formFlightTime} • Vé khứ hồi • Hãng: ${formAirline}`;
      newItem.price = parseInt(formFlightPrice);
      newItem.airline = formAirline;

      setFormFlightNo("");
      setFormFlightTime("");
      setFormFlightPrice("");
    } else if (serviceCategory === "transport") {
      if (!formTransName || !formTransProvider || !formTransPrice) return;
      newItem.name = `Thuê ${formTransName}`;
      newItem.desc = `Đơn vị: ${formTransProvider} • Xe: ${formTransType}`;
      newItem.price = parseInt(formTransPrice);
      newItem.provider = formTransProvider;
      newItem.type = formTransType;

      setFormTransName("");
      setFormTransProvider("");
      setFormTransPrice("");
    } else if (serviceCategory === "hotel") {
      if (!formHotelName || !formHotelHost || !formHotelPrice) return;
      newItem.name = formHotelName;
      newItem.desc = `Chủ nhà: ${formHotelHost} • ${formHotelRating}⭐ (${formHotelAddress}) • Tối đa ${formHotelGuests} khách`;
      newItem.price = parseInt(formHotelPrice);
      newItem.host = formHotelHost;
      newItem.rating = parseFloat(formHotelRating);
      newItem.address = formHotelAddress;
      newItem.maxGuests = parseInt(formHotelGuests);

      setFormHotelName("");
      setFormHotelHost("");
      setFormHotelPrice("");
    } else if (serviceCategory === "dining") {
      if (!formDiningName || !formDiningMenu || !formDiningPrice) return;
      newItem.name = formDiningName;
      newItem.desc = `Đặc sản: ${formDiningMenu} • Địa chỉ: ${formDiningAddress}`;
      newItem.price = parseInt(formDiningPrice);
      newItem.menu = formDiningMenu;
      newItem.address = formDiningAddress;

      setFormDiningName("");
      setFormDiningMenu("");
      setFormDiningPrice("");
    }

    // Attach media fields
    if (formServiceImage.trim()) newItem.image = formServiceImage.trim();
    if (formServiceVideo.trim()) newItem.video = formServiceVideo.trim();
    if (formServiceYoutube.trim()) newItem.youtube = formServiceYoutube.trim();

    // Clear media states
    setFormServiceImage("");
    setFormServiceVideo("");
    setFormServiceYoutube("");

    if (editingItem) {
      onUpdateItem(serviceCategory, newItem);
      setEditingItem(null);
    } else {
      onAddItem(serviceCategory, newItem);
    }
    setShowAddForm(false);
  };

  const handleEditClick = (item) => {
    setEditingItem(item);
    setShowAddForm(true);

    if (serviceCategory === "flight") {
      setFormAirline(item.airline || "Vietnam Airlines");
      setFormFlightNo(item.flightNo || "");
      setFormFlightTime(item.time || "");
      setFormFlightPrice(item.price ? item.price.toString() : "");
    } else if (serviceCategory === "transport") {
      setFormTransName(item.name ? item.name.replace("Thuê ", "") : "");
      setFormTransProvider(item.provider || "");
      setFormTransType(item.type || "Xe máy");
      setFormTransPrice(item.price ? item.price.toString() : "");
    } else if (serviceCategory === "hotel") {
      setFormHotelName(item.name || "");
      setFormHotelHost(item.host || "");
      setFormHotelRating(item.rating ? item.rating.toString() : "4.9");
      setFormHotelAddress(item.address || "Bãi Trường");
      setFormHotelGuests(item.maxGuests || 2);
      setFormHotelPrice(item.price ? item.price.toString() : "");
    } else if (serviceCategory === "dining") {
      setFormDiningName(item.name || "");
      setFormDiningMenu(item.menu || "");
      setFormDiningAddress(item.address || "Dương Đông");
      setFormDiningPrice(item.price ? item.price.toString() : "");
    }

    setFormServiceImage(item.image || "");
    setFormServiceVideo(item.video || "");
    setFormServiceYoutube(item.youtube || "");
  };

  const resetFormFields = () => {
    setFormFlightNo("");
    setFormFlightTime("");
    setFormFlightPrice("");
    setFormTransName("");
    setFormTransProvider("");
    setFormTransPrice("");
    setFormHotelName("");
    setFormHotelHost("");
    setFormHotelPrice("");
    setFormDiningName("");
    setFormDiningMenu("");
    setFormDiningPrice("");
    setFormServiceImage("");
    setFormServiceVideo("");
    setFormServiceYoutube("");
  };

  const handlePrintBooking = (order) => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("Trình chặn popup đang bật. Vui lòng cho phép popup để in/xuất PDF hóa đơn.");
      return;
    }
    const invoiceHtml = `
      <html>
        <head>
          <title>Phú Quốc Travel - Hóa Đơn #${order.bookingId}</title>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px; color: #1e293b; background: #fff; line-height: 1.5; }
            .invoice-card { max-width: 800px; margin: 0 auto; border: 1px solid #e2e8f0; padding: 30px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.02); }
            .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #0f172a; padding-bottom: 20px; margin-bottom: 30px; }
            .company-info h1 { margin: 0; color: #0d2c54; font-size: 24px; font-weight: 800; }
            .company-info p { margin: 4px 0 0; color: #64748b; font-size: 13px; }
            .invoice-meta { text-align: right; font-size: 13px; color: #475569; }
            .invoice-meta h2 { margin: 0 0 8px; color: #028090; font-size: 20px; font-weight: 700; text-transform: uppercase; }
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
                <p>Địa chỉ: Đường Trần Hưng Đạo, Dương Đông, Phú Quốc, Kiên Giang</p>
                <p>Hotline: 0987.654.321 • Email: info@phuquoctravel.com</p>
              </div>
              <div class="invoice-meta">
                <h2>Hóa Đơn Tour</h2>
                <div>Mã đơn: <strong>${order.bookingId}</strong></div>
                <div>Ngày lập: ${new Date().toLocaleDateString("vi-VN")}</div>
                <div>Ngày đặt: ${order.bookingDate}</div>
              </div>
            </div>
            
            <div class="section">
              <div class="section-title">Thông tin khách hàng</div>
              <div class="info-grid">
                <div class="info-item"><strong>Khách hàng:</strong> ${order.fullName}</div>
                <div class="info-item"><strong>Số điện thoại:</strong> ${order.phone}</div>
                <div class="info-item" style="grid-column: span 2;"><strong>Email:</strong> ${order.email}</div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Chi tiết dịch vụ đã đặt</div>
              <table>
                <thead>
                  <tr>
                    <th>Dịch vụ / Gói Tour</th>
                    <th>Chi tiết hành trình / Tùy chọn</th>
                    <th style="text-align: right; width: 150px;">Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  ${order.items.map(item => `
                    <tr>
                      <td><strong>${item.tourName}</strong></td>
                      <td style="color: #475569; font-size: 12px;">
                        ${!item.isCustom 
                          ? `Khởi hành: ${new Date(item.date).toLocaleDateString("vi-VN")} • ${item.adults} NL, ${item.children} TE`
                          : `Tự thiết kế gồm: ${item.customItems?.map(c => c.name).join(", ")}`
                        }
                      </td>
                      <td style="text-align: right; font-weight: 700; color: #028090;">
                        ${new Intl.NumberFormat("vi-VN").format(item.totalPrice)} đ
                      </td>
                    </tr>
                  `).join("")}
                  <tr class="total-row">
                    <td colspan="2" style="text-align: right;">TỔNG CỘNG THANH TOÁN:</td>
                    <td style="text-align: right; color: #e76f51;">
                      ${new Intl.NumberFormat("vi-VN").format(order.totalAmount)} đ
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="signature-section">
              <div class="signature-box">
                <p><strong>Khách hàng</strong></p>
                <br/><br/><br/><br/>
                <p style="color: #64748b;">(Ký và ghi rõ họ tên)</p>
              </div>
              <div class="signature-box">
                <p><strong>Đại diện Phú Quốc Travel</strong></p>
                <br/><br/><br/><br/>
                <p style="color: #64748b;">(Ký tên và đóng dấu)</p>
              </div>
            </div>

            <div class="footer">
              <p>Cảm ơn quý khách đã tin tưởng và lựa chọn dịch vụ của Phú Quốc Travel!</p>
              <p>Chúc quý khách có một chuyến đi vui vẻ và ý nghĩa!</p>
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

  const handleAddTourSubmit = (e) => {
    e.preventDefault();
    if (!formTourName || !formTourPrice) return;

    const newTour = {
      id: `tour-${Date.now()}`,
      name: formTourName,
      price: parseInt(formTourPrice),
      duration: formTourDuration,
      description: formTourDesc,
      image: `/images/${formTourImage}`,
      transportation: formTourTransport,
      meals: formTourMeals.split(",").map(item => item.trim()),
      accommodationStops: formTourStops.split(",").map(item => item.trim())
    };

    onAddTour(newTour);
    setShowAddForm(false);
    // Clear
    setFormTourName("");
    setFormTourPrice("");
    setFormTourDesc("");
  };

  const handleAddBlogSubmit = (e) => {
    e.preventDefault();
    if (!formBlogTitle || !formBlogContent) return;

    const newBlog = {
      id: `post-${Date.now()}`,
      title: formBlogTitle,
      category: formBlogCategory,
      summary: formBlogSummary || formBlogContent.substring(0, 120) + "...",
      content: formBlogContent,
      author: formBlogAuthor,
      date: new Date().toLocaleDateString("vi-VN"),
      image: "/images/phu_quoc_hero.jpg"
    };

    onAddBlog(newBlog);
    setShowAddForm(false);
    // Clear
    setFormBlogTitle("");
    setFormBlogSummary("");
    setFormBlogContent("");
  };

  const handleAddGuideSubmit = (e) => {
    e.preventDefault();
    if (!formGuideName || !formGuideCode) return;

    const rate = parseInt(formGuideLevel) === 1 ? 10 : 5;

    const newGuide = {
      id: `guide-${Date.now()}`,
      name: formGuideName,
      code: formGuideCode.toUpperCase(),
      level: parseInt(formGuideLevel),
      commissionRate: rate,
      phone: formGuidePhone,
      email: formGuideEmail
    };

    onAddGuide(newGuide);
    setShowAddForm(false);
    // Clear
    setFormGuideName("");
    setFormGuideCode("");
    setFormGuidePhone("");
    setFormGuideEmail("");
  };

  // Compute revenue & stats
  const totalRevenue = bookings ? bookings.reduce((acc, b) => acc + b.totalAmount, 0) : 0;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f0f4f8", paddingBottom: "60px" }}>
      {/* Admin Header */}
      <header style={{ background: "var(--primary)", color: "var(--white)", padding: "20px 0", boxShadow: "0 4px 15px rgba(13,44,84,0.15)" }}>
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Shield size={26} style={{ color: "var(--secondary)" }} />
            <h1 style={{ color: "var(--white)", fontSize: "1.4rem", margin: 0, fontWeight: 800 }}>
              HỆ THỐNG QUẢN TRỊ VIÊN • PHÚ QUỐC TRAVEL
            </h1>
          </div>
          <button className="btn btn-outline" onClick={onCloseAdmin} style={{ color: "var(--white)", borderColor: "var(--white)", padding: "8px 18px", fontSize: "0.85rem" }}>
            <ArrowLeft size={16} /> Quay Lại Website
          </button>
        </div>
      </header>

      {/* Admin Body */}
      <main className="container" style={{ marginTop: "40px" }}>
        {/* KPI Row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "20px", marginBottom: "30px" }}>
          <div style={{ background: "var(--white)", padding: "20px", borderRadius: "16px", boxShadow: "0 4px 15px rgba(0,0,0,0.02)", borderLeft: "4px solid var(--secondary)" }}>
            <BarChart2 size={24} style={{ color: "var(--secondary)", marginBottom: "8px" }} />
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>TỔNG DOANH THU ĐÃ ĐẶT</span>
            <strong style={{ fontSize: "1.35rem", color: "var(--primary)" }}>{formatPrice(totalRevenue)} đ</strong>
          </div>
          <div style={{ background: "var(--white)", padding: "20px", borderRadius: "16px", boxShadow: "0 4px 15px rgba(0,0,0,0.02)", borderLeft: "4px solid var(--accent)" }}>
            <ShoppingBag size={24} style={{ color: "var(--accent)", marginBottom: "8px" }} />
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>ĐƠN ĐẶT DU LỊCH</span>
            <strong style={{ fontSize: "1.35rem", color: "var(--primary)" }}>{bookings.length} Đơn hàng</strong>
          </div>
          <div style={{ background: "var(--white)", padding: "20px", borderRadius: "16px", boxShadow: "0 4px 15px rgba(0,0,0,0.02)", borderLeft: "4px solid #10b981" }}>
            <Compass size={24} style={{ color: "#10b981", marginBottom: "8px" }} />
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>DANH MỤC TOUR</span>
            <strong style={{ fontSize: "1.35rem", color: "var(--primary)" }}>{tours.length} Gói Tour</strong>
          </div>
          <div style={{ background: "var(--white)", padding: "20px", borderRadius: "16px", boxShadow: "0 4px 15px rgba(0,0,0,0.02)", borderLeft: "4px solid #3b82f6" }}>
            <Users size={24} style={{ color: "#3b82f6", marginBottom: "8px" }} />
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>HƯỚNG DẪN VIÊN</span>
            <strong style={{ fontSize: "1.35rem", color: "var(--primary)" }}>{guides.length} Thành viên</strong>
          </div>
        </div>

        {/* Tab Selector */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "24px", overflowX: "auto", paddingBottom: "10px" }}>
          <button className={`btn ${activeTab === "services" ? "btn-primary" : "btn-outline"}`} onClick={() => { setActiveTab("services"); setShowAddForm(false); }} style={{ borderRadius: "10px", whiteSpace: "nowrap" }}>
            <Database size={16} /> Dịch Vụ Tự Chọn ({db.hotel.length + db.dining.length})
          </button>
          <button className={`btn ${activeTab === "tours" ? "btn-primary" : "btn-outline"}`} onClick={() => { setActiveTab("tours"); setShowAddForm(false); }} style={{ borderRadius: "10px", whiteSpace: "nowrap" }}>
            <Compass size={16} /> Danh Mục Tour ({tours.length})
          </button>
          <button className={`btn ${activeTab === "blogs" ? "btn-primary" : "btn-outline"}`} onClick={() => { setActiveTab("blogs"); setShowAddForm(false); }} style={{ borderRadius: "10px", whiteSpace: "nowrap" }}>
            <FileText size={16} /> Cẩm Nang Bài Viết ({blogs.length})
          </button>
          <button className={`btn ${activeTab === "guides" ? "btn-primary" : "btn-outline"}`} onClick={() => { setActiveTab("guides"); setShowAddForm(false); }} style={{ borderRadius: "10px", whiteSpace: "nowrap" }}>
            <Users size={16} /> Hướng Dẫn Viên & Affiliate ({guides.length})
          </button>
          <button className={`btn ${activeTab === "bookings" ? "btn-primary" : "btn-outline"}`} onClick={() => { setActiveTab("bookings"); setShowAddForm(false); }} style={{ borderRadius: "10px", whiteSpace: "nowrap" }}>
            <ShoppingBag size={16} /> Quản Lý Đơn Hàng ({bookings.filter(b => b.status === "pending").length} mới)
          </button>
        </div>

        {/* TAB 1: MANAGE BUILDER SERVICES */}
        {activeTab === "services" && (
          <div style={{ background: "var(--white)", borderRadius: "20px", padding: "30px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px", marginBottom: "24px" }}>
              <div style={{ display: "flex", gap: "8px", overflowX: "auto" }}>
                <button className={`filter-btn ${serviceCategory === "hotel" ? "active" : ""}`} onClick={() => { setServiceCategory("hotel"); setShowAddForm(false); setEditingItem(null); resetFormFields(); }}>🏨 Airbnb (Chỗ Ở)</button>
                <button className={`filter-btn ${serviceCategory === "dining" ? "active" : ""}`} onClick={() => { setServiceCategory("dining"); setShowAddForm(false); setEditingItem(null); resetFormFields(); }}>🍽️ Ăn Uống (Nhà Hàng)</button>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                {serviceCategory === "flight" && (
                  <button 
                    type="button"
                    className="btn btn-primary animate-pulse" 
                    onClick={handleStartSync} 
                    style={{ padding: "8px 18px", fontSize: "0.85rem", borderRadius: "8px", background: "linear-gradient(135deg, #028090, #00a896)", border: "none", color: "#fff", display: "flex", alignItems: "center", gap: "6px" }}
                  >
                    ⚡ Đồng Bộ Realtime (Simulated)
                  </button>
                )}
                <button className="btn btn-accent" onClick={() => { setShowAddForm(!showAddForm); setEditingItem(null); resetFormFields(); }}><Plus size={16} /> Đăng Ký Mới</button>
              </div>
            </div>

            {showAddForm && (
              <form onSubmit={handleAddServiceSubmit} style={{ background: "#f8fafc", padding: "24px", borderRadius: "12px", border: "1px solid rgba(13,44,84,0.06)", marginBottom: "30px" }}>
                <h4 style={{ color: "var(--primary)", marginBottom: "16px" }}>{editingItem ? "Cập nhật dịch vụ" : "Thêm dịch vụ"} {serviceCategory === "flight" ? "Chuyến Bay" : serviceCategory === "transport" ? "Vận Chuyển" : serviceCategory === "hotel" ? "Airbnb Chỗ Ở" : "Ăn Uống"} {editingItem ? "" : "mới"}</h4>
                {serviceCategory === "flight" && (
                  <div className="form-grid">
                    <div className="form-group"><label>Hãng bay</label><select value={formAirline} onChange={(e) => setFormAirline(e.target.value)}><option value="Vietnam Airlines">Vietnam Airlines</option><option value="VietJet Air">VietJet Air</option><option value="Bamboo Airways">Bamboo Airways</option></select></div>
                    <div className="form-group"><label>Số hiệu chuyến bay</label><input type="text" required placeholder="VN1822" value={formFlightNo} onChange={(e) => setFormFlightNo(e.target.value)} /></div>
                    <div className="form-group"><label>Giờ đi</label><input type="text" required placeholder="08:30" value={formFlightTime} onChange={(e) => setFormFlightTime(e.target.value)} /></div>
                    <div className="form-group"><label>Giá vé khứ hồi</label><input type="number" required placeholder="1200000" value={formFlightPrice} onChange={(e) => setFormFlightPrice(e.target.value)} /></div>
                  </div>
                )}
                {serviceCategory === "transport" && (
                  <div className="form-grid">
                    <div className="form-group"><label>Tên phương tiện</label><input type="text" required placeholder="Xe máy Honda SH..." value={formTransName} onChange={(e) => setFormTransName(e.target.value)} /></div>
                    <div className="form-group"><label>Đơn vị cho thuê</label><input type="text" required placeholder="Nhà xe Đức Hưng..." value={formTransProvider} onChange={(e) => setFormTransProvider(e.target.value)} /></div>
                    <div className="form-group"><label>Phân loại</label><select value={formTransType} onChange={(e) => setFormTransType(e.target.value)}><option value="Xe máy">Xe Máy (Tự lái)</option><option value="Ô tô">Ô Tô (Có tài xế)</option></select></div>
                    <div className="form-group"><label>Giá thuê (VNĐ/ngày)</label><input type="number" required placeholder="150000" value={formTransPrice} onChange={(e) => setFormTransPrice(e.target.value)} /></div>
                  </div>
                )}
                {serviceCategory === "hotel" && (
                  <div className="form-grid">
                    <div className="form-group"><label>Tên phòng/Villa</label><input type="text" required placeholder="Sun Horizon beachfront..." value={formHotelName} onChange={(e) => setFormHotelName(e.target.value)} /></div>
                    <div className="form-group"><label>Chủ nhà (Host)</label><input type="text" required placeholder="Minh Thư..." value={formHotelHost} onChange={(e) => setFormHotelHost(e.target.value)} /></div>
                    <div className="form-group"><label>Đánh giá</label><select value={formHotelRating} onChange={(e) => setFormHotelRating(e.target.value)}><option value="5.0">5.0 ⭐</option><option value="4.9">4.9 ⭐</option><option value="4.8">4.8 ⭐</option></select></div>
                    <div className="form-group"><label>Khu vực</label><select value={formHotelAddress} onChange={(e) => setFormHotelAddress(e.target.value)}><option value="Bãi Trường">Bãi Trường</option><option value="Dương Đông">Dương Đông</option><option value="Hàm Ninh">Hàm Ninh</option></select></div>
                    <div className="form-group"><label>Khách tối đa</label><input type="number" value={formHotelGuests} onChange={(e) => setFormHotelGuests(parseInt(e.target.value) || 2)} /></div>
                    <div className="form-group"><label>Giá thuê (VNĐ/đêm)</label><input type="number" required value={formHotelPrice} onChange={(e) => setFormHotelPrice(e.target.value)} /></div>
                  </div>
                )}
                {serviceCategory === "dining" && (
                  <div className="form-grid">
                    <div className="form-group"><label>Tên nhà hàng/quán ăn</label><input type="text" required placeholder="Quán bè nổi Hàm Ninh..." value={formDiningName} onChange={(e) => setFormDiningName(e.target.value)} /></div>
                    <div className="form-group"><label>Món đặc trưng</label><input type="text" required placeholder="Ghẹ Hàm Ninh hấp..." value={formDiningMenu} onChange={(e) => setFormDiningMenu(e.target.value)} /></div>
                    <div className="form-group"><label>Khu vực</label><select value={formDiningAddress} onChange={(e) => setFormDiningAddress(e.target.value)}><option value="Dương Đông">Dương Đông</option><option value="Làng chài Rạch Vẹm">Làng chài Rạch Vẹm</option><option value="Chợ đêm Phú Quốc">Chợ đêm Phú Quốc</option></select></div>
                    <div className="form-group"><label>Giá trung bình/suất</label><input type="number" required value={formDiningPrice} onChange={(e) => setFormDiningPrice(e.target.value)} /></div>
                  </div>
                )}
                {/* Common Media Fields */}
                <h5 style={{ color: "var(--primary)", marginTop: "24px", marginBottom: "12px", borderTop: "1px dashed rgba(13,44,84,0.1)", paddingTop: "16px", fontWeight: 700 }}>
                  🎨 Tài nguyên truyền thông (Media Assets)
                </h5>
                <div className="form-grid" style={{ marginBottom: "20px" }}>
                  <div className="form-group">
                    <label>Đường dẫn ảnh (Image URL)</label>
                    <input 
                      type="text" 
                      placeholder="https://images.unsplash.com/..." 
                      value={formServiceImage} 
                      onChange={(e) => setFormServiceImage(e.target.value)} 
                    />
                  </div>
                  <div className="form-group">
                    <label>Đường dẫn video (Video URL)</label>
                    <input 
                      type="text" 
                      placeholder="https://example.com/video.mp4" 
                      value={formServiceVideo} 
                      onChange={(e) => setFormServiceVideo(e.target.value)} 
                    />
                  </div>
                  <div className="form-group" style={{ gridColumn: "span 2" }}>
                    <label>Đường dẫn YouTube video (YouTube Link)</label>
                    <input 
                      type="text" 
                      placeholder="https://www.youtube.com/watch?v=..." 
                      value={formServiceYoutube} 
                      onChange={(e) => setFormServiceYoutube(e.target.value)} 
                    />
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "20px" }}>
                  <button type="button" className="btn btn-outline" onClick={() => { setShowAddForm(false); setEditingItem(null); resetFormFields(); }}>Hủy</button>
                  <button type="submit" className="btn btn-primary">{editingItem ? "Cập Nhật" : "Lưu Lại"}</button>
                </div>
              </form>
            )}

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #cbd5e1", color: "var(--primary)" }}>
                    <th style={{ padding: "12px", textAlign: "left" }}>Tên dịch vụ</th>
                    {serviceCategory === "flight" && <th style={{ padding: "12px", textAlign: "left" }}>Mã Bay</th>}
                    {serviceCategory === "flight" && <th style={{ padding: "12px", textAlign: "left" }}>Giờ cất cánh</th>}
                    {serviceCategory === "transport" && <th style={{ padding: "12px", textAlign: "left" }}>Đơn Vị Cho Thuê</th>}
                    {serviceCategory === "hotel" && <th style={{ padding: "12px", textAlign: "left" }}>Chủ nhà (Host)</th>}
                    {serviceCategory === "hotel" && <th style={{ padding: "12px", textAlign: "left" }}>Khu vực</th>}
                    {serviceCategory === "dining" && <th style={{ padding: "12px", textAlign: "left" }}>Địa chỉ</th>}
                    <th style={{ padding: "12px", textAlign: "left" }}>Giá tiền</th>
                    <th style={{ padding: "12px", textAlign: "center" }}>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {db[serviceCategory].map(item => (
                    <tr key={item.id} style={{ borderBottom: "1px solid #e2e8f0" }}>
                      <td style={{ padding: "12px" }}>
                        <strong>{item.name}</strong>
                        <div style={{ display: "flex", gap: "6px", marginTop: "4px" }}>
                          {item.image && <span style={{ fontSize: "0.68rem", background: "rgba(16,185,129,0.08)", color: "#10b981", padding: "2px 4px", borderRadius: "3px", fontWeight: 600 }}>🖼️ Ảnh</span>}
                          {item.video && <span style={{ fontSize: "0.68rem", background: "rgba(59,130,246,0.08)", color: "#3b82f6", padding: "2px 4px", borderRadius: "3px", fontWeight: 600 }}>🎥 Video</span>}
                          {item.youtube && <span style={{ fontSize: "0.68rem", background: "rgba(239,68,68,0.08)", color: "#ef4444", padding: "2px 4px", borderRadius: "3px", fontWeight: 600 }}>▶️ YouTube</span>}
                        </div>
                      </td>
                      {serviceCategory === "flight" && <td style={{ padding: "12px" }}>{item.flightNo}</td>}
                      {serviceCategory === "flight" && <td style={{ padding: "12px" }}>{item.time}</td>}
                      {serviceCategory === "transport" && <td style={{ padding: "12px" }}>{item.provider}</td>}
                      {serviceCategory === "hotel" && <td style={{ padding: "12px" }}>{item.host}</td>}
                      {serviceCategory === "hotel" && <td style={{ padding: "12px" }}>{item.address}</td>}
                      {serviceCategory === "dining" && <td style={{ padding: "12px" }}>{item.address}</td>}
                      <td style={{ padding: "12px", fontWeight: 700, color: "var(--secondary)" }}>{formatPrice(item.price)} đ</td>
                      <td style={{ padding: "12px", textAlign: "center" }}>
                        <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                          <button type="button" onClick={() => handleEditClick(item)} style={{ background: "transparent", border: "none", color: "var(--secondary)", cursor: "pointer" }} title="Sửa dịch vụ"><Edit size={16} /></button>
                          <button type="button" onClick={() => onDeleteItem(serviceCategory, item.id)} style={{ background: "transparent", border: "none", color: "var(--danger)", cursor: "pointer" }} title="Xóa dịch vụ"><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: MANAGE HOMEPAGE TOURS */}
        {activeTab === "tours" && (
          <div style={{ background: "var(--white)", borderRadius: "20px", padding: "30px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <h3 style={{ fontSize: "1.1rem", color: "var(--primary)" }}>Danh sách các Tour trọn gói hiển thị trang chủ</h3>
              <button className="btn btn-accent" onClick={() => setShowAddForm(!showAddForm)} style={{ padding: "8px 18px", fontSize: "0.85rem", borderRadius: "8px" }}><Plus size={16} /> Tạo Tour Mới</button>
            </div>

            {showAddForm && (
              <form onSubmit={handleAddTourSubmit} style={{ background: "#f8fafc", padding: "24px", borderRadius: "12px", border: "1px solid rgba(13,44,84,0.06)", marginBottom: "30px" }}>
                <h4 style={{ color: "var(--primary)", marginBottom: "16px" }}>Thông tin tour du lịch Phú Quốc mới</h4>
                <div className="form-grid">
                  <div className="form-group"><label>Tên gói Tour</label><input type="text" required placeholder="Tour Cano 5 Đảo VIP..." value={formTourName} onChange={(e) => setFormTourName(e.target.value)} /></div>
                  <div className="form-group"><label>Giá bán (VNĐ/Khách)</label><input type="number" required placeholder="1090000" value={formTourPrice} onChange={(e) => setFormTourPrice(e.target.value)} /></div>
                  <div className="form-group"><label>Thời gian tour</label><input type="text" required placeholder="1 ngày, 3 ngày 2 đêm..." value={formTourDuration} onChange={(e) => setFormTourDuration(e.target.value)} /></div>
                  <div className="form-group"><label>Phương tiện vận chuyển</label><input type="text" placeholder="Cano cao tốc & ô tô đưa đón..." value={formTourTransport} onChange={(e) => setFormTourTransport(e.target.value)} /></div>
                  <div className="form-group"><label>Thực đơn ăn uống (Cách nhau bằng dấu phẩy)</label><input type="text" placeholder="Ghẹ hấp, Tôm nướng, Cá kho..." value={formTourMeals} onChange={(e) => setFormTourMeals(e.target.value)} /></div>
                  <div className="form-group"><label>Trạm dừng lưu trú (Cách nhau bằng dấu phẩy)</label><input type="text" placeholder="Hòn Mây Rút, Rạch Vẹm..." value={formTourStops} onChange={(e) => setFormTourStops(e.target.value)} /></div>
                  <div className="form-group" style={{ gridColumn: "1 / -1" }}><label>Mô tả tổng quan tour</label><textarea required rows="3" placeholder="Chi tiết lịch trình..." value={formTourDesc} onChange={(e) => setFormTourDesc(e.target.value)} /></div>
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "20px" }}>
                  <button type="button" className="btn btn-outline" onClick={() => setShowAddForm(false)}>Hủy</button>
                  <button type="submit" className="btn btn-primary">Đăng Tour</button>
                </div>
              </form>
            )}

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #cbd5e1", color: "var(--primary)" }}>
                    <th style={{ padding: "12px", textAlign: "left" }}>Tên Gói Tour</th>
                    <th style={{ padding: "12px", textAlign: "left" }}>Thời lượng</th>
                    <th style={{ padding: "12px", textAlign: "left" }}>Phương tiện</th>
                    <th style={{ padding: "12px", textAlign: "left" }}>Ăn uống (Thực đơn)</th>
                    <th style={{ padding: "12px", textAlign: "left" }}>Giá vé</th>
                    <th style={{ padding: "12px", textAlign: "center" }}>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {tours.map(tour => (
                    <tr key={tour.id} style={{ borderBottom: "1px solid #e2e8f0" }}>
                      <td style={{ padding: "12px" }}><strong>{tour.name}</strong></td>
                      <td style={{ padding: "12px" }}>{tour.duration}</td>
                      <td style={{ padding: "12px" }}>{tour.transportation}</td>
                      <td style={{ padding: "12px", fontSize: "0.75rem", color: "var(--text-muted)", maxWidth: "250px" }}>{tour.meals?.join(", ")}</td>
                      <td style={{ padding: "12px", fontWeight: 700, color: "var(--secondary)" }}>{formatPrice(tour.price)} đ</td>
                      <td style={{ padding: "12px", textAlign: "center" }}>
                        <button type="button" onClick={() => onDeleteTour(tour.id)} style={{ background: "transparent", border: "none", color: "var(--danger)", cursor: "pointer" }}><Trash2 size={16} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: MANAGE BLOG POSTS */}
        {activeTab === "blogs" && (
          <div style={{ background: "var(--white)", borderRadius: "20px", padding: "30px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <h3 style={{ fontSize: "1.1rem", color: "var(--primary)" }}>Quản lý Bài Viết Cẩm Nang Du Lịch</h3>
              <button className="btn btn-accent" onClick={() => setShowAddForm(!showAddForm)} style={{ padding: "8px 18px", fontSize: "0.85rem", borderRadius: "8px" }}><Plus size={16} /> Viết Bài Mới</button>
            </div>

            {showAddForm && (
              <form onSubmit={handleAddBlogSubmit} style={{ background: "#f8fafc", padding: "24px", borderRadius: "12px", border: "1px solid rgba(13,44,84,0.06)", marginBottom: "30px" }}>
                <h4 style={{ color: "var(--primary)", marginBottom: "16px" }}>Đăng bài viết mới lên cẩm nang du lịch</h4>
                <div className="form-grid">
                  <div className="form-group"><label>Tiêu đề bài viết</label><input type="text" required placeholder="Kinh nghiệm du lịch Hàm Ninh..." value={formBlogTitle} onChange={(e) => setFormBlogTitle(e.target.value)} /></div>
                  <div className="form-group"><label>Chuyên mục</label><select value={formBlogCategory} onChange={(e) => setFormBlogCategory(e.target.value)}><option value="Cẩm Nang">Cẩm Nang</option><option value="Khám Phá">Khám Phá</option><option value="Ẩm Thực">Ẩm Thực</option></select></div>
                  <div className="form-group"><label>Tác giả</label><input type="text" value={formBlogAuthor} onChange={(e) => setFormBlogAuthor(e.target.value)} /></div>
                  <div className="form-group" style={{ gridColumn: "1 / -1" }}><label>Tóm tắt ngắn</label><input type="text" placeholder="Đoạn mô tả ngắn hiển thị ở trang bìa..." value={formBlogSummary} onChange={(e) => setFormBlogSummary(e.target.value)} /></div>
                  <div className="form-group" style={{ gridColumn: "1 / -1" }}><label>Nội dung chi tiết (Sử dụng xuống dòng để ngắt đoạn, ### cho tiêu đề con)</label><textarea required rows="8" placeholder="Nhập nội dung bài viết..." value={formBlogContent} onChange={(e) => setFormBlogContent(e.target.value)} /></div>
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "20px" }}>
                  <button type="button" className="btn btn-outline" onClick={() => setShowAddForm(false)}>Hủy</button>
                  <button type="submit" className="btn btn-primary">Đăng Bài</button>
                </div>
              </form>
            )}

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #cbd5e1", color: "var(--primary)" }}>
                    <th style={{ padding: "12px", textAlign: "left" }}>Tiêu Đề Bài Viết</th>
                    <th style={{ padding: "12px", textAlign: "left" }}>Chuyên mục</th>
                    <th style={{ padding: "12px", textAlign: "left" }}>Tác giả</th>
                    <th style={{ padding: "12px", textAlign: "left" }}>Ngày đăng</th>
                    <th style={{ padding: "12px", textAlign: "center" }}>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.map(post => (
                    <tr key={post.id} style={{ borderBottom: "1px solid #e2e8f0" }}>
                      <td style={{ padding: "12px" }}><strong>{post.title}</strong></td>
                      <td style={{ padding: "12px" }}><span className="badge" style={{ background: "var(--secondary)", color: "var(--white)" }}>{post.category}</span></td>
                      <td style={{ padding: "12px" }}>{post.author}</td>
                      <td style={{ padding: "12px" }}>{post.date}</td>
                      <td style={{ padding: "12px", textAlign: "center" }}>
                        <button type="button" onClick={() => onDeleteBlog(post.id)} style={{ background: "transparent", border: "none", color: "var(--danger)", cursor: "pointer" }}><Trash2 size={16} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: MANAGE GUIDES & AFFILIATE COMMISSIONS */}
        {activeTab === "guides" && (
          <div style={{ background: "var(--white)", borderRadius: "20px", padding: "30px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <h3 style={{ fontSize: "1.1rem", color: "var(--primary)" }}>Danh sách Hướng Dẫn Viên & Doanh Thu Affiliate</h3>
              <button className="btn btn-accent" onClick={() => setShowAddForm(!showAddForm)} style={{ padding: "8px 18px", fontSize: "0.85rem", borderRadius: "8px" }}><Plus size={16} /> Đăng Ký HDV Mới</button>
            </div>

            {showAddForm && (
              <form onSubmit={handleAddGuideSubmit} style={{ background: "#f8fafc", padding: "24px", borderRadius: "12px", border: "1px solid rgba(13,44,84,0.06)", marginBottom: "30px" }}>
                <h4 style={{ color: "var(--primary)", marginBottom: "16px" }}>Đăng ký tài khoản Hướng Dẫn Viên hệ thống</h4>
                <div className="form-grid">
                  <div className="form-group"><label>Họ và tên HDV</label><input type="text" required placeholder="Nguyễn Văn A..." value={formGuideName} onChange={(e) => setFormGuideName(e.target.value)} /></div>
                  <div className="form-group"><label>Mã giới thiệu Affiliate (Duy nhất)</label><input type="text" required placeholder="VANA5..." value={formGuideCode} onChange={(e) => setFormGuideCode(e.target.value)} /></div>
                  <div className="form-group"><label>Cấp bậc hoa hồng</label><select value={formGuideLevel} onChange={(e) => setFormGuideLevel(e.target.value)}><option value="1">Cấp 1 (Chiết khấu 10% doanh số)</option><option value="2">Cấp 2 (Chiết khấu 5% doanh số)</option></select></div>
                  <div className="form-group"><label>Số điện thoại</label><input type="text" placeholder="0909..." value={formGuidePhone} onChange={(e) => setFormGuidePhone(e.target.value)} /></div>
                  <div className="form-group" style={{ gridColumn: "1 / -1" }}><label>Thư điện tử (Email)</label><input type="email" placeholder="example@phuquoctravel.vn" value={formGuideEmail} onChange={(e) => setFormGuideEmail(e.target.value)} /></div>
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "20px" }}>
                  <button type="button" className="btn btn-outline" onClick={() => setShowAddForm(false)}>Hủy</button>
                  <button type="submit" className="btn btn-primary">Lưu HDV</button>
                </div>
              </form>
            )}

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #cbd5e1", color: "var(--primary)" }}>
                    <th style={{ padding: "12px", textAlign: "left" }}>Tên Hướng Dẫn Viên</th>
                    <th style={{ padding: "12px", textAlign: "left" }}>Mã Affiliate</th>
                    <th style={{ padding: "12px", textAlign: "left" }}>Cấp bậc</th>
                    <th style={{ padding: "12px", textAlign: "left" }}>Số đơn giới thiệu</th>
                    <th style={{ padding: "12px", textAlign: "left" }}>Tổng doanh số đem lại</th>
                    <th style={{ padding: "12px", textAlign: "left" }}>Hoa hồng hoa lợi</th>
                    <th style={{ padding: "12px", textAlign: "center" }}>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {guides.map(guide => {
                    const guideBookings = bookings.filter(b => b.referrer === guide.code);
                    const guideSales = guideBookings.reduce((acc, b) => acc + b.totalAmount, 0);
                    const guideCom = (guideSales * guide.commissionRate) / 100;
                    
                    return (
                      <tr key={guide.id} style={{ borderBottom: "1px solid #e2e8f0" }}>
                        <td style={{ padding: "12px" }}>
                          <strong>{guide.name}</strong>
                          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>SĐT: {guide.phone || "Chưa cập nhật"}</div>
                        </td>
                        <td style={{ padding: "12px" }}><code style={{ background: "#e2e8f0", padding: "2px 6px", borderRadius: "4px", fontWeight: 700 }}>{guide.code}</code></td>
                        <td style={{ padding: "12px" }}><span style={{ color: guide.level === 1 ? "#10b981" : "var(--accent)", fontWeight: 700 }}>Cấp {guide.level} ({guide.commissionRate}%)</span></td>
                        <td style={{ padding: "12px", fontWeight: 600 }}>{guideBookings.length} Đơn hàng</td>
                        <td style={{ padding: "12px", fontWeight: 600 }}>{formatPrice(guideSales)} đ</td>
                        <td style={{ padding: "12px", fontWeight: 700, color: "var(--secondary)" }}>{formatPrice(guideCom)} đ</td>
                        <td style={{ padding: "12px", textAlign: "center" }}>
                          <button type="button" className="btn btn-outline" onClick={() => alert(`Đã duyệt chi hoa hồng trị giá ${formatPrice(guideCom)} VNĐ cho HDV ${guide.name}!`)} style={{ padding: "4px 8px", fontSize: "0.75rem", borderRadius: "4px", marginRight: "8px" }} disabled={guideCom === 0}>Thanh Toán</button>
                          <button type="button" onClick={() => onDeleteGuide(guide.id)} style={{ background: "transparent", border: "none", color: "var(--danger)", cursor: "pointer" }}><Trash2 size={16} /></button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: CUSTOMER BOOKINGS LIST */}
        {activeTab === "bookings" && (
          <div style={{ background: "var(--white)", borderRadius: "20px", padding: "30px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "20px", color: "var(--primary)" }}>Danh sách các tour đã được booking</h3>
            {bookings.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>
                <p>Chưa có đơn đặt tour nào từ khách hàng gửi về.</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {bookings.map((order, idx) => (
                  <div key={idx} style={{ border: "1px solid #e2e8f0", borderRadius: "12px", overflow: "hidden" }}>
                    <div style={{ background: "#f8fafc", padding: "16px 20px", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
                      <div>
                        <strong style={{ color: "var(--primary)", fontSize: "0.95rem" }}>MÃ ĐƠN: {order.bookingId}</strong>
                        <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginLeft: "12px" }}>Ngày đặt: {order.bookingDate}</span>
                        {order.referrer && <span style={{ fontSize: "0.78rem", background: "rgba(16, 185, 129, 0.1)", color: "#10b981", padding: "3px 8px", borderRadius: "10px", marginLeft: "12px", fontWeight: 700 }}>🔗 Affiliate: {order.referrer}</span>}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <span style={{ fontSize: "0.8rem", fontWeight: 700, padding: "4px 10px", borderRadius: "20px", background: order.status === "confirmed" ? "rgba(16, 185, 129, 0.1)" : "rgba(255, 140, 66, 0.1)", color: order.status === "confirmed" ? "#10b981" : "var(--accent)" }}>
                          {order.status === "confirmed" ? "Đã Xác Nhận" : "Chờ Duyệt"}
                        </span>
                        {order.status === "pending" && (
                          <button className="btn btn-primary" onClick={() => onConfirmBooking(order.bookingId)} style={{ padding: "6px 14px", fontSize: "0.8rem", borderRadius: "6px", display: "flex", alignItems: "center", gap: "4px" }}>
                            <CheckCircle2 size={14} /> Duyệt đơn đặt
                          </button>
                        )}
                        <button 
                          type="button" 
                          className="btn btn-outline" 
                          onClick={() => handlePrintBooking(order)} 
                          style={{ padding: "6px 14px", fontSize: "0.8rem", borderRadius: "6px", display: "flex", alignItems: "center", gap: "6px", borderColor: "var(--primary)", color: "var(--primary)" }}
                        >
                          <Printer size={14} /> In / Xuất PDF
                        </button>
                      </div>
                    </div>

                    <div style={{ padding: "20px", display: "grid", gridTemplateColumns: "1.2fr 2fr", gap: "20px" }}>
                      <div style={{ borderRight: "1px solid #e2e8f0", paddingRight: "20px" }}>
                        <h4 style={{ fontSize: "0.85rem", color: "var(--primary)", textTransform: "uppercase", marginBottom: "12px" }}>Thông tin liên hệ</h4>
                        <p style={{ fontSize: "0.9rem", marginBottom: "6px" }}><strong>Khách hàng:</strong> {order.fullName}</p>
                        <p style={{ fontSize: "0.9rem", marginBottom: "6px" }}><strong>Số điện thoại:</strong> {order.phone}</p>
                        <p style={{ fontSize: "0.9rem", wordBreak: "break-all" }}><strong>Email:</strong> {order.email}</p>
                      </div>
                      <div>
                        <h4 style={{ fontSize: "0.85rem", color: "var(--primary)", textTransform: "uppercase", marginBottom: "12px" }}>Hành trình đã chọn ({order.items.length} dịch vụ)</h4>
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                          {order.items.map((item, itemIdx) => (
                            <div key={itemIdx} style={{ fontSize: "0.85rem", display: "flex", justifyContent: "space-between", alignItems: "flex-start", background: "#f8fafc", padding: "8px 12px", borderRadius: "6px" }}>
                              <div>
                                <strong style={{ color: "var(--primary)" }}>{item.tourName}</strong>
                                {!item.isCustom ? (
                                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>Khởi hành: {new Date(item.date).toLocaleDateString("vi-VN")} • {item.adults} NL, {item.children} TE</span>
                                ) : (
                                  <span style={{ fontSize: "0.75rem", color: "var(--secondary)", display: "block" }}>Lịch trình gồm: {item.customItems?.map(c => c.name.split(" ")[0]).join(", ")}</span>
                                )}
                              </div>
                              <span style={{ fontWeight: 700, color: "var(--secondary)" }}>{formatPrice(item.totalPrice)} đ</span>
                            </div>
                          ))}
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #cbd5e1", marginTop: "16px", paddingTop: "12px" }}>
                          <strong style={{ fontSize: "0.9rem", color: "var(--primary)" }}>TỔNG CỘNG THANH TOÁN:</strong>
                          <strong style={{ fontSize: "1.25rem", color: "var(--secondary)" }}>{formatPrice(order.totalAmount)} đ</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
      {/* REALTIME FLIGHT SYNC OVERLAY STATUS MODAL */}
      {isSyncing && (
        <div className="modal-overlay open" style={{ zIndex: 3000, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(8px)" }}>
          <div className="portal-login-card animate-fade-in" style={{ maxWidth: "480px", width: "100%", padding: "40px", textAlign: "center" }}>
            <div className="animate-spin-slow" style={{ display: "inline-block", border: "4px solid rgba(2, 128, 144, 0.1)", borderTop: "4px solid var(--secondary)", borderRadius: "50%", width: "64px", height: "64px", marginBottom: "24px" }} />
            
            <h3 style={{ color: "var(--primary)", fontSize: "1.25rem", fontWeight: 800, marginBottom: "8px" }}>
              Đang Đồng Bộ Vé Máy Bay
            </h3>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "30px" }}>
              Hệ thống đang kết nối trực tiếp với API Skyscanner & GDS Hãng hàng không...
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px", textAlign: "left", background: "#f8fafc", padding: "20px", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.03)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.82rem", color: syncStep >= 1 ? "var(--primary)" : "var(--text-muted)", fontWeight: syncStep >= 1 ? 700 : 500 }}>
                <span style={{ fontSize: "1rem" }}>{syncStep > 1 ? "✅" : syncStep === 1 ? "🔄" : "⏳"}</span>
                <span>Kết nối Cổng GDS Amadeus & Skyscanner API...</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.82rem", color: syncStep >= 2 ? "var(--primary)" : "var(--text-muted)", fontWeight: syncStep >= 2 ? 700 : 500 }}>
                <span style={{ fontSize: "1rem" }}>{syncStep > 2 ? "✅" : syncStep === 2 ? "🔄" : "⏳"}</span>
                <span>Quét lịch trình bay Phú Quốc khứ hồi...</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.82rem", color: syncStep >= 3 ? "var(--primary)" : "var(--text-muted)", fontWeight: syncStep >= 3 ? 700 : 500 }}>
                <span style={{ fontSize: "1rem" }}>{syncStep > 3 ? "✅" : syncStep === 3 ? "🔄" : "⏳"}</span>
                <span>Phân tích biến động giá vé thời gian thực...</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.82rem", color: syncStep >= 4 ? "var(--primary)" : "var(--text-muted)", fontWeight: syncStep >= 4 ? 700 : 500 }}>
                <span style={{ fontSize: "1rem" }}>{syncStep > 4 ? "✅" : syncStep === 4 ? "🔄" : "⏳"}</span>
                <span>Đồng bộ 5 chuyến bay vào cơ sở dữ liệu...</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
