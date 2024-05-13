import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navebar from "../components/Navebar";
import { Box } from "@mui/material";
import { Button } from "react-bootstrap";
import "../Styling/SidebarStyle.css";
import {
  TextField,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

function InventoryList() {
  const [inventories, setInventories] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [first, setFirst] = useState(true);
  const [last, setLast] = useState(false);
  const perPageData = 2;
  const [showInventoryDetails, setShowInventoryDetails] = useState(false);
  const [inventoryDetails, setInventoryDetails] = useState(null);
  const [selectedInventory, setSelectedInventory] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [sortedByQuantity, setSortedByQuantity] = useState("desc");

  const [editedInventory, setEditedInventory] = useState({
    locationReference: "",
    productReference: "",
    quantity: "",
  });

  const [newInventory, setNewInventory] = useState({
    locationReference: "",
    productReference: "",
    quantity: "",
  });

  const [openAddInventoryDialog, setOpenAddInventoryDialog] = useState(false);

  useEffect(() => {
    loadInventory();
    window.scrollTo(0, 0);
    handleInventoryDetails();
  }, [currentPage]);

  const loadInventory = async () => {
    try {
      const result = await axios.get(
        `http://localhost:9000/inventory/all`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(result.data);
      setInventories(result.data.content);
      setFirst(result.data.first);
      setLast(result.data.last);
    } catch (error) {
      console.error("Error loading locations:", error);
    }
  };

  const handlePrev = () => {
    if (!first) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleNext = () => {
    if (!last) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleInventoryDetails = (inventory) => {
    setSelectedInventory(inventory);
  };

  const handleEditInventory = () => {
    setIsEditing(true);
    setEditedInventory(selectedInventory);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedInventory((prevInventory) => ({
      ...prevInventory,
      [name]: value,
    }));
  };

  const handleChangeNewInventory = (e) => {
    const { name, value } = e.target;
    setNewInventory((prevInventory) => ({
      ...prevInventory,
      [name]: value,
    }));
  };

  const handleAddInventoryClick = () => {
    setOpenAddInventoryDialog(true);
  };

  const handleAddInventoryClose = () => {
    setOpenAddInventoryDialog(false);
  };

  const handleDeleteInventory = async () => {
    try {
      await axios.delete(
        `http://localhost:9000/inventory/delete?locationReference=${selectedInventory.locationReference}&productReference=${selectedInventory.productReference}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log("Inventory deleted");

      setSelectedInventory(null);
      loadInventory();
    } catch (error) {
      console.error("Error deleting Inventory:", error);
    }
  };

  const handleSubmit = async () => {
    const data = {
      quantity: editedInventory.quantity,
    };
    console.log(data);

    try {
      const result = await axios.put(
        `http://localhost:9000/inventory/update?locationReference=${editedInventory.locationReference}&productReference=${editedInventory.productReference}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log("Inventory updated:", result.data);

      loadInventory();
      setIsEditing(false);
      window.location.reload();
      window.inventory.reload();
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Error updating Inventory:", error);
    }
  };

  const handleAddInventorySubmit = async () => {
    try {
      const newInventorys = {
        inventoryData: [
          {
            productRef: newInventory.productReference,
            locationRef: newInventory.locationReference,
            quantity: newInventory.quantity,
          },
        ],
        validateData: false,
      };

      console.log(newInventorys);

      const result = await axios.post(
        `http://localhost:9000/inventory`,
        newInventorys,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log("Inventory added:", result.data);
      window.location.reload();
      loadInventory();
      setOpenAddInventoryDialog(false);
    } catch (error) {
      console.error("Error adding Inventory:", error);
    }
  };

  const toggleSortQuantity = () => {
    if (sortedByQuantity === "desc") {
      setInventories([...inventories.sort((a, b) => b.quantity - a.quantity)]);
      setSortedByQuantity("asc");
    } else {
      setInventories([...inventories.sort((a, b) => a.quantity - b.quantity)]);
      setSortedByQuantity("desc");
    }
  };

  const handleIDClick = (inventory) => {
    handleInventoryDetails(inventory);
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
              {selectedInventory ? (
                <div>
                  {isEditing ? (
                    <div
                      className="edit-form"
                      style={{ width: "30%", margin: "auto" }}
                    >
                      <h2>Edit Inventory</h2>
                      <div className="form-field">
                        <label htmlFor="quantity">Quantity</label>
                        <input
                          type="text"
                          id="quantity"
                          name="quantity"
                          value={editedInventory.quantity}
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
                      <h2>Inventory Details</h2>
                      <p>Inventory ID: {selectedInventory.id}</p>
                      <p>Location Reference: {selectedInventory.locationReference}</p>
                      <p>Product Reference: {selectedInventory.productReference}</p>
                      <p>Quantity: {selectedInventory.quantity}</p>
                      <div className="action-buttons">
                        <Button onClick={handleEditInventory}>
                          Edit Inventory
                        </Button>
                        <Button onClick={handleDeleteInventory}>
                          Delete Inventory
                        </Button>
                        <Button onClick={() => setSelectedInventory(null)}>
                          Back to List
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <>
                    <div className="add-button">
                      <Button
                        variant="outlined"
                        onClick={handleAddInventoryClick}
                      >
                        Add Inventory
                      </Button>
                    </div>
                    <table className="table border shadow">
                      <thead>
                        <tr>
                          <th scope="col" onClick={toggleSortQuantity} style={{ cursor: 'pointer' }}>
                            ID
                          </th>
                          <th scope="col">Location Reference</th>
                          <th scope="col">Product Reference</th>
                          <th scope="col" onClick={toggleSortQuantity} style={{ cursor: 'pointer' }}>
                            Quantity
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {inventories.map((inventory) => (
                          <tr key={inventory.id} onClick={() => handleIDClick(inventory)} style={{ cursor: 'pointer' }}>
                            <td>{inventory.id}</td>
                            <td>{inventory.locationReference}</td>
                            <td>{inventory.productReference}</td>
                            <td>{inventory.quantity}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="btn-group mb-2">
                      {currentPage > 0 && (
                        <Button onClick={handlePrev}>Prev</Button>
                      )}
                      {inventories.length === perPageData && (
                        <Button onClick={handleNext}>Next</Button>
                      )}
                    </div>
                  </>
                </div>
              )}
            </div>
          </div>
        </Box>
      </Box>

      <Dialog open={openAddInventoryDialog} onClose={handleAddInventoryClose}>
        <DialogTitle>Add New Inventory</DialogTitle>
        <DialogContent>
          <div className="form-field">
            <label htmlFor="locationReference">Location Reference</label>
            <input
              type="text"
              id="locationReference"
              name="locationReference"
              value={newInventory.locationReference}
              onChange={handleChangeNewInventory}
            />
          </div>
          <div className="form-field">
            <label htmlFor="productReference">Product Reference</label>
            <input
              type="text"
              id="productReference"
              name="productReference"
              value={newInventory.productReference}
              onChange={handleChangeNewInventory}
            />
          </div>
          <div className="form-field">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="text"
              id="quantity"
              name="quantity"
              value={newInventory.quantity}
              onChange={handleChangeNewInventory}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddInventoryClose}>Cancel</Button>
          <Button onClick={handleAddInventorySubmit}>Add Inventory</Button>
        </DialogActions>
      </Dialog>
    </>

  );
}

export default InventoryList;

