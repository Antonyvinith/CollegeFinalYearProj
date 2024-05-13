import React from "react";
import { Button } from "react-bootstrap";
import "./Component.css";
import { useNavigate } from "react-router-dom";

function Redirect() {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("button clicked");
    navigate("/");
  };

  return (
    <>
      <div
        style={{ paddingTop: 200, paddingLeft: 375, justifyContent: "center" }}
      >
        <h3>Oops, you need to login first. Click here!</h3>
      </div>
      <center>
        <Button onClick={handleClick} variant="dark">
          Redirect
        </Button>
      </center>
    </>
  );
}

export default Redirect;
