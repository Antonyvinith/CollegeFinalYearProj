import React from "react";
import { useState } from "react";
function RadioButton(props) {
  const [rSelected, setRSelected] = useState(null);
  const handleButtonClick = (index) => {
    setRSelected(index);
  };
  return (
    <div>
      {props?.names?.map((name, index) => (
        <div key={index}>
          <label>
            <input
              type="radio"
              value={name}
              onClick={() => handleButtonClick(index)}
              checked={rSelected === index}
            />
            <span style={{ marginLeft: "5px" }}>{name}</span>
          </label>
        </div>
      ))}
    </div>
  );
}
export default RadioButton;
