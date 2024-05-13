// import React, { useState } from 'react';
// import Cards from '../customComponents/Cards'; // Assuming the Cards component is imported from the correct location

// const PaymentDetails = () => {
//   const [selectedOption, setSelectedOption] = useState(null); // Initialize to null for no default selection

//   const handleOptionChange = (e) => {
//     setSelectedOption(e.target.value);
//     console.log("Selected option:", e.target.value);
//   };

//   return (
//     <div>
     
//       <label>
//         <input
//           type="radio"
//           value="Card"
//           checked={selectedOption === 'Card'}
//           onChange={handleOptionChange}
//         />
//         {' '}
//         Card
//       </label>
//       <br />
//       <label>
//         <input
//           type="radio"
//           value="Cash on Delivery"
//           checked={selectedOption === 'Cash on Delivery'}
//           onChange={handleOptionChange}
//         />
//         {' '}
//         Cash on Delivery
//       </label>

//       {selectedOption === 'Card' && <Cards />}
//     </div>
//   );
// };

// export default PaymentDetails;


import React, { useState } from 'react';
import Cards from '../customComponents/Cards';
import "../Styling/payment.css"

const PaymentDetails = () => {
  const [selectedOption, setSelectedOption] = useState(null); // Initialize to null for no default selection

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    console.log("Selected option:", e.target.value);
  };

  return (<div className="payment-container">
  <div className="payment-option">
  <label>Card</label>
    <input
      type="radio"
      value="Card"
      checked={selectedOption === 'Card'}
      onChange={handleOptionChange}
    />
    
  </div>
  <div className="payment-option">
  <label>COD</label>
    <input
      type="radio"
      value="Cash on Delivery"
      checked={selectedOption === 'Cash on Delivery'}
      onChange={handleOptionChange}
    />
   
  </div>
  {selectedOption === 'Card' && <Cards />}
</div>
  );
};

export default PaymentDetails;
