import React, { useState } from "react";
import "../Styling/cards.css";
import axios from "axios";
import { Button } from "reactstrap";
import { useEffect } from "react";
import {  FormGroup, Label, Input } from "reactstrap";
import "../Styling/save.css"

import ViewCards from "../components/ViewCreditCard";

function PaymentForm() {
  const [cardholderName, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiration] = useState("");
  const [cvv, setSecurityCode] = useState("");
  const [errors, setErrors] = useState({});
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [selectedCard, setSelectedCard] = useState(""); 
  const [saveCard, setSaveCard] = useState(false);

  const [firstName, setFirstName] = useState(
    localStorage.getItem("firstName") || ""
  );
  const toggleCardDetails = () => {
    setShowCardDetails(!showCardDetails);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleCardNumberChange = (e) => {
    setCardNumber(e.target.value);
  };

  const handleExpirationChange = (e) => {
    setExpiration(e.target.value);
  };

  const handleSecurityCodeChange = (e) => {
    setSecurityCode(e.target.value);
  };
  const handleCardClick = (cardData) => {
    //console.log("Clicked card data:", cardData);
    setSelectedCard(cardData);
    console.log("Selected card after click:", selectedCard);
    setName(cardData.cardholderName);
    setCardNumber(cardData.cardNumber);
    setExpiration(cardData.expiryDate);
    setSecurityCode(cardData.cvv);
  };

  useEffect(() => {
    console.log("Selected card in useEffect:", selectedCard);
  }, [selectedCard]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    if (!cardholderName.trim()) {
      errors.name = "Name is required";
    } else if (!/^[a-zA-Z ]+$/.test(cardholderName)) {
      errors.name = "Name must contain only letters and spaces";
    }

    if (!cardNumber.trim()) {
      errors.cardNumber = "Card number is required";
    } else if (!/^\d+$/.test(cardNumber)) {
      errors.cardNumber = "Card number must contain only digits";
    } else if (cardNumber.length !== 16) {
      errors.cardNumber = "Card number must be 16 digits long";
    }
    if (!expiryDate.trim()) {
      errors.expiration = "Expiration date is required";
    } else if (!/^\d{2}-\d{4}$/.test(expiryDate)) {
      errors.expiration = "Expiration date must be in MM-YYYY format";
    }
    if (!cvv.trim()) {
      errors.securityCode = "Security code is required";
    } else if (!/^\d{3}$/.test(cvv)) {
      errors.securityCode = "Security code must be 3 digits long";
    }

    setErrors(errors);
    const data = {
      cardholderName: cardholderName,
      cardNumber: cardNumber,
      expiryDate: expiryDate,
      cvv: cvv,
      username: firstName,
    };

    // If no errors, submit form and make the API call
    if (Object.keys(errors).length === 0) {
      console.log("name", firstName);
      console.log(localStorage.getItem("token"))
      try {
        // Make the POST API call
        axios.post("http://localhost:9000/cards",data,{
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          }
        });
        // Handle success response if needed
        console.log("Payment details submitted successfully!");
      } catch (error) {
        // Handle error response
        console.error("Error submitting payment details:", error.message);
      }
    }
  };
  return (
    <div className="containe">
      <h5>Payment Information</h5>
      <form onSubmit={handleSubmit}>
        <div className="form-groupss">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            value={cardholderName}
            onChange={handleNameChange}
          />
          {errors.name && <div className="error-message">{errors.name}</div>}
        </div>
        <div className="form-groupss">
          <label htmlFor="cardNumber">Card Number</label>
          <div className="input-group">
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              placeholder="Enter your card number"
              value={cardNumber}
              onChange={handleCardNumberChange}
            />
          </div>
          {errors.cardNumber && (
            <div className="error-message">{errors.cardNumber}</div>
          )}
        </div>
        <div className="expiration-security">
          <div className="form-groupss">
            <label htmlFor="expiration">Expiration (mm-yyyy)</label>
            <input
              type="text"
              id="expiration"
              name="expiration"
              placeholder="MM-YYYY"
              value={expiryDate}
              onChange={handleExpirationChange}
            />
            {errors.expiration && (
              <div className="error-message">{errors.expiration}</div>
            )}
          </div>
          <div className="form-groupss">
            <label htmlFor="securityCode">Security Code</label>
            <input
              type="text"
              id="securityCode"
              name="securityCode"
              placeholder="Security Code"
              value={cvv}
              onChange={handleSecurityCodeChange}
            />
            {errors.securityCode && (
              <div className="error-message">{errors.securityCode}</div>
            )}
          </div>
        </div>
        <div className="ships-container">
          <FormGroup check>
          <div className="ships-option">
            <Label check>
              <Input
                type="checkbox"
                checked={saveCard}
                onClick={handleSubmit} // Toggle saveCard value
              />{" "}
              Save Card
            </Label>
            </div>
          </FormGroup>
        </div>
      </form>
      <div style={{ marginTop: "20px" }}>
        <Button color="primary" onClick={toggleCardDetails}>
          {showCardDetails ? "Hide Saved Cards" : "View Saved Cards"}
        </Button>
      </div>
      {showCardDetails && <ViewCards onCardClick={handleCardClick} />}

    </div>
  );
}

export default PaymentForm;
