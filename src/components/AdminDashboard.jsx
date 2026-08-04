import React, { useState } from "react";
import { 
  Database, ShoppingBag, Plus, Trash2, CheckCircle2, X, ArrowLeft, 
  BarChart2, Shield, Users, FileText, Compass, DollarSign, Award, 
  Edit, Printer, ChevronDown, ChevronUp, Bell, Mail, Settings, 
  Globe, LogOut, FileCode, Check 
} from "lucide-react";

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
  const [activeTab, setActiveTab] = useState("dashboard"); // 'dashboard' | 'services' | 'bookings' | 'tours' | 'blogs' | 'guides'
  const [serviceCategory, setServiceCategory] = useState("hotel");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Submenu states
  const [openSubmenu, setOpenSubmenu] = useState({
    booking_services: false,
    cms_blogs: false,
    website_setup: false
  });

  const toggleSubmenu = (menuKey) => {
    setOpenSubmenu(prev => ({
      ...prev,
      [menuKey]: !prev[menuKey]
    }));
  };

  // --- FORM STATES ---
  const [formServiceImage, setFormServiceImage] = useState("");
  const [formServiceVideo, setFormServiceVideo] = useState("");
  const [formServiceYoutube, setFormServiceYoutube] = useState("");

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

  const [formTourName, setFormTourName] = useState("");
  const [formTourPrice, setFormTourPrice] = useState("");
  const [formTourDuration, setFormTourDuration] = useState("1 ngày");
  const [formTourDesc, setFormTourDesc] = useState("");
  const [formTourTransport, setFormTourTransport] = useState("Cano cao tốc");
  const [formTourMeals, setFormTourMeals] = useState("Hải sản nướng tám món");
  const [formTourStops, setFormTourStops] = useState("Hòn Móng Tay, Hòn Mây Rút");
  const [formTourImage, setFormTourImage] = useState("tour_4_islands.jpg");

  const [formBlogTitle, setFormBlogTitle] = useState("");
  const [formBlogCategory, setFormBlogCategory] = useState("Cẩm Nang");
  const [formBlogSummary, setFormBlogSummary] = useState("");
  const [formBlogContent, setFormBlogContent] = useState("");
  const [formBlogAuthor, setFormBlogAuthor] = useState("Admin");

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

    if (serviceCategory === "hotel") {
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

    if (formServiceImage.trim()) newItem.image = formServiceImage.trim();
    if (formServiceVideo.trim()) newItem.video = formServiceVideo.trim();
    if (formServiceYoutube.trim()) newItem.youtube = formServiceYoutube.trim();

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

    if (serviceCategory === "hotel") {
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
            .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #6440FB; padding-bottom: 20px; margin-bottom: 30px; }
            .company-info h1 { margin: 0; color: #0d2c54; font-size: 24px; font-weight: 800; }
            .company-info p { margin: 4px 0 0; color: #64748b; font-size: 13px; }
            .invoice-meta { text-align: right; font-size: 13px; color: #475569; }
            .invoice-meta h2 { margin: 0 0 8px; color: #6440FB; font-size: 20px; font-weight: 700; text-transform: uppercase; }
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
                      <td style="text-align: right; font-weight: 700; color: #6440FB;">
                        ${new Intl.NumberFormat("vi-VN").format(item.totalPrice)} đ
                      </td>
                    </tr>
                  `).join("")}
                  <tr class="total-row">
                    <td colspan="2" style="text-align: right;">TỔNG CỘNG THANH TOÁN:</td>
                    <td style="text-align: right; color: #FFAA0D;">
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
    setFormGuideName("");
    setFormGuideCode("");
    setFormGuidePhone("");
    setFormGuideEmail("");
  };

  // Compute revenue & stats
  const totalRevenue = bookings ? bookings.reduce((acc, b) => acc + b.totalAmount, 0) : 0;
  const adminEarnings = totalRevenue * 0.1; // 10%
  const sellerEarnings = totalRevenue * 0.9; // 90%
  const totalSold = bookings ? bookings.length : 0;

  const mockTriggerAlert = (title) => {
    alert(`[Tourex Demo] Tính năng "${title}" đang được cấu hình. Bản demo sử dụng bộ lưu trữ LocalStorage cho toàn bộ dữ liệu CRUD.`);
  };

  return (
    <div className="tourex-admin-layout">
      {/* 1. TOUREX SIDEBAR PANEL */}
      <aside className="tourex-sidebar">
        <div className="tourex-sidebar-logo">
          <h3>TOUREX <span>ADMIN</span></h3>
          <div style={{ background: "var(--tourex-primary-light)", padding: "4px 8px", borderRadius: "8px", fontSize: "0.68rem", fontWeight: 700, color: "var(--tourex-primary)" }}>
            v3.0.0
          </div>
        </div>

        <div className="tourex-sidebar-menu">
          <span className="tourex-menu-title">Main Dashboard</span>
          <div 
            className={`tourex-menu-item ${activeTab === "dashboard" ? "active" : ""}`}
            onClick={() => { setActiveTab("dashboard"); setShowAddForm(false); }}
          >
            <BarChart2 className="tourex-menu-icon" size={18} />
            <span>Dashboard</span>
          </div>

          <span className="tourex-menu-title">Booking Services</span>
          <div 
            className={`tourex-menu-item ${activeTab === "services" ? "active" : ""}`}
            onClick={() => { toggleSubmenu("booking_services"); }}
          >
            <Database className="tourex-menu-icon" size={18} />
            <span style={{ flexGrow: 1 }}>Booking Services</span>
            {openSubmenu.booking_services ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </div>
          {openSubmenu.booking_services && (
            <div className="tourex-submenu-wrapper">
              <div 
                className={`tourex-submenu-item ${activeTab === "services" && serviceCategory === "hotel" ? "active" : ""}`}
                onClick={() => { setActiveTab("services"); setServiceCategory("hotel"); setShowAddForm(false); setEditingItem(null); resetFormFields(); }}
              >
                🏨 Airbnb Chỗ Ở
              </div>
              <div 
                className={`tourex-submenu-item ${activeTab === "services" && serviceCategory === "dining" ? "active" : ""}`}
                onClick={() => { setActiveTab("services"); setServiceCategory("dining"); setShowAddForm(false); setEditingItem(null); resetFormFields(); }}
              >
                🍽️ Nhà Hàng Ăn Uống
              </div>
              <div className="tourex-submenu-item" onClick={() => mockTriggerAlert("Booking Service Types")}>
                ⚙️ Service Types
              </div>
              <div className="tourex-submenu-item" onClick={() => mockTriggerAlert("Amenities Management")}>
                ✨ Amenities List
              </div>
            </div>
          )}

          <div 
            className={`tourex-menu-item ${activeTab === "tours" ? "active" : ""}`}
            onClick={() => { setActiveTab("tours"); setShowAddForm(false); }}
          >
            <Compass className="tourex-menu-icon" size={18} />
            <span>Destinations & Tours</span>
          </div>

          <div 
            className={`tourex-menu-item ${activeTab === "bookings" ? "active" : ""}`}
            onClick={() => { setActiveTab("bookings"); setShowAddForm(false); }}
          >
            <ShoppingBag className="tourex-menu-icon" size={18} />
            <span style={{ flexGrow: 1 }}>Manage Orders</span>
            {bookings.filter(b => b.status === "pending").length > 0 && (
              <span style={{ background: "#FFAA0D", color: "#fff", fontSize: "0.65rem", padding: "2px 6px", borderRadius: "10px", fontWeight: 700 }}>
                {bookings.filter(b => b.status === "pending").length}
              </span>
            )}
          </div>

          <div 
            className={`tourex-menu-item ${activeTab === "guides" ? "active" : ""}`}
            onClick={() => { setActiveTab("guides"); setShowAddForm(false); }}
          >
            <Users className="tourex-menu-icon" size={18} />
            <span>Agency & Guides</span>
          </div>

          <span className="tourex-menu-title">CMS & blogs</span>
          <div 
            className={`tourex-menu-item ${activeTab === "blogs" ? "active" : ""}`}
            onClick={() => { toggleSubmenu("cms_blogs"); }}
          >
            <FileText className="tourex-menu-icon" size={18} />
            <span style={{ flexGrow: 1 }}>CMS & Blogs</span>
            {openSubmenu.cms_blogs ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </div>
          {openSubmenu.cms_blogs && (
            <div className="tourex-submenu-wrapper">
              <div 
                className={`tourex-submenu-item ${activeTab === "blogs" ? "active" : ""}`}
                onClick={() => { setActiveTab("blogs"); setShowAddForm(false); }}
              >
                📝 Blog List
              </div>
              <div className="tourex-submenu-item" onClick={() => mockTriggerAlert("Create Blog Category")}>
                🏷️ Blog Categories
              </div>
              <div className="tourex-submenu-item" onClick={() => mockTriggerAlert("Comment Moderator")}>
                💬 User Comments
              </div>
            </div>
          )}

          <span className="tourex-menu-title">Setup & Settings</span>
          <div 
            className="tourex-menu-item"
            onClick={() => { toggleSubmenu("website_setup"); }}
          >
            <Settings className="tourex-menu-icon" size={18} />
            <span style={{ flexGrow: 1 }}>Website Setup</span>
            {openSubmenu.website_setup ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </div>
          {openSubmenu.website_setup && (
            <div className="tourex-submenu-wrapper">
              <div className="tourex-submenu-item" onClick={() => mockTriggerAlert("Cookie Consent Settings")}>🍪 Cookie Consent</div>
              <div className="tourex-submenu-item" onClick={() => mockTriggerAlert("Maintenance mode toggle")}>🚧 Maintenance Mode</div>
              <div className="tourex-submenu-item" onClick={() => mockTriggerAlert("Theme settings editor")}>🎨 Color Theme Swapper</div>
            </div>
          )}

          <div className="tourex-menu-item" onClick={() => mockTriggerAlert("SEO Setup Panel")}>
            <Globe className="tourex-menu-icon" size={18} />
            <span>SEO Setup</span>
          </div>

          <div className="tourex-menu-item" onClick={() => mockTriggerAlert("Payment Gateway setup")}>
            <DollarSign className="tourex-menu-icon" size={18} />
            <span>Payment Method</span>
          </div>

          <span className="tourex-menu-title">Account</span>
          <div className="tourex-menu-item" onClick={onCloseAdmin} style={{ color: "var(--tourex-primary)" }}>
            <ArrowLeft className="tourex-menu-icon" size={18} />
            <span>Quay Lại Website</span>
          </div>
        </div>
      </aside>

      {/* 2. TOUREX MAIN CONTENT AREA */}
      <main className="tourex-main">
        {/* Sticky Header Bar */}
        <header className="tourex-header">
          <div className="tourex-header-left">
            <h3>
              {activeTab === "dashboard" && "Dashboard"}
              {activeTab === "services" && "Manage Booking Services"}
              {activeTab === "tours" && "Manage Destinations & Tours"}
              {activeTab === "bookings" && "Manage Orders & Bookings"}
              {activeTab === "guides" && "Manage Guides & Affiliate"}
              {activeTab === "blogs" && "CMS Manage Blogs"}
            </h3>
            <p>
              Dashboard &gt;&gt; {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </p>
          </div>

          <div className="tourex-header-right">
            <button 
              className="btn btn-outline" 
              onClick={onCloseAdmin} 
              style={{ color: "var(--tourex-primary)", borderColor: "var(--tourex-primary)", padding: "6px 14px", fontSize: "0.8rem", borderRadius: "8px", display: "flex", alignItems: "center", gap: "6px" }}
            >
              <Globe size={14} /> Xem Website
            </button>

            <div style={{ position: "relative", cursor: "pointer" }} onClick={() => mockTriggerAlert("Hộp thư đến")}>
              <Mail size={20} style={{ color: "var(--tourex-text-slate)" }} />
              <span style={{ position: "absolute", top: "-5px", right: "-5px", background: "red", width: "8px", height: "8px", borderRadius: "50%" }} />
            </div>

            <div style={{ position: "relative", cursor: "pointer" }} onClick={() => mockTriggerAlert("Thông báo hệ thống")}>
              <Bell size={20} style={{ color: "var(--tourex-text-slate)" }} />
              <span style={{ position: "absolute", top: "-5px", right: "-5px", background: "var(--tourex-primary)", width: "8px", height: "8px", borderRadius: "50%" }} />
            </div>

            <div style={{ width: "1px", height: "30px", backgroundColor: "rgba(100, 64, 251, 0.15)", margin: "0 8px" }} />

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "38px", height: "38px", borderRadius: "50%", background: "var(--tourex-primary)", color: "#fff", display: "flex", alignItems: "center", justifycontent: "center", fontWeight: 800, fontSize: "0.9rem" }}>
                AD
              </div>
              <div style={{ display: "flex", flexDirection: "column", textAlign: "left", fontSize: "0.8rem" }}>
                <strong style={{ color: "var(--tourex-text-navy)" }}>Administrator</strong>
                <span style={{ color: "var(--tourex-text-slate)", fontSize: "0.7rem" }}>Super Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Inner Scroll Body */}
        <div className="tourex-content-body">
          
          {/* TAB 0: DASHBOARD OVERVIEW (STATISTICS & CHARTS) */}
          {activeTab === "dashboard" && (
            <div>
              {/* KPI Cards Row */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px", marginBottom: "30px" }}>
                <div className="tourex-kpi-card">
                  <div className="tourex-kpi-icon-wrapper" style={{ background: "rgba(100, 64, 251, 0.08)", color: "var(--tourex-primary)" }}>
                    <DollarSign size={22} />
                  </div>
                  <div className="tourex-kpi-content">
                    <span className="tourex-kpi-title">Total Sale</span>
                    <strong className="tourex-kpi-value">{formatPrice(totalRevenue)} đ</strong>
                  </div>
                </div>

                <div className="tourex-kpi-card">
                  <div className="tourex-kpi-icon-wrapper" style={{ background: "rgba(16, 185, 129, 0.08)", color: "#10b981" }}>
                    <Award size={22} />
                  </div>
                  <div className="tourex-kpi-content">
                    <span className="tourex-kpi-title">Admin Earnings (10%)</span>
                    <strong className="tourex-kpi-value">{formatPrice(adminEarnings)} đ</strong>
                  </div>
                </div>

                <div className="tourex-kpi-card">
                  <div className="tourex-kpi-icon-wrapper" style={{ background: "rgba(255, 170, 13, 0.08)", color: "#FFAA0D" }}>
                    <Users size={22} />
                  </div>
                  <div className="tourex-kpi-content">
                    <span className="tourex-kpi-title">Agency Earnings (90%)</span>
                    <strong className="tourex-kpi-value">{formatPrice(sellerEarnings)} đ</strong>
                  </div>
                </div>

                <div className="tourex-kpi-card">
                  <div className="tourex-kpi-icon-wrapper" style={{ background: "rgba(59, 130, 246, 0.08)", color: "#3b82f6" }}>
                    <ShoppingBag size={22} />
                  </div>
                  <div className="tourex-kpi-content">
                    <span className="tourex-kpi-title">Total Sold</span>
                    <strong className="tourex-kpi-value">{totalSold} Tours</strong>
                  </div>
                </div>
              </div>

              {/* Statistics Chart (Custom SVG Line Area Chart) */}
              <div className="tourex-card-panel">
                <h4 style={{ fontSize: "1.05rem", fontWeight: 800, margin: 0, color: "var(--tourex-text-navy)" }}>
                  Booking Statistics (Monthly)
                </h4>
                <p style={{ fontSize: "0.76rem", color: "var(--tourex-text-slate)", margin: "4px 0 20px" }}>
                  Visual analytics of guest bookings and registration patterns
                </p>

                <div className="tourex-stat-canvas" style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                  {/* SVG Chart */}
                  <svg viewBox="0 0 800 220" style={{ width: "100%", height: "200px" }}>
                    <defs>
                      <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6440FB" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#6440FB" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Grid lines */}
                    <line x1="0" y1="40" x2="800" y2="40" stroke="rgba(100, 64, 251, 0.06)" strokeWidth="1" />
                    <line x1="0" y1="90" x2="800" y2="90" stroke="rgba(100, 64, 251, 0.06)" strokeWidth="1" />
                    <line x1="0" y1="140" x2="800" y2="140" stroke="rgba(100, 64, 251, 0.06)" strokeWidth="1" />

                    {/* Area path */}
                    <path 
                      d="M 50 180 L 150 140 L 250 160 L 350 90 L 450 110 L 550 50 L 650 80 L 750 30 L 750 180 Z" 
                      fill="url(#chartGrad)" 
                    />

                    {/* Stroke line */}
                    <path 
                      d="M 50 180 L 150 140 L 250 160 L 350 90 L 450 110 L 550 50 L 650 80 L 750 30" 
                      fill="none" 
                      stroke="var(--tourex-primary)" 
                      strokeWidth="3.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                    />

                    {/* Data dots */}
                    <circle cx="50" cy="180" r="5" fill="#ffffff" stroke="var(--tourex-primary)" strokeWidth="3" />
                    <circle cx="150" cy="140" r="5" fill="#ffffff" stroke="var(--tourex-primary)" strokeWidth="3" />
                    <circle cx="250" cy="160" r="5" fill="#ffffff" stroke="var(--tourex-primary)" strokeWidth="3" />
                    <circle cx="350" cy="90" r="5" fill="#ffffff" stroke="var(--tourex-primary)" strokeWidth="3" />
                    <circle cx="450" cy="110" r="5" fill="#ffffff" stroke="var(--tourex-primary)" strokeWidth="3" />
                    <circle cx="550" cy="50" r="5" fill="#ffffff" stroke="var(--tourex-primary)" strokeWidth="3" />
                    <circle cx="650" cy="80" r="5" fill="#ffffff" stroke="var(--tourex-primary)" strokeWidth="3" />
                    <circle cx="750" cy="30" r="5" fill="#ffffff" stroke="var(--tourex-primary)" strokeWidth="3" />

                    {/* Text values */}
                    <text x="45" y="198" fill="var(--tourex-text-slate)" fontSize="10" fontWeight="600">Jan</text>
                    <text x="145" y="198" fill="var(--tourex-text-slate)" fontSize="10" fontWeight="600">Feb</text>
                    <text x="245" y="198" fill="var(--tourex-text-slate)" fontSize="10" fontWeight="600">Mar</text>
                    <text x="345" y="198" fill="var(--tourex-text-slate)" fontSize="10" fontWeight="600">Apr</text>
                    <text x="445" y="198" fill="var(--tourex-text-slate)" fontSize="10" fontWeight="600">May</text>
                    <text x="545" y="198" fill="var(--tourex-text-slate)" fontSize="10" fontWeight="600">Jun</text>
                    <text x="645" y="198" fill="var(--tourex-text-slate)" fontSize="10" fontWeight="600">Jul</text>
                    <text x="745" y="198" fill="var(--tourex-text-slate)" fontSize="10" fontWeight="600">Aug</text>
                  </svg>
                </div>
              </div>

              {/* Latest Bookings Table */}
              <div className="tourex-card-panel">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                  <h4 style={{ fontSize: "1.05rem", fontWeight: 800, margin: 0 }}>Latest Bookings</h4>
                  <button className="btn btn-outline" onClick={() => setActiveTab("bookings")} style={{ padding: "4px 12px", fontSize: "0.75rem" }}>
                    View All Bookings
                  </button>
                </div>

                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
                    <thead>
                      <tr style={{ borderBottom: "2px solid rgba(100, 64, 251, 0.08)", color: "var(--tourex-primary)" }}>
                        <th style={{ padding: "12px", textAlign: "left" }}>Booking Code</th>
                        <th style={{ padding: "12px", textAlign: "left" }}>Customer</th>
                        <th style={{ padding: "12px", textAlign: "left" }}>Booking Date</th>
                        <th style={{ padding: "12px", textAlign: "left" }}>Total Amount</th>
                        <th style={{ padding: "12px", textAlign: "left" }}>Status</th>
                        <th style={{ padding: "12px", textAlign: "center" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.length === 0 ? (
                        <tr>
                          <td colSpan="6" style={{ padding: "24px", textAlign: "center", color: "var(--tourex-text-slate)" }}>
                            No bookings found.
                          </td>
                        </tr>
                      ) : (
                        bookings.slice(0, 5).map((order) => (
                          <tr key={order.bookingId} style={{ borderBottom: "1px solid rgba(100, 64, 251, 0.05)" }}>
                            <td style={{ padding: "12px" }}><strong>#{order.bookingId}</strong></td>
                            <td style={{ padding: "12px" }}>
                              <strong>{order.fullName}</strong>
                              <div style={{ fontSize: "0.75rem", color: "var(--tourex-text-slate)" }}>{order.phone}</div>
                            </td>
                            <td style={{ padding: "12px" }}>{order.bookingDate}</td>
                            <td style={{ padding: "12px", fontWeight: 700, color: "var(--tourex-primary)" }}>{formatPrice(order.totalAmount)} đ</td>
                            <td style={{ padding: "12px" }}>
                              <span style={{ 
                                padding: "4px 8px", 
                                borderRadius: "20px", 
                                fontSize: "0.75rem", 
                                fontWeight: 700, 
                                background: order.status === "confirmed" ? "rgba(16, 185, 129, 0.08)" : "rgba(255, 170, 13, 0.08)", 
                                color: order.status === "confirmed" ? "#10b981" : "#FFAA0D" 
                              }}>
                                {order.status === "confirmed" ? "Confirmed" : "Pending"}
                              </span>
                            </td>
                            <td style={{ padding: "12px", textAlign: "center" }}>
                              <button 
                                className="btn btn-outline" 
                                onClick={() => setActiveTab("bookings")}
                                style={{ padding: "4px 8px", fontSize: "0.7rem", display: "inline-flex", gap: "4px" }}
                              >
                                Manage
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 1: MANAGE BUILDER SERVICES */}
          {activeTab === "services" && (
            <div className="tourex-card-panel">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px", marginBottom: "24px" }}>
                <div style={{ display: "flex", gap: "8px", overflowX: "auto" }}>
                  <button className={`filter-btn ${serviceCategory === "hotel" ? "active" : ""}`} onClick={() => { setServiceCategory("hotel"); setShowAddForm(false); setEditingItem(null); resetFormFields(); }}>🏨 Airbnb (Chỗ Ở)</button>
                  <button className={`filter-btn ${serviceCategory === "dining" ? "active" : ""}`} onClick={() => { setServiceCategory("dining"); setShowAddForm(false); setEditingItem(null); resetFormFields(); }}>🍽️ Ăn Uống (Nhà Hàng)</button>
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button className="btn btn-accent" style={{ background: "var(--tourex-primary)", border: "none" }} onClick={() => { setShowAddForm(!showAddForm); setEditingItem(null); resetFormFields(); }}><Plus size={16} /> Đăng Ký Mới</button>
                </div>
              </div>

              {showAddForm && (
                <form onSubmit={handleAddServiceSubmit} style={{ background: "#f8fafc", padding: "24px", borderRadius: "12px", border: "1px solid rgba(100, 64, 251, 0.06)", marginBottom: "30px" }}>
                  <h4 style={{ color: "var(--tourex-primary)", marginBottom: "16px", fontWeight: 800 }}>{editingItem ? "Cập nhật dịch vụ" : "Thêm dịch vụ"} {serviceCategory === "hotel" ? "Airbnb Chỗ Ở" : "Ăn Uống"} {editingItem ? "" : "mới"}</h4>
                  
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

                  <h5 style={{ color: "var(--tourex-primary)", marginTop: "24px", marginBottom: "12px", borderTop: "1px dashed rgba(100, 64, 251, 0.1)", paddingTop: "16px", fontWeight: 700 }}>
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
                    <button type="submit" className="btn btn-primary" style={{ background: "var(--tourex-primary)" }}>{editingItem ? "Cập Nhật" : "Lưu Lại"}</button>
                  </div>
                </form>
              )}

              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid rgba(100, 64, 251, 0.08)", color: "var(--tourex-primary)" }}>
                      <th style={{ padding: "12px", textAlign: "left" }}>Tên dịch vụ</th>
                      {serviceCategory === "hotel" && <th style={{ padding: "12px", textAlign: "left" }}>Chủ nhà (Host)</th>}
                      {serviceCategory === "hotel" && <th style={{ padding: "12px", textAlign: "left" }}>Khu vực</th>}
                      {serviceCategory === "dining" && <th style={{ padding: "12px", textAlign: "left" }}>Địa chỉ</th>}
                      <th style={{ padding: "12px", textAlign: "left" }}>Giá tiền</th>
                      <th style={{ padding: "12px", textAlign: "center" }}>Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {db[serviceCategory].map(item => (
                      <tr key={item.id} style={{ borderBottom: "1px solid rgba(100, 64, 251, 0.05)" }}>
                        <td style={{ padding: "12px" }}>
                          <strong>{item.name}</strong>
                          <div style={{ display: "flex", gap: "6px", marginTop: "4px" }}>
                            {item.image && <span style={{ fontSize: "0.68rem", background: "rgba(16,185,129,0.08)", color: "#10b981", padding: "2px 4px", borderRadius: "3px", fontWeight: 600 }}>🖼️ Ảnh</span>}
                            {item.video && <span style={{ fontSize: "0.68rem", background: "rgba(59,130,246,0.08)", color: "#3b82f6", padding: "2px 4px", borderRadius: "3px", fontWeight: 600 }}>🎥 Video</span>}
                            {item.youtube && <span style={{ fontSize: "0.68rem", background: "rgba(239,68,68,0.08)", color: "#ef4444", padding: "2px 4px", borderRadius: "3px", fontWeight: 600 }}>▶️ YouTube</span>}
                          </div>
                        </td>
                        {serviceCategory === "hotel" && <td style={{ padding: "12px" }}>{item.host}</td>}
                        {serviceCategory === "hotel" && <td style={{ padding: "12px" }}>{item.address}</td>}
                        {serviceCategory === "dining" && <td style={{ padding: "12px" }}>{item.address}</td>}
                        <td style={{ padding: "12px", fontWeight: 700, color: "var(--tourex-primary)" }}>{formatPrice(item.price)} đ</td>
                        <td style={{ padding: "12px", textAlign: "center" }}>
                          <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                            <button type="button" onClick={() => handleEditClick(item)} style={{ background: "transparent", border: "none", color: "#FFAA0D", cursor: "pointer" }} title="Sửa dịch vụ"><Edit size={16} /></button>
                            <button type="button" onClick={() => onDeleteItem(serviceCategory, item.id)} style={{ background: "transparent", border: "none", color: "red", cursor: "pointer" }} title="Xóa dịch vụ"><Trash2 size={16} /></button>
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
            <div className="tourex-card-panel">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                <h3 style={{ fontSize: "1.1rem", color: "var(--tourex-text-navy)", fontWeight: 800 }}>Danh sách Gói Tour Hiển Thị Trang Chủ</h3>
                <button className="btn btn-accent" style={{ background: "var(--tourex-primary)", border: "none", padding: "8px 18px", fontSize: "0.85rem", borderRadius: "8px" }} onClick={() => setShowAddForm(!showAddForm)}><Plus size={16} /> Tạo Tour Mới</button>
              </div>

              {showAddForm && (
                <form onSubmit={handleAddTourSubmit} style={{ background: "#f8fafc", padding: "24px", borderRadius: "12px", border: "1px solid rgba(100, 64, 251, 0.06)", marginBottom: "30px" }}>
                  <h4 style={{ color: "var(--tourex-primary)", marginBottom: "16px", fontWeight: 800 }}>Thông tin tour du lịch Phú Quốc mới</h4>
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
                    <button type="submit" className="btn btn-primary" style={{ background: "var(--tourex-primary)" }}>Đăng Tour</button>
                  </div>
                </form>
              )}

              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid rgba(100, 64, 251, 0.08)", color: "var(--tourex-primary)" }}>
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
                      <tr key={tour.id} style={{ borderBottom: "1px solid rgba(100, 64, 251, 0.05)" }}>
                        <td style={{ padding: "12px" }}><strong>{tour.name}</strong></td>
                        <td style={{ padding: "12px" }}>{tour.duration}</td>
                        <td style={{ padding: "12px" }}>{tour.transportation}</td>
                        <td style={{ padding: "12px", fontSize: "0.75rem", color: "var(--tourex-text-slate)", maxWidth: "250px" }}>{tour.meals?.join(", ")}</td>
                        <td style={{ padding: "12px", fontWeight: 700, color: "var(--tourex-primary)" }}>{formatPrice(tour.price)} đ</td>
                        <td style={{ padding: "12px", textAlign: "center" }}>
                          <button type="button" onClick={() => onDeleteTour(tour.id)} style={{ background: "transparent", border: "none", color: "red", cursor: "pointer" }}><Trash2 size={16} /></button>
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
            <div className="tourex-card-panel">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                <h3 style={{ fontSize: "1.1rem", color: "var(--tourex-text-navy)", fontWeight: 800 }}>Quản lý Bài Viết Cẩm Nang Du Lịch</h3>
                <button className="btn btn-accent" style={{ background: "var(--tourex-primary)", border: "none", padding: "8px 18px", fontSize: "0.85rem", borderRadius: "8px" }} onClick={() => setShowAddForm(!showAddForm)}><Plus size={16} /> Viết Bài Mới</button>
              </div>

              {showAddForm && (
                <form onSubmit={handleAddBlogSubmit} style={{ background: "#f8fafc", padding: "24px", borderRadius: "12px", border: "1px solid rgba(100, 64, 251, 0.06)", marginBottom: "30px" }}>
                  <h4 style={{ color: "var(--tourex-primary)", marginBottom: "16px", fontWeight: 800 }}>Đăng bài viết mới lên cẩm nang du lịch</h4>
                  <div className="form-grid">
                    <div className="form-group"><label>Tiêu đề bài viết</label><input type="text" required placeholder="Kinh nghiệm du lịch Hàm Ninh..." value={formBlogTitle} onChange={(e) => setFormBlogTitle(e.target.value)} /></div>
                    <div className="form-group"><label>Chuyên mục</label><select value={formBlogCategory} onChange={(e) => setFormBlogCategory(e.target.value)}><option value="Cẩm Nang">Cẩm Nang (Travel Tips)</option><option value="Khám Phá">Khám Phá (Discovery)</option><option value="Ẩm Thực">Ẩm Thực (Food & Dining)</option></select></div>
                    <div className="form-group" style={{ gridColumn: "1 / -1" }}><label>Mô tả tóm tắt ngắn</label><input type="text" placeholder="Tóm tắt nội dung chính hiển thị ở trang chủ..." value={formBlogSummary} onChange={(e) => setFormBlogSummary(e.target.value)} /></div>
                    <div className="form-group" style={{ gridColumn: "1 / -1" }}><label>Nội dung chi tiết bài viết (Hỗ trợ Markdown ### tiêu đề)</label><textarea required rows="6" placeholder="Viết nội dung bài viết..." value={formBlogContent} onChange={(e) => setFormBlogContent(e.target.value)} /></div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "20px" }}>
                    <button type="button" className="btn btn-outline" onClick={() => setShowAddForm(false)}>Hủy</button>
                    <button type="submit" className="btn btn-primary" style={{ background: "var(--tourex-primary)" }}>Đăng Bài Viết</button>
                  </div>
                </form>
              )}

              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid rgba(100, 64, 251, 0.08)", color: "var(--tourex-primary)" }}>
                      <th style={{ padding: "12px", textAlign: "left" }}>Tiêu đề bài viết</th>
                      <th style={{ padding: "12px", textAlign: "left" }}>Chuyên mục</th>
                      <th style={{ padding: "12px", textAlign: "left" }}>Tác giả</th>
                      <th style={{ padding: "12px", textAlign: "left" }}>Ngày đăng</th>
                      <th style={{ padding: "12px", textAlign: "center" }}>Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blogs.map(post => (
                      <tr key={post.id} style={{ borderBottom: "1px solid rgba(100, 64, 251, 0.05)" }}>
                        <td style={{ padding: "12px" }}><strong>{post.title}</strong></td>
                        <td style={{ padding: "12px" }}><span className="badge" style={{ background: "var(--tourex-primary-light)", color: "var(--tourex-primary)" }}>{post.category}</span></td>
                        <td style={{ padding: "12px" }}>{post.author}</td>
                        <td style={{ padding: "12px" }}>{post.date}</td>
                        <td style={{ padding: "12px", textAlign: "center" }}>
                          <button type="button" onClick={() => onDeleteBlog(post.id)} style={{ background: "transparent", border: "none", color: "red", cursor: "pointer" }}><Trash2 size={16} /></button>
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
            <div className="tourex-card-panel">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                <h3 style={{ fontSize: "1.1rem", color: "var(--tourex-text-navy)", fontWeight: 800 }}>Đại Lý, Hướng Dẫn Viên & Doanh Thu Affiliate</h3>
                <button className="btn btn-accent" style={{ background: "var(--tourex-primary)", border: "none", padding: "8px 18px", fontSize: "0.85rem", borderRadius: "8px" }} onClick={() => setShowAddForm(!showAddForm)}><Plus size={16} /> Đăng Ký HDV Mới</button>
              </div>

              {showAddForm && (
                <form onSubmit={handleAddGuideSubmit} style={{ background: "#f8fafc", padding: "24px", borderRadius: "12px", border: "1px solid rgba(100, 64, 251, 0.06)", marginBottom: "30px" }}>
                  <h4 style={{ color: "var(--tourex-primary)", marginBottom: "16px", fontWeight: 800 }}>Đăng ký tài khoản Hướng Dẫn Viên hệ thống</h4>
                  <div className="form-grid">
                    <div className="form-group"><label>Họ và tên HDV</label><input type="text" required placeholder="Nguyễn Văn A..." value={formGuideName} onChange={(e) => setFormGuideName(e.target.value)} /></div>
                    <div className="form-group"><label>Mã giới thiệu Affiliate (Duy nhất)</label><input type="text" required placeholder="VANA5..." value={formGuideCode} onChange={(e) => setFormGuideCode(e.target.value)} /></div>
                    <div className="form-group"><label>Cấp bậc hoa hồng</label><select value={formGuideLevel} onChange={(e) => setFormGuideLevel(e.target.value)}><option value="1">Cấp 1 (Chiết khấu 10% doanh số)</option><option value="2">Cấp 2 (Chiết khấu 5% doanh số)</option></select></div>
                    <div className="form-group"><label>Số điện thoại</label><input type="text" placeholder="0909..." value={formGuidePhone} onChange={(e) => setFormGuidePhone(e.target.value)} /></div>
                    <div className="form-group" style={{ gridColumn: "1 / -1" }}><label>Thư điện tử (Email)</label><input type="email" placeholder="example@phuquoctravel.vn" value={formGuideEmail} onChange={(e) => setFormGuideEmail(e.target.value)} /></div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "20px" }}>
                    <button type="button" className="btn btn-outline" onClick={() => setShowAddForm(false)}>Hủy</button>
                    <button type="submit" className="btn btn-primary" style={{ background: "var(--tourex-primary)" }}>Lưu HDV</button>
                  </div>
                </form>
              )}

              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid rgba(100, 64, 251, 0.08)", color: "var(--tourex-primary)" }}>
                      <th style={{ padding: "12px", textAlign: "left" }}>Tên Hướng Dẫn Viên</th>
                      <th style={{ padding: "12px", textAlign: "left" }}>Mã Affiliate</th>
                      <th style={{ padding: "12px", textAlign: "left" }}>Cấp bậc</th>
                      <th style={{ padding: "12px", textAlign: "left" }}>Số đơn giới thiệu</th>
                      <th style={{ padding: "12px", textAlign: "left" }}>Tổng doanh số</th>
                      <th style={{ padding: "12px", textAlign: "left" }}>Hoa hồng tích lũy</th>
                      <th style={{ padding: "12px", textAlign: "center" }}>Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {guides.map(guide => {
                      const guideBookings = bookings.filter(b => b.referrer === guide.code);
                      const guideSales = guideBookings.reduce((acc, b) => acc + b.totalAmount, 0);
                      const guideCom = (guideSales * guide.commissionRate) / 100;
                      
                      return (
                        <tr key={guide.id} style={{ borderBottom: "1px solid rgba(100, 64, 251, 0.05)" }}>
                          <td style={{ padding: "12px" }}>
                            <strong>{guide.name}</strong>
                            <div style={{ fontSize: "0.75rem", color: "var(--tourex-text-slate)" }}>SĐT: {guide.phone || "Chưa cập nhật"}</div>
                          </td>
                          <td style={{ padding: "12px" }}><code style={{ background: "#e2e8f0", padding: "2px 6px", borderRadius: "4px", fontWeight: 700 }}>{guide.code}</code></td>
                          <td style={{ padding: "12px" }}><span style={{ color: guide.level === 1 ? "#10b981" : "#FFAA0D", fontWeight: 700 }}>Cấp {guide.level} ({guide.commissionRate}%)</span></td>
                          <td style={{ padding: "12px", fontWeight: 600 }}>{guideBookings.length} Đơn hàng</td>
                          <td style={{ padding: "12px", fontWeight: 600 }}>{formatPrice(guideSales)} đ</td>
                          <td style={{ padding: "12px", fontWeight: 700, color: "var(--tourex-primary)" }}>{formatPrice(guideCom)} đ</td>
                          <td style={{ padding: "12px", textAlign: "center" }}>
                            <button type="button" className="btn btn-outline" onClick={() => alert(`Đã duyệt chi hoa hồng trị giá ${formatPrice(guideCom)} VNĐ cho HDV ${guide.name}!`)} style={{ padding: "4px 8px", fontSize: "0.75rem", borderRadius: "4px", marginRight: "8px", borderColor: "var(--tourex-primary)", color: "var(--tourex-primary)" }} disabled={guideCom === 0}>Thanh Toán</button>
                            <button type="button" onClick={() => onDeleteGuide(guide.id)} style={{ background: "transparent", border: "none", color: "red", cursor: "pointer" }}><Trash2 size={16} /></button>
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
            <div className="tourex-card-panel">
              <h3 style={{ fontSize: "1.1rem", marginBottom: "20px", color: "var(--tourex-text-navy)", fontWeight: 800 }}>Đơn Hàng Đã Đặt Từ Khách Hàng</h3>
              {bookings.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px", color: "var(--tourex-text-slate)" }}>
                  <p>Chưa có đơn đặt tour nào từ khách hàng gửi về.</p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  {bookings.map((order, idx) => (
                    <div key={idx} style={{ border: "1px solid rgba(100, 64, 251, 0.08)", borderRadius: "12px", overflow: "hidden" }}>
                      <div style={{ background: "#f8fafc", padding: "16px 20px", borderBottom: "1px solid rgba(100, 64, 251, 0.08)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
                        <div>
                          <strong style={{ color: "var(--tourex-primary)", fontSize: "0.95rem" }}>MÃ ĐƠN: {order.bookingId}</strong>
                          <span style={{ fontSize: "0.8rem", color: "var(--tourex-text-slate)", marginLeft: "12px" }}>Ngày đặt: {order.bookingDate}</span>
                          {order.referrer && <span style={{ fontSize: "0.78rem", background: "rgba(16, 185, 129, 0.1)", color: "#10b981", padding: "3px 8px", borderRadius: "10px", marginLeft: "12px", fontWeight: 700 }}>🔗 Affiliate: {order.referrer}</span>}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <span style={{ fontSize: "0.8rem", fontWeight: 700, padding: "4px 10px", borderRadius: "20px", background: order.status === "confirmed" ? "rgba(16, 185, 129, 0.1)" : "rgba(255, 170, 13, 0.1)", color: order.status === "confirmed" ? "#10b981" : "#FFAA0D" }}>
                            {order.status === "confirmed" ? "Confirmed" : "Pending"}
                          </span>
                          {order.status === "pending" && (
                            <button className="btn btn-primary" onClick={() => onConfirmBooking(order.bookingId)} style={{ background: "var(--tourex-primary)", padding: "6px 14px", fontSize: "0.8rem", borderRadius: "6px", display: "flex", alignItems: "center", gap: "4px" }}>
                              <CheckCircle2 size={14} /> Duyệt đơn hàng
                            </button>
                          )}
                          <button 
                            type="button" 
                            className="btn btn-outline" 
                            onClick={() => handlePrintBooking(order)} 
                            style={{ padding: "6px 14px", fontSize: "0.8rem", borderRadius: "6px", display: "flex", alignItems: "center", gap: "6px", borderColor: "var(--tourex-primary)", color: "var(--tourex-primary)" }}
                          >
                            <Printer size={14} /> In / Xuất PDF
                          </button>
                        </div>
                      </div>

                      <div style={{ padding: "20px", display: "grid", gridTemplateColumns: "1.2fr 2fr", gap: "20px" }}>
                        <div style={{ borderRight: "1px solid rgba(100, 64, 251, 0.08)", paddingRight: "20px" }}>
                          <h4 style={{ fontSize: "0.85rem", color: "var(--tourex-primary)", textTransform: "uppercase", marginBottom: "12px", fontWeight: 700 }}>Thông tin liên hệ</h4>
                          <p style={{ fontSize: "0.9rem", marginBottom: "6px" }}><strong>Khách hàng:</strong> {order.fullName}</p>
                          <p style={{ fontSize: "0.9rem", marginBottom: "6px" }}><strong>Số điện thoại:</strong> {order.phone}</p>
                          <p style={{ fontSize: "0.9rem", wordBreak: "break-all" }}><strong>Email:</strong> {order.email}</p>
                        </div>
                        <div>
                          <h4 style={{ fontSize: "0.85rem", color: "var(--tourex-primary)", textTransform: "uppercase", marginBottom: "12px", fontWeight: 700 }}>Hành trình đã chọn ({order.items.length} dịch vụ)</h4>
                          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            {order.items.map((item, itemIdx) => (
                              <div key={itemIdx} style={{ fontSize: "0.85rem", display: "flex", justifyContent: "space-between", alignItems: "flex-start", background: "#f8fafc", padding: "8px 12px", borderRadius: "6px" }}>
                                <div>
                                  <strong style={{ color: "var(--tourex-primary)" }}>{item.tourName}</strong>
                                  {!item.isCustom ? (
                                    <span style={{ fontSize: "0.75rem", color: "var(--tourex-text-slate)", display: "block" }}>Khởi hành: {new Date(item.date).toLocaleDateString("vi-VN")} • {item.adults} NL, {item.children} TE</span>
                                  ) : (
                                    <span style={{ fontSize: "0.75rem", color: "#FFAA0D", display: "block" }}>Lịch trình gồm: {item.customItems?.map(c => c.name.split(" ")[0]).join(", ")}</span>
                                  )}
                                </div>
                                <span style={{ fontWeight: 700, color: "var(--tourex-primary)" }}>{formatPrice(item.totalPrice)} đ</span>
                              </div>
                            ))}
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(100, 64, 251, 0.08)", marginTop: "16px", paddingTop: "12px" }}>
                            <strong style={{ fontSize: "0.9rem", color: "var(--tourex-text-navy)" }}>TỔNG CỘNG THANH TOÁN:</strong>
                            <strong style={{ fontSize: "1.25rem", color: "#FFAA0D" }}>{formatPrice(order.totalAmount)} đ</strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
