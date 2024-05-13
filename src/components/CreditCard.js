import React, { useState, useEffect } from "react";
import { CardTitle } from "reactstrap";
import CardDetails from "../customComponents/CreditCardElements";
import axios from "axios";

const CardComponent = () => {
  const username=localStorage.getItem("username")
  const url = `http://localhost:9000/cards/get/${username}`;
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        setCardData(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <>
      <CardTitle>
        <h2>Card Details</h2>
      </CardTitle>
      {cardData.map((card, index) => (
        <CardDetails key={index} cardData={card} />
      ))}
    </>
  );
};

export default CardComponent;
