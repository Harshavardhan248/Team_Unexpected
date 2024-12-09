import React, { useState } from "react";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear any previous error message
    try {
      const response = await api.post("/login", formData); // Ensure backend returns user role and other info
      const { role, email } = response.data; // Assume backend returns { role: "Employee", email: "user@example.com" }

      // Save email in localStorage for session tracking
      localStorage.setItem("loggedInEmail", email);

      // Navigate based on user role
      if (role === "Employee") {
        navigate("/employee/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage("Email ID or Password is wrong. Please try again.");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      sx={{ bgcolor: "#f5f5f5" }}
    >
      <Typography variant="h4" gutterBottom>
        Welcome back
      </Typography>
      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2, width: "300px" }}>
          {errorMessage}
        </Alert>
      )}
      <form onSubmit={handleSubmit} style={{ width: "300px" }}>
        <TextField
          name="email"
          label="Email ID"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Sign in
        </Button>
      </form>
      <Button onClick={handleGoogleLogin} variant="text" color="secondary" sx={{ mt: 2 }}>
        Login with Google
      </Button>
    </Box>
  );
};

export default Login;
