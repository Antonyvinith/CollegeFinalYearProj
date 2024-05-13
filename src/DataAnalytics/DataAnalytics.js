import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navebar from "../components/Navebar";
import { Box } from "@mui/material";
import { Button } from "react-bootstrap";
import ReactPlayer from "react-player";
import "../Styling/SidebarStyle.css";
import { Line } from 'react-chartjs-2';

//import video from "https://vimeo.com/oembed?url=https://vimeo.com/945732013"

function DataAnalytics() {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Sales",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
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
            <h2>Fake Sales Chart</h2>
            <Line data={data} options={options} />
          </div>
        </Box>
      </Box>
    </>
  );
}

export default DataAnalytics;
