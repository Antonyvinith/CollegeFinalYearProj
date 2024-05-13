import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navebar from "../components/Navebar";
import "../Styling/SidebarStyle.css";
import { useNavigate } from "react-router-dom";

function LocationList() {
  const [filterOptions, setFilterOptions] = useState({
    option1: false,
    option2: false,
    option3: false,
    option4: false,
  });

  const navigate = useNavigate();
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editedLocation, setEditedLocation] = useState({
    locationRef: "",
    locationName: "",
    locationType: "",
    openingTime: "",
    closingTime: "",
    locationAddress: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      country: "",
      pinCode: "",
      latitude: "",
      longitude: "",
    },
  });
  const [newLocation, setNewLocation] = useState({
    locationRef: "",
    locationName: "",
    locationType: "",
    openingTime: "",
    closingTime: "",
    locationAddress: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      country: "",
      pinCode: "",
      latitude: "",
      longitude: "",
    },
  });
  const [fulfillmentStatuses, setFulfillmentStatuses] = useState([]);
  const [selectedFulfillmentStatus, setSelectedFulfillmentStatus] =
    useState("");
  const [openAddLocationDialog, setOpenAddLocationDialog] = useState(false);
  const perPageData = 4;
  useEffect(() => {
    loadLocations();
    window.scrollTo(0, 0);
    handleLocationDetails();
  }, [currentPage]);

  const loadLocations = async () => {
    try {
      const result = await axios.get(
        `http://localhost:9000/location/allLocations?page=${currentPage}&size=${perPageData}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(result.data.content);
      console.log("locations loaded");
      setLocations(result.data.content);
    } catch (error) {
      console.error("Error loading locations:", error);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
    window.scrollTo(0, 0);
  };

  const handleLocationDetails = (location) => {
    setSelectedLocation(location);
    console.log("Location", selectedLocation);
  };

  const handleEditLocation = () => {
    setIsEditing(true);
    setEditedLocation(selectedLocation);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedLocation((prevLocation) => ({
      ...prevLocation,
      [name]: value,
    }));
  };

  const handleChangeAddress = (field, value) => {
    setEditedLocation((prevLocation) => ({
      ...prevLocation,
      locationAddress: {
        ...prevLocation.locationAddress,
        [field]: value,
      },
    }));
  };

  const handleChangeNewLocation = (e) => {
    const { name, value } = e.target;
    setNewLocation((prevLocation) => ({
      ...prevLocation,
      [name]: value,
    }));
  };

  const handleChangeNewAddress = (field, value) => {
    setNewLocation((prevLocation) => ({
      ...prevLocation,
      locationAddress: {
        ...prevLocation.locationAddress,
        [field]: value,
      },
    }));
  };
  const openPopup = () => {
    const popup = window.open("", "Popup", "width=600,height=400");
    popup.document.body.innerHTML = '<div id="popup-content"></div>';
    const popupContent = popup.document.getElementById("popup-content");
    popupContent.innerHTML =
      "<h2>List of Items</h2><ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>";
  };

  const handlePopUp = () => {
    openPopup();
  };

  const handleFulfillmentStatusChange = (event) => {
    setSelectedFulfillmentStatus(event.target.value);
  };

  const handleAddLocationClick = () => {
    setOpenAddLocationDialog(true);
  };

  const handleAddLocationClose = () => {
    setOpenAddLocationDialog(false);
  };

  const filterLocationsByFulfillmentStatus = () => {
    return locations.filter((location) => {
      if (!selectedFulfillmentStatus) {
        return true;
      }
      return location.fulfillmentStatus === selectedFulfillmentStatus;
    });
  };

  const handleDeleteLocation = async () => {
    try {
      console.log("location ref ", selectedLocation.locationRef);
      await axios.delete(
        `http://localhost:9000/location/Delete/${selectedLocation.locationRef}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log("Location deleted");
      setSelectedLocation(null);
      loadLocations();
    } catch (error) {
      console.error("Error deleting location:", error);
    }
  };

  const handleSubmit = async () => {
    const data = {
      locationName: editedLocation.locationName,
    };
    console.log(data);

    try {
      const result = await axios.put(
        `http://localhost:9000/location/Update/${editedLocation.locationRef}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log("Location updated:", result.data);

      loadLocations();

      setIsEditing(false);
      window.location.reload();

      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Error updating location:", error);
    }
  };

  const handleAddLocationSubmit = async () => {
    try {
      const newLocations = [
        {
          locationReference: newLocation.locationRef,
          openingTime: newLocation.openingTime,
          closingTime: newLocation.closingTime,
          locationName: newLocation.locationName,
          locationType: newLocation.locationType,
          locationAddress: {
            line1: newLocation.locationAddress.line1,
            line2: newLocation.locationAddress.line2,
            city: newLocation.locationAddress.city,
            state: newLocation.locationAddress.state,
            country: newLocation.locationAddress.country,
            pinCode: newLocation.locationAddress.pinCode,
            latitude: newLocation.locationAddress.latitude,
            longitude: newLocation.locationAddress.longitude,
          },
        },
      ];

      console.log(newLocations);

      const result = await axios.post(
        `http://localhost:9000/location`,
        newLocations,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log("Location added:", result.data);
      window.location.reload();
      loadLocations();
      setOpenAddLocationDialog(false);
    } catch (error) {
      console.error("Error adding location:", error);
    }
  };

  const handleFilterOptionChange = (option) => {
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      [option]: !prevOptions[option],
    }));
  };

  const handleApplyFilter = async () => {
    const filter = {
      CREATED: false,
      ASSIGNED: false,
      SYSTEMREJECTED: true,
      REFUNDED: false,
      ACKNOWLEDGED: false,
      FULFILLED: false,
      PARTIALLYFULFILLED: false,
      REJECTED: true,
      PACKED: false,
      SHIPPED: false,
      DELIVERED: false,
      READYTOCOLLECT: false,
      COLLECTED: false,
    };
    console.log("HUuh");
    const result = await axios.post(
      `http://localhost:9000/fulfillment/getLocationByFulfillmentStatus`,
      filter,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log("Location added:", result.data);
    loadLocations();
    setOpenAddLocationDialog(false);
  };

  return (
    <>
      <Navebar />
      <Box height={40} />
      <Box sx={{ display: "flex" }} className="pageBack">
        <Sidebar />

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <div className="container">
            <div className="py-">
              <Box height={40} />
              {selectedLocation ? (
                <div>
                  {isEditing ? (
                    <div
                      className="edit-form"
                      style={{ width: "30%", margin: "auto" }}
                    >
                      <h2>Edit Location</h2>
                      <div className="form-field">
                        <label htmlFor="locationName">Location Name</label>
                        <input
                          type="text"
                          id="locationName"
                          name="locationName"
                          value={editedLocation.locationName}
                          onChange={handleChange}
                        />
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <button className="submit-btn" onClick={handleSubmit}>
                          Update
                        </button>
                        <button
                          className="back-btn"
                          onClick={() => setIsEditing(false)}
                        >
                          Back
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h2>Location Details</h2>
                      <p>Location ID: {selectedLocation.id}</p>
                      <p>
                        Location Reference: {selectedLocation.locationRef}
                      </p>{" "}
                      <p>Location Type: {selectedLocation.locationType}</p>
                      <p>Location Name: {selectedLocation.locationName}</p>
                      <p>Opening Time: {selectedLocation.openingTime}</p>
                      <p>Closing Time: {selectedLocation.closingTime}</p>
                      <div className="action-buttons">
                        <Button onClick={handleEditLocation}>
                          Edit Location
                        </Button>
                        <Button onClick={handleDeleteLocation}>
                          {" "}
                          Delete Location
                        </Button>
                        <Button onClick={() => setSelectedLocation(null)}>
                          {" "}
                          Back to List
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <>
                    <div className="LocationListContainer">
                      <div className="add-button">
                        <Button
                          variant="outlined"
                          onClick={handleAddLocationClick}
                        >
                          Add Location
                        </Button>
                      </div>
                      <table className="table border shadow">
                        <thead>
                          <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Location Reference</th>
                            <th scope="col">Location Type</th>
                            <th scope="col">Location Name</th>
                            <th scope="col"> </th>
                          </tr>
                        </thead>
                        <tbody>
                          {locations.map((location) => (
                            <tr
                              onClick={() => handleLocationDetails(location)}
                              style={{ cursor: "pointer" }}
                              key={location.id}
                            >
                              <td>{location.id}</td>
                              <td>{location.locationRef}</td>
                              <td>{location.locationType}</td>
                              <td>{location.locationName}</td>
                              <td>
                                <Button>Add to Network </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="btn-group mb-2">
                        {currentPage > 0 && (
                          <Button onClick={handlePrev}>Prev</Button>
                        )}
                        {locations.length === perPageData && (
                          <Button onClick={handleNext}>Next</Button>
                        )}
                      </div>
                    </div>
                  </>
                </div>
              )}
            </div>
          </div>
        </Box>
      </Box>

      <Dialog open={openAddLocationDialog} onClose={handleAddLocationClose}>
        <DialogTitle>Add New Location</DialogTitle>
        <DialogContent>
          <div className="form-field">
            <label htmlFor="locationRef">Location Reference</label>
            <input
              type="text"
              id="locationRef"
              name="locationRef"
              value={newLocation.locationRef}
              onChange={handleChangeNewLocation}
            />
          </div>
          <div className="form-field">
            <label htmlFor="locationName">Location Name</label>
            <input
              type="text"
              id="locationName"
              name="locationName"
              value={newLocation.locationName}
              onChange={handleChangeNewLocation}
            />
          </div>
          <div className="form-field">
            <label htmlFor="locationType">Location Type</label>
            <select
              id="locationType"
              name="locationType"
              value={newLocation.locationType}
              onChange={handleChangeNewLocation}
            >
              <option value="STORE">Store</option>
              <option value="WAREHOUSE">Warehouse</option>
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="line1">Address Line 1</label>
            <input
              type="text"
              id="line1"
              name="line1"
              value={newLocation.locationAddress.line1}
              onChange={(e) => handleChangeNewAddress("line1", e.target.value)}
            />
          </div>
          <div className="form-field">
            <label htmlFor="line2">Address Line 2</label>
            <input
              type="text"
              id="line2"
              name="line2"
              value={newLocation.locationAddress.line2}
              onChange={(e) => handleChangeNewAddress("line2", e.target.value)}
            />
          </div>
          <div className="form-field">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={newLocation.locationAddress.city}
              onChange={(e) => handleChangeNewAddress("city", e.target.value)}
            />
          </div>
          <div className="form-field">
            <label htmlFor="state">State</label>
            <input
              type="text"
              id="state"
              name="state"
              value={newLocation.locationAddress.state}
              onChange={(e) => handleChangeNewAddress("state", e.target.value)}
            />
          </div>
          <div className="form-field">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              id="country"
              name="country"
              value={newLocation.locationAddress.country}
              onChange={(e) =>
                handleChangeNewAddress("country", e.target.value)
              }
            />
          </div>
          <div className="form-field">
            <label htmlFor="pinCode">Pin Code</label>
            <input
              type="text"
              id="pinCode"
              name="pinCode"
              value={newLocation.locationAddress.pinCode}
              onChange={(e) =>
                handleChangeNewAddress("pinCode", e.target.value)
              }
            />
          </div>
          <div className="form-field">
            <label htmlFor="openingTime">Opening Time</label>
            <input
              type="text"
              id="openingTime"
              name="openingTime"
              value={newLocation.openingTime}
              onChange={(e) => handleChangeNewLocation(e)}
            />
          </div>
          <div className="form-field">
            <label htmlFor="closingTime">Closing</label>
            <input
              type="text"
              id="closingTime"
              name="closingTime"
              value={newLocation.closingTime}
              onChange={(e) => handleChangeNewLocation(e)}
            />
          </div>
          <div className="form-field">
            <label htmlFor="latitude">Latitude</label>
            <input
              type="text"
              id="latitude"
              name="latitude"
              value={newLocation.locationAddress.latitude}
              onChange={(e) =>
                handleChangeNewAddress("latitude", e.target.value)
              }
            />
          </div>
          <div className="form-field">
            <label htmlFor="longitude">Longitude</label>
            <input
              type="text"
              id="longitude"
              name="longitude"
              value={newLocation.locationAddress.longitude}
              onChange={(e) =>
                handleChangeNewAddress("longitude", e.target.value)
              }
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddLocationClose}>Cancel</Button>
          <Button onClick={handleAddLocationSubmit}>Add Location</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default LocationList;
