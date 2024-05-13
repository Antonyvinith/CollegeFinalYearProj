import React from "react";
import "./Component.css";

function ProductItem(props) {
  console.log(props.item.imageUrls[0]
    );
    const imageUrl = props.item.imageUrls[0].url;
  

  return (
    <div style={{ flex: "0 0 calc(50% - 20px)" }}>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        <img
          src={imageUrl}
          alt={props.item.brand}
          style={{ height: "60px", width: "60px" }}
        />
        <div>{props.item.brand}</div>
        <div>Price: ₹ {props.item.price}</div>
        <div>Quantity: {props.item.qty}</div>
        <div>Product Total: ₹ {props.item.price * props.item.qty}</div>
      </div>
    </div>
  );
}

export default ProductItem;
