import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navebar from "../components/Navebar";
import { Box } from "@mui/material";
import { Button } from "react-bootstrap";
import "../Styling/SidebarStyle.css"

function ProductList() {

    const[products, setProducts] = useState([]);
    const [first, setFirst] = useState(true);
    const [last, setLast] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const scrollToRef = useRef(null);
    const perPageData = 10 ;

    useEffect(()=>{
        loadProducts();
        window.scrollTo(0,0);
    },[currentPage]);

    const loadProducts=async()=>{
        const token = localStorage.getItem('token'); 
        // const headers = {'Authorization': `Bearer ${token}`};
        
        const result =await axios.get(`http://localhost:9000/product/products?page=${currentPage}&size=${perPageData}`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type":"application/json"
              },
              withCredentials:true,
        });
        console.log(result.data);
        setProducts(result.data.content)
        setFirst(result.data.first);
        setLast(result.data.last);  
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


      return (
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
                            {/* <th scope="col">#</th> */}
                            <th scope="col">Product Reference</th>
                            <th scope="col">Description</th>
                            <th scope="col">Brand</th>
                            <th scope="col">Price</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            products?.map((product, index)=>(
                                <tr key={product.id}>
                                    {/* <th scope="row" >{index+1}</th> */}
                                    <td>{product.productReference}</td>
                                    <td>{product.description}</td>
                                    <td>{product.brand}</td>
                                    <td>{product.price}</td>
                                </tr>
                            ))
                        }   
                    </tbody>
                </table>

                <div className="btn-group mb-2">
                    {
                        products?.length!==0?<div >
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

export default ProductList;