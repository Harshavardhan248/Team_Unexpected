package com.teamunexpected.hrportal.service;

import com.teamunexpected.hrportal.model.Employee;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface EmployeeService {

    /**
     * Retrieve all employees.
     *
     * @return List of all employees.
     */
    List<Employee> getAllEmployees();

    /**
     * Save a new employee.
     *
     * @param employee The employee to save.
     * @return The saved employee.
     */
    Employee saveEmployee(Employee employee);

    /**
     * Retrieve an employee by their ID.
     *
     * @param id The employee's ID.
     * @return The employee with the given ID.
     */
    Employee getEmployeeById(Long id);

    /**
     * Retrieve an employee by their email ID.
     *
     * @param email The email ID of the employee.
     * @return An Optional containing the employee if found, or empty if not.
     */
    Optional<Employee> getEmployeeByEmail(String email);

    /**
     * Update an employee's details.
     *
     * @param id              The employee's ID.
     * @param employeeDetails The updated employee details.
     * @return The updated employee.
     */
    Employee updateEmployee(Long id, Employee employeeDetails);

    /**
     * Delete an employee by their ID.
     *
     * @param id The employee's ID.
     */
    void deleteEmployee(Long id);

    /**
     * Search for employees by a keyword in their first name, last name, or email.
     *
     * @param keyword The keyword to search for.
     * @return List of employees matching the keyword.
     */
    List<Employee> searchEmployees(String keyword);

    /**
     * Retrieve employee statistics for reporting or analytics.
     *
     * @return A map of statistical data about employees.
     */
    Map<String, Object> getStatistics();

    /**
     * Retrieve employees by their designation.
     *
     * @param designation The designation to filter by.
     * @return List of employees with the specified designation.
     */
    List<Employee> getEmployeesByDesignation(String designation);

    /**
     * Retrieve employees by department.
     *
     * @param department The department to filter by.
     * @return List of employees in the specified department.
     */
    List<Employee> getEmployeesByDepartment(String department);

    /**
     * Retrieve employees by work location.
     *
     * @param workLocation The work location to filter by.
     * @return List of employees in the specified work location.
     */
    List<Employee> getEmployeesByWorkLocation(String workLocation);

    /**
     * Count employees by department.
     *
     * @param department The department name.
     * @return The count of employees in the specified department.
     */
    long countEmployeesByDepartment(String department);

    /**
     * Count employees by work location.
     *
     * @param workLocation The work location.
     * @return The count of employees in the specified work location.
     */
    long countEmployeesByWorkLocation(String workLocation);
}
