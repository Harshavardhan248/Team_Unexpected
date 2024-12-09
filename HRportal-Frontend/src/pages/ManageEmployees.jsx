import React, { useState, useEffect } from "react";
import { Box, Button, Typography, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const ManageEmployees = () => {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  // Fetch all employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await api.get("/employees");
        setEmployees(response.data);
        setFilteredEmployees(response.data); // Initially display all employees
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  // Handle search input change
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = employees.filter(
      (employee) =>
        employee.firstName.toLowerCase().includes(query) ||
        employee.lastName.toLowerCase().includes(query) ||
        employee.emailId.toLowerCase().includes(query)
    );

    setFilteredEmployees(filtered);
  };

  // Navigate to Add Employee page
  const handleAddEmployee = () => {
    navigate("/add-employee");
  };

  // Navigate to Edit Employee page
  const handleEditEmployee = (id) => {
    navigate(`/edit-employee/${id}`);
  };

  // Delete Employee
  const handleDeleteEmployee = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await api.delete(`/employees/${id}`);
        setEmployees(employees.filter((employee) => employee.id !== id));
        setFilteredEmployees(filteredEmployees.filter((employee) => employee.id !== id));
      } catch (error) {
        console.error("Failed to delete employee:", error);
      }
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Manage Employees
      </Typography>
      <Button variant="contained" color="primary" onClick={handleAddEmployee} sx={{ mb: 2 }}>
        Add New Employee
      </Button>
      <TextField
        label="Search by First Name / Last Name / Email ID"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearch}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEmployees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.id}</TableCell>
                <TableCell>{`${employee.firstName} ${employee.lastName}`}</TableCell>
                <TableCell>{employee.emailId}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>{employee.designation}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEditEmployee(employee.id)}
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteEmployee(employee.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ManageEmployees;
