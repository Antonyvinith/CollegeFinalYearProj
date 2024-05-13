// import React, { useState, useEffect } from "react";
// import Header from "./Header";
// import Footer from "./Footer";
// import Orderconfirmed from "./Orderconfirmed";
// import  "../Styling/Thankspage.css"


// const ThanksMsg = () => {
//   const [firstName, setFirstName] = useState("");
//   const [subtotal, setSubtotal] = useState("");
//   const [total, setTotal] = useState("");
//   const [email, setEmail] = useState("");
//   const [shippingAddress, setShippingAddress] = useState("");
//   const [shippingMethod, setShippingMethod] = useState("");
//   const storedShippingMethod = localStorage.getItem("shippingmethod");
//   console.log(storedShippingMethod)




//   useEffect(() => {
//     // Retrieve values from local storage when the component mounts
//     const storedFirstName = localStorage.getItem("firstName");
//     const storedSubtotal = localStorage.getItem("subtotal");
//     const storedTotal = localStorage.getItem("total");
//     const storedEmail = localStorage.getItem("email");
//     const storedShippingAddress = localStorage.getItem("shippingaddress");
//     const storedShippingMethod = localStorage.getItem("shippingMethod");

//     if (storedFirstName) {
//       setFirstName(storedFirstName);
//     }
//     if (storedSubtotal) {
//       setSubtotal(storedSubtotal);
//     }
//     if (storedTotal) {
//       setTotal(storedTotal);
//     }
//     if (storedEmail) {
//       setEmail(storedEmail);
//     }
//     if (storedShippingAddress) {
//       setShippingAddress(JSON.parse(storedShippingAddress));
//     }
//     if (storedShippingMethod) {
//       setShippingMethod(storedShippingMethod);
//     }
//   }, []);

//   return (
//     <>
//       <Header/>
//       <div className="order-confirmation">
//         <div className="thanks-msg">
//         Thank you, {firstName}!
//         </div>

//         <div className="order-confirmed">
//           <Orderconfirmed />
//         </div>
       
//         <div className="customer-information">
//           <div className="contact-info">
//             Contact Information: {email}
//           </div>
//           <div className="shipping-address">
//             Shipping Address: {shippingAddress}
//           </div>
//           <div className="shipping-method">
//             Shipping Method: {storedShippingMethod}
//           </div>
//         </div>
//         <div className="actions">
//           <button>Continue shopping</button>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default ThanksMsg;



import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Orderconfirmed from "./Orderconfirmed";
import "../Styling/Thankspage.css";
import { useNavigate } from "react-router-dom";

import Thankyouimg from "../images/Thankyouimg.png";

const ThanksMsg = () => {
  const navigate=useNavigate();
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [shippingMethod, setShippingMethod] = useState("");
  const [shippingAddress, setShippingAddress] = useState({
    line1: "",
    line2: "",
    state: "",
    city: "",
    country: "",
    pincode: 0
  });

  useEffect(() => {
    const obj=JSON.parse(localStorage.getItem("SelectedAddress"))
    // Retrieve values from local storage when the component mounts
    const storedFirstName = localStorage.getItem("firstName");
    const storedEmail = localStorage.getItem("email");
    
    const line1 = obj.line1
    console.log(line1);
    const line2 = obj.line2
    const state = obj.state
    const city = obj.city
    const country = obj.country
    const pincode = obj.pinCode
    setShippingMethod(localStorage.getItem("shipmethod"));


    // Update state with retrieved values
    if (storedFirstName) {
      setFirstName(storedFirstName);
    }
    if (storedEmail) {
      setEmail(storedEmail);
    }
    setShippingAddress({
      line1: line1 || "",
      line2: line2 || "",
      state: state || "",
      city: city || "",
      country: country || "",
      pincode: pincode || 0
    });
  }, []);

  

  function handleClick(){
    navigate("/catalog")
  }

  return (
    <>
      <Header />
      <div className="content-container">
        <div className="left-container">
          <div className="order-confirmation">
            <div className="thanks-msg">Thank you, {firstName}!</div>

            <div className="order-confirmed">
              <Orderconfirmed />
            </div>

            <div className="customer-information">
              <div className="contact-info">Contact Information: {email}</div>
              <div className="shipping-address">
                Shipping Address: {`${shippingAddress.line1}, ${shippingAddress.line2}, ${shippingAddress.city}, ${shippingAddress.state}, ${shippingAddress.country}, ${shippingAddress.pincode}`}
              </div>
              <div className="shipping-method">
                Shipping Method: {shippingMethod}
              </div>
            </div>
            <div className="actions">
              <button onClick={handleClick}>Continue shopping</button>
            </div>
          </div>
        </div>
        <div className="right-container">
          <div className="image-container">
            <img src={Thankyouimg} alt="Thank You Image" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ThanksMsg;
