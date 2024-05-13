import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Navebar from "../components/Navebar";
import { Box } from "@mui/material";
// import "../Styling/ListDetails.css";
function OrderListDetails() {
    
    const { orderId } = useParams();
    const location = useLocation();
    const order = location.state?.order;
    const navigate=useNavigate();

    const handleClick =(fulfill)=>{
        navigate("/fulfill", { state : { fulfill } })
    }
    

    return (
        <div>
            <Navebar/>
            <Box sx={{height:60}}/>
            <h1>Order Details</h1>
            <p>Order ID: {order.id}</p>
            <p>Order Reference: {order.orderReference}</p>
            <p>Order Total: {order.orderTotal}</p>
            <p>Status: {order.status}</p>
            <p>Order Type: {order.orderType}</p>
            <p>Delivery Type: {order.deliveryType}</p>
            <h2>Shipping Address</h2>
            <p>Line 1: {order.shippingAddress.line1}</p>
            <p>Line 2: {order.shippingAddress.line2}</p>
            <p>City: {order.shippingAddress.city}</p>
            <p>State: {order.shippingAddress.state}</p>
            <p>Country: {order.shippingAddress.country}</p>
            <p>Pin Code: {order.shippingAddress.pinCode}</p>
            <h2>Billing Address</h2>
            <p>Line 1: {order.billingAddress.line1}</p>
            <p>Line 2: {order.billingAddress.line2}</p>
            <p>City: {order.billingAddress.city}</p>
            <p>State: {order.billingAddress.state}</p>
            <p>Country: {order.billingAddress.country}</p>
            <p>Pin Code: {order.billingAddress.pinCode}</p>
            <h2>Fulfillments</h2>
            {order.fulfillments.map((fulfillment, index) => (
                <div key={index}>
                    {/* <h3>Fulfillment {index + 1}</h3> */}
                    { fulfillment &&(
                    <a href="" onClick={() => handleClick(fulfillment)}>
                        <p>Fulfillment ID: {fulfillment.fulfillmentId}</p>
                        <p>Status: {fulfillment.status}</p>
                    </a>
                    )
                    }
                    {/* <p>From Address: {fulfillment.fromAddress.line1}, {fulfillment.fromAddress.city}, {fulfillment.fromAddress.country}</p>
                    <p>To Address: {fulfillment.toAddress.line1}, {fulfillment.toAddress.city}, {fulfillment.toAddress.country}</p>
                    <h4>Fulfillment Lines:</h4>
                    <ul>
                        {fulfillment.fulfillmentLines.map((line, idx) => (
                            <li key={idx}>
                                Product: {line.productReference}, Quantity: {line.requestedQuantity}
                            </li>
                        ))}
                    </ul> */}
                </div>
            ))}
        </div>
    );
}
export default OrderListDetails;