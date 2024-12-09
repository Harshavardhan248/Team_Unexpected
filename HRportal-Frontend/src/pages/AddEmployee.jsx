import React, { useState } from "react";
import { Box, TextField, Button, Typography, MenuItem } from "@mui/material";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/employees", formData);
      navigate("/manage-employees");
    } catch (error) {
      console.error("Failed to add employee:", error);
      alert("Failed to add employee. Please try again.");
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
        Add Employee
      </Typography>
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
          sx={{ mb: 2 }}
        />
        <TextField
          name="shiftTiming"
          label="Shift Timing"
          value={formData.shiftTiming}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default AddEmployee;
