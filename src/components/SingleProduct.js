import { Card, Button } from "react-bootstrap";
import "../Styling/SingleProduct.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const SingleProduct = ({ prod }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cart = [] } = useSelector((state) => state.Cart);

  const [quantity, setQuantity] = useState(1);

  const detailsPage = (prod) => {
    console.log(prod);
    navigate("/details", { state: { prod } });
  };

  const incrementQty = () => {
    if (quantity < 9) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const decrementQty = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const addToCart = () => {
    if (!prod.manufactureDate) {
      return; // Don't add to cart if product is out of stock
    }
    dispatch({
      type: "ADD_TO_CART",
      payload: { ...prod, qty: quantity },
    });
  };

  const existingProduct = cart.find(
    (product) => product.productReference === prod.productReference
  );

  return (
    <div className="products">
      <Card>
        <Card.Img
          onClick={() => detailsPage(prod)}
          variant="top"
          src={prod.imageUrls[0].url}
          alt={prod.brand}
          style={{ width: "100%", height: "auto" }}
        />
        <Card.Body onClick={() => detailsPage(prod)}>
          <center>
            <Card.Title className="ellipsis-text">{prod.brand}</Card.Title>
            <Card.Text className="ellipsis-text">
              {prod.productReference}{" "}
            </Card.Text>
            <Card.Text className="ellipsis-text">₹ {prod.price}</Card.Text>
          </center>
        </Card.Body>

        <div className="product-controls">
          <div className="quantity-controls">
            <Button
              size="sm"
              variant="secondary"
              onClick={decrementQty}
              disabled={quantity <= 1}
            >
              -
            </Button>
            <span>{quantity}</span>
            <Button
              size="sm"
              variant="secondary"
              onClick={incrementQty}
              disabled={quantity >= 9}
            >
              +
            </Button>
          </div>

          {existingProduct ? (
            <Button size="sm" variant="secondary">
              Added
            </Button>
          ) : (
            <Button
              size="sm"
              variant="primary"
              onClick={addToCart}
              disabled={!prod.manufactureDate}
            >
              {!prod.manufactureDate ? "Out of Stock" : "Add to Cart"}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default SingleProduct;

