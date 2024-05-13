// ListItemComp.js
import React from "react";
import "../Styling/SidebarStyle.css";

export default function ListItemComp({icon, dynamicText, path, isSelected, onItemClick}){

  const handleClick = (event) => {
    onItemClick(path); // Call the parent function to handle item click
  };

  return (
    <ul className={isSelected ? "menuListselected" : "menuList"} onClick={handleClick}>
      <li>
        <div className="icon">{icon}</div>
        <div className="menuName"><h5 >{dynamicText}</h5></div>
      </li>
    </ul>
  );
}
