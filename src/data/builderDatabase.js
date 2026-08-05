export const initialBuilderDatabase = {
  flight: [
    { id: "fl-vn-1", category: "flight", name: "Vietnam Airlines VN1822", name_en: "Vietnam Airlines VN1822", desc: "Giờ đi: 07:30 • Vé khứ hồi • Đã gồm 23kg ký gửi.", desc_en: "Dep: 07:30 • Round-trip • 23kg checked baggage included.", price: 1250000, flightNo: "VN1822", time: "07:30" },
    { id: "fl-vn-2", category: "flight", name: "Vietnam Airlines VN1826", name_en: "Vietnam Airlines VN1826", desc: "Giờ đi: 13:45 • Vé khứ hồi • Đã gồm 23kg ký gửi.", desc_en: "Dep: 13:45 • Round-trip • 23kg checked baggage included.", price: 1400000, flightNo: "VN1826", time: "13:45" },
    { id: "fl-vj-1", category: "flight", name: "VietJet Air VJ321", name_en: "VietJet Air VJ321", desc: "Giờ đi: 06:00 • Vé khứ hồi • Chưa gồm ký gửi.", desc_en: "Dep: 06:00 • Round-trip • Baggage not included.", price: 850000, flightNo: "VJ321", time: "06:00" },
    { id: "fl-vj-2", category: "flight", name: "VietJet Air VJ325", name_en: "VietJet Air VJ325", desc: "Giờ đi: 18:20 • Vé khứ hồi • Chưa gồm ký gửi.", desc_en: "Dep: 18:20 • Round-trip • Baggage not included.", price: 950000, flightNo: "VJ325", time: "18:20" },
    { id: "fl-qh-1", category: "flight", name: "Bamboo Airways QH242", name_en: "Bamboo Airways QH242", desc: "Giờ đi: 10:15 • Vé khứ hồi • Đã gồm 7kg xách tay.", desc_en: "Dep: 10:15 • Round-trip • 7kg carry-on included.", price: 1150000, flightNo: "QH242", time: "10:15" }
  ],
  transport: [
    { id: "tr-dh-1", category: "transport", name: "Thuê Xe Máy Honda AirBlade", name_en: "Honda AirBlade Scooter Rental", desc: "Đơn vị: Nhà xe Đức Hưng • Xe ga.", desc_en: "Provider: Duc Hung Rental • Scooter.", price: 150000, type: "Xe máy", provider: "Nhà xe Đức Hưng", image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=600&q=80", gallery: [
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=600&q=80"
    ] },
    { id: "tr-hp-1", category: "transport", name: "Thuê Xe Máy Yamaha Exciter", name_en: "Yamaha Exciter Underbone Rental", desc: "Đơn vị: Cửa hàng Hồng Phát • Xe côn tay.", desc_en: "Provider: Hong Phat Shop • Clutch bike.", price: 180000, type: "Xe máy", provider: "Cửa hàng Hồng Phát", image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=600&q=80", gallery: [
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=600&q=80"
    ] },
    { id: "tr-ap-1", category: "transport", name: "Thuê Xe 4 Chỗ Toyota Vios", name_en: "Toyota Vios 4-seater Car (with Driver)", desc: "Đơn vị: Vận tải An Phát • Có tài xế phục vụ.", desc_en: "Provider: An Phat Transport • Driver included.", price: 900000, type: "Ô tô", provider: "Vận tải An Phát", image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80", gallery: [
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80"
    ] },
    { id: "tr-pqt-1", category: "transport", name: "Thuê Xe Limousine 9 Chỗ VIP", name_en: "VIP Limousine 9-seater (with Driver)", desc: "Đơn vị: Phú Quốc Travel • Có tài xế riêng.", desc_en: "Provider: Phu Quoc Travel • Private driver.", price: 2200000, type: "Ô tô", provider: "Phú Quốc Travel", image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80", gallery: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80"
    ] }
  ],
  hotel: [
    { id: "ht-ab-1", category: "hotel", name: "Sun Horizon Beachfront Villa", name_en: "Sun Horizon Beachfront Villa", desc: "Chủ nhà: Minh Thư • 4.9⭐ (Bãi Trường) • Tối đa 6 khách.", desc_en: "Host: Minh Thu • 4.9⭐ (Bai Truong) • Max 6 guests.", price: 2800000, host: "Minh Thư", rating: 4.9, address: "Bãi Trường", maxGuests: 6, image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80", youtube: "https://www.youtube.com/watch?v=2Tz89U3NPh4", gallery: [
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80"
    ] },
    { id: "ht-ab-2", category: "hotel", name: "Urban Green Oasis Apartment", name_en: "Urban Green Oasis Apartment", desc: "Chủ nhà: Anh Hoàng • 4.8⭐ (Dương Đông) • Tối đa 2 khách.", desc_en: "Host: Mr. Hoang • 4.8⭐ (Duong Dong) • Max 2 guests.", price: 950000, host: "Anh Hoàng", rating: 4.8, address: "Dương Đông", maxGuests: 2, image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80", youtube: "https://www.youtube.com/watch?v=5Uf3sP5MWhA", gallery: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=600&q=80"
    ] },
    { id: "ht-ab-3", category: "hotel", name: "Coastal Eco-Lodge Homestay", name_en: "Coastal Eco-Lodge Homestay", desc: "Chủ nhà: Chị Lan • 4.7⭐ (Hàm Ninh) • Tối đa 3 khách.", desc_en: "Host: Ms. Lan • 4.7⭐ (Ham Ninh) • Max 3 guests.", price: 400000, host: "Chị Lan", rating: 4.7, address: "Hàm Ninh", maxGuests: 3, image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=600&q=80", youtube: "https://www.youtube.com/watch?v=Xw21r1G4rEw", gallery: [
      "https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80"
    ] },
    { id: "ht-ab-4", category: "hotel", name: "Luxury Sunset View Penthouse", name_en: "Luxury Sunset View Penthouse", desc: "Chủ nhà: Quang Huy • 4.9⭐ (Bãi Trường) • Tối đa 2 khách.", desc_en: "Host: Quang Huy • 4.9⭐ (Bai Truong) • Max 2 guests.", price: 1350000, host: "Quang Huy", rating: 4.9, address: "Bãi Trường", maxGuests: 2, image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80", youtube: "https://www.youtube.com/watch?v=Xw21r1G4rEw", gallery: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80"
    ] }
  ],
  dining: [
    { id: "dn-rh-1", category: "dining", name: "Nhà hàng Sông Xanh", name_en: "Song Xanh Restaurant", desc: "Hải sản cơm niêu • Địa chỉ: Dương Đông.", desc_en: "Local seafood claypot rice • Loc: Duong Dong.", price: 250000, menu: "Lẩu cá bớp, gỏi cá trích, cơm niêu", address: "Dương Đông", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80", youtube: "https://www.youtube.com/watch?v=S8L3k6N31wY", gallery: [
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80"
    ] },
    { id: "dn-tk-1", category: "dining", name: "Quán Bè Nổi Thuận Kiều", name_en: "Thuan Kieu Floating Raft Restaurant", desc: "Ghẹ hấp Hàm Ninh, hải sản lẩu • Địa chỉ: Rạch Vẹm.", desc_en: "Ham Ninh crabs, fresh hotpot • Loc: Rach Vem.", price: 450000, menu: "Ghẹ hấp sả, lẩu hải sản bè nổi, tôm nướng", address: "Làng chài Rạch Vẹm", image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80", youtube: "https://www.youtube.com/watch?v=S8L3k6N31wY", gallery: [
      "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600&q=80"
    ] },
    { id: "dn-cb-1", category: "dining", name: "Buffet Hải Sản Cát Biển", name_en: "Cat Bien Seafood Buffet BBQ", desc: "50+ loại hải sản nướng tự chọn • Địa chỉ: Chợ Đêm.", desc_en: "50+ items grilled buffet • Loc: Night Market.", price: 299000, menu: "Buffet hải sản nướng tự chọn", address: "Chợ đêm Phú Quốc", image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80", youtube: "https://www.youtube.com/watch?v=S8L3k6N31wY", gallery: [
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80"
    ] },
    { id: "dn-th-1", category: "dining", name: "Nhà hàng Fine Dining Treehouse", name_en: "Treehouse Fine Dining Cape", desc: "Ẩm thực Âu - Việt cao cấp • Địa chỉ: Bãi Trường.", desc_en: "Premium fusion 5-course dinner • Loc: Bai Truong.", price: 1200000, menu: "Fine dining 5 món cao cấp", address: "Bãi Trường", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600&q=80", youtube: "https://www.youtube.com/watch?v=S8L3k6N31wY", gallery: [
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"
    ] }
  ],
  activity: [
    { id: "act-1", category: "activity", name: "Vé trọn gói Cano 5 Đảo VIP", name_en: "VIP Cano 5 Islands Ticket", desc: "Cáp treo Hòn Thơm, công viên nước Aquatopia.", desc_en: "Hon Thom Cable Car, Aquatopia Waterpark access.", price: 1090000, image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80", youtube: "https://www.youtube.com/watch?v=3-M9X_zHqS4", gallery: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=600&q=80"
    ] },
    { id: "act-2", category: "activity", name: "Vé VinWonders & Safari Phú Quốc", name_en: "VinWonders & Safari Combo Ticket", desc: "Thủy cung, trò chơi cảm giác mạnh, xem xiếc thú.", desc_en: "Water park, safari zoo, adventure rides.", price: 1350000, image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80", gallery: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80"
    ] },
    { id: "act-3", category: "activity", name: "Trải nghiệm đánh cá cùng ngư dân", name_en: "Fisherman Local Net Fishing Tour", desc: "Đi tàu gỗ, thả lưới và nướng cá dã ngoại bãi cát.", desc_en: "Cast nets, cook catch on fire at wilderness beach.", price: 950000, image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80", youtube: "https://www.youtube.com/watch?v=3-M9X_zHqS4", gallery: [
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80"
    ] },
    { id: "act-4", category: "activity", name: "Tour ngắm hoàng hôn & câu mực đêm", name_en: "Night Squid Fishing Cruise", desc: "Câu mực đêm dưới đèn cao áp và ăn tối mực hấp.", desc_en: "Watch sunset, catch squid under spotlight, squid porridge.", price: 450000, image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=600&q=80", youtube: "https://www.youtube.com/watch?v=3-M9X_zHqS4", gallery: [
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80"
    ] }
  ]
};
