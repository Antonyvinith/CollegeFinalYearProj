import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

import { Box } from "@mui/material";
import { Button, Form } from "react-bootstrap";
import "../Styling/SidebarStyle.css";

function ProductList() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleAddAdmin = async (e) => {
        e.preventDefault();
        try {
           await axios.post('http://localhost:3000/CreateAdmin', {
                username: username,
                password: password
            });
            alert(`Admin ${username} created successfully`)
           
            setUsername('');
            setPassword('');
        } catch (error) {
            alert(error.response.data.error)
            console.log(error);
        }
    };

    return (
        <>
            <Box height={40} />
            <Box sx={{ display: "flex" }} className="pageBack">
                <Sidebar />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <div className='container'>
                        <div className='py-'>
                            <Box height={40} />
                            <Form onSubmit={handleAddAdmin}>
                                <h2>Create New Admin</h2>
                                <Form.Group className="mb-3" controlId="formUsername">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Create Admin
                                </Button>
                            </Form>
                        </div>
                    </div>
                </Box>
            </Box>
        </>
    );
}

export default ProductList;
