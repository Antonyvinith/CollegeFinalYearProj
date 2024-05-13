import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navebar from "../components/Navebar";
import { Box } from "@mui/material";
import { Button } from "react-bootstrap";
import "../Styling/SidebarStyle.css"

function UserList() {

    const [users,setUsers]=useState([]);
    const [first, setFirst] = useState(true);
    const [last, setLast] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const scrollToRef = useRef(null);
    const perPageData = 2;

    useEffect(()=>{
        loadUsers();
        window.scrollTo(0, 0);
    },[currentPage]);

    const loadUsers=async()=>{
        const token = localStorage.getItem('token'); 
        // const headers = {'Authorization': `Bearer ${token}`};

        const result =await axios.get(`http://localhost:9000/user/users?page=${currentPage}&size=${perPageData}`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type":"application/json"
              },
              withCredentials:true,
        });
        console.log(result.data);
        setUsers(result.data); 
        setFirst(result.data.first);
        setLast(result.data.last); 
    }


    const handlePrev = () => {
        if(!first )
        {
         setCurrentPage(currentPage-1);
         window.scrollTo(0, 0);
        //  scrollToRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      };
      const handleNext = () => {
        if(!last)
        {
          setCurrentPage(currentPage+1);
          window.scrollTo(0, 0);
        //   scrollToRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
          
        }
      };


    return (<>
        <Navebar />
        <Box height={40} />
        <Box sx={{ display: "flex" }} className="pageBack">
            <Sidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <div className='container'>
            <div className='py-'>
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
                        {
                            users.map((user, index)=>(
                                <tr key={user.id}>
                                    {/* <th scope="row">{index+1}</th> */}
                                    <td>{user.username}</td>
                                    <td>{user.userType}</td>
                                    <td>{user.email}</td>
                                </tr>
                            ))
                        }   
                    </tbody>
                </table>
                <div>
                <div className="btn-group mb-2">
                    {
                        users.length!==0?<div >
                            <Button onClick={handlePrev}>
                                Prev
                            </Button>
                            <Button onClick={handleNext}>
                                Next
                            </Button>
                        </div>:""
                    }
                </div>
                </div>
            </div>
        </div>
        </Box>
        </Box>
    </>
    )
}

export default UserList;