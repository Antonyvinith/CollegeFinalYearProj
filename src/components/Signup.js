import React, { useState } from "react";
import "./Signup.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import email_icon from "../images/envelope-at.svg";
import password_icon from "../images/lock.svg";
import person_icon from "../images/person-circle.svg";
import address_icon from "../images/geo-alt.svg";
import phone_icon from "../images/telephone.svg";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [valid, setValid] = useState(true);

  const handleChange = (event) => {
    const input = event.target.value;
    setPhoneNumber(input);
    setValid(validatePhoneNumber(input));
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberPattern = /^\+?[1-9]\d{1,14}$/;
    return phoneNumberPattern.test(phoneNumber);
  };

  return (
    <div className="wrapper">
      <div className="background"></div>

      <div className="login-container">
        <div className="container">
          <div className="header">
            <div className="text">Sign Up</div>
            <div className="underline"></div>
          </div>
          <div className="inputs">
            <div className="input">
              <img src={person_icon} />
              <input type="text" placeholder="Username" />
            </div>
            <div className="input">
              <img src={email_icon} />
              <input type="email" placeholder="Email" />
            </div>
            <div className="input">
              <img src={phone_icon} />
              <PhoneInput
                country={"in"}
                value={phoneNumber}
                onChange={handleChange}
                inputProps={{ required: true }}
              />
              {!valid && <p>Please enter a valid phone number.</p>}
            </div>
            <div className="input">
              <img src={address_icon} />
              <input type="text" placeholder="Address" />
            </div>
            <div className="input">
              <img src={password_icon} />
              <input type="password" placeholder="Password" />
            </div>
          </div>
          <div className="submit-container">
            <button className="submit">Sign-Up</button>
          </div>
          <div className="register-link">
            <center>
              <p>
                Already a user?<Link to="/">Click here!</Link>
              </p>
            </center>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Signup;
