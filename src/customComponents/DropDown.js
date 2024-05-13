import React from "react";
import "./Component.css";

function DropDown(props) {
  const { options, value, onChange } = props;

  return (
    <select value={value} onChange={onChange}>
      {options?.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export default DropDown;
