import React, { useState } from "react";
import { User, Calendar, BookOpen, X } from "lucide-react";
import { translations } from "../data/translations";

export default function BlogSection({ blogs, language }) {
  const [selectedPost, setSelectedPost] = useState(null);
  const t = translations[language || "vi"];
  const isEn = language === "en";

  return (
    <section id="blog" className="tours-section" style={{ background: "var(--white)" }}>
      <div className="container">
        <h2 className="section-title">
          {isEn ? "Phu Quoc Travel Guide & Insights" : "Cẩm Nang Du Lịch Phú Quốc"}
        </h2>
        <p className="section-subtitle">
          {isEn 
            ? "A collection of practical travel tips, attraction reviews, local dining guides, and recommendations from our professional guides."
            : "Tổng hợp những bài viết chia sẻ kinh nghiệm thực tế, đánh giá điểm đến, ẩm thực và hoạt động lý tưởng của Hướng dẫn viên Phú Quốc Travel."}
        </p>

        <div className="tours-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))" }}>
          {blogs.map((post) => (
            <div key={post.id} className="tour-card glass-panel" style={{ background: "#f8fafc" }}>
              <div className="tour-img-wrapper" style={{ height: "180px" }}>
                <img src={post.image || "/images/phu_quoc_hero.jpg"} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <span className="badge tour-tag" style={{ background: "var(--secondary)" }}>
                  {isEn ? (post.category_en || post.category) : post.category}
                </span>
              </div>
              <div className="tour-content" style={{ padding: "20px" }}>
                <div>
                  <div style={{ display: "flex", gap: "12px", fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "8px" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <User size={12} />
                      {isEn ? "By: " : "Bởi: "}{post.author}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <Calendar size={12} />
                      {post.date}
                    </span>
                  </div>
                  <h3 style={{ fontSize: "1.1rem", marginBottom: "8px", color: "var(--primary)", lineHeight: 1.4 }}>{isEn ? (post.title_en || post.title) : post.title}</h3>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "16px", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {isEn ? (post.summary_en || post.summary) : post.summary}
                  </p>
                </div>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setSelectedPost(post)}
                  style={{ padding: "8px 16px", fontSize: "0.8rem", width: "100%", display: "flex", gap: "6px", alignSelf: "flex-end" }}
                >
                  <BookOpen size={14} />
                  {isEn ? "Read Article" : "Đọc Bài Viết"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ARTICLE FULL CONTENT MODAL */}
      {selectedPost && (
        <div className="modal-overlay open" onClick={() => setSelectedPost(null)} style={{ zIndex: 1500 }}>
          <div 
            className="booking-modal" 
            onClick={(e) => e.stopPropagation()} 
            style={{ maxWidth: "750px", width: "100%" }}
          >
            <div className="modal-header" style={{ background: "var(--primary)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span className="badge" style={{ background: "var(--secondary)", color: "var(--white)" }}>{isEn ? (selectedPost.category_en || selectedPost.category) : selectedPost.category}</span>
                <span style={{ fontSize: "0.8rem", opacity: 0.9 }}>
                  {isEn ? "By: " : "Bởi: "}{selectedPost.author} • {isEn ? "Published" : "Đăng ngày"} {selectedPost.date}
                </span>
              </div>
              <button className="close-modal-btn" onClick={() => setSelectedPost(null)}>
                <X size={20} />
              </button>
            </div>
            
            <div className="modal-body" style={{ padding: "30px 40px" }}>
              <div style={{ height: "280px", borderRadius: "16px", overflow: "hidden", marginBottom: "24px" }}>
                <img 
                  src={selectedPost.image || "/images/phu_quoc_hero.jpg"} 
                  alt={selectedPost.title} 
                  style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                />
              </div>
              
              <h2 style={{ fontSize: "1.8rem", color: "var(--primary)", marginBottom: "20px", lineHeight: 1.3 }}>
                {isEn ? (selectedPost.title_en || selectedPost.title) : selectedPost.title}
              </h2>
              
              <div 
                style={{ fontSize: "0.95rem", color: "var(--text)", lineHeight: 1.7 }}
                dangerouslySetInnerHTML={{ 
                  __html: (isEn ? (selectedPost.content_en || selectedPost.content) : selectedPost.content)
                    .replace(/\n\n/g, "</p><p style='margin-bottom: 16px;'>")
                    .replace(/### (.*)/g, "<h3 style='font-size: 1.25rem; color: var(--primary); margin-top: 24px; margin-bottom: 12px; font-weight: 700;'>$1</h3>")
                    .replace(/## (.*)/g, "<h2 style='font-size: 1.45rem; color: var(--primary); margin-top: 28px; margin-bottom: 16px; font-weight: 800;'>$1</h2>")
                }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
