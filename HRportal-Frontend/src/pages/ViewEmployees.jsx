import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Modal,
  Card,
  CardContent,
  Button,
  TextField,
} from "@mui/material";
import api from "../services/api";

const ViewEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await api.get("/employees");
        setEmployees(response.data);
        setFilteredEmployees(response.data); // Initialize filtered list
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const handleRowClick = (employee) => {
    setSelectedEmployee(employee);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedEmployee(null);
    setOpenModal(false);
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = employees.filter((employee) =>
      `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(query) ||
      employee.emailId.toLowerCase().includes(query)
    );

    setFilteredEmployees(filtered);
  };

  return (
    <Box sx={{ padding: "20px", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Typography variant="h4" gutterBottom>
        Employee List
      </Typography>

      <Box sx={{ marginBottom: "20px" }}>
        <TextField
          fullWidth
          label="Search by First Name / Last Name / Email ID"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearch}
        />
      </Box>

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
            {filteredEmployees.map((employee) => (
              <TableRow
                key={employee.id}
                hover
                style={{ cursor: "pointer" }}
                onClick={() => handleRowClick(employee)}
              >
                <TableCell>{employee.id}</TableCell>
                <TableCell>{`${employee.firstName} ${employee.lastName}`}</TableCell>
                <TableCell>{employee.emailId}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>{employee.designation}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for Employee Details */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          {selectedEmployee && (
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {`${selectedEmployee.firstName} ${selectedEmployee.lastName}`}
                </Typography>
                <Typography>
                  <strong>ID:</strong> {selectedEmployee.id}
                </Typography>
                <Typography>
                  <strong>Email:</strong> {selectedEmployee.emailId}
                </Typography>
                <Typography>
                  <strong>Phone:</strong> {selectedEmployee.phoneNumber || "N/A"}
                </Typography>
                <Typography>
                  <strong>Address:</strong> {selectedEmployee.address || "N/A"}
                </Typography>
                <Typography>
                  <strong>Department:</strong> {selectedEmployee.department}
                </Typography>
                <Typography>
                  <strong>Designation:</strong> {selectedEmployee.designation}
                </Typography>
                <Typography>
                  <strong>Gender:</strong> {selectedEmployee.gender || "N/A"}
                </Typography>
                <Typography>
                  <strong>Date of Birth:</strong> {selectedEmployee.dateOfBirth || "N/A"}
                </Typography>
                <Typography>
                  <strong>Date of Joining:</strong> {selectedEmployee.dateOfJoining || "N/A"}
                </Typography>
                <Typography>
                  <strong>Emergency Contact Name:</strong> {selectedEmployee.emergencyContactName || "N/A"}
                </Typography>
                <Typography>
                  <strong>Emergency Contact Phone:</strong> {selectedEmployee.emergencyContactPhone || "N/A"}
                </Typography>
                <Typography>
                  <strong>Employment Type:</strong> {selectedEmployee.employmentType || "N/A"}
                </Typography>
                <Typography>
                  <strong>Nationality:</strong> {selectedEmployee.nationality || "N/A"}
                </Typography>
                <Typography>
                  <strong>Work Location:</strong> {selectedEmployee.workLocation || "N/A"}
                </Typography>
                <Typography>
                  <strong>Career Level:</strong> {selectedEmployee.careerLevel || "N/A"}
                </Typography>
                <Typography>
                  <strong>Contract Type:</strong> {selectedEmployee.contractType || "N/A"}
                </Typography>
                <Typography>
                  <strong>Shift Timing:</strong> {selectedEmployee.shiftTiming || "N/A"}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCloseModal}
                  sx={{ marginTop: "20px" }}
                >
                  Close
                </Button>
              </CardContent>
            </Card>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default ViewEmployees;
