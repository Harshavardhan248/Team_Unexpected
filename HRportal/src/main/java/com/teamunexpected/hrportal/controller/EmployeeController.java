package com.teamunexpected.hrportal.controller;

import com.teamunexpected.hrportal.model.Employee;
import com.teamunexpected.hrportal.service.EmployeeService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/employees")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    // Get all employees
    @GetMapping
    public ResponseEntity<List<Employee>> getAllEmployees(HttpSession session) {
        return ResponseEntity.ok(employeeService.getAllEmployees());
    }

    // Create a new employee
    @PostMapping
    public ResponseEntity<?> createEmployee(@RequestBody Employee employee) {
        try {
            Employee savedEmployee = employeeService.saveEmployee(employee);
            return ResponseEntity.ok(savedEmployee);
        } catch (Exception e) {
            e.printStackTrace(); // Log the exact error for debugging
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body(Map.of("message", "Error creating employee", "error", e.getMessage()));
        }
    }

    // Get employee by ID
    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
        return ResponseEntity.ok(employeeService.getEmployeeById(id));
    }

    // Update employee by ID
    @PutMapping("/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee employee) {
        return ResponseEntity.ok(employeeService.updateEmployee(id, employee));
    }

    // Delete employee by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
        return ResponseEntity.ok("Employee deleted successfully");
    }

    // Get statistics
    @GetMapping("/statistics")
    public ResponseEntity<Map<String, Object>> getStatistics() {
        return ResponseEntity.ok(employeeService.getStatistics());
    }

    // Search employees
    @GetMapping("/search")
    public ResponseEntity<List<Employee>> searchEmployees(@RequestParam("query") String query) {
        List<Employee> employees = employeeService.searchEmployees(query);
        if (employees.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(employees);
        }
        return ResponseEntity.ok(employees);
    }

    // Get employee by email
    @GetMapping("/by-email")
    public ResponseEntity<Employee> getEmployeeByEmail(@RequestParam("email") String email) {
        Optional<Employee> employee = employeeService.getEmployeeByEmail(email);
        if (employee.isPresent()) {
            return ResponseEntity.ok(employee.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .body(null); // Optionally, you can return a message instead of null
        }
    }
}
