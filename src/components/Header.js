import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUserAlt, FaCartPlus } from "react-icons/fa";
import {
  Badge,
  Button,
  Container,
  Dropdown,
  Nav,
  Navbar,
  Form
} from "react-bootstrap";
import { CartState } from "../context/Context";
import "../Styling/Navbar.css"; 
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";
import SearchResultsList from "./SearchBarResultList";
const Header = () => {
  const { cart  = []} = useSelector((state) => state.Cart);

  const [profileDropdownVisible, setProfileDropdownVisible] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const eraseData = () => {
    localStorage.clear();
  };
  const handleProfileIconMouseEnter = () => {
    setProfileDropdownVisible(true);
  };
  const handleProfileIconMouseLeave = () => {
    setProfileDropdownVisible(false);
  };
  return (
    <Navbar bg="dark" variant="dark" fixed="top" className="header-navbar" >
      <Container className="header-container bg-dark container">
          <img
            src="https://s26.q4cdn.com/774373689/files/design/logo-white.png"
            alt="Logo"
            style={{ height: 45, marginRight: 20  }}
          />
         {/* Home Button */}
        
        {/* Logo */}
        {/* Catalog Button */}
        <div className="catalog-div">
          <Link to="/home" className="nav-link">
            Home
          </Link> 
          <Link to="/catalog" >
            Catalog
          </Link>
        </div>
       
        <Nav>
          <Form inline className="mr-auto">
            <SearchBar setResults={setSearchResults} />
          </Form>
          <Dropdown
            alignRight
            show={profileDropdownVisible}
            onMouseEnter={handleProfileIconMouseEnter}
            onMouseLeave={handleProfileIconMouseLeave}
          >
            <Dropdown.Toggle
              variant="dark"
              style={{ marginRight: 20, width: 43, marginTop: 5 }}
            >
              <FaUserAlt color="white" fontSize="20px" />
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ minWidth: 70 }}>
              <center>
                <Link to="/profile" className="dropdown-item">
                  Profile
                </Link>
                <div style={{ paddingTop: 5 }}></div>
                <Link to="/" onClick={eraseData} className="dropdown-item">
                  Logout
                </Link>
              </center>
            </Dropdown.Menu>
          </Dropdown>
          <Link to="/cart">
            <Button
              variant="dark"
              style={{ width: "75%", margin: "0 10px", height: "55px" }}
            >
              <FaCartPlus style={{ fontSize: "24px" }} />
            </Button>
          </Link>
        </Nav>
        {/* Display search results */}
        <SearchResultsList results={searchResults} />
      </Container>
    </Navbar>
  );
};
export default Header;