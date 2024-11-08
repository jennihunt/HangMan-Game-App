import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";


const PrivateRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/user/check-authentication", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data)
        setIsAuthenticated(res.data.isAuthenticated);
       
      })
      .catch((error) => {
        console.log("Error checking authentication", error);
      });
    
  }, []);
  console.log(isAuthenticated);
  // Check if the user is authenticated

  return (
    isAuthenticated ? <Outlet /> : <h1>User Not Authorized for this page</h1>
  )
};

export default PrivateRoutes;
