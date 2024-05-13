import SingleProduct from "./SingleProduct";
import Header from "./Header";
import Footer from "./Footer";
import { useEffect, useState, useRef } from "react";
import Redirect from "../customComponents/Redirect";
import "../Styling/styles.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { fetchProducts } from "./productsActions";
import "../Styling/styles.css";
import { Button } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import Nav2 from "./Nav2";

const Catalog = () => {
  const [data, setData] = useState([]);

  const [first, setFirst] = useState(true);
  const [last, setLast] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const [category, setCategory] = useState([]);

  const scrollToRef = useRef(null);
  const perPageData = 20;

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
        
        if (res.data.length > 0) {
          console.log("parent res",res.data);
          setCategory(res.data.content);
          console.log(res.data);
          
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
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
          console.log(res.data.content);
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
          setData(res.data.responseData);
          console.log(res.data);
          setFirst(res.data.first);
          setLast(res.data.last);
        }
      });
  };

  const updateData=(data)=>{
    setData(data)
  }


  return (
    <>
      {localStorage.getItem("token") ? (
        <>
          <div className="catalog-container">
            <Header />
             <Nav2 updateData={updateData} />
         
            <div className="home" ref={scrollToRef}>
              <div className="dropdown-category" >
                  
                {/* <Dropdown>
                  <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    Category
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {category.map((item) => {
                      return (
                        <Dropdown.Item
                          key={item.categoryName}
                          onClick={() => {
                            handleCategoryClick(item.categoryName);
                          }}
                        >
                          {item.categoryName}
                        </Dropdown.Item>
                      );
                    })}
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown className="ml-3">
                  <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    Filters
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item>Price (High-Low)</Dropdown.Item>
                    <Dropdown.Item>Price (Low-High)</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown> */}
              </div>

              <div className="productContainer">
                {data && data.map((product) => (
                  <SingleProduct
                    key={product?.productReference}
                    prod={product}
                  />
                ))}
              </div>
            </div>
            <div className="btn-group mb-2">
            {data && data.length > perPageData ? (
                <div>
                  <Button size="sm" variant="secondary" onClick={handlePrev}>
                    Prev
                  </Button>
                  <Button
                    className="ml-2"
                    size="sm"
                    variant="secondary"
                    onClick={handleNext}
                  >
                    Next
                  </Button>
                </div>
              ) : (
                ""
              )}
            </div>
            <Footer />
          </div>
        </>
      ) : (
        <>
          <Redirect />
        </>
      )}
    </>
  );
};

export default Catalog;
