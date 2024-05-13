import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUserAlt, FaCartPlus } from "react-icons/fa";
import {
  Badge,
  Button,
  Container,
  Dropdown,
  Nav,
  Navbar,
  Form,
} from "react-bootstrap";
import { CartState } from "../context/Context";
import "../Styling/Navbar.css";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";
import SearchResultsList from "./SearchBarResultList";
import "../Styling/nav2.css";
import { useEffect, useState, useRef } from "react";
import Redirect from "../customComponents/Redirect";

const Nav2 = (props) => {
  const [data, setData] = useState([]);
  const [first, setFirst] = useState(true);
  const [last, setLast] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [category, setCategory] = useState([]);
  const scrollToRef = useRef(null);
  const perPageData = 20;
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [subcategories, setSubcategories] = useState([]);


  useEffect(() => {
    const url = "http://localhost:9000/parentCategories";
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("parent res", res.data);
        setCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    console.log("subcategory========", subcategories);

    const url = `http://localhost:9000/product/products?page=${currentPage}&size=${perPageData}`;
    axios
      .get(url, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.data) {
          console.log("data is========", res.data);
          console.log(res.data.content);
          console.log("category", category);

          setData(res.data.content);
          setFirst(res.data.first);
          setLast(res.data.last);
        }
      });
  }, [currentPage]);

  const handlePrev = () => {
    if (!first) {
      setCurrentPage(currentPage - 1);
      scrollToRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleNext = () => {
    if (!last) {
      setCurrentPage(currentPage + 1);
      scrollToRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  const handleCategoryClick = (catName) => {
    let url = `http://localhost:9000/product/productsByPriceAndCategory?page=${currentPage}&size=${perPageData}`;

    axios
      .post(
        url,
        {
          priceInput: {
            minPrice: 200,
            maxPrice: 2000,
          },
          categorySearch: {
            categoryName: `${catName}`,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      )
      
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          setData(res.data.responseData);
          props.updateData(res.data.responseData);
          setFirst(res.data.first);
          setLast(res.data.last);
        }
      });
  };

  const handleSubcategoryClick = async (subcategory) => {
    try {
      const response = await axios.get(`http://localhost:9000/subCategoriesForParent/${subcategory.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }).then((response) => {
      setSubcategories(response.data);
      setActiveCategoryId(subcategory.id);
      })}
     catch (error) {
      console.error(`Error fetching subcategories for subcategory ${subcategory.id}:`, error);
    }
  };

  const [parentId, setParentId] = useState([]);

  const handleCategoryHover = (parentId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    const url = `http://localhost:9000/subCategoriesForParent/${parentId}`;

    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.data) {
          console.log("Subcategories for parent response:", res.data);
          setSubcategories(res.data); 
        }
      })
      .catch((error) => {
        console.error("Error fetching subcategories for parent:", error);
      });
  };

  return (
    <div>
      {localStorage.getItem("token") ? (
        <Navbar className="he">
          {category.map((item) => (
            <span
              key={item.categoryId}
              onMouseEnter={() => handleCategoryHover(item.id)}
              onClick={() => handleCategoryClick(item.categoryName)}
              className="category-item"
            >
              {item.categoryName}
            </span>
          ))}
        </Navbar>
      ) : (
        <Redirect to="/login" />
      )}

      <div className="subcategory-container">
        {subcategories.length > 0 && (
          <>
            <ul>
            {subcategories.map((subcategory) => (
              <li key={subcategory.id} onClick={() => {handleSubcategoryClick(subcategory); handleCategoryClick(subcategory.categoryName)}}>
                {subcategory.categoryName}
              </li>
            ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};
export default Nav2;
