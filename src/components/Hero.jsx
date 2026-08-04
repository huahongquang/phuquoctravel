import React from "react";
import { Compass, Sparkles } from "lucide-react";

export default function Hero({ onExploreClick, onAiClick }) {
  return (
    <section 
      id="hero" 
      className="hero" 
      style={{ backgroundImage: `url('/images/phu_quoc_hero.jpg')` }}
    >
      <div className="container animate-fade-in-up">
        <p className="hero-tagline">Thiên Đường Nghỉ Dưỡng Nhiệt Đới</p>
        <h1>Khám Phá Đảo Ngọc Phú Quốc</h1>
        <p className="hero-desc">
          Trải nghiệm thiên nhiên hoang sơ, lặn ngắm san hô rực rỡ, đón hoàng hôn lãng mạn và lên lịch trình du lịch thông minh cùng trợ lý AI cá nhân hóa chỉ trong vài giây.
        </p>
        <div className="hero-ctas">
          <button className="btn btn-primary" onClick={onExploreClick}>
            <Compass size={18} />
            Xem Các Tour Trải Nghiệm
          </button>
          <button className="btn btn-accent" onClick={onAiClick}>
            <Sparkles size={18} />
            Tư Vấn Tour Bằng AI
          </button>
        </div>
      </div>
    </section>
  );
}
