import React from "react";
import { Compass, Phone, Mail, MapPin, Globe } from "lucide-react";

export default function Footer({ setActiveSection }) {
  const handleNavClick = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <footer id="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="logo" style={{ color: "var(--white)", marginBottom: "20px" }}>
              <Compass size={28} style={{ color: "var(--secondary)" }} />
              <span>PHÚ QUỐC</span> TRAVEL
            </div>
            <p>
              Đơn vị tiên phong cung cấp các dịch vụ trải nghiệm du lịch cao cấp tại Đảo Ngọc Phú Quốc. Chúng tôi cam kết mang lại hành trình an toàn, trọn vẹn và đẳng cấp nhất cho du khách.
            </p>
          </div>

          <div>
            <h4>Khám Phá</h4>
            <ul className="footer-links">
              <li>
                <a href="#hero" onClick={(e) => { e.preventDefault(); handleNavClick("hero"); }}>
                  Trang Chủ
                </a>
              </li>
              <li>
                <a href="#tours" onClick={(e) => { e.preventDefault(); handleNavClick("tours"); }}>
                  Tour Du Lịch
                </a>
              </li>
              <li>
                <a href="#ai-planner" onClick={(e) => { e.preventDefault(); handleNavClick("ai-planner"); }}>
                  Trợ lý Tư vấn AI
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4>Tour Phổ Biến</h4>
            <ul className="footer-links">
              <li>
                <a href="#tours" onClick={(e) => { e.preventDefault(); handleNavClick("tours"); }}>
                  Tour 5 Đảo Cano VIP
                </a>
              </li>
              <li>
                <a href="#tours" onClick={(e) => { e.preventDefault(); handleNavClick("tours"); }}>
                  Tour Hoàng Hôn Rạch Vẹm
                </a>
              </li>
              <li>
                <a href="#tours" onClick={(e) => { e.preventDefault(); handleNavClick("tours"); }}>
                  Tour Trekking Rừng Nguyên Sinh
                </a>
              </li>
              <li>
                <a href="#tours" onClick={(e) => { e.preventDefault(); handleNavClick("tours"); }}>
                  Tour Câu Mực Đêm Khơi Xa
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4>Liên Hệ</h4>
            <ul className="footer-contact">
              <li>
                <MapPin size={18} style={{ color: "var(--secondary)" }} />
                <span>Trần Hưng Đạo, P. Dương Đông, TP. Phú Quốc, Kiên Giang</span>
              </li>
              <li>
                <Phone size={18} style={{ color: "var(--secondary)" }} />
                <span>+84 (0) 901 234 567</span>
              </li>
              <li>
                <Mail size={18} style={{ color: "var(--secondary)" }} />
                <span>booking@phuquoctravel.vn</span>
              </li>
              <li>
                <Globe size={18} style={{ color: "var(--secondary)" }} />
                <span>www.phuquoctravel.vn</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Phú Quốc Travel. All rights reserved. Thiết kế bởi Antigravity.</p>
          <div style={{ display: "flex", gap: "20px" }}>
            <a href="#" style={{ color: "rgba(255,255,255,0.5)" }}>Chính sách bảo mật</a>
            <a href="#" style={{ color: "rgba(255,255,255,0.5)" }}>Điều khoản dịch vụ</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
