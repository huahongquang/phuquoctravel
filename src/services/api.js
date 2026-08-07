import { toursData } from "../data/toursData";
import { initialBuilderDatabase } from "../data/builderDatabase";
import { initialBlogData } from "../data/blogData";
import { initialGuidesData } from "../data/guidesData";

const KEYS = {
  TOURS: "pq_tours",
  DB_SERVICES: "pq_db_services",
  BLOGS: "pq_blogs",
  GUIDES: "pq_guides",
  BOOKINGS: "pq_bookings",
  SETTINGS: "pq_settings"
};

export const apiService = {
  // Load all databases
  initDatabase() {
    let tours = localStorage.getItem(KEYS.TOURS);
    if (!tours || !tours.includes("itinerary")) {
      localStorage.setItem(KEYS.TOURS, JSON.stringify(toursData));
    }

    let services = localStorage.getItem(KEYS.DB_SERVICES);
    if (!services || !services.includes("unsplash.com") || !services.includes("gallery") || !services.includes("dn-tk-1") || !services.includes("ht-ab-3")) {
      localStorage.setItem(KEYS.DB_SERVICES, JSON.stringify(initialBuilderDatabase));
    }

    let blogs = localStorage.getItem(KEYS.BLOGS);
    if (!blogs || !blogs.includes("title_en")) {
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

    let settings = localStorage.getItem(KEYS.SETTINGS);
    if (!settings) {
      const defaultSettings = {
        bankName: "MB Bank (Ngân hàng Quân đội)",
        accountNo: "0987654321",
        accountName: "CONG TY CO PHAN DU LICH PHU QUOC",
        qrType: "api",
        customQrUrl: "",
        base64Qr: "",
        bankId: "mb"
      };
      localStorage.setItem(KEYS.SETTINGS, JSON.stringify(defaultSettings));
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
  },

  getSettings() {
    const defaultSettings = {
      bankName: "MB Bank (Ngân hàng Quân đội)",
      accountNo: "0987654321",
      accountName: "CONG TY CO PHAN DU LICH PHU QUOC",
      qrType: "api",
      customQrUrl: "",
      base64Qr: "",
      bankId: "mb"
    };
    try {
      const stored = localStorage.getItem(KEYS.SETTINGS);
      return stored ? JSON.parse(stored) : defaultSettings;
    } catch (e) {
      return defaultSettings;
    }
  },

  saveSettings(settings) {
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
  }
};
