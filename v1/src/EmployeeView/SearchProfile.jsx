import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from "@mui/material";
import api from "../services/api";

const SearchProfile = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      const loggedInEmail = localStorage.getItem("loggedInEmail");
      if (!loggedInEmail) {
        setError("No logged-in user found.");
        setLoading(false);
        return;
      }

      try {
        const response = await api.get("/employees", { withCredentials: true });
        setEmployees(response.data);
        setFilteredEmployees(response.data);
      } catch (err) {
        console.error("Failed to fetch employees:", err);
        setError("Failed to load employees. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = employees.filter(
      (employee) =>
        employee.firstName.toLowerCase().includes(query) ||
        employee.lastName.toLowerCase().includes(query) ||
        employee.emailId.toLowerCase().includes(query)
    );
    setFilteredEmployees(filtered);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return null; // Display nothing if there's an error (e.g., no logged-in user)
  }

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Search Profiles
      </Typography>
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
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>{employee.id}</TableCell>
                  <TableCell>{`${employee.firstName} ${employee.lastName}`}</TableCell>
                  <TableCell>{employee.emailId}</TableCell>
                  <TableCell>{employee.department || "N/A"}</TableCell>
                  <TableCell>{employee.designation || "N/A"}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}>
                  <Typography variant="body1" textAlign="center">
                    No employees found.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SearchProfile;
