// ViewCreditCard.jsx

import React from "react";
import { Card, CardBody } from "reactstrap";
import "../Styling/ViewCreditCard.css"; // Import the CSS file

const CardDetails = ({ cardData, onClick }) => {
  const handleClick = () => {
    onClick(cardData);
  };

  if (!cardData) {
    return null;
  }

  return (
    <Card className="card-container-View" onClick={handleClick}>
      <CardBody>
        <div className="card-info">
          <span className="label">Card Number:</span>
          <span className="value">{cardData.cardNumber}</span>
        </div>
        <div className="card-info">
          <span className="label">CVV:</span>
          <span className="value">{cardData.cvv}</span>
        </div>
      </CardBody>
    </Card>
  );
};

export default CardDetails;
