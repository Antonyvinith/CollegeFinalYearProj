import React from "react";
import "../Styling/SidebarStyle.css";

export default function MenuItemComp({listName,icon,path,icon2,isSelected,onMenuClick}){

    const handleMenuClick = (event) => {
        onMenuClick(path);
    }

    return (
        <ul className={isSelected ? "menuListselected" : "menuItem"} onClick={handleMenuClick}>
            <li>
                <div className="icon">{icon}</div>
                <div className="menuName"><h5>{listName}</h5></div>
                <div className="icon2">{icon2}</div>
            </li>
        </ul>
    );
}