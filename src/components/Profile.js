import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
import "../Styling/Profile.css";
import SingleOrder from "./SingleOrder";
import InfiniteScroll from "react-infinite-scroll-component";
import ProfileCardDetails from "../components/CreditCard";
import ProfileDetails from "./ProfileDetails";
import EditAddress from "./editaddress";

function Profile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [userImage, setUserImage] = useState(null);
  const [modal, setModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const toggleModal = () => setModal(!modal);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleImageUpload = () => {
    // Make API call to upload image
    // Example:
    const formData = new FormData();
    formData.append("image", selectedImage);

    
    fetch("http://localhost:9000/customer/upload-image", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type":"application/json"
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle success
        console.log("Image uploaded successfully:", data);
        setUserImage(data.image_url);
      })
      .catch((error) => {
        // Handle error
        console.error("Error uploading image:", error);
      });
    // For demonstration purpose, updating user image immediately
    setUserImage(selectedImage);
    setModal(false);
  };

  const fetchOrders = () => {
    // const url = `http://localhost:9000/product/getAll?page=${page}&size=2`;
    const body = {
      "username": localStorage.getItem("username"),
      "page": page
    }
    const url = `http://localhost:9000/order/getOrdersByCustomer`
    setLoading(true);
    axios.post(url, body, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type":"application/json"
        },
      })
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          // console.log(res.data.responseData);
          setData((prevData) => [...prevData, ...res.data.content]);
          // setOrdersVisible(true);
          setPage(page + 1);
          let no = res.data.totalElements;
          setCount(no);
          // setPrev(res.data.content[])
        }
         else {
          alert("Session expired");
        }
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="flexBox">
            <span>
              <ProfileDetails />
            </span>
          </div>
        );
      // return <div className="flexBox"></div>;
      case "orders":
        return (
          <div className="flexBox">
            <div >
              {
                <div className="scrollable-content" id="orders_item">
                  {/* {setOrdersVisible(!ordersVisible)} */}
                  <InfiniteScroll
                    dataLength={data.length}
                    hasMore={count > data.length}
                    next={fetchOrders}
                    scrollableTarget="orders_item"
                  >
                    {data.map((item) => (
                      <SingleOrder key={item?.orderReference} order={item} />
                    ))}
                  
                  </InfiniteScroll>
                </div>
              }
            </div>
          </div>
        );
   
      case "addresses":
        return (
          <div className="flexBox">
            <EditAddress />
          </div>
        );
      case "card-details":
        return (  
          <div className="flexBox">
            <span>
              <ProfileCardDetails />
            </span>
          </div>
        );
      default:
        return null;
    }
  };
  return (
    <>
      <Header />
      <div className="profileContainer mt-2">
        <div className="menu">
          <div>
            <Button color="light" onClick={() => setActiveTab("profile")}>
              <span>Profile</span>
            </Button>
            <Button color="light" onClick={() => setActiveTab("orders")}>
              <span>Orders</span>
            </Button>
            <Button color="light" onClick={() => setActiveTab("addresses")}>
              <span>Addresses</span>
            </Button>
            <Button color="light" onClick={() => setActiveTab("card-details")}>
              <span>Card Details</span>
            </Button>
            <Button color="light" onClick={handleLogout}>
              <span>Log Out</span>
            </Button>
          </div>
        </div>
        <div className="content">{renderContent()}</div>
      </div>
      <Footer />
      
    </>
  );
}
export default Profile;
