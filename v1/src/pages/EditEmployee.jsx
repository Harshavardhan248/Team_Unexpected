import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, MenuItem } from "@mui/material";
import api from "../services/api";
import { useParams, useNavigate } from "react-router-dom";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    phoneNumber: "",
    address: "",
    department: "",
    designation: "",
    gender: "",
    dateOfBirth: "",
    dateOfJoining: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    employmentType: "",
    nationality: "",
    workLocation: "",
    careerLevel: "",
    contractType: "",
    shiftTiming: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await api.get(`/employees/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error("Failed to fetch employee data:", error);
        alert("Failed to fetch employee data. Please try again.");
      }
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Reset error if any field changes
    setError("");

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: Date of Joining must be greater than Date of Birth
    if (new Date(formData.dateOfJoining) <= new Date(formData.dateOfBirth)) {
      setError("Joining Date cannot be less than Date of Birth.");
      return;
    }

    try {
      await api.put(`/employees/${id}`, formData);
      navigate("/manage-employees");
    } catch (error) {
      console.error("Failed to update employee:", error);
      alert("Failed to update employee. Please try again.");
    }
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
        Edit Employee
      </Typography>
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      <form onSubmit={handleSubmit} style={{ width: "600px" }}>
        <TextField
          name="firstName"
          label="First Name"
          value={formData.firstName}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          name="lastName"
          label="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          name="emailId"
          label="Email"
          value={formData.emailId}
          onChange={handleChange}
          fullWidth
          required
          type="email"
          sx={{ mb: 2 }}
        />
        <TextField
          name="phoneNumber"
          label="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          name="address"
          label="Address"
          value={formData.address}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          name="department"
          label="Department"
          value={formData.department}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          name="designation"
          label="Designation"
          value={formData.designation}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          name="gender"
          label="Gender"
          value={formData.gender}
          onChange={handleChange}
          fullWidth
          select
          required
          sx={{ mb: 2 }}
        >
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
          <MenuItem value="Non-binary">Non-binary</MenuItem>
        </TextField>
        <TextField
          name="dateOfBirth"
          label="Date of Birth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          fullWidth
          type="date"
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 2 }}
        />
        <TextField
          name="dateOfJoining"
          label="Date of Joining"
          value={formData.dateOfJoining}
          onChange={handleChange}
          fullWidth
          type="date"
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 2 }}
        />
        <TextField
          name="emergencyContactName"
          label="Emergency Contact Name"
          value={formData.emergencyContactName}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          name="emergencyContactPhone"
          label="Emergency Contact Phone"
          value={formData.emergencyContactPhone}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          name="employmentType"
          label="Employment Type"
          value={formData.employmentType}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          name="nationality"
          label="Nationality"
          value={formData.nationality}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          name="workLocation"
          label="Work Location"
          value={formData.workLocation}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          name="careerLevel"
          label="Career Level"
          value={formData.careerLevel}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          name="contractType"
          label="Contract Type"
          value={formData.contractType}
          onChange={handleChange}
          fullWidth
          select
          required
          sx={{ mb: 2 }}
        >
          <MenuItem value="Permanent">Permanent</MenuItem>
          <MenuItem value="Temporary">Temporary</MenuItem>
        </TextField>
        <TextField
          name="shiftTiming"
          label="Shift Timing"
          value={formData.shiftTiming}
          onChange={handleChange}
          fullWidth
          select
          required
          sx={{ mb: 2 }}
        >
          <MenuItem value="Day Shift">Day Shift</MenuItem>
          <MenuItem value="Night Shift">Night Shift</MenuItem>
        </TextField>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Update
        </Button>
      </form>
    </Box>
  );
};

export default EditEmployee;
