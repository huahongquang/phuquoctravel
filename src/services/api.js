import { toursData } from "../data/toursData";
import { initialBuilderDatabase } from "../data/builderDatabase";
import { initialBlogData } from "../data/blogData";
import { initialGuidesData } from "../data/guidesData";

const KEYS = {
  TOURS: "pq_tours",
  DB_SERVICES: "pq_db_services",
  BLOGS: "pq_blogs",
  GUIDES: "pq_guides",
  BOOKINGS: "pq_bookings"
};

export const apiService = {
  // Load all databases
  initDatabase() {
    let tours = localStorage.getItem(KEYS.TOURS);
    if (!tours || !tours.includes("name_en")) {
      localStorage.setItem(KEYS.TOURS, JSON.stringify(toursData));
    }

    let services = localStorage.getItem(KEYS.DB_SERVICES);
    if (!services || !services.includes("unsplash.com")) {
      localStorage.setItem(KEYS.DB_SERVICES, JSON.stringify(initialBuilderDatabase));
    }

    let blogs = localStorage.getItem(KEYS.BLOGS);
    if (!blogs) {
      localStorage.setItem(KEYS.BLOGS, JSON.stringify(initialBlogData));
    }

    let guides = localStorage.getItem(KEYS.GUIDES);
    if (!guides || !guides.includes("password")) {
      localStorage.setItem(KEYS.GUIDES, JSON.stringify(initialGuidesData));
    }

    let bookings = localStorage.getItem(KEYS.BOOKINGS);
    if (!bookings) {
      localStorage.setItem(KEYS.BOOKINGS, JSON.stringify([]));
    }
  },

  // Getters
  getTours() {
    return JSON.parse(localStorage.getItem(KEYS.TOURS)) || toursData;
  },

  getDbServices() {
    return JSON.parse(localStorage.getItem(KEYS.DB_SERVICES)) || initialBuilderDatabase;
  },

  getBlogs() {
    return JSON.parse(localStorage.getItem(KEYS.BLOGS)) || initialBlogData;
  },

  getGuides() {
    return JSON.parse(localStorage.getItem(KEYS.GUIDES)) || initialGuidesData;
  },

  getBookings() {
    return JSON.parse(localStorage.getItem(KEYS.BOOKINGS)) || [];
  },

  // Setters/Updates
  saveTours(tours) {
    localStorage.setItem(KEYS.TOURS, JSON.stringify(tours));
  },

  saveDbServices(services) {
    localStorage.setItem(KEYS.DB_SERVICES, JSON.stringify(services));
  },

  saveBlogs(blogs) {
    localStorage.setItem(KEYS.BLOGS, JSON.stringify(blogs));
  },

  saveGuides(guides) {
    localStorage.setItem(KEYS.GUIDES, JSON.stringify(guides));
  },

  saveBookings(bookings) {
    localStorage.setItem(KEYS.BOOKINGS, JSON.stringify(bookings));
  }
};
