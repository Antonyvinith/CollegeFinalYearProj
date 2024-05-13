
import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import '../Styling/ArticleCreation.css'; // Import the CSS file for styling

function ArticleCreation({ fulfillmentId, onClose }) {
  // State variables for the article fields
  const [articleRef, setArticleRef] = useState('');
  const [skuRef, setSkuRef] = useState('');
  const [quantity, setQuantity] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingUrl, setTrackingUrl] = useState('');
  const [carrier, setCarrier] = useState('');
  const [height, setHeight] = useState(0);
  const [length, setLength] = useState(0);
  const [width, setWidth] = useState(0);

  // Function to handle changes in the input fields
  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
  };

  // Function to handle article creation and save it in PostgreSQL
  const handleCreateArticle = async () => {
    const articleData = {
      fulfillmentId, // Use the provided fulfillment ID
      articleRef,
      skuRef,
      quantity: parseInt(quantity, 10),
      trackingNumber,
      trackingUrl,
      carrier,
      height: parseFloat(height),
      length: parseFloat(length),
      width: parseFloat(width),
    };

    try {
      // Send the POST request to the API endpoint to create the article
      await axios.post('http://localhost:9000/fulfillment/pack', articleData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      // Notify the user of successful creation
      alert('Article created successfully!');
      onClose(); // Close the article creation component
    } catch (error) {
      console.error('Error creating article:', error);
      alert('Failed to create article. Please try again.');
    }
  };

  return (
    <div className="article-creation-container">
      <h2>Create Article</h2>
      <div className="article-creation-inputs">
        <input
          type="text"
          placeholder="Article Reference"
          value={articleRef}
          onChange={handleInputChange(setArticleRef)}
        />
        <input
          type="text"
          placeholder="SKU Reference"
          value={skuRef}
          onChange={handleInputChange(setSkuRef)}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={handleInputChange(setQuantity)}
        />
        <input
          type="text"
          placeholder="Tracking Number"
          value={trackingNumber}
          onChange={handleInputChange(setTrackingNumber)}
        />
        <input
          type="text"
          placeholder="Tracking URL"
          value={trackingUrl}
          onChange={handleInputChange(setTrackingUrl)}
        />
        <input
          type="text"
          placeholder="Carrier"
          value={carrier}
          onChange={handleInputChange(setCarrier)}
        />
        <input
          type="number"
          placeholder="Height"
          step="0.01"
          value={height}
          onChange={handleInputChange(setHeight)}
          className="no-spin" // CSS class to hide the number spinner
        />
        <input
          type="number"
          placeholder="Length"
          step="0.01"
          value={length}
          onChange={handleInputChange(setLength)}
          className="no-spin" // CSS class to hide the number spinner
        />
        <input
          type="number"
          placeholder="Width"
          step="0.01"
          value={width}
          onChange={handleInputChange(setWidth)}
          className="no-spin" // CSS class to hide the number spinner
        />
      </div>

      <div className="article-creation-buttons">
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleCreateArticle}>
          Create Article
        </Button>
      </div>
    </div>
  );
}

export default ArticleCreation;
