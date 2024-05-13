import React, { useState } from "react";
import { Card, CardBody, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "../Styling/CreditCard.css";
import CreditCardImage from "../images/CardImage.png";
import axios from "axios";

const CardDetails = ({ cardData }) => {
  const [showMaskedNumber, setShowMaskedNumber] = useState(true);
  const [collapsed, setCollapsed] = useState(true);
  const [deleted, setDeleted] = useState(false); // State to manage deletion

  const toggleMask = () => {
    setShowMaskedNumber((prevState) => !prevState);
  };

  const toggleCollapse = () => {
    setCollapsed((prevState) => !prevState);
  };

  const maskCardNumber = (cardNumber) => {
    const cardNumberString = String(cardNumber);
    const lastFourDigits = cardNumberString.slice(-4);
    const maskedDigits = "**** **** **** ";
    return showMaskedNumber ? maskedDigits + lastFourDigits : cardNumber;
  };

  const maskCVV = (cvv) => {
    const cvvString = String(cvv);
    const maskedCVV = showMaskedNumber
      ? "*".repeat(cvvString.length)
      : cvvString;
    return maskedCVV;
  };

  const deleteCard = () => {
    const username = localStorage.getItem("username");
    axios
      .delete(
        `http://localhost:9000/cards/${username}/${cardData.cardId}`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
      }
      )
      .then(() => {
        console.log("Card deleted successfully");
        setDeleted(true); // Set deleted state to true
      })
      .catch((error) => {
        console.error("Error deleting card:", error);
      });
  };

  if (deleted) {
    return null; // If the card is deleted, return null to remove the component
  }

  return (
    <Card className="card-container">
      <CardBody>
        <div className="card-number">
          <img
            src={CreditCardImage}
            alt="Credit Card"
            className="credit-card-image"
          />
          <span className="label">Card Number</span>
          <span className="value">
            {maskCardNumber(cardData.cardNumber)}{" "}
            {!collapsed && (
              <FontAwesomeIcon
                icon={showMaskedNumber ? faEyeSlash : faEye}
                className="eye-icon"
                onClick={toggleMask}
              />
            )}
          </span>
          <div className="button-container">
            <Button color="primary" onClick={toggleCollapse}>
              {collapsed ? "Expand" : "Collapse"}
            </Button>
            <Button color="danger" onClick={deleteCard}>
              Delete
            </Button>
          </div>
        </div>
        {!collapsed && (
          <>
            <div className="card-holder">
              <span className="label">Card Holder</span>
              <span className="value">{cardData.cardholderName}</span>
            </div>
            <div className="expiration-cvv">
              <div className="expiration">
                <span className="label">Expiration</span>
                <span className="value">{cardData.expiryDate}</span>
              </div>
              <div className="cvv">
                <span className="label">CVV</span>
                <span className="value">{maskCVV(cardData.cvv)}</span>
              </div>
            </div>
          </>
        )}
      </CardBody>
    </Card>
  );
};

export default CardDetails;
