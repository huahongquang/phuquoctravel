import React, { useState, useEffect, useRef } from "react";
import { Sparkles, Send, MapPin, Compass, AlertCircle } from "lucide-react";
import { aiDatabase } from "../data/aiDatabase";
import { toursData } from "../data/toursData";
import { translations } from "../data/translations";

export default function AIChatbot({ onBookTour, language }) {
  const isEn = language === "en";
  const t = translations[language || "vi"];

  const [messages, setMessages] = useState([
    {
      id: isEn ? "welcome_en" : "welcome",
      sender: "bot",
      text: isEn ? aiDatabase.defaultResponses.welcome_en : aiDatabase.defaultResponses.welcome,
      hasOptions: true
    }
  ]);
  const [inputVal, setInputVal] = useState("");
  const [recommendedAttractions, setRecommendedAttractions] = useState([]);
  const messagesEndRef = useRef(null);
  const isFirstRender = useRef(true);

  // Sync welcome message on language change if no other message has been sent
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && (prev[0].id === "welcome" || prev[0].id === "welcome_en")) {
        return [
          {
            id: isEn ? "welcome_en" : "welcome",
            sender: "bot",
            text: isEn ? aiDatabase.defaultResponses.welcome_en : aiDatabase.defaultResponses.welcome,
            hasOptions: true
          }
        ];
      }
      return prev;
    });
  }, [language, isEn]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messages.length <= 1) return;
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleOptionClick = (option) => {
    // Add user message
    const userMessageId = `user-${Date.now()}`;
    const userMsg = {
      id: userMessageId,
      sender: "user",
      text: option.label
    };
    
    setMessages(prev => [...prev, userMsg]);
    
    // Simulate AI response delay
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
      // Analyze user input intent keywords
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
            text: isEn ? aiDatabase.defaultResponses.notFound_en : aiDatabase.defaultResponses.notFound,
            hasOptions: true
          }
        ]);
        setRecommendedAttractions([]);
      }
    }, 600);
  };

  const processAiResponse = (category) => {
    // Retrieve matching attractions
    const matchedAttractions = aiDatabase.attractions.filter(
      attr => attr.category === category
    );

    setRecommendedAttractions(matchedAttractions);

    let botIntro = "";

    switch (category) {
      case "adventure":
        botIntro = isEn 
          ? "Great! If you love **Adventure and Thrills**, Phu Quoc has amazing activities for you. Especially island speedboats and snorkeling reefs.\n\nSee my recommendations below:"
          : "Tuyệt vời! Nếu bạn đam mê **Khám phá mạo hiểm và vui chơi**, Phú Quốc có những địa điểm tuyệt vời sau đây dành cho bạn. Đặc biệt là các hoạt động cano đi đảo và lặn ngắm san hô.\n\nTôi đề xuất bạn nên tham khảo các địa điểm phía dưới:";
        break;
      case "nature":
        botIntro = isEn 
          ? "Wonderful choice! Phu Quoc is famous for **Eco Nature & Local Life**. You can view red starfish at Rach Vem beach, trek through national forest, or camp with local fishermen.\n\nSee nature recommendations below:"
          : "Lựa chọn tuyệt vời! Phú Quốc nổi tiếng với vẻ đẹp **Thiên nhiên hoang sơ**. Bạn có thể ngắm sao biển đỏ tại Rạch Vẹm, trekking xuyên rừng quốc gia hay đón hoàng hôn biên giới ở Gành Dầu.\n\nHãy xem các điểm đến thiên nhiên đề xuất dưới đây:";
        break;
      case "culture":
        botIntro = isEn 
          ? "Very meaningful! Exploring **History & Culture** helps you connect deeper with Pearl Island. From the heroic Phu Quoc Prison to the sacred Ho Quoc Zen Monastery.\n\nSee cultural options below:"
          : "Rất ý nghĩa! Tìm hiểu **Văn hóa & Lịch sử** giúp bạn cảm nhận sâu sắc hơn về cuộc sống người dân Đảo Ngọc. Từ di tích Nhà tù Phú Quốc hào hùng đến sự linh thiêng tại Thiền viện Trúc Lâm Hộ Quốc.\n\nDưới đây là danh sách điểm trải nghiệm văn hóa phù hợp:";
        break;
      case "leisure":
        botIntro = isEn 
          ? "Perfect for vacation! For **Relaxation & Sunset**, do not miss watching the sunset from the deck cruise, night squid fishing, or swimming at Sao Beach.\n\nSee leisure options below:"
          : "Hoàn hảo cho kỳ nghỉ! Để **Nghỉ dưỡng & Trải nghiệm lãng mạn**, bạn không nên bỏ lỡ việc ngắm hoàng hôn trên du thuyền, câu mực đêm hay thả mình trên cát trắng Bãi Sao.\n\nCác gợi ý lãng mạn dành cho bạn:";
        break;
      default:
        botIntro = isEn 
          ? "Here are some recommended attractions for you in Phu Quoc:"
          : "Dưới đây là một số gợi ý điểm đến hấp dẫn dành cho bạn tại Phú Quốc:";
    }

    const botMsg = {
      id: `bot-${Date.now()}`,
      sender: "bot",
      text: isEn 
        ? `${botIntro}\n\n*The system updated the recommended list in the next panel. Click book on any item to experience it!*`
        : `${botIntro}\n\n*Hệ thống đã cập nhật danh sách điểm đến chi tiết ở bảng bên cạnh. Bạn có thể bấm đặt tour liên kết trực tiếp để trải nghiệm ngay!*`
    };

    setMessages(prev => [...prev, botMsg]);
  };

  const getTourName = (tourId) => {
    const tour = toursData.find(t => t.id === tourId);
    if (!tour) return isEn ? "Phu Quoc Tour" : "Tour Phú Quốc";
    return isEn ? (tour.name_en || tour.name) : tour.name;
  };

  const handleBookFromAi = (tourId) => {
    const tour = toursData.find(t => t.id === tourId);
    if (tour) {
      onBookTour(tour);
    }
  };

  const options = isEn ? [
    { label: "🏄 Adventure & Fun", category: "adventure" },
    { label: "🌴 Eco Nature & Local Life", category: "nature" },
    { label: "🏛️ History & Culture", category: "culture" },
    { label: "🌅 Relaxation & Sunset", category: "leisure" }
  ] : [
    { label: "🏄 Khám phá mạo hiểm", category: "adventure" },
    { label: "🌴 Thiên nhiên hoang sơ", category: "nature" },
    { label: "🏛️ Lịch sử - Văn hóa", category: "culture" },
    { label: "🌅 Nghỉ dưỡng lãng mạn", category: "leisure" }
  ];

  return (
    <section id="ai-planner" className="ai-section">
      <div className="container">
        <h2 className="section-title">
          {isEn ? "Plan Itinerary with AI" : "Lên Lịch Trình Với AI"}
        </h2>
        <p className="section-subtitle">
          {isEn 
            ? "Chat directly with our Phu Quoc AI Assistant to receive customized itineraries and book package tours instantly."
            : "Trò chuyện trực tiếp với Trợ lý ảo AI để nhận gợi ý hành trình trải nghiệm Đảo Ngọc tối ưu và đặt tour nhanh chóng."}
        </p>

        <div className="ai-container glass-panel">
          {/* Chat Side */}
          <div className="ai-chat-side">
            <div className="ai-chat-header">
              <div className="ai-avatar">
                <Sparkles size={22} className="animate-pulse" />
              </div>
              <div>
                <h3>{isEn ? "Phu Quoc AI Assistant" : "Trợ lý ảo Phú Quốc AI"}</h3>
                <p>{isEn ? "Online • Ready to guide you" : "Hoạt động trực tuyến • Sẵn sàng tư vấn"}</p>
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
                placeholder={isEn 
                  ? "Enter your travel preferences (e.g. want to go snorkeling, watch sunset...)"
                  : "Nhập sở thích du lịch của bạn (ví dụ: muốn đi lặn san hô, ngắm hoàng hôn...)"}
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
              <h3>{isEn ? "Recommended Attractions" : "Địa Điểm Đề Xuất"}</h3>
            </div>

            {recommendedAttractions.length === 0 ? (
              <div className="recs-empty-state">
                <AlertCircle size={44} style={{ color: "var(--text-muted)", opacity: 0.5 }} />
                <p>
                  {isEn 
                    ? "Chat or select a travel style in the window for AI to find suitable attractions." 
                    : "Hãy trò chuyện hoặc chọn phong cách ở khung chat để AI tìm kiếm điểm đến phù hợp cho bạn."}
                </p>
              </div>
            ) : (
              <div>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "16px" }}>
                  {isEn 
                    ? `Found ${recommendedAttractions.length} attractions fitting your interests:`
                    : `Tìm thấy ${recommendedAttractions.length} điểm trải nghiệm phù hợp với sở thích của bạn:`}
                </p>
                {recommendedAttractions.map((attr) => (
                  <div key={attr.id} className="rec-card">
                    <div className="rec-header">
                      <h4 className="rec-title">{isEn ? (attr.name_en || attr.name) : attr.name}</h4>
                      <span className="rec-area">{isEn ? (attr.area_en || attr.area) : attr.area}</span>
                    </div>
                    <p className="rec-desc">{isEn ? (attr.description_en || attr.description) : attr.description}</p>
                    <div className="rec-action">
                      <div className="rec-tour-hint">
                        <Compass size={14} style={{ color: "var(--primary)" }} />
                        <span>{isEn ? "Referred: " : "Liên quan: "}{getTourName(attr.recommendedTourId)}</span>
                      </div>
                      <button
                        className="rec-book-btn"
                        onClick={() => handleBookFromAi(attr.recommendedTourId)}
                      >
                        {isEn ? "Book Now" : "Đặt Ngay"}
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
