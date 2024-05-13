
// import SingleProduct from "./SingleProduct";
// import "../Styling/SearchResultList.css";
// import { Link,useNavigate } from "react-router-dom";

// const SearchResultsList = ({results}) => {
//   const navigate=useNavigate();

//   const detailsPage = (prod) => {
//     navigate("/details", { state: { prod } });
//   }
// if(results){
//     return (
//         <div className="results-list">
//           {/* {results?.map((result, id) => {
//             return <SearchResult result={result.name} key={id} />;
//           })} */}
               
//                {/* <SingleProduct key={results?.productReference} prod={results} /> */}
//                {/* <h1>{results?.productReference}</h1> */}
               
//               {/* {/* {key=searchResults?.productReference} 
//               {prod=searchResults} */}
//               {/* <Link to={`/home`}>{results?.productReference}</Link> */}
//               <div style= {{cursor: 'pointer'}}  onClick={() => detailsPage(results)}> {results?.productReference} </div>
        
//         </div>
//       );
// }else{
//     return null;
// }
// };

// export default SearchResultsList;


import SingleProduct from "./SingleProduct";
import "../Styling/SearchResultList.css";
import { Link,useNavigate } from "react-router-dom";
const SearchResultsList = ({results}) => {
  const navigate=useNavigate();
  const detailsPage = (prod) => {
    navigate("/details", { state: { prod } });
  }
if(results){
    return (
        <div className="results-list">
          {/* {results?.map((result, id) => {
            return <SearchResult result={result.name} key={id} />;
          })} */}
               
               {/* <SingleProduct key={results?.productReference} prod={results} /> */}
               {/* <h1>{results?.productReference}</h1> */}
               
              {/* {/* {key=searchResults?.productReference} 
              {prod=searchResults} */}
              {/* <Link to={`/home`}>{results?.productReference}</Link> */}
              <div style= {{cursor: 'pointer'}}  onClick={() => detailsPage(results)}> {results?.productReference} </div>
        
        </div>
      );
}else{
    return null;
}
};
export default SearchResultsList;