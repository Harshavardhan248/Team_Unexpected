package com.teamunexpected.hrportal.controller;

import com.teamunexpected.hrportal.exception.InvalidCredentialsException;
import com.teamunexpected.hrportal.model.Employee;
import com.teamunexpected.hrportal.model.User;
import com.teamunexpected.hrportal.service.EmployeeService;
import com.teamunexpected.hrportal.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class LoginController {

    @Autowired
    private UserService userService;

    @Autowired
    private EmployeeService employeeService;

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> loginData, HttpSession session) {
        String email = loginData.get("email");
        String password = loginData.get("password");

        User user = userService.validateUser(email, password);
        if (user == null || password == null) {
            throw new InvalidCredentialsException("Invalid email or password");
        }

        session.setAttribute("userId", user.getId());
        session.setAttribute("email", user.getEmail());
        session.setAttribute("role", user.getRole());

        Map<String, Object> response = new HashMap<>();
        response.put("email", user.getEmail());
        response.put("user", user);
        response.put("role", user.getRole());
        response.put("message", "Login successful");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logout(HttpSession session) {
        if (session != null) {
            System.out.println("Invalidating session for: " + session.getId());
            session.invalidate();
        }
        return ResponseEntity.ok(Map.of("message", "Logout successful"));
    }

    @GetMapping("/employees/email")
    public ResponseEntity<Employee> getEmployeeByEmail(@RequestParam String email) {
        Optional<Employee> employee = employeeService.getEmployeeByEmail(email);
        if (employee.isPresent()) {
            return ResponseEntity.ok(employee.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
