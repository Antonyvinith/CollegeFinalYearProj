import Header from "./Header";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import "../Styling/Details.css";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import React from "react";

function Details() {
  const location = useLocation();
  const { prod } = location.state;

  const dispatch = useDispatch();

  const { cart = [] } = useSelector((state) => state.Cart);

  const [quantity, setQuantity] = useState(1);

  const addToCart = () => {
    const existingProduct = cart.find(
      (product) => product.productReference === prod.productReference
    );
    const updatedCart = cart.map((product) => {
      if (product.productReference === prod.productReference) {
        return {
          ...product,
          qty: quantity,
        };
      }
      return product;
    });
    if (existingProduct) {
      dispatch({
        type: "UPDATE_CART",
        payload: updatedCart,
      });
    } else {
      dispatch({
        type: "ADD_TO_CART",
        payload: { ...prod, qty: quantity },
      });
    }
  };

  const incrementQty = () => {
    if (quantity < 9) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQty = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="details-container">
      <Header />
      <div className="details-content">
        <div className="image-section">
          <img src={prod.imageUrls[0].url} alt="Product Image 1" />
          <img src={prod.imageUrls[1].url} alt="Product Image 2" />
          <img src={prod.imageUrls[2].url} alt="Product Image 3" />
        </div>
        <div className="details-section">
          <div className="product-details">
            {/* <h2>{prod.brand}</h2> */}
            <h2
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: "bold",
                color: "#333",
              }}
            >
              {prod.brand}
            </h2>

            <p style={{ fontWeight: "bold", color: "#666" }}>
              Product Reference:{" "}
              <span style={{ fontWeight: "normal" }}>
                {" "}
                {prod.productReference}
              </span>
            </p>

            <p style={{ fontWeight: "bold", color: "#666" }}>
              Price:{" "}
              <span style={{ fontWeight: "normal" }}>₹ {prod.price}</span>
            </p>
            <p style={{ fontWeight: "bold", color: "#666" }}>
              Description:{" "}
              <span style={{ fontWeight: "normal" }}>{prod.description}</span>
            </p>

            <p style={{ fontWeight: "bold", color: "#666" }}>Quantity </p>
            <div className="flex items-center">
              <div
                className="border border-gray-200 rounded p-2"
                style={{ width: "209px" }}
              >
                <div className="quantityPart flex justify-between items-center">
                  <button
                    className="bg-gray-200 p-1 rounded-l"
                    onClick={decrementQty}
                    disabled={quantity <= 1}
                    style={{ background: "darkgrey" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M20 12H4"
                      ></path>
                    </svg>
                  </button>
                  <div>{quantity}</div>
                  <button
                    className="bg-gray-200 p-1 rounded-r"
                    onClick={incrementQty}
                    disabled={quantity >= 9}
                    style={{ background: "darkgrey" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {cart.some((p) => p.productReference === prod.productReference) ? (
              <Button
                size="sm"
                variant="secondary"
                style={{
                  margin: "0px",
                  padding: "6px",
                  "margin-top": "12px",
                  "margin-left": "30px",
                  width: "158px",
                }}
                onClick={addToCart}
              >
                Update Cart
              </Button>
            ) : (
              <Button
                style={{
                  margin: "0px",
                  padding: "6px",
                  "margin-top": "12px",
                  "margin-left": "30px",
                  width: "158px",
                }}
                size="sm"
                variant="primary"
                color="" /* Dark grey color for Add to Cart */
                onClick={addToCart}
                disabled={!prod.manufactureDate}
              >
                {!prod.manufactureDate ? "Out of Stock" : "Add to Cart"}
              </Button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Details;
