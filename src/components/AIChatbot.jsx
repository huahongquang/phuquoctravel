import React, { useState, useEffect, useRef } from "react";
import { Sparkles, Send, MapPin, Compass, AlertCircle } from "lucide-react";
import { aiDatabase } from "../data/aiDatabase";
import { toursData } from "../data/toursData";

export default function AIChatbot({ onBookTour }) {
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      sender: "bot",
      text: aiDatabase.defaultResponses.welcome,
      hasOptions: true
    }
  ]);
  const [inputVal, setInputVal] = useState("");
  const [recommendedAttractions, setRecommendedAttractions] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleOptionClick = (option) => {
    // Thêm tin nhắn của User
    const userMessageId = `user-${Date.now()}`;
    const userMsg = {
      id: userMessageId,
      sender: "user",
      text: option.label
    };
    
    setMessages(prev => [...prev, userMsg]);
    
    // Tạo câu trả lời từ Bot sau một khoảng delay nhỏ để mô phỏng AI suy nghĩ
    setTimeout(() => {
      processAiResponse(option.category);
    }, 600);
  };

  const handleSendText = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: inputVal
    };

    setMessages(prev => [...prev, userMsg]);
    const typedText = inputVal.toLowerCase();
    setInputVal("");

    setTimeout(() => {
      // Phân tích ý định từ văn bản nhập
      let matchedCategory = null;
      
      for (const [category, keywords] of Object.entries(aiDatabase.intentKeywords)) {
        if (keywords.some(keyword => typedText.includes(keyword))) {
          matchedCategory = category;
          break;
        }
      }

      if (matchedCategory) {
        processAiResponse(matchedCategory);
      } else {
        setMessages(prev => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: "bot",
            text: aiDatabase.defaultResponses.notFound,
            hasOptions: true
          }
        ]);
        setRecommendedAttractions([]);
      }
    }, 600);
  };

  const processAiResponse = (category) => {
    // Lấy các điểm đến thuộc danh mục tương ứng
    const matchedAttractions = aiDatabase.attractions.filter(
      attr => attr.category === category
    );

    setRecommendedAttractions(matchedAttractions);

    let categoryName = "";
    let botIntro = "";

    switch (category) {
      case "adventure":
        categoryName = "Khám phá mạo hiểm";
        botIntro = "Tuyệt vời! Nếu bạn đam mê **Khám phá mạo hiểm và vui chơi**, Phú Quốc có những địa điểm tuyệt vời sau đây dành cho bạn. Đặc biệt là các hoạt động cano đi đảo và lặn ngắm san hô.\n\nTôi đề xuất bạn nên tham khảo các địa điểm phía dưới:";
        break;
      case "nature":
        categoryName = "Thiên nhiên hoang sơ";
        botIntro = "Lựa chọn tuyệt vời! Phú Quốc nổi tiếng với vẻ đẹp **Thiên nhiên hoang sơ**. Bạn có thể ngắm sao biển đỏ tại Rạch Vẹm, trekking xuyên rừng quốc gia hay đón hoàng hôn biên giới ở Gành Dầu.\n\nHãy xem các điểm đến thiên nhiên đề xuất dưới đây:";
        break;
      case "culture":
        categoryName = "Văn hóa & Lịch sử";
        botIntro = "Rất ý nghĩa! Tìm hiểu **Văn hóa & Lịch sử** giúp bạn cảm nhận sâu sắc hơn về cuộc sống người dân Đảo Ngọc. Từ di tích Nhà tù Phú Quốc hào hùng đến sự linh thiêng tại Thiền viện Trúc Lâm Hộ Quốc.\n\nDưới đây là danh sách điểm trải nghiệm văn hóa phù hợp:";
        break;
      case "leisure":
        categoryName = "Nghỉ dưỡng & Lãng mạn";
        botIntro = "Hoàn hảo cho kỳ nghỉ! Để **Nghỉ dưỡng & Trải nghiệm lãng mạn**, bạn không nên bỏ lỡ việc ngắm hoàng hôn trên du thuyền, câu mực đêm hay thả mình trên cát trắng Bãi Sao.\n\nCác gợi ý lãng mạn dành cho bạn:";
        break;
      default:
        categoryName = "Trải nghiệm";
        botIntro = "Dưới đây là một số gợi ý điểm đến hấp dẫn dành cho bạn tại Phú Quốc:";
    }

    const botMsg = {
      id: `bot-${Date.now()}`,
      sender: "bot",
      text: `${botIntro}\n\n*Hệ thống đã cập nhật danh sách điểm đến chi tiết ở bảng bên cạnh. Bạn có thể bấm đặt tour liên kết trực tiếp để trải nghiệm ngay!*`
    };

    setMessages(prev => [...prev, botMsg]);
  };

  const getTourName = (tourId) => {
    const tour = toursData.find(t => t.id === tourId);
    return tour ? tour.name : "Tour Phú Quốc";
  };

  const handleBookFromAi = (tourId) => {
    const tour = toursData.find(t => t.id === tourId);
    if (tour) {
      onBookTour(tour);
    }
  };

  const options = [
    { label: "🏄 Khám phá mạo hiểm", category: "adventure" },
    { label: "🌴 Thiên nhiên hoang sơ", category: "nature" },
    { label: "🏛️ Lịch sử - Văn hóa", category: "culture" },
    { label: "🌅 Nghỉ dưỡng lãng mạn", category: "leisure" }
  ];

  return (
    <section id="ai-planner" className="ai-section">
      <div className="container">
        <h2 className="section-title">Lên Lịch Trình Với AI</h2>
        <p className="section-subtitle">
          Trò chuyện trực tiếp với Trợ lý ảo AI để nhận gợi ý hành trình trải nghiệm Đảo Ngọc tối ưu và đặt tour nhanh chóng.
        </p>

        <div className="ai-container glass-panel">
          {/* Chat Side */}
          <div className="ai-chat-side">
            <div className="ai-chat-header">
              <div className="ai-avatar">
                <Sparkles size={22} className="animate-pulse" />
              </div>
              <div>
                <h3>Trợ lý ảo Phú Quốc AI</h3>
                <p>Hoạt động trực tuyến • Sẵn sàng tư vấn</p>
              </div>
            </div>

            <div className="ai-messages">
              {messages.map((msg) => (
                <div key={msg.id} style={{ display: "contents" }}>
                  <div
                    className={`message ${
                      msg.sender === "bot" ? "message-bot" : "message-user"
                    }`}
                    dangerouslySetInnerHTML={{
                      __html: msg.text.replace(/\n/g, "<br />")
                    }}
                  />
                  {msg.sender === "bot" && msg.hasOptions && (
                    <div className="message-options" style={{ alignSelf: "flex-start", paddingLeft: "10px", marginBottom: "10px" }}>
                      {options.map((opt, i) => (
                        <button
                          key={i}
                          className="option-bubble"
                          onClick={() => handleOptionClick(opt)}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendText} className="ai-chat-input-area">
              <input
                type="text"
                placeholder="Nhập sở thích du lịch của bạn (ví dụ: muốn đi lặn san hô, ngắm hoàng hôn...)"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
              />
              <button type="submit" className="ai-send-btn">
                <Send size={18} />
              </button>
            </form>
          </div>

          {/* Recommendations Side */}
          <div className="ai-recs-side">
            <div className="ai-recs-header">
              <MapPin size={22} style={{ color: "var(--secondary)" }} />
              <h3>Địa Điểm Đề Xuất</h3>
            </div>

            {recommendedAttractions.length === 0 ? (
              <div className="recs-empty-state">
                <AlertCircle size={44} style={{ color: "var(--text-muted)", opacity: 0.5 }} />
                <p>Hãy trò chuyện hoặc chọn phong cách ở khung chat để AI tìm kiếm điểm đến phù hợp cho bạn.</p>
              </div>
            ) : (
              <div>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "16px" }}>
                  Tìm thấy {recommendedAttractions.length} điểm trải nghiệm phù hợp với sở thích của bạn:
                </p>
                {recommendedAttractions.map((attr) => (
                  <div key={attr.id} className="rec-card">
                    <div className="rec-header">
                      <h4 className="rec-title">{attr.name}</h4>
                      <span className="rec-area">{attr.area}</span>
                    </div>
                    <p className="rec-desc">{attr.description}</p>
                    <div className="rec-action">
                      <div className="rec-tour-hint">
                        <Compass size={14} style={{ color: "var(--primary)" }} />
                        <span>Liên quan: {getTourName(attr.recommendedTourId)}</span>
                      </div>
                      <button
                        className="rec-book-btn"
                        onClick={() => handleBookFromAi(attr.recommendedTourId)}
                      >
                        Đặt Ngay
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
