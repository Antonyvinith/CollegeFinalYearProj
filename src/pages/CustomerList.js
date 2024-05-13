import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navebar from "../components/Navebar";
import { Box } from "@mui/material";
import { Button } from "react-bootstrap";
import "../Styling/SidebarStyle.css"

function CustomerList() {

    const [customers,setCustomers]=useState([]);
    const [first, setFirst] = useState(true);
    const [last, setLast] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const scrollToRef = useRef(null);
    const perPageData = 2;

    // useEffect(()=>{
    //     loadCustomers();
    //     window.scrollTo(0, 0);
    // },[currentPage]);

    useEffect(()=>{
        console.log("token=========",localStorage.getItem("token"));

        const url=`http://localhost:9000/customer/getAll?page=${currentPage}&size=${perPageData}`
        axios.get(url,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type":"application/json"
          },
        })
        .then((res)=>{
    
          console.log(res.data);
          if(res.data.content.length>0)
          {
           setCustomers(res.data.content);
    
          }
    
    
        })
        .catch((err)=>{
          console.log(err);
        })
    
      },[])

    // const loadCustomers=async()=>{
    //     const token = localStorage.getItem('token'); 
    //     // const headers = {'Authorization': `Bearer ${token}`};

    //     const result =await axios.get(`http://localhost:9000/customer/getAll?page=${currentPage}&size=${perPageData}`,{
    //         withCredentials:true,
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem("token")}`,
    //       "Content-Type":"application/json"
    //     },
    //     });
    //     console.log(result.data);
    //     setCustomers(result.data.content); 
    //     setFirst(result.data.first);
    //     setLast(result.data.last); 
    // }


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


    return (<>
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
                            {/* <th scope="col">#</th> */}
                            <th scope="col">firstName</th>
                            <th scope="col">lastName</th>
                            <th scope="col">email</th>
                            <th scope="col">phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            customers.map((customer, index)=>(
                                <tr key={customer.id}>
                                    {/* <th scope="row">{index+1}</th> */}
                                    <td>{customer.firstName}</td>
                                    <td>{customer.lastName}</td>
                                    <td>{customer.email}</td>
                                    <td>{customer.phone}</td>
                                </tr>
                            ))
                        }   
                    </tbody>
                </table>
                <div>
                <div className="btn-group mb-2">
                    {
                        customers.length!==0?<div >
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
        </div>
        </Box>
        </Box>
    </>
    )
}

export default CustomerList;