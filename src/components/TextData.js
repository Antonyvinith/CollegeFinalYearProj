import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navebar from "../components/Navebar";
import { Box, Typography } from "@mui/material";
import { Button } from "react-bootstrap";
import ReactPlayer from 'react-player';
import "../Styling/SidebarStyle.css";
import TextSnippetIcon from '@mui/icons-material/TextSnippet';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [first, setFirst] = useState(true);
  const [last, setLast] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const scrollToRef = useRef(null);
  const perPageData = 10;
  const [fileData, setFileData] = useState([]);


  const readFile = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/read-file`, {
        
      });   
      console.log("data",response.data.data);
      
      setFileData(response.data.data);
    } catch (error) {
      console.error("Error reading file:", error);
    }
  };
  useEffect(() => {
    readFile();
  }, []);


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
              <Typography variant="h3" gutterBottom>
                Text Data
              </Typography>
              <Typography variant="body1">
                    {fileData}
              </Typography>
            </div>
          </div>
          <div>
          
          </div>
        </Box>
      </Box>
    </>
  );
}

export default ProductList;
