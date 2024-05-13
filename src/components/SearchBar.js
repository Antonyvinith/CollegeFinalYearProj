// import { useState } from "react";
// import { FaSearch } from "react-icons/fa";
// import "../Styling/SearchBar.css";
// import SearchResultsList from "./SearchBarResultList";
// const SearchBar = ({ setResults }) => {
//   const [input, setInput] = useState("");
//   const [showResults, setShowResults] = useState(false);
//   const fetchData = (value) => {
//     if (!value) {
//       // If the input is empty, hide the search results
//       setShowResults(false);
//       return;
//     }
//     // Replace the URL with your backend API endpoint for fetching product data
//     fetch(`http://localhost:9000/product/${value}`)
//       .then((response) => response.json())
//       .then((data) => {
//         // Set the results
//         setResults(data);
//         // Show the search results
//         setShowResults(true);
//       })
//       .catch((error) => {
//         console.log("Error fetching data:", error);
//         setResults(null);
//       });
//   };
//   const handleChange = (value) => {
//     setInput(value);
//     fetchData(value);
//   };
//   return (
//     <div className="input-wrapper">
//       <FaSearch id="search-icon" />
//       <input
//         placeholder="Type to search..."
//         value={input}
//         onChange={(e) => handleChange(e.target.value)}
//       />
//       {/* Render the SearchResultsList only if showResults is true */}
//       {showResults && <SearchResultsList />}
//     </div>
//   );
// };
// export default SearchBar;


import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "../Styling/SearchBar.css";
import SearchResultsList from "./SearchBarResultList";
import axios from "axios";
const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");
  const [showResults, setShowResults] = useState(false);
  const fetchData = (value) => {
    if (!value) {
      // If the input is empty, hide the search results
      setShowResults(false);
      return;
    }
    // Replace the URL with your backend API endpoint for fetching product data

    
    // fetch(`http://localhost:9000/product/${value}`,
    // {
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem("token")}`,
    //     "Content-Type":"application/json"
    //   },
    // })
    const url = `http://localhost:9000/product/${value}`;
    axios.get(url, {
      withCredentials:true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type":"application/json"
        },
      })
      .then((response) => {
        // Access the response data directly
        const data = response.data;
        // Set the results
        setResults(data);
        // Show the search results
        setShowResults(true);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
        setResults(null);
      });
  };
  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };
  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input
        placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
      {/* Pass input as a prop to SearchResultsList */}
      {showResults && <SearchResultsList input={input} />}
    </div>
  );
};
export default SearchBar;