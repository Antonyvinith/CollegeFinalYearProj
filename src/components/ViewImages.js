import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navebar from "../components/Navebar";
import { Box } from "@mui/material";
import { Button } from "react-bootstrap";
import ReactPlayer from "react-player";
import "../Styling/SidebarStyle.css";
//import video from "https://vimeo.com/oembed?url=https://vimeo.com/945732013"

function ViewImages() {
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
  const imageUrls = [
    "https://imgs.search.brave.com/E5y8f0T5jTcmCa9LmTWJheJXBMLKzbC3fhrCtGrUPII/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2F5bWVkaWEt/Y29udGVudC5jb20v/LmltYWdlL2NfbGlt/aXQsY3Nfc3JnYixx/X2F1dG86ZWNvLHdf/NzAwL01UZzVOekE1/TlRZMk16TTJPVEF5/T1RJeC9ob3ctdG8t/YWRkLWEtcmVhY3Qt/bGlnaHRib3guZ2lm.jpeg",
  ];
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
              <h1>Image Viewer</h1>
            </div>
          </div>
          <div>
            {imageUrls.map((imageUrl, index) => (
              <div key={index}>
                <img
                  src={imageUrl}
                  alt={`Image ${index}`}
                  style={{ maxWidth: "100%", height: "auto" }}
                />
                <p>Image 1</p>
              </div>
            ))}
          </div>
        </Box>
      </Box>
    </>
  );
}

export default ViewImages;
