import React, { useState, useEffect } from "react";
import CardDetails from "../customComponents/ViewCreditCardEle";
import axios from "axios";


const ViewCreditCard = ({onCardClick}) => {
  const [cardList, setCardList] = useState([]);

  useEffect(() => {
    const fetchCardData = async () => {
      const username = localStorage.getItem("username");
      try {
        const response = await axios.get(
          `http://localhost:9000/cards/get/${username}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );
        setCardList(response.data);
        console.log("Response data:", response.data);
      } catch (error) {
        console.error("Error fetching card data:", error);
      }
    };

    fetchCardData();
  }, []);

  const handleCardClick = (cardData) => {
    console.log("Clicked card data:", cardData);
    onCardClick(cardData);
  };

  return (
    <div>
      {cardList.map((card, index) => (
        <CardDetails key={index} cardData={card} onClick={handleCardClick} />
      ))}
    </div>
  );
};

export default ViewCreditCard;
