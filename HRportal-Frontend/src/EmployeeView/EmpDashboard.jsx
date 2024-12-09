import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Paper, CircularProgress, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const EmpDashboard = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const loggedInEmail = localStorage.getItem("loggedInEmail");
      if (!loggedInEmail) {
        setError("Please login.");
        setLoading(false);
        return;
      }

      try {
        const response = await api.get(`/employees/email`, {
          params: { email: loggedInEmail },
          withCredentials: true,
        });

        if (response.data) {
          setUserDetails(response.data);
        } else {
          setError("No user details found for the logged-in email.");
        }
      } catch (err) {
        console.error("Failed to fetch user details:", err.response || err.message);
        setError("Failed to load user details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h6" color="error">
          {error}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={() => navigate("/login")}
        >
          Go to Login
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Welcome, {userDetails.firstName} {userDetails.lastName}!
      </Typography>
      <Paper
        elevation={3}
        sx={{
          padding: "30px",
          maxWidth: "800px",
          width: "100%",
          backgroundColor: "#ffffff",
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{ marginBottom: "20px", fontWeight: "bold" }}
        >
          Your Details:
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Typography><strong>Email:</strong> {userDetails.emailId}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography><strong>Phone:</strong> {userDetails.phoneNumber || "N/A"}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography><strong>Address:</strong> {userDetails.address || "N/A"}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography><strong>Department:</strong> {userDetails.department || "N/A"}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography><strong>Designation:</strong> {userDetails.designation || "N/A"}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography><strong>Gender:</strong> {userDetails.gender || "N/A"}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography><strong>Date of Birth:</strong> {userDetails.dateOfBirth || "N/A"}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography><strong>Date of Joining:</strong> {userDetails.dateOfJoining || "N/A"}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography><strong>Nationality:</strong> {userDetails.nationality || "N/A"}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography><strong>Emergency Contact Name:</strong> {userDetails.emergencyContactName || "N/A"}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography><strong>Emergency Contact Phone:</strong> {userDetails.emergencyContactPhone || "N/A"}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography><strong>Employment Type:</strong> {userDetails.employmentType || "N/A"}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography><strong>Work Location:</strong> {userDetails.workLocation || "N/A"}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography><strong>Career Level:</strong> {userDetails.careerLevel || "N/A"}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography><strong>Contract Type:</strong> {userDetails.contractType || "N/A"}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography><strong>Shift Timing:</strong> {userDetails.shiftTiming || "N/A"}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default EmpDashboard;
