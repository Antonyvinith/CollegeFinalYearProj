

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
// import image from '../assets/profileImages/rachana.jpg'
import image from '../assets/profileImages/rachana.jpg';

const Profile = () => {
  const initialProfile={
  // const [profile, setProfile] = useState({
    firstName: localStorage.getItem('firstName') || '',
    lastName: localStorage.getItem('lastName') || '',
    dob: localStorage.getItem('dob') || '',
    phone: localStorage.getItem('phone') || '',
    email: localStorage.getItem('email') || '',
    customerID: localStorage.getItem('customerID') || '',
    username: localStorage.getItem('username') || '',
    userImage: '' // Added userImage state
  }
  const[profile,setProfile]=useState(initialProfile);
  const [image1, setImage]= useState(null);
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  });
  const importImage = async (name) => {
      const image = await import(`../assets/profileImages/${name}`);
      setImage(image.default);
    //   localStorage.setItem('image', name);
  };
  useEffect(()=>{
    importImage(localStorage.getItem('image'));
    // setImage(image)
  },[])

  // const [errors, setErrors] = useState({
  //   firstName: '',
  //   lastName: '',
  //   phone: '',
  //   email: '',
  // });

  const [isDisabled, setIsDisabled] = useState(true);

  // useEffect(() => {
  //   fetchProfileDetails();
  // }, []);
  // useEffect(() => {
  //   setIsDisabled(isProfileUnchanged());
  // }, [profile]);

  // useEffect(() => {
  //   setIsDisabled(!(profile.firstName && profile.phone));
  // }, [profile]);
  // useEffect(() => {
  //   setIsDisabled(isProfileUnchanged());
  //   // setIsDisabled(false);
  // }, [profile]);

  const isProfileUnchanged = () => {
    return Object.keys(profile).every((key) => profile[key] === initialProfile[key]);
  };
  
  const fetchProfileDetails = async () => {
    const token = localStorage.getItem('token');
  
    try {
      const response = await axios.post(
        `http://localhost:9000/customer/get-by-username`,
        {
          username: localStorage.getItem('username'),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.data) {
        console.log(response.data.responseData)
        const {
          firstName,
          lastName,
          phone,
          email,
          customerID,
          userImage // Added userImage
        } = response.data.responseData;
  
        setProfile({
          firstName,
          lastName,
          phone,
          email,
          customerID,
          userImage // Set userImage
        });
      }
    } catch (error) {
      console.error('Error fetching profile details:', error);
    }
  };

  const updateProfile = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Handle invalid session or missing data
      return;
    }

    const { firstName, lastName, phone, email } = profile;
    const username = localStorage.getItem('username');

    // Validation
    let formIsValid = true;
    const errorsCopy = { ...errors };

    if (!firstName.trim() || !/^[a-zA-Z]+$/.test(firstName)) {
      errorsCopy.firstName = 'Required  section and contains only letters';
      formIsValid = false;
    } else {
      errorsCopy.firstName = '';
    }

    if (lastName && !/^[a-zA-Z]+$/.test(lastName)) {
      errorsCopy.lastName = 'Last name should contain only letters';
      formIsValid = false;
    } else {
      errorsCopy.lastName = '';
    }

    if (!phone.trim() || !/^\d{9,14}$/.test(phone)) {
      errorsCopy.phone = 'Phone number is Invalid';
      formIsValid = false;
    } else {
      errorsCopy.phone = '';
    }

    if (!email.trim() || !/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email)) {
      errorsCopy.email = 'Email is Invalid (example@example.com)';
      formIsValid = false;
    } else {
      errorsCopy.email = '';
    }

    if (!formIsValid) {
      setErrors(errorsCopy);
      return;
    }

    try {
      const response = await axios.put('http://localhost:9000/customer/update-by-username', {
        username,
        firstName,
        lastName,
        phone,
        email,
        // image : localStorage.getItem('image')
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type":"application/json"
        },
      });
      console.log('Response from API:', response); // Log the response here
      if (response.data) {
        console.log('Profile updated successfully');
        console.log('Request Payload:', {
          username,
          firstName,
          lastName,
          phone,
          email,
        });

        // Update local state
        setProfile({
          ...profile,
          firstName,
          lastName,
          phone,
          email,
        });

        // Update local storage
        localStorage.setItem('firstName', firstName);
        localStorage.setItem('lastName', lastName);
        localStorage.setItem('phone', phone);
        localStorage.setItem('email', email);
        // localStorage.setItem('image')
      } else {
        console.error('Update failed:', response.data);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  function displayFormData(formData) {
    // Get an iterator for the key-value pairs in the FormData object
    const iterator = formData.entries();
    // Iterate over each key-value pair
    for (const pair of iterator) {
      const [key, value] = pair;
      console.log(`${key}: ${value}`);
      // You can also display the key-value pair in the UI instead of logging
      // Example: document.getElementById('output').innerText += `${key}: ${value}\n`;
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfile({ ...profile, [name]: value });
    // Clear error message when input changes
    setErrors({ ...errors, [name]: '' });
    setIsDisabled(false);
  };

  const handleEditPicture = () => {
    document.getElementById('profile-picture').click();
  };
  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      return; // No file selected, exit function
    }
  
    // Check file extension
    const validExtensions = ['jpg', 'jpeg'];
    const fileExtension = file.name.split('.').pop().toLowerCase();
    if (!validExtensions.includes(fileExtension)) {
      alert('Please select a JPG or JPEG file.');
      return;
    }
  
    // Check file size
    const fileSizeMB = file.size / (1024 * 1024); // Convert bytes to MB
    if (fileSizeMB > 1) {
      alert('Please select an image file smaller than 1MB.');
      return;
    }
  
    const reader = new FileReader();
    const formData = new FormData();
    formData.append('email', profile.email); // Add email to formData
    formData.append('imageFile', file, file.name); // Add image file to formData
    importImage(file.name)
   
    displayFormData(formData);
    reader.onload = async (event) => {
      const imageUrl = event.target.result;
      setProfile({ ...profile, userImage: imageUrl });
   localStorage.setItem('userImage',imageUrl);
      // Create FormData object
      const formData = new FormData();
      formData.append('email', profile.email); // Add email to formData
      formData.append('imageFile', file, file.name); // Add image file to formData
     
      displayFormData(formData);
  
      try {
        const token = localStorage.getItem('token');
        // Send request to backend API
        const response = await axios.post(
          `http://localhost:9000/customer/upload-profile-image?picName=${file.name}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        console.log('Profile picture updated:', response.data);
        localStorage.setItem('image',response?.data?.[0])
      } catch (error) {
        console.error('Error updating profile picture:', error);
      }
    };
    reader.readAsDataURL(file);
  };
  // const isProfileUnchanged = () => {
  //   return Object.keys(profile).every(key => profile[key] === localStorage.getItem(key));
  // };
  return (
    <Card style={{ width: '1100px', margin: '0 auto', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', backgroundColor: 'lightgray' }}>
      <CardBody>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <label htmlFor="profile-picture">
              {image1 ? (
                <img
                //   src={profile.userImage}
                src={image1}
                  alt="Profile"
                  style={{ width: '200px', height: '200px', borderRadius: '50%', cursor: 'pointer' }}
                  onClick={handleEditPicture}
                />
              ) : (
                <div>
                  <FontAwesomeIcon icon={faUser} size="5x" style={{ color: '#007bff', cursor: 'pointer' }} />
                  <p style={{ color: '#007bff', cursor: 'pointer', marginTop: '5px' }}>Add Profile Picture</p>
                </div>
              )}
            </label>
            <input
              id="profile-picture"
              type="file"
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
          </div>
        </div>
        <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
  <div style={{ width: '48%' }}>
    <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>First Name</div>
    <input
      type="text"
      name="firstName"
      className="form-control"
      placeholder="Enter your first name"
      value={profile.firstName}
      onChange={handleInputChange}
      style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
    />
    {errors.firstName && <div style={{ color: 'red' }}>{errors.firstName}</div>}
  </div>
  <div style={{ width: '48%' }}>
    <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Last Name</div>
    <input
      type="text"
      name="lastName"
      className="form-control"
      placeholder="Enter your last name"
      value={profile.lastName}
      onChange={handleInputChange}
      style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
    />
    {errors.lastName && <div style={{ color: 'red' }}>{errors.lastName}</div>}
  </div>
</div>
<div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
  <div style={{ width: '48%' }}>
    <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Phone Number</div>
    <input
      type="text"
      name="phone"
      className="form-control"
      placeholder="Enter your phone number"
      value={profile.phone}
      onChange={handleInputChange}
      style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
    />
    {errors.phone && <div style={{ color: 'red' }}>{errors.phone}</div>}
  </div>
  <div style={{ width: '48%' }}>
    <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Email</div>
    <input
      type="email"
      name="email"
      className="form-control"
      placeholder="Enter your email"
      value={profile.email}
      onChange={handleInputChange}
      style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
      disabled
    />
    {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
  </div>
</div>

        <button className="btn btn-primary" onClick={updateProfile} disabled={isDisabled} style={{ width: '800px', padding: '10px', backgroundColor: 'black', color: 'white', border: 'none', borderRadius: '7px', cursor: 'pointer' }}>Update Profile</button>
      </CardBody>
    </Card>
  );
};

export default Profile;

