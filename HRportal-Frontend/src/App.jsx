import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";
import ManageEmployees from "./pages/ManageEmployees";
import ViewEmployees from "./pages/ViewEmployees";

import EmpNavbar from "./EmployeeView/EmpNavbar";
import EmpDashboard from "./EmployeeView/EmpDashboard";
import SearchProfile from "./EmployeeView/SearchProfile";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />

        {/* Admin Routes */}
        <Route
          path="/dashboard"
          element={
            <>
              <Navbar />
              <Dashboard />
            </>
          }
        />
        <Route
          path="/add-employee"
          element={
            <>
              <Navbar />
              <AddEmployee />
            </>
          }
        />
        <Route
          path="/edit-employee/:id"
          element={
            <>
              <Navbar />
              <EditEmployee />
            </>
          }
        />
        <Route
          path="/manage-employees"
          element={
            <>
              <Navbar />
              <ManageEmployees />
            </>
          }
        />
        <Route
          path="/view-employees"
          element={
            <>
              <Navbar />
              <ViewEmployees />
            </>
          }
        />

        {/* Employee Routes */}
        <Route
          path="/employee"
          element={
            <>
              <EmpNavbar />
              <EmpDashboard />
            </>
          }
        />
        <Route
          path="/employee/dashboard"
          element={
            <>
              <EmpNavbar />
              <EmpDashboard />
            </>
          }
        />

        <Route
            path="/employee/search"
            element={
                   <>
             <EmpNavbar />
              <SearchProfile />
            </>
           }
        />

        {/* Fallback Route for Not Found */}
        <Route
          path="*"
          element={
            <div style={{ textAlign: "center", padding: "20px" }}>
              <h2>404 - Page Not Found</h2>
              <p>Sorry, the page you are looking for does not exist.</p>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;