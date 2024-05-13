import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navebar from "../components/Navebar";
import { Box } from "@mui/material";
import { Button } from "react-bootstrap";
import "../Styling/SidebarStyle.css";
import userEvent from "@testing-library/user-event";

function UserList() {
  const [users, setUsers] = useState([]);
  const [first, setFirst] = useState(true);
  const [last, setLast] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const scrollToRef = useRef(null);
  const perPageData = 2;

  useEffect(() => {
    loadUsers();
    window.scrollTo(0, 0);
  }, [currentPage]);

  const loadUsers = async () => {
    const token = localStorage.getItem("token");
    // const headers = {'Authorization': `Bearer ${token}`};

    const result = await axios.get(`http://localhost:3000/viewUsers`, {});
    setUsers(result.data);
    console.log(result.data);
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
              <table className="table border shadow">
                <thead>
                  <tr>
                    {/* <th scope="col">#</th> */}
                    <th scope="col">UserName</th>
                    <th scope="col">User Type</th>
                    <th scope="col">email</th>
                  </tr>
                </thead>
                <tbody>
                  {console.log("users",users)}
                  {users.map((user) => (
                    <tr>
                      {/* <th scope="row">{index+1}</th> */}
                      <td ><strong>{user}</strong></td>
                     
                    </tr>
                  ))}
                </tbody>
              </table>
              <div></div>
            </div>
          </div>
        </Box>
      </Box>
    </>
  );
}

export default UserList;
