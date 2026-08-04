import React from "react";
import { X, Trash2, Calendar, Users, ShoppingBag } from "lucide-react";

export default function Cart({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onCheckoutClick
}) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  const total = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);

  return (
    <div className={`cart-drawer-overlay ${isOpen ? "open" : ""}`} onClick={onClose}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h3>
            <ShoppingBag size={22} />
            Hành Trình Của Bạn
          </h3>
          <button className="close-cart-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="cart-body">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <ShoppingBag size={48} style={{ opacity: 0.3, marginBottom: "16px", color: "var(--primary)" }} />
              <p>Hành trình của bạn đang trống.</p>
              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "4px" }}>
                Hãy chọn các tour du lịch trải nghiệm hoặc nhờ AI tư vấn để bắt đầu lên lịch trình nhé!
              </p>
            </div>
          ) : (
            cartItems.map((item, idx) => (
              <div key={idx} className="cart-item">
                <div className="cart-item-info">
                  <h4 className="cart-item-title">{item.tourName}</h4>
                  
                  <div className="cart-item-details" style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "6px" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <Calendar size={12} />
                      {new Date(item.date).toLocaleDateString("vi-VN")}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <Users size={12} />
                      {item.adults} NL {item.children > 0 && `, ${item.children} TE`}
                    </span>
                  </div>
                  
                  <div className="cart-item-price" style={{ marginTop: "10px" }}>
                    {formatPrice(item.totalPrice)} đ
                  </div>
                </div>

                <button
                  className="remove-cart-item"
                  onClick={() => onRemoveItem(idx)}
                  aria-label="Xóa tour khỏi giỏ"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-summary-row">
              <span>Tổng số tiền:</span>
              <span className="total-price">{formatPrice(total)} đ</span>
            </div>
            <button className="btn btn-accent checkout-btn" onClick={onCheckoutClick}>
              Xác Nhận Hành Trình & Đặt Chỗ
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
