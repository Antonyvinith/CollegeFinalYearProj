import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navebar from "../components/Navebar";
import { Box } from "@mui/material";
import { Button } from "react-bootstrap";
import "../Styling/SidebarStyle.css";
import ReactPlayer from "react-player";
import audio from "../PythonDecrypt/Audio/decrypted_image_029846b5774048098593f831e83b7b76.mp3";
import ReactAudioPlayer from "react-audio-player";

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [first, setFirst] = useState(true);
  const [last, setLast] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const scrollToRef = useRef(null);
  const perPageData = 2;

  return (
    <>
      <Navebar />
      <Box height={40} />
      <Box sx={{ display: "flex" }} className="pageBack">
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <div className="container">
            <div className="py-">
              <Box height={40} />
              <h1>Audio Data</h1>
              <ReactAudioPlayer
                src={audio}
                autoPlay
                controls
                listenInterval={1000}
                volume={0.5}
                loop
                playbackRate={1.2}
                style={{ backgroundColor: "lightgray", borderRadius: "5px" }}
              />
            </div>
          </div>
        </Box>
      </Box>
    </>
  );
}

export default CategoryList;
