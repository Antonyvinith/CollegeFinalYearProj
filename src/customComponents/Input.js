import React from "react";
import { InputGroup, Form } from "react-bootstrap";
import { useState } from "react";

const Input = (props) => {
  const { text, placeholder, func, type, Error, Id , Errormsg} = props;
  const [value, setValue] = useState(props.value || "");

  // const handleChange = (e) => {
  //   setValue(e.target.value);
  //   func(e.target.value);
  // };

  const handleChange=(e)=>{
    console.log(e.target.id)
    if(e.target.id=="firstname")
    {
      func(e.target.value);
      let regex=/^[a-zA-Z]{3,100}$/;
      let firstName= e.target.value;
      if(!regex.test(firstName)){
        Error("First Name is NOT valid");
      }
      else{
        Error("");
      }
    }
    if(e.target.id=="lastname")
    {
      func(e.target.value);
      let regex=/^[a-zA-Z]{0,100}$/;
      let lastName=e.target.value;
      if(!regex.test(lastName)){
        Error("Last Name is NOT valid");
      }
      else{
        Error("");
      }
    }

    if(e.target.id=="dob")
    {
      func(e.target.value);
      let regex=/\b(19\d{2}|20(?:0\d|1[0-9]|2[0-4]))-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])\b/;
      // let regex = /\b(19\d{2}|20(?:0\d|1[0-9]|202[0-3]))-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])\b/;


      let dob=e.target.value;
      if(!regex.test(dob)){
        Error("Date of Birth is NOT valid")
      }
      else{
        Error("");
      }
    }

    if(e.target.id=="phone")
    {
      func(e.target.value);
      let regex=/^\d{10}$/;
      let phone=e.target.value;
      if(!regex.test(phone)){
        Error("Phone Number is NOT valid")
      }
      else{
        Error("");
      }
    }
    if(e.target.id=="email")
    {
      func(e.target.value);
      let regex=/^[a-zA-Z0-9._%+-]{3,100}@(?:gmail\.com|pivotree\.com)$/;
      let email=e.target.value;
      if(!regex.test(email)){
        Error("Email is NOT valid")
      }
      else{
        Error("");
      }
    }
    if(e.target.id=="username")
    {
      console.log(e.target.value);
      func(e.target.value);
      let regex=/^[a-zA-Z0-9_]{3,30}$/;
      let username=e.target.value;
      if(!regex.test(username)){
        Error("Username is NOT valid")
      }
      else{
        Error("");
      }
    }
    if(e.target.id=="password")
    {
      console.log(e.target.value);
      func(e.target.value);
      let regex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_=+\[\]{}|;:',.<>?]).{8,}$/;
      let password=e.target.value;
      if(!regex.test(password)){
        Error("Password is NOT valid")
      }
      else{
        Error("");
      }
    }
    

  }

  return (
    <div>
      <InputGroup className="mb-3">
        <InputGroup.Text className="custom-input-group-text" id="basic-addon1">
          {text}
        </InputGroup.Text>
        <Form.Control
          placeholder={placeholder}
          type={type}
          aria-label="Username"
          aria-describedby="basic-addon1"
          defaultValue={value}
          onChange={handleChange}
          id={Id}
          // required={"true"}
        />
      </InputGroup>
      <p className="ptag">{Errormsg}</p>
    </div>
  );
};

export default Input;
