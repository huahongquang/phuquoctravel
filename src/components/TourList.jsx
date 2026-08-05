import React, { useState } from "react";
import TourCard from "./TourCard";
import { toursData } from "../data/toursData";
import { translations } from "../data/translations";

export default function TourList({ onBookClick, onDetailClick, tours, language }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const t = translations[language || "vi"];

  const filterItems = [
    { id: "all", label: t.filter_all },
    { id: "adventure", label: t.filter_adv },
    { id: "nature", label: t.filter_nat },
    { id: "culture", label: t.filter_cul },
    { id: "leisure", label: t.filter_lei }
  ];

  const filteredTours = activeFilter === "all"
    ? (tours || toursData)
    : (tours || toursData).filter(tour => tour.category === activeFilter);

  return (
    <section id="tours" className="tours-section">
      <div className="container">
        <h2 className="section-title">{t.tours_title}</h2>
        <p className="section-subtitle">{t.tours_subtitle}</p>

        {/* Filter Tabs */}
        <div className="filter-bar">
          {filterItems.map((tab) => (
            <button
              key={tab.id}
              className={`filter-btn ${activeFilter === tab.id ? "active" : ""}`}
              onClick={() => setActiveFilter(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tours Grid */}
        <div className="tours-grid">
          {filteredTours.map((tour) => (
            <TourCard 
              key={tour.id} 
              tour={tour} 
              onBookClick={onBookClick} 
              onDetailClick={onDetailClick} 
              language={language} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
