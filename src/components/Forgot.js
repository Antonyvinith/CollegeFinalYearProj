import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styling/Auth.css";
import { Button, InputGroup, Form } from "react-bootstrap";
import Input from "../customComponents/Input";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }
  const handleSubmit = () => {
    if (validateEmail(email)) {
      alert("A password reset link has been sent to your email.");
      navigate("/");
    } else {
      alert("Invalid email. Enter valid one.");
    }
  };

  return (
    <div className="wrapper">
      <div className="backgroundForgot"></div>
      <div className="login-container">
        <div className="login">
          <center>
            <b className="blogin">Password Reset</b> <br />
            <br />
            <br />
          </center>
          <center>
            <Input
              text={"Email"}
              placeholder={"Enter your email"}
              value={email}
              func={setEmail}
              type={"email"}
            />
            <Button size="sg" variant="secondary" onClick={handleSubmit}>
              Submit
            </Button>
          </center>
        </div>
      </div>
    </div>
  );
};
export default Forgot;
