import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navebar from "../components/Navebar";
import { Box } from "@mui/material";
import { Button } from "react-bootstrap";
import ReactPlayer from "react-player";
import "../Styling/SidebarStyle.css";
import { Line } from "react-chartjs-2";
import chartData from "./ChartData";
import { Pie } from 'react-chartjs-2';

import { Chart, CategoryScale, LinearScale, PointElement } from "chart.js/auto";

// Register the required scales and elements
Chart.register(CategoryScale, LinearScale, PointElement);

// Register the required scales

//import video from "https://vimeo.com/oembed?url=https://vimeo.com/945732013"

function pieChart() {
  const data = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: "My Pie Chart",
      },
    },
  };

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
              <h1>Predective Analysis</h1>
            </div>
          </div>
          <div className="chart-container">
            <h2 style={{ textAlign: "center" }}>Line Chart</h2>
            <div>
              <Pie data={data} options={options} />
            </div>
          </div>
        </Box>
      </Box>
    </>
  );
}

export default pieChart;
