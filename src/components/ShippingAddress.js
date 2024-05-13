import React, { useState, useEffect } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import axios from "axios";
import "../Styling/ListComponent.css";

const ListComponent = () => {
  const [jsonData, setJsonData] = useState([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);


  const handleAddressClick=(item,index)=>{
    localStorage.setItem("SelectedAddress",JSON.stringify(item))
    console.log(item.line1);
    setSelectedItemIndex(index);
  }
  
  useEffect(() => {
    const fetchData = async () => {
      const username = localStorage.getItem("username");
      try {
        const response = await axios.get(`http://localhost:9000/addresses/${username}`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          }
        });
        setJsonData(response.data);
      } catch (error) {
        console.error("Error fetching address data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <ListGroup className="list-container">
      {jsonData.map((item, index) => (
        <ListGroupItem 
          key={index}
          className={`list-item ${selectedItemIndex === index ? 'clicked' : ''}`}
          onClick={() => handleAddressClick(item,index)}
        >
          <h5 className="item-title">{item.addressType}</h5>
          <p className="item-description">
            {item.line1}, {item.line2}
            <br />
            {item.city}, {item.state}, {item.country}
            <br />
            {item.pinCode}
          </p>
        </ListGroupItem>
      ))}
    </ListGroup>
  );
};

export default ListComponent;
