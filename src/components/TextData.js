import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navebar from "../components/Navebar";
import { Box } from "@mui/material";
import { Button } from "react-bootstrap";
import ReactPlayer from 'react-player';
import "../Styling/SidebarStyle.css";
//import video from "https://vimeo.com/oembed?url=https://vimeo.com/945732013"
import TextSnippetIcon from '@mui/icons-material/TextSnippet';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [first, setFirst] = useState(true);
  const [last, setLast] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const scrollToRef = useRef(null);
  const perPageData = 10;

  useEffect(() => {
    loadProducts();
    window.scrollTo(0, 0);
  }, [currentPage]);

  const loadProducts = async () => {
    const res = await axios.get(`http://localhost:3000/viewVideo`);
    // const headers = {'Authorization': `Bearer ${token}`};
  };

  const handlePrev = () => {
    if (!first) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
      //  scrollToRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  const handleNext = () => {
    if (!last) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
      //   scrollToRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const [playing, setPlaying] = useState(false);

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
          <div>
            <ReactPlayer
            config
              url={{src:"https://vimeo.com/945732013",vimeo:true}}
              playing={playing}
              controls
              width="100%"
              height="auto"
            />
            <button onClick={() => setPlaying(!playing)}>
              {playing ? "Pause" : "Play"}
            </button>
          </div>
        </Box>
      </Box>
    </>
  );
}

export default ProductList;
