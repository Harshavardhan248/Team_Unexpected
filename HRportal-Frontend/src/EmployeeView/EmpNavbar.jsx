import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const EmpNavbar = () => {
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
        <Button color="inherit" onClick={() => navigate("/employee/dashboard")}>
          Dashboard
        </Button>
        <Button color="inherit" onClick={() => navigate("/employee/search")}>
          Search Profiles
        </Button>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default EmpNavbar;
