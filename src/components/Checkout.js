
import React, { useContext, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import Header from "./Header";
import "../Styling/Checkout.css";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import RadioButton from "../customComponents/RadioButton";
import DropDown from "../customComponents/DropDown";
import Headings from "../customComponents/Headings";
import ProductItem from "../customComponents/ProductItem";
import Redirect from "../customComponents/Redirect";
import AddressPopup from "./Address";
import Input from "../customComponents/Input";
import axios from "axios";
import { CartState } from "../context/Context";
import style from "../Styling/addressModule.css";
import PaymentForm from "../customComponents/Cards";
import PaymentDetails from "./PaymentDetails";
import "../Styling/shipm.css";
import ShippingDetails from "./ShippingAddress"

const Checkout = () => {
  // const [email, setEmail] = useState("");
  const [deliveryType, setDeliveryType] = useState("");

  const [shippingAddress, setShippingAddress] = useState("");
  const [shippingMethod, setShippingMethod] = useState("STANDARD");
  // const [emailSubscription, setEmailSubscription] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("HD");
  const [billingAddress, setBillingAddress] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [showAddressPopup, setShowAddressPopup] = useState(false);
  const [submittedAddress, setSubmittedAddress] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showShippingDetails, setShowShippingDetails] = useState(false);

  const toggleShippingDetails = () => {
    setShowShippingDetails((prevState) => !prevState);
  };
  const handleCardPaymentClick = () => {
    setShowPaymentModal(true);
  };

  const handleClosePaymentModal = () => {
    setShowPaymentModal(false);
  };

  let productReference = "";
  let quantity = 0;
  let unitPrice = 0.0;
  let lineTotal = 0.0;

  const navigate = useNavigate();

  let totalAmount = 0;
  let shippingAmount = 100;
  const orderLines = [];

  const handleShippingAddressChange = (e) => {
    setShippingAddress(e.target.value);
    setBillingAddress(e.target.value);
  };

  const handleShippingMethodChange = (e) => setShippingMethod(e.target.value);
  const handlePaymentMethodChange = (e) => setPaymentMethod(e.target.value);
  const handleDiscountCodeChange = (e) => setDiscountCode(e.target.value);
  const handleDeliveryType = (e) => setDeliveryType(e.target.value);

  const clearCart = () => {
    cart = null;
  };

  const handlePlaceOrder = () => {
    const orderReference = crypto.randomUUID();
    
    const shippingAddress = {
      line1: localStorage.getItem("line1"),
      line2: localStorage.getItem("line2"),
      city: localStorage.getItem("city"),
      state: localStorage.getItem("state"),
      country: localStorage.getItem("country"),
      pinCode: localStorage.getItem("pincode"),
    };
    const billingAddress = shippingAddress;

    const Customer = {
      id: localStorage.getItem("customerID"),
    };
    const SelectedshippingAddress={
      line1:localStorage.getItem("SelectedAddress").line1,
      line2:localStorage.getItem("SelectedAddress").line2,
      city:localStorage.getItem("SelectedAddress").city,
      state:localStorage.getItem("SelectedAddress").state,
      country:localStorage.getItem("SelectedAddress").country,
      pinCode:localStorage.getItem("SelectedAddress").pincode,
      
    }
    console.log(localStorage.getItem("customerID"));

    if (localStorage.getItem("token")) {
      const obj=localStorage.getItem("SelectedAddress")
      console.log("value",obj)
      const url = "http://localhost:9000/order/createOrder";
      axios
        .post(
          url,
          {
            orderReference: orderReference,
            shippingAddress:SelectedshippingAddress,
            billingAddress: SelectedshippingAddress,
            orderType: paymentMethod,
            deliveryType: shippingMethod,
            customer: Customer,
            orderLines: orderLines,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        )
        .then((res) => {
          if (res.data) {
            console.log(res.data);

            setShippingMethod(res.data.shippingMethod);

            console.log(shippingMethod);
            localStorage.setItem("shipmethod", shippingMethod);

            // localStorage.setItem(
            //   "line2",
            //   res.data.responseData.line2
            // );

            console.log(shippingAddress);
            clearCart();
            navigate("/thankyou");
          } else {
            alert(res.data.message);
          }
        })
        .catch((err) => {
          console.log("error: ", err);
        });
    } else {
      alert("Session expired. Please login again.");
      localStorage.clear();
      navigate("/");
    }
  };

  const location = useLocation();
  let cart = location.state;

  console.log("cart details", cart);

  const handleCloseAddressPopup = () => {
    setShowAddressPopup(false);
  };

  const [showAddressFields, setShowAddressFields] = useState(false);

  const handleAddAddressClick = () => {
    setShowAddressFields(true);
  };

  const handleCloseAddressFields = () => {
    setShowAddressFields(false);
  };

  const handleSubmitAddress = (submittedAddressInfo) => {
    setSubmittedAddress(submittedAddressInfo);
    setShowAddressFields(false); // Hide the address fields after submission
  };

  return (
    <>
      <Header />
      {localStorage.getItem("token") ? (
        <>
          <div className={style.buttoncontainer}>
            <div
              style={{ display: "flex", marginTop: "80px" }}
              className="whole"
            >
              <div
                style={{
                  width: "60%",
                  position: "sticky",
                  top: 0,
                  maxHeight: "calc(100vh - 80px)",
                }}
                className="leftpart"
              >
                <div className="shipm">
                  <h2>Payment Method </h2>
                  <PaymentDetails />

                  {/* <RadioButton
                    names={["Card", "Cash On Delivery"]}
                    value={deliveryType}
                    onChange={setDeliveryType}
              
                  /> */}
                </div>

                <div className="shipm">
                  <h2>Shipment</h2>
                  <ShippingDetails/>
                
                  
                  <div style={{ marginTop: "10px" }}>
                    <Button color="primary" onClick={handleAddAddressClick}>
                      Add Address
                    </Button>
                  </div>
                  {showAddressFields && (
                    <div>
                      <AddressPopup
                        onSubmit={handleSubmitAddress}
                        onClose={handleCloseAddressFields}
                      />
                    </div>
                  )}
                </div>
                {submittedAddress && (
                  <div style={{ marginTop: "20px" }}>
                    <p>Submitted Address:</p>
                    <p>{submittedAddress}</p>
                  </div>
                )}

                <div className="ship-container">
                  {" "}
                  {/* Changed class name */}
                  <h2>Shipping Method</h2>
                  <div className="ship-option">
                    {" "}
                    {/* Changed class name */}
                    <input
                      type="radio"
                      value="STANDARD"
                      checked={shippingMethod === "STANDARD"}
                      onChange={handleShippingMethodChange}
                    />
                    <label>STANDARD</label>
                  </div>
                  <div className="ship-option">
                    {" "}
                    {/* Changed class name */}
                    <input
                      type="radio"
                      value="EXPRESS"
                      checked={shippingMethod === "EXPRESS"}
                      onChange={handleShippingMethodChange}
                    />
                    <label>EXPRESS</label>
                  </div>
                </div>
                <div className="ship-container">
                  {" "}
                  {/* Adding the "ship-option" class here */}
                  <h2>Order Type</h2>
                  <div className="ship-option">
                      <input
                        type="radio"
                        value="CC"
                        checked={paymentMethod === "CC"}
                        onChange={handlePaymentMethodChange}
                      />
                       <label>
                      CC
                    </label>
                  </div>
                  <div className="ship-option">
                   
                      <input
                        type="radio"
                        value="HD"
                        checked={paymentMethod === "HD"}
                        onChange={handlePaymentMethodChange}
                      />
                       <label>
                      HD
                    </label>
                  </div>
                </div>
              </div>

              <div style={{ width: "40%" }}>
                <div style={{ justifyContent: "center", marginLeft: "0px" }}>
                  <div
                    style={{
                      display: "-ms-inline-flexbox",
                      flexWrap: "wrap",
                      gap: "20px",
                    }}
                  >
                    {cart.map((item) => {
                      orderLines.push({
                        productReference: item.productReference,
                        quantity: item.qty,
                        lineTotal: item.qty * item.price,
                        unitPrice: item.price,
                      });
                      console.log(orderLines);
                      totalAmount += item.price * item.qty;
                      return <ProductItem item={item} />;
                    })}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    marginTop: "30px",
                    marginLeft: "0px",
                  }}
                >
                  <Input
                    text="Coupon"
                    placeholder="Enter Coupon code"
                    type="text"
                    value={discountCode}
                    func={handleDiscountCodeChange}
                  />
                  <Button
                    color="primary"
                    style={{
                      height: "35px",
                      marginTop: "0px",
                      paddingTop: "0px",
                      marginLeft: "20px",
                    }}
                  >
                    Apply
                  </Button>
                </div>

                <Headings
                  size={"20px"}
                  color={"red"}
                  text={"Subtotal: ₹"}
                  vars={totalAmount}
                />
                <Headings size={"20px"} color={"red"} text={"Shipping: ₹100"} />
                <Headings
                  size={"20px"}
                  color={"red"}
                  text={"Total: ₹"}
                  vars={totalAmount + shippingAmount}
                />

                <Button
                  color="primary"
                  onClick={handlePlaceOrder}
                  style={{ marginBottom: "20px", marginLeft: "0px" }}
                >
                  Place Order
                </Button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <Redirect />
        </>
      )}
      <Footer />
    </>
  );
};

export default Checkout;
