

import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "../Styling/Address.css";

function AddressPopup({ onClose }) {
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [pinCode, setPincode] = useState("");
  const [firstName, setFirstName] = useState(
    localStorage.getItem("firstName") || ""
  );
  const [pincodeError, setPincodeError] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");

  const handleLine1Change = (event) => {
    setLine1(event.target.value);
  };

  const handleLine2Change = (event) => {
    setLine2(event.target.value);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleStateChange = (event) => {
    setState(event.target.value);
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handlePincodeChange = (event) => {
    const value = event.target.value;
    if (value.length === 0 || /^[0-9]{1,6}$/.test(value)) {
      setPincode(value);
      setPincodeError("");
    } else {
      setPincodeError("Pincode should be a 6-digit number.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!pinCode || pinCode.length !== 6) {
      setPincodeError("Pincode is required and should be a 6-digit number.");
      return;
    }

    const data = {
      line1: line1,
      line2: line2,
      city: city,
      state: state,
      country: country,
      pinCode: pinCode,
      username: firstName,
    };

    axios
      .post("http://localhost:9000/addresses", data,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type":"application/json"
        },
        withCredentials:true,
      })
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          onClose();
          setShippingAddress(res.data.line1);
          setShippingAddress(res.data.line2);
          setShippingAddress(res.data.city);
          setShippingAddress(res.data.state);
          setShippingAddress(res.data.country);
          setShippingAddress(res.data.pinCode);

          localStorage.setItem(
            "line1",
            res.data.responseData.line1
          );
          localStorage.setItem(
            "line2",
            res.data.responseData.line2
          );
          localStorage.setItem(
            "city",
            res.data.responseData.city
          );
          localStorage.setItem(
            "state",
            res.data.responseData.state
          );
          localStorage.setItem(
            "country",
            res.data.responseData.country
          );
          localStorage.setItem(
            "pincode",
            res.data.responseData.pinCode
          );
          // Close the component after successful submission
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log("error: ", err);
        // Handle error, maybe show an error message to the user
      });
  };

  return (
    <div className="containerr">
      <div className="input-groups">
      <div className="form-groups">
        <input
          placeholder="Line 1"
          type="text"
          value={line1}
          onChange={handleLine1Change}
        />
        
        <input
          placeholder="Line 2"
          type="text"
          value={line2}
          onChange={handleLine2Change}
        />
        </div>
        <div className="input-groups">
          <div className="haf-widthh">
            <input
              placeholder="City"
              type="text"
              value={city}
              onChange={handleCityChange}
            />
          </div>
          <div className="half-widthh">
            <input
              placeholder="State"
              type="text"
              value={state}
              onChange={handleStateChange}
            />
          </div>
        </div>
        <div className="input-groups">
          <div className="half-widthh">
            <input 
              placeholder="Country"
              type="text"
              value={country}
              onChange={handleCountryChange}
            />
          </div>
          <div className="half-widthh">
            <input
              placeholder="Pin Code"
              type="text"
              value={pinCode}
              onChange={handlePincodeChange}
            />
            {pincodeError && <p className="error">{pincodeError}</p>}
          </div>
        </div>
        
        <div className="button-groups">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddressPopup;
