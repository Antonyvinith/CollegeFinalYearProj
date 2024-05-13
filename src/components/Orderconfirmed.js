import React from "react";
import "../Styling/Thankspage.css";

const Orderconfirmed = () => {
  return (
    <div className="order-confirmed">
      <h3>
        <div className="checkmark">✔</div>Your order is confirmed
      </h3>
      <p>Your order is now confirmed and in process! We're getting everything ready for shipment</p>
    </div>
  );
};

export default Orderconfirmed;
