import React from "react";
import "./Component.css";

function Headings(props) {
  const { size, color, text, vars } = props;
  return (
    <div
      style={{
        color: { color },
        fontSize: { size },
        fontWeight: "bold",
        marginTop: "5px",
      }}
    >
      {text}
      {vars}
    </div>
  );
}

export default Headings;
