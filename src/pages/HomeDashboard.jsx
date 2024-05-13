import React from "react";
import Sidebar from "../components/Sidebar";
import Navebar from "../components/Navebar";
import { Box, Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import "../Styling/SidebarStyle.css";
import { useState } from 'react';
import DialogBox from "../components/DialogBox";

export default function HomeDashboard() {
    const [isRendered, setIsRendered] = useState(false);

    function handleClick() {
        setIsRendered(true);
    };

  return (
    <>
      <Navebar />
      <Box height={40} />
      <Box sx={{ display: "flex" }} className="pageBack">
        <Sidebar />
        


        <div style={{marginTop: '50px', marginLeft: '100px'}}>
            {/* <button style={{width: '100px', height: '50px', borderRadius: '20px'}} onClick={handleClick}>Click me</button> */}
            {/* {isRendered && <DialogBox />} */}
            
        </div>

       
      </Box>
    </>
  );
}
