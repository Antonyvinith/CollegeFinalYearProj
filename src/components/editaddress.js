import React, { useState } from 'react';
import { Card, Button, Alert} from 'react-bootstrap';
import axios from "axios";

const EditAddress = () => {
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    addressType:'',
    line1: '',
    line2: '',
    city: '',
    state: '',
    country: '',
    pinCode: '',
    username:localStorage.getItem('username')
  });
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (name, value) => {
    setNewAddress({ ...newAddress, [name]: value });
    // Clear error when input changes
    setErrors({ ...errors, [name]: '' });
  };

  const handleAddAddress = () => {
    setShowAddAddressForm(true);
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // Validation for mandatory fields
    if (!newAddress.addressType || !/^[a-zA-Z]+$/i.test(newAddress.addressType)){
      newErrors.addressType = 'Enter Address Type';
      valid = false;
    }
    if (!newAddress.line1) {
      newErrors.line1 = 'House No(name) is required';
      valid = false;
    }
    if (!newAddress.line2 || !/^[a-zA-Z]+$/i.test(newAddress.line2)) {
      newErrors.line2 = 'Locality is required';
      valid = false;
    }
    if (!newAddress.city || !/^[a-zA-Z]+$/i.test(newAddress.city)) {
      newErrors.city = 'City is required';
      valid = false;
    }
    if (!newAddress.state || !/^[a-zA-Z]+$/i.test(newAddress.state)) {
      newErrors.state = 'State is required';
      valid = false;
    }
    if (!newAddress.country || !/^[a-zA-Z]+$/i.test(newAddress.country)) {
      newErrors.country = 'Country is required';
      valid = false;
    }
    if (!newAddress.pinCode || !/^\d{6}$/.test(newAddress.pinCode)) {
      newErrors.pinCode = 'Pincode must be a 6-digit number';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSaveAddress = () => {
    // Validate form
    if (!validateForm()) {
      return;
    }

    // // Save new address to addresses array
    setAddresses([...addresses, newAddress]);
    // Reset newAddress state
    setNewAddress({
      addressType:'',
      line1: '',
      line2: '',
      city: '',
      state: '',
      country: '',
      pinCode: '',
      username: ''
    });
    // Hide add address form
    setShowAddAddressForm(false);


    const url = 'http://localhost:9000/addresses';
     axios.post(url, newAddress,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type":"application/json"
      },
      withCredentials:true,
     })
    .then(response => {
      console.log('Address saved successfully:', response.data);
      let addressList = [];
      addressList.push(newAddress);
      setAddresses(addressList);
      // Handle success if needed
      // For example, you can show a success message to the user
      alert('Address saved successfully!');
    });
};
 

  return (
    <div>
      {addresses.length === 0 ? (
        <Card style={{ margin: 'auto', marginTop: '50px', marginBottom: '50px', padding: '20px', maxWidth: '400px', }}>
        <Card.Body style={{ textAlign: 'center', backgroundColor:'lightgray',fontWeight:'bold' }}>
          No address added yet.
        </Card.Body>
      </Card>
      
      ) : (
        addresses.map((address, index) => (
          <Card key={index} style={{ width: '400px', margin: '0 auto', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff' }}>
            <Card.Body>
              <p>Address Type:{address.addressType}</p>
              <p>Line 1: {address.line1}</p>
              <p>Line 2: {address.line2}</p>
              <p>City: {address.city}</p>
              <p>State: {address.state}</p>
              <p>Country: {address.country}</p>
              <p>Pincode: {address.pinCode}</p>
            </Card.Body>
          </Card>
        ))
      )}

      {showAddAddressForm ? (
        <Card>
          <Card.Body>
            <div style={{ marginBottom: '10px' }}>
            <div style={{  marginBottom: '5px' }}>
                <label style={{ display: 'inline-block', width: '120px',fontWeight: 'bold', }}>Address Type:</label>
                <input
                  type="text"
                  placeholder="Enter Address Type"
                  value={newAddress.addressType}
                  onChange={(e) => handleInputChange("addressType", e.target.value)}
                  style={{ display: 'inline-block', width: 'calc(100% - 130px)', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                {errors.addressType && <div style={{ color: 'red', textAlign:'center' }}>{errors.addressType}</div>}
              </div>

              <div style={{  marginBottom: '5px' }}>
                <label style={{ display: 'inline-block', width: '120px',fontWeight: 'bold', }}>House No(name):</label>
                <input
                  type="text"
                  placeholder="Enter House No(name)"
                  value={newAddress.line1}
                  onChange={(e) => handleInputChange("line1", e.target.value)}
                  style={{ display: 'inline-block', width: 'calc(100% - 130px)', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                {errors.line1 && <div style={{ color: 'red', textAlign:'center' }}>{errors.line1}</div>}
              </div>
              <div style={{  marginBottom: '5px' }}>
                <label style={{ display: 'inline-block', width: '120px',fontWeight: 'bold', }}>Locality:</label>
                <input
                  type="text"
                  placeholder="Enter Locality"
                  value={newAddress.line2}
                  onChange={(e) => handleInputChange("line2", e.target.value)}
                  style={{ display: 'inline-block', width: 'calc(100% - 130px)', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                {errors.line2 && <div style={{ color: 'red', textAlign:'center' }}>{errors.line2}</div>}
              </div>
              <div style={{ marginBottom: '5px' }}>
                <label style={{ display: 'inline-block', width: '120px',fontWeight: 'bold', }}>City:</label>
                <input
                  type="text"
                  placeholder="Enter City"
                  value={newAddress.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  style={{ display: 'inline-block', width: 'calc(100% - 130px)', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                {errors.city && <div style={{ color: 'red', textAlign:'center' }}>{errors.city}</div>}
              </div>
              <div style={{  marginBottom: '5px' }}>
                <label style={{ display: 'inline-block', width: '120px',fontWeight: 'bold', }}>State:</label>
                <input
                  type="text"
                  placeholder="Enter State"
                  value={newAddress.state}
                  onChange={(e) => handleInputChange("state", e.target.value)}
                  style={{ display: 'inline-block', width: 'calc(100% - 130px)', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                {errors.state && <div style={{ color: 'red', textAlign:'center' }}>{errors.state}</div>}
              </div>
              <div style={{  marginBottom: '5px' }}>
                <label style={{ display: 'inline-block', width: '120px',fontWeight: 'bold', }}>Country:</label>
                <input
                  type="text"
                  placeholder="Enter Country"
                  value={newAddress.country}
                  onChange={(e) => handleInputChange("country", e.target.value)}
                  style={{ display: 'inline-block', width: 'calc(100% - 130px)', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                {errors.country && <div style={{ color: 'red', textAlign:'center' }}>{errors.country}</div>}
              </div>
              <div style={{  marginBottom: '5px' }}>
                <label style={{ display: 'inline-block', width: '120px',fontWeight: 'bold', }}>Pincode:</label>
                <input
                  type="text"
                  placeholder="Enter Pincode"
                  value={newAddress.pinCode}
                  onChange={(e) => handleInputChange("pinCode", e.target.value)}
                  style={{ display: 'inline-block', width: 'calc(100% - 130px)', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                {errors.pinCode && <div style={{ color: 'red', textAlign:'center' }}>{errors.pinCode}</div>}
              </div>
              <Button variant="primary" onClick={handleSaveAddress} style={{ width: '100%', padding: '10px', backgroundColor: 'black', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Save
              </Button>
            </div>
          </Card.Body>
        </Card>
      ) : (
        <Button variant="success" onClick={handleAddAddress} style={{ display: 'block', margin: '0 auto',backgroundColor:'black',color:'white' }}>
  Add Address
</Button>

      )}
    </div>
  );
};

export default EditAddress;

////////////////////////////////////////////redux/////////////////////////

// import React, { useState } from 'react';
// import { Button, Alert } from 'react-bootstrap';
// import { useDispatch } from 'react-redux';
// import { addAddress } from '../actions/addressActions';
// import axios from "axios";

// const EditAddress = () => {
//   const dispatch = useDispatch();
//   const [newAddress, setNewAddress] = useState({
//     line1: '',
//     line2: '',
//     city: '',
//     state: '',
//     country: '',
//     pincode: ''
//   });
//   const [errors, setErrors] = useState({});

//   const handleInputChange = (name, value) => {
//     setNewAddress({ ...newAddress, [name]: value });
//     // Clear error when input changes
//     setErrors({ ...errors, [name]: '' });
//   };

//   const validateForm = () => {
//     let valid = true;
//     const newErrors = {};

//     // Validation for mandatory fields
//     if (!newAddress.line1) {
//       newErrors.line1 = 'House No./Name is required';
//       valid = false;
//     }
//     if (!newAddress.line2) {
//       newErrors.line2 = 'Locality is required';
//       valid = false;
//     }
//     if (!newAddress.city) {
//       newErrors.city = 'City is required';
//       valid = false;
//     }
//     if (!newAddress.state) {
//       newErrors.state = 'State is required';
//       valid = false;
//     }
//     if (!newAddress.country) {
//       newErrors.country = 'Country is required';
//       valid = false;
//     }
//     if (!newAddress.pincode || !/^\d{6}$/.test(newAddress.pincode)) {
//       newErrors.pincode = 'Pincode must be a 6-digit number';
//       valid = false;
//     }
//     // Other validations...

//     setErrors(newErrors);
//     return valid;
//   };

//   const handleSaveAddress = () => {
//     // Validate form
//     if (!validateForm()) {
//       return;
//     }

//     // Save new address to Redux store
//     dispatch(addAddress(newAddress));

//     // Reset newAddress state
//     setNewAddress({
//       line1: '',
//       line2: '',
//       city: '',
//       state: '',
//       country: '',
//       pincode: ''
//     });

//     const url = 'http://localhost:9000/address/add'; 
//     axios.post(url, newAddress)
//       .then(response => {
//         console.log('Address saved successfully:', response.data);
//         // Handle success if needed
//         // For example, you can show a success message to the user
//         alert('Address saved successfully!');
//       })
//       .catch(error => {
//         console.error('Error saving address:', error);
//         // Handle error if needed
//         // For example, you can show an error message to the user
//         alert('Error saving address. Please try again later.');
//       });
//   };

//   return (
//     <div>
//       {/* Address form */}
//       <div>
//         <div>
//           <label>House No:</label>
//           <input
//             type="text"
//             placeholder="Enter House No./Name"
//             value={newAddress.line1}
//             onChange={(e) => handleInputChange("line1", e.target.value)}
//           />
//           {errors.line1 && <Alert variant="danger">{errors.line1}</Alert>}
//         </div>

//         <div>
//           <label>Area:</label>
//           <input
//             type="text"
//             placeholder="Enter Area"
//             value={newAddress.line2}
//             onChange={(e) => handleInputChange("line1", e.target.value)}
//           />
//           {errors.line2 && <Alert variant="danger">{errors.line2}</Alert>}
//         </div>

//         <div>
//           <label>City:</label>
//           <input
//             type="text"
//             placeholder="Enter City"
//             value={newAddress.city}
//             onChange={(e) => handleInputChange("city", e.target.value)}
//           />
//           {errors.city && <Alert variant="danger">{errors.city}</Alert>}
//         </div>

//         <div>
//           <label>State:</label>
//           <input
//             type="text"
//             placeholder="Enter State"
//             value={newAddress.state}
//             onChange={(e) => handleInputChange("state", e.target.value)}
//           />
//           {errors.state && <Alert variant="danger">{errors.state}</Alert>}
//         </div>

//         <div>
//           <label>Country:</label>
//           <input
//             type="text"
//             placeholder="Enter Country"
//             value={newAddress.country}
//             onChange={(e) => handleInputChange("country", e.target.value)}
//           />
//           {errors.country && <Alert variant="danger">{errors.country}</Alert>}
//         </div>

//         <div>
//           <label>Pincode:</label>
//           <input
//             type="text"
//             placeholder="Enter Pincode"
//             value={newAddress.pincode}
//             onChange={(e) => handleInputChange("line1", e.target.value)}
//           />
//           {errors.pincode && <Alert variant="danger">{errors.pincode}</Alert>}
//         </div>
//         {/* Other input fields... */}
//         <Button variant="primary" onClick={handleSaveAddress}>
//           Save
//         </Button>
//       </div>

//       {/* Button to toggle address form */}
//       <Button variant="success" onClick={() => setShowAddAddressForm(!showAddAddressForm)} style={{ display: 'block', margin: '0 auto' }}>
//         Add Address
//       </Button>
//     </div>
//   );
// };

// export default EditAddress;
