import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navebar from "../components/Navebar";
import { Box } from "@mui/material";
import { Button } from "react-bootstrap";
import "../Styling/SidebarStyle.css"

function Fulfillments() {
    const [currentPage, setCurrentPage] = useState(0);
    const [fulfillments,setFulfillments]=useState([]);
    const [first, setFirst] = useState(true);
    const [last, setLast] = useState(false);
    // localhost:9000/fulfillment/getAll
    const perPageData = 2;

    useEffect(()=>{
        loadFulFillments();
        window.scrollTo(0, 0);
    },[currentPage]);

    const loadFulFillments=async()=>{
        const result =await axios.get(`http://localhost:9000/fulfillment/getAll?page=${currentPage}&size=${perPageData}`,{
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type":"application/json"
              },
              withCredentials:true,
        });
        console.log(result.data.content);
        setFulfillments(result.data.content);
        // setOrders(result.data.content);
        // setFirst(result.data.first);
        // setLast(result.data.last);   
    }
    const handlePrev = () => {
        if(!first )
        {
         setCurrentPage(currentPage-1);
         window.scrollTo(0, 0);
        //  scrollToRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      };
      const handleNext = () => {
        if(!last)
        {
          setCurrentPage(currentPage+1);
          window.scrollTo(0, 0);
        //   scrollToRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
          
        }
      };

    return(
        <>
        <Navebar />
        <Box height={40} />
        <Box sx={{ display: "flex" }} className="pageBack">
            <Sidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <div className='container'>
            <div className='py-'>
            <Box height={40} />
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">Fulfilment ID</th>
                            <th scope="col">LocationRef</th>
                            <th scope="col">status</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            fulfillments.map((fulfiment, index)=>(
                                <tr key={fulfiment.fulfillmentId}>
                                    <td>{fulfiment.fulfillmentId}</td>
                                    <td>{fulfiment.locationReference}</td>
                                    <td>{fulfiment.status}</td>
                                    <td></td>
                                </tr>
                            ))
                        }   
                    </tbody>
                </table>
                <div className="btn-group mb-2">
                    {
                        fulfillments.length!==0?<div >
                            <Button onClick={handlePrev}>
                                Prev
                            </Button>
                            <Button onClick={handleNext}>
                                Next
                            </Button>
                        </div>:""
                    }
                </div>
            </div>
        </div>
        </Box>
        </Box>
    </>
    )
}
export default Fulfillments;
