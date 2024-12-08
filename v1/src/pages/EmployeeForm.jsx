import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

const EmployeeForm = ({ initialData = {}, onSubmit }) => {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <TextField
          name="firstName"
          label="First Name"
          value={formData.firstName || ""}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          name="lastName"
          label="Last Name"
          value={formData.lastName || ""}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          name="emailId"
          label="Email"
          value={formData.emailId || ""}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          name="department"
          label="Department"
          value={formData.department || ""}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          name="designation"
          label="Designation"
          value={formData.designation || ""}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default EmployeeForm;
