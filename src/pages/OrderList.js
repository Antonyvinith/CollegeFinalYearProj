// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import Sidebar from "../components/Sidebar";
// import Navebar from "../components/Navebar";
// import { Box } from "@mui/material";
// import { Button } from "react-bootstrap";
// import "../Styling/SidebarStyle.css"

// function OrderList() {

//     const [orders,setOrders]=useState([]);
//     const [first, setFirst] = useState(true);
//     const [last, setLast] = useState(false);
//     const [currentPage, setCurrentPage] = useState(0);
//     const scrollToRef = useRef(null);
//     const perPageData = 2;

//     useEffect(()=>{
//         loadOrders();
//         window.scrollTo(0, 0);
//     },[currentPage]);

//     const loadOrders=async()=>{
//         // const token = localStorage.getItem('token'); 
//         // const headers = {'Authorization': `Bearer ${token}`};
//         const result =await axios.get(`http://localhost:9000/order/getAll?page=${currentPage}&size=${perPageData}`,{
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem("token")}`,
//                 "Content-Type":"application/json"
//               },
//               withCredentials:true,
//         });
//         console.log(result.data);
//         setOrders(result.data.content);
//         setFirst(result.data.first);
//         setLast(result.data.last);   
//     }


//     const handlePrev = () => {
//         if(!first )
//         {
//          setCurrentPage(currentPage-1);
//          window.scrollTo(0, 0);
//         //  scrollToRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
//         }
//       };
//       const handleNext = () => {
//         if(!last)
//         {
//           setCurrentPage(currentPage+1);
//           window.scrollTo(0, 0);
//         //   scrollToRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
          
//         }
//       };


//     return (
//         <>
//         <Navebar />
//         <Box height={40} />
//         <Box sx={{ display: "flex" }} className="pageBack">
//             <Sidebar />
//             <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//         <div className='container'>
//             <div className='py-'>
//             <Box height={40} />
//                 <table className="table border shadow">
//                     <thead>
//                         <tr>
//                             {/* <th scope="col">#</th> */}
//                             <th scope="col">Order ID</th>
//                             <th scope="col">Order Reference</th>
//                             <th scope="col">Order Total</th>
//                         </tr>
//                     </thead>
//                     <tbody>

//                         {
//                             orders.map((order, index)=>(
//                                 <tr key={order.id}>
//                                     {/* <th scope="row" >{index+1}</th> */}
//                                     <td>{order.id}</td>
//                                     <td>{order.orderReference}</td>
//                                     <td>{order.orderTotal}</td>
//                                 </tr>
//                             ))
//                         }   
//                     </tbody>
//                 </table>


//                 <div className="btn-group mb-2">
//                     {
//                         orders.length!==0?<div >
//                             <Button onClick={handlePrev}>
//                                 Prev
//                             </Button>
//                             <Button onClick={handleNext}>
//                                 Next
//                             </Button>
//                         </div>:""
//                     }
//                 </div>
//             </div>
//         </div>
//         </Box>
//         </Box>
//     </>
//     )
// }

// export default OrderList;

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navebar from "../components/Navebar";
import { Box, Card, CardContent, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [first, setFirst] = useState(true);
  const [last, setLast] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedFulfillment, setSelectedFulfillment] = useState(null);
  const scrollToRef = useRef(null);
  const perPageData = 2;
  const navigate = useNavigate();

  useEffect(() => {
    loadOrders();
    window.scrollTo(0, 0);
  }, [currentPage]);

  const loadOrders = async () => {
    const result = await axios.get(
      `http://localhost:9000/order/getAll?page=${currentPage}&size=${perPageData}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
          withCredentials: true,
        },
      }
    );
    setOrders(result.data.content);
    setFirst(result.data.first);
    setLast(result.data.last);
  };

  const handlePrev = () => {
    if (!first) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleNext = () => {
    if (!last) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleOrderDetails = (order) => {
    setSelectedOrder(order);
    setSelectedFulfillment(null); // Reset selected fulfillment when order is clicked
  };

  const handleFulfillmentDetails = (fulfillment) => {
    setSelectedFulfillment(fulfillment);
  };

  const handleCloseFulfillmentDetails = () => {
    setSelectedFulfillment(null);
  };

  const handleCloseOrderDetails = () => {
    setSelectedOrder(null);
    setSelectedFulfillment(null); // Reset selected fulfillment when order details are closed
  };

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
              {!selectedOrder && !selectedFulfillment && (
                <table className="table border shadow">
                  <thead>
                    <tr>
                      <th scope="col">Order ID</th>
                      <th scope="col">Order Reference</th>
                      <th scope="col">Order Total</th>
                      <th scope="col">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, index) => (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.orderReference}</td>
                        <td>{order.orderTotal}</td>
                        <td>
                          <button onClick={() => handleOrderDetails(order)}>
                            Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {!selectedFulfillment && selectedOrder && (
                <div>
                  <Stack spacing={2} mb={2}>
                    <Button onClick={handleCloseOrderDetails} variant="outlined">
                      Close
                    </Button>
                  </Stack>
                  <Card sx={{ mb: 2 , backgroundColor: '#FFCDD2'}}>
                    <CardContent>
                      <h1>Order Details</h1>
                      <p>Order ID: {selectedOrder.id}</p>
                      <p>Order Reference: {selectedOrder.orderReference}</p>
                      <p>Order Total: {selectedOrder.orderTotal}</p>
                      <p>Status: {selectedOrder.status}</p>
                      <p>Order Type: {selectedOrder.orderType}</p>
                      <p>Delivery Type: {selectedOrder.deliveryType}</p>
                    </CardContent>
                  </Card>
                  <Card sx={{ mb: 2 , backgroundColor: '#FFCDD2'}}>
                    <CardContent>
                      <h2>Shipping Address</h2>
                      <p>Line 1: {selectedOrder.shippingAddress.line1}</p>
                      <p>Line 2: {selectedOrder.shippingAddress.line2}</p>
                      <p>City: {selectedOrder.shippingAddress.city}</p>
                      <p>State: {selectedOrder.shippingAddress.state}</p>
                      <p>Country: {selectedOrder.shippingAddress.country}</p>
                      <p>Pin Code: {selectedOrder.shippingAddress.pinCode}</p>
                    </CardContent>
                  </Card>
                  <Card sx={{ mb: 2, backgroundColor: '#FFCDD2' }}>
                    <CardContent>
                      <h2>Billing Address</h2>
                      <p>Line 1: {selectedOrder.billingAddress.line1}</p>
                      <p>Line 2: {selectedOrder.billingAddress.line2}</p>
                      <p>City: {selectedOrder.billingAddress.city}</p>
                      <p>State: {selectedOrder.billingAddress.state}</p>
                      <p>Country: {selectedOrder.billingAddress.country}</p>
                      <p>Pin Code: {selectedOrder.billingAddress.pinCode}</p>
                    </CardContent>
                  </Card>
                  <Card sx={{ mb: 2, backgroundColor: '#FFCDD2' }}>
                    <CardContent>
                      <h2>Fulfillments</h2>
                      {selectedOrder.fulfillments.map((fulfillment, index) => (
                        <div key={index}>
                          <button
                            onClick={() => handleFulfillmentDetails(fulfillment)}
                          >
                            Fulfillment ID: {fulfillment.fulfillmentId}
                          </button>
                          <p>Status: {fulfillment.status}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              )}
              {selectedFulfillment && (
                <div>
                  <Stack spacing={2} mb={2}>
                    <Button onClick={handleCloseFulfillmentDetails} variant="outlined">
                      Close
                    </Button>
                  </Stack>
                  <Card sx={{ mb: 2 , backgroundColor: '#FFCDD2'}}>
                    <CardContent>
                      <h1>Fulfillment Details</h1>
                      <p>
                        Fulfillment ID: {selectedFulfillment.fulfillmentId}
                      </p>
                      <p>Status: {selectedFulfillment.status}</p>
                      <p>
                        From Address:{" "}
                        {`${selectedFulfillment.fromAddress.line1}, ${selectedFulfillment.fromAddress.city}, ${selectedFulfillment.fromAddress.country}`}
                      </p>
                      <p>
                        To Address:{" "}
                        {`${selectedFulfillment.toAddress.line1}, ${selectedFulfillment.toAddress.city}, ${selectedFulfillment.toAddress.country}`}
                      </p>
                      <h4>Fulfillment Lines:</h4>
                      <ul>
                        {selectedFulfillment.fulfillmentLines.map((line, idx) => (
                          <li key={idx}>
                            Product: {line.productReference}, Quantity:{" "}
                            {line.requestedQuantity}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              )}
              <div className="btn-group mb-2">
                {orders.length !== 0 && !selectedOrder && !selectedFulfillment && (
                  <div>
                    <Button onClick={handlePrev} variant="outlined">
                      Prev
                    </Button>
                    <Button onClick={handleNext} variant="outlined">
                      Next
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Box>
      </Box>
    </>
  );
}

export default OrderList;
