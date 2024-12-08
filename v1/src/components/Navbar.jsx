import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/logout");
      document.cookie = "JSESSIONID=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Failed to logout. Please try again.");
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976d2", padding: "10px" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          HR Connect
        </Typography>
        <Button color="inherit" onClick={() => navigate("/dashboard")}>
          Dashboard
        </Button>
        <Button color="inherit" onClick={() => navigate("/manage-employees")}>
          Manage Employees
        </Button>
        <Button color="inherit" onClick={() => navigate("/view-employees")}>
          View Employees
        </Button>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
