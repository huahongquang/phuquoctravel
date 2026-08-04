import React, { useState } from "react";
import TourCard from "./TourCard";
import { toursData } from "../data/toursData";

export default function TourList({ onBookClick }) {
  const [activeFilter, setActiveFilter] = useState("all");

  const filterItems = [
    { id: "all", label: "Tất cả các tour" },
    { id: "adventure", label: "Cano & Cáp treo" },
    { id: "nature", label: "Thiên nhiên & Rạch Vẹm" },
    { id: "culture", label: "Lịch sử & Điểm đến" },
    { id: "leisure", label: "Hoàng hôn & Câu mực" }
  ];

  const filteredTours = activeFilter === "all"
    ? toursData
    : toursData.filter(tour => tour.category === activeFilter);

  return (
    <section id="tours" className="tours-section">
      <div className="container">
        <h2 className="section-title">Tour Trải Nghiệm Phú Quốc</h2>
        <p className="section-subtitle">
          Danh sách các tour được thiết kế chuyên nghiệp, trọn gói, giúp bạn tận hưởng trọn vẹn từng khoảnh khắc tại Đảo Ngọc.
        </p>

        <div className="filter-bar">
          {filterItems.map((item) => (
            <button
              key={item.id}
              className={`filter-btn ${activeFilter === item.id ? "active" : ""}`}
              onClick={() => setActiveFilter(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="tours-grid">
          {filteredTours.map((tour) => (
            <TourCard 
              key={tour.id} 
              tour={tour} 
              onBookClick={onBookClick} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
