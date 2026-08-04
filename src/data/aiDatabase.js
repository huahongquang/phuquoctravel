export const aiDatabase = {
  attractions: [
    {
      id: "hon-may-rut",
      name: "Hòn Mây Rút Trong & Hòn Mây Rút Ngoài",
      name_en: "May Rut Islands (Trong & Ngoai)",
      area: "Nam Đảo (Quần đảo An Thới)",
      area_en: "South Island (An Thoi Archipelago)",
      category: "adventure",
      tags: ["beach", "swimming", "photography", "sup"],
      description: "Hòn đảo sở hữu bãi cát trắng mịn màng nhất, hàng dừa xanh nghiêng bóng mát rượi. Nơi đây cực kỳ lý tưởng để chèo thuyền SUP, tắm biển và có các thợ ảnh chụp flycam chuyên nghiệp.",
      description_en: "An island possessing the softest white sands and leaning palms. Perfect for SUP paddling, swimming, and professional flycam photography.",
      recommendedTourId: "tour-4-islands"
    },
    {
      id: "hon-gam-ghi",
      name: "Hòn Gầm Ghì (Hòn Dăm Ngang)",
      name_en: "Gam Ghi Island (Dam Ngang Reef)",
      area: "Nam Đảo (Quần đảo An Thới)",
      area_en: "South Island (An Thoi Archipelago)",
      category: "adventure",
      tags: ["coral", "snorkeling", "marine-life"],
      description: "Được mệnh danh là vương quốc san hô của Phú Quốc. Nước biển ở đây nông và trong vắt như gương, chỉ cần úp mặt xuống nước là bạn đã có thể chiêm ngưỡng những thảm san hô tự nhiên đa sắc màu.",
      description_en: "The coral kingdom of Phu Quoc. The sea is shallow and crystal-clear, allowing you to easily admire multi-colored natural coral reefs.",
      recommendedTourId: "tour-4-islands"
    },
    {
      id: "cap-treo-hon-thom",
      name: "Cáp Treo Hòn Thơm & Công viên nước Aquatopia",
      name_en: "Hon Thom Cable Car & Aquatopia Waterpark",
      area: "Nam Đảo",
      area_en: "South Island",
      category: "adventure",
      tags: ["cable-car", "water-park", "fun", "family"],
      description: "Cáp treo vượt biển 3 dây dài nhất thế giới (7.899m) nối An Thới với đảo Hòn Thơm. Tại Hòn Thơm, bạn sẽ được xả stress tại công viên nước Aquatopia với 6 phân khu chủ đề độc đáo.",
      description_en: "The world's longest 3-wire sea-crossing cable car (7,899m) connecting An Thoi with Hon Thom. Enjoy slides at Aquatopia waterpark.",
      recommendedTourId: "tour-4-islands"
    },
    {
      id: "rach-vem",
      name: "Bãi Rạch Vẹm & Vương Quốc Sao Biển",
      name_en: "Rach Vem Beach & Starfish Kingdom",
      area: "Bắc Đảo",
      area_en: "North Island",
      category: "nature",
      tags: ["starfish", "wild", "local-life", "seafood"],
      description: "Một bãi biển hoang sơ nằm ở phía bắc đảo, nổi tiếng với những cây cầu gỗ dẫn ra nhà bè giữa biển và đặc biệt là sự xuất hiện của rất nhiều chú sao biển đỏ tự nhiên trên cát.",
      description_en: "A wild beach in the north, famous for wooden boardwalks and hundreds of natural red starfish resting on the white sands.",
      recommendedTourId: "tour-rach-vem"
    },
    {
      id: "rung-quoc-gia",
      name: "Vườn Quốc Gia Phú Quốc (Rừng Nguyên Sinh)",
      name_en: "Phu Quoc National Park Forest",
      area: "Bắc Đảo",
      area_en: "North Island",
      category: "nature",
      tags: ["trekking", "forest", "ecotourism", "fresh-air"],
      description: "Khu rừng nguyên sinh bạt ngàn chiếm hơn 50% diện tích đảo với hệ động thực vật vô cùng phong phú. Thích hợp cho những ai yêu thích leo núi, trekking và hòa mình vào thiên nhiên hoang dã.",
      description_en: "A massive old-growth forest covering over 50% of the island. Perfect for hiking, forest trekking, and ecotourism.",
      recommendedTourId: "tour-north-island"
    },
    {
      id: "mui-ganh-dau",
      name: "Mũi Gành Dầu",
      name_en: "Ganh Dau Cape",
      area: "Bắc Đảo",
      area_en: "North Island",
      category: "nature",
      tags: ["border", "view", "sunset", "history"],
      description: "Mũi đất nhô ra ở phía Tây Bắc đảo. Đứng từ đây vào những ngày nắng đẹp, bạn có thể nhìn thấy rõ hải giới nước bạn Campuchia và ngắm hoàng hôn biển tuyệt đẹp.",
      description_en: "The northwestern cape of the island. On clear days, look over Cambodia's maritime borders and watch beautiful ocean sunsets.",
      recommendedTourId: "tour-north-island"
    },
    {
      id: "nha-tu-phu-quoc",
      name: "Di tích lịch sử Nhà Tù Phú Quốc (Nhà Lao Cây Dừa)",
      name_en: "Phu Quoc Prison Historical Site",
      area: "Nam Đảo",
      area_en: "South Island",
      category: "culture",
      tags: ["history", "war-museum", "education"],
      description: "Nơi tái hiện chân thực những năm tháng hào hùng nhưng vô cùng khốc liệt của lịch sử dân tộc. Nơi từng giam cầm hơn 40.000 chiến sĩ cách mạng với các hình phạt tra tấn dã man.",
      description_en: "A historic war museum capturing the fierce years of war, where over 40,000 revolutionary soldiers were imprisoned.",
      recommendedTourId: "tour-north-island"
    },
    {
      id: "chua-ho-quoc",
      name: "Thiền Viện Trúc Lâm Hộ Quốc",
      name_en: "Ho Quoc Zen Monastery",
      area: "Đông Nam Đảo",
      area_en: "South-East Island",
      category: "culture",
      tags: ["pagoda", "peace", "architecture", "view"],
      description: "Ngôi chùa lớn nhất vùng Đồng bằng Sông Cửu Long với thế lưng tựa núi, mặt hướng biển khơi mênh mông cực kỳ uy nghiêm và thanh tịnh, mang lại cảm giác bình an thư thái.",
      description_en: "The largest monastery in the Mekong region, backed by green mountains and looking out to the vast ocean.",
      recommendedTourId: "tour-north-island"
    },
    {
      id: "cau-muc-dem",
      name: "Trải nghiệm Câu mực đêm trên biển",
      name_en: "Night Squid Fishing Cruise",
      area: "Dương Đông / Bãi Trường",
      area_en: "Duong Dong / Long Beach",
      category: "leisure",
      tags: ["night-life", "fishing", "local-food", "romantic"],
      description: "Hoạt động thú vị khi màn đêm buông xuống. Bạn sẽ lên tàu của ngư dân, ngắm nhìn ánh đèn câu lung linh giữa khơi xa và tự tay trải nghiệm kỹ thuật câu những chú mực ống lấp lánh.",
      description_en: "An exciting evening activity. Join local fishermen, watch the offshore lights, and try catching fresh squids yourself.",
      recommendedTourId: "tour-night-squid"
    },
    {
      id: "bai-sao",
      name: "Bãi Sao Phú Quốc",
      name_en: "Sao Beach (Starfish Beach)",
      area: "Nam Đảo",
      area_en: "South Island",
      category: "leisure",
      tags: ["beach", "swimming", "relax", "family"],
      description: "Bãi biển đẹp và nổi tiếng bậc nhất Phú Quốc với bãi cát trắng mịn như kem và làn nước trong xanh màu ngọc bích êm ả, sóng nhẹ, an toàn cho cả gia đình tắm biển.",
      description_en: "One of the most famous beaches in Phu Quoc, with cream-white sands and calm turquoise waters safe for families.",
      recommendedTourId: "tour-4-islands"
    },
    {
      id: "bat-ca-ngu-dan",
      name: "Đánh bắt cá & Cắm trại cùng Ngư Dân",
      name_en: "Fisherman Life & Wilderness Sandbar Camping",
      area: "Đông Nam Đảo",
      area_en: "South-East Island",
      category: "nature",
      tags: ["fishing", "local-life", "camping", "wild", "adventure"],
      description: "Trải nghiệm nhập vai làm ngư dân Phú Quốc thực thụ. Ra khơi thả lưới kéo cá cùng thủy thủ đoàn trên tàu gỗ truyền thống, nướng cá trực tiếp dã ngoại bên bờ cát hoang vắng.",
      description_en: "An immersive local fisherman roleplay. Cast nets from traditional wooden boats and cook your catch over an open campfire.",
      recommendedTourId: "tour-fishing-local"
    }
  ],

  // Các từ khóa phân tích ý định người dùng (Intent Keywords)
  intentKeywords: {
    adventure: ["mạo hiểm", "cano", "cáp treo", "lặn", "san hô", "công viên nước", "vui chơi", "trượt nước", "leo núi", "trekking", "rừng", "adventure", "cable car", "snorkeling", "diving", "coral", "water park", "waterpark"],
    nature: ["thiên nhiên", "hoang sơ", "sao biển", "rừng", "sông", "rạch vẹm", "gành dầu", "suối", "hoang dã", "cảnh đẹp", "bắt cá", "ngư dân", "câu cá", "thả lưới", "kéo lưới", "cắm trại", "dã ngoại", "nature", "starfish", "national park", "wild", "fish", "camp", "camping", "fishing", "local life"],
    culture: ["lịch sử", "văn hóa", "nhà tù", "chùa", "hộ quốc", "nguyễn trung trực", "đền", "tâm linh", "làng chài", "truyền thống", "culture", "history", "temple", "pagoda", "prison", "shrine"],
    leisure: ["nghỉ dưỡng", "thư giãn", "hoàng hôn", "câu mực", "lãng mạn", "tắm biển", "gia đình", "chợ đêm", "ăn uống", "hải sản", "leisure", "sunset", "squid", "relax", "romantic", "beach", "family", "night market", "seafood"]
  },

  // Câu trả lời mặc định khi AI tư vấn
  defaultResponses: {
    welcome: "Xin chào! Mình là **Trợ lý AI Du lịch Phú Quốc**. Mình có thể giúp bạn tìm kiếm các điểm trải nghiệm tuyệt vời và gợi ý các tour du lịch phù hợp nhất với sở thích của bạn ở Đảo Ngọc.\n\nBạn thích phong cách du lịch nào dưới đây nhất?\n1. **Khám phá mạo hiểm** (Cano, cáp treo, lặn san hô, công viên nước)\n2. **Trải nghiệm thiên nhiên & làm ngư dân** (Bắt cá cùng ngư dân, cắm trại dã ngoại, ngắm sao biển Rạch Vẹm, trekking rừng)\n3. **Tìm hiểu Văn hóa - Lịch sử** (Nhà tù Phú Quốc, Chùa Hộ Quốc, Đền Nguyễn Trung Trực)\n4. **Nghỉ dưỡng & Trải nghiệm lãng mạn** (Tắm biển Bãi Sao, đón hoàng hôn trên du thuyền, câu mực đêm)",
    welcome_en: "Hello! I am your **Phu Quoc AI Travel Assistant**. I can help you find amazing attractions and recommend tour packages tailored to your interests on Pearl Island.\n\nWhich travel style do you prefer?\n1. **Adventure & Fun** (Speedboats, Hon Thom cable car, snorkeling, Aquatopia waterpark)\n2. **Eco Nature & Local Life** (Net fishing with fishermen, sandbar camping, Rach Vem starfish, forest trekking)\n3. **History & Culture** (Phu Quoc Prison, Ho Quoc Pagoda, Nguyen Trung Truc shrine)\n4. **Relaxation & Sunset** (Sao Beach swimming, sunset cruise, night squid fishing)",
    
    notFound: "Cảm ơn bạn đã chia sẻ! Hiện tại mình chưa phân tích được rõ từ khóa này. Bạn có thể chọn 1 trong các chủ đề gợi ý trên, hoặc nói rõ hơn mong muốn của bạn (ví dụ: 'mình muốn đi bắt cá cùng ngư dân', 'muốn đi lặn san hô', 'muốn ngắm sao biển', hoặc 'muốn đi cùng gia đình nghỉ dưỡng') để mình hỗ trợ nhé!",
    notFound_en: "Thanks for sharing! I couldn't recognize your key interest yet. Please choose one of the topics above, or describe what you want in detail (e.g., 'I want to go snorkeling', 'squid fishing', 'starfish beach', or 'family relaxation') so I can guide you!"
  }
};
