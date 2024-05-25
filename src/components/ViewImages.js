import React, { useEffect, useState, useRef } from "react";
import Sidebar from "../components/Sidebar";
import Navebar from "../components/Navebar";
import { Box } from "@mui/material";
import "../Styling/SidebarStyle.css";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [first, setFirst] = useState(true);
  const [last, setLast] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const scrollToRef = useRef(null);
  const perPageData = 10;

  const [imagePaths, setImagePaths] = useState([]);

  useEffect(() => {
    const importImages = async () => {
      try {
        const context = require.context(
          "../PythonDecrypt/image",
          false,
          /\.(png|jpe?g|svg)$/
        );
        const keys = context.keys();
        const imagePaths = keys.map((key) => ({
          path: context(key),
          name: key.replace(/^.*[\\\/]/, '') // Extract the filename
        }));
        setImagePaths(imagePaths);
      } catch (err) {
        console.error("Error importing images:", err);
      }
    };
    importImages();
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
              <h1>Image Viewer</h1>
            </div>
          </div>
          <div className="image-container">
            {imagePaths.map((image, index) => (
              <div
                key={index}
                className="image-wrapper"
                style={{ marginBottom: "20px" }}
              >
                <img
                  src={image.path}
                  alt={`Image ${index}`}
                  style={{ maxWidth: "100%", height: "auto" }}
                />
                <p style={{fontWeight:"bold"}}>{image.name}</p>
              </div>
            ))}
          </div>
        </Box>
      </Box>
    </>
  );
}

export default ProductList;
