import React from "react";

const OrderDetails = () => {
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    // Fetch product details from the backend when the component mounts
    axios
      .get("http://localhost:9000/product/getAll") // Example endpoint to fetch product details by ID
      .then((response) => {
        setProductDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  }, []);

  return (
    <>
      <div>
        {productDetails ? (
          <div>
            <h2>{productDetails.name}</h2>
            <p>Price: ${productDetails.price}</p>
            <p>Description: {productDetails.description}</p>
            {/* Render other product details */}
          </div>
        ) : (
          <p>Loading product details...</p>
        )}
      </div>
    </>
  );
};

export default OrderDetails;
