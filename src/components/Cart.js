import React, { useEffect, useState } from "react";
import { Button, Col, Image, ListGroup, Row } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { CartState } from "../context/Context";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import Redirect from "../customComponents/Redirect";
import { useSelector,useDispatch } from "react-redux";

const Cart = () => {
  const dispatch=useDispatch();
  const cart= useSelector((state) => state.Cart.cart);
  const [total, setTotal] = useState();

  useEffect(() => {
    setTotal(
      cart?.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
  }, [cart]);

  const decrementQty = (id) => {
    const updatedCart = cart?.map((item)=>{
      if(item?.productReference === id){
        return {
          ...item,
          qty : item?.qty - 1,
        }
      }
      console.log(item);
      return item;
    })


    dispatch({
      type: "UPDATE_CART",
      payload: updatedCart,
    });

  };

  const incrementQty = (id) => {
    const updatedCart = cart?.map((item)=>{
      if(item?.productReference === id){
        return {
          ...item,
          qty : item?.qty +1,
        }
      }
      console.log(item.qty);
      return item;
    })

    dispatch({
      type: "UPDATE_CART",
      payload: updatedCart,
    });
  };

  const deleteQty = (id) => {
    const updatedCart = cart?.map((item)=>{
      if(item?.productReference === id){
        return {
          ...item,
          qty : 0,
        }
      }
      return item;
    })

    dispatch({
      type: "UPDATE_CART",
      payload: updatedCart,
    });
  };
  console.log("in the cart page",cart);
  

  const navigate = useNavigate();
  const handleCheckOutClick=()=>{

    console.log("button clicked");
     navigate('/Checkout',{state:cart});


  };


  const imageUrl = "https://d2ob0iztsaxy5v.cloudfront.net/product/192317/1923177270_zm.jpg";

  return (
    <>
        { localStorage.getItem("token") ?
           

<div className="home">
      <Header />
      <div className="innerCart">
      {cart.length === 0 ? (
        <div className="empty-cart-message" style={{ justifyContent: "center", alignItems: "center",height:"60vh", marginTop:"100px",marginLeft:"500px"}}>
        <div style={{ textAlign: "center" }}>
          <h3>Your cart is empty</h3>
          <p>Add some products to your cart to get started!</p>
        </div>
      </div>
      ) : (
        <>
      <div className="productContainer" style={{marginTop:"10px", marginLeft: "10px"}}>
        <ListGroup>
          {cart?.map((prod) => (
            <ListGroup.Item key={prod.productReference} style={{marginBottom: "15px", borderTopWidth: "1px"}}>
              <Row>
                <Col md={2}>
                  <Image src={prod.imageUrls[0].url} alt={prod.brand} fluid rounded />
                </Col>
                <Col md={2}>
                  <span>{prod.brand}</span>
                </Col>
                <Col md={2}>₹ {prod.price}</Col>
                
                <Col md={2}>
                  <div className="d-flex align-items-center">
                    <Button
                      variant="secondary"
                      onClick={() => decrementQty(prod.productReference)}
                      disabled={prod.qty <= 1}
                    >
                      -
                    </Button>
                    <span className="mx-2">{prod.qty}</span>
                    <Button
                      variant="secondary"
                      onClick={() => incrementQty(prod.productReference)}
                      disabled={prod.qty >= 9}
                    >
                      +
                    </Button>
                  </div>
              
                </Col>
                <Col md={2}>

                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_FROM_CART",
                        payload: prod,
                      })
                    }
                  >
                    <AiFillDelete fontSize="20px" />
                  </Button>
                </Col>
                <Col md={2}>Line Total: ₹ {prod.price*prod.qty}</Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
        
      </div>
      </> 
      )}
      {cart.length !== 0 && (
  <div className="filters summary" style={{position:"sticky",top:"90px"}}>
    <span className="title">Subtotal ({cart.length}) items</span>
    
    <div className="total">
    <span style={{ fontWeight: 700, fontSize: 20 }}>Total: ₹ {total}</span>
    <Button variant="secondary" type="button"  onClick={handleCheckOutClick}>
      Proceed to Checkout
    </Button>
    </div>
  </div>
)}
      </div>
      <Footer/>
    </div>
            : 
              <Redirect/>
        }         
</>
    
  );
};

export default Cart;
