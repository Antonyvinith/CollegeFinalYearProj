import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navebar from "../components/Navebar";
import { Box } from "@mui/material";
import { Button } from "react-bootstrap";
import ReactPlayer from "react-player";
import "../Styling/SidebarStyle.css";
import video from "../PythonDecrypt/Videos/OutputVideo_5e2d3d73-f21e-4d0a-bab5-362c5eaa065e_20240523_174001.mp4";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [first, setFirst] = useState(true);
  const [last, setLast] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const scrollToRef = useRef(null);
  const perPageData = 10;

  const [playing, setPlaying] = useState(false);
  const [videoPaths, setVideoPaths] = useState([]);

  const fetchVideos = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/getVideos");
      setVideoPaths(response.data);
      console.log("Data", response.data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const importVideos = async () => {
      try {
        const context = require.context(
          "../PythonDecrypt/Videos",
          false,
          /\.(mp4|webm|ogg)$/
        );
        const keys = context.keys();
        const videoPaths = await Promise.all(
          keys.map(async (key) => {
            const video = await import(
              `../PythonDecrypt/Videos/${key.slice(2)}`
            );
            return video.default;
          })
        );
        setVideos(videoPaths);
      } catch (err) {
        console.error("Error importing videos:", err);
      }
    };
    importVideos();
  }, []);

  console.log("videos" + videos);

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
              <h1>Video Player</h1>
            </div>
          </div>
          <div className="video-container">
            {videos.map((videoSource, index) => (
              <div key={index} className="video-wrapper">
                <ReactPlayer
                  url={videoSource}
                  controls
                  width="100%"
                  height="auto"
                />
                
              </div>
            ))}
          </div>
        </Box>
      </Box>
    </>
  );
}

export default ProductList;
