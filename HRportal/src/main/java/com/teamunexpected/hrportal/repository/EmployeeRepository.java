package com.teamunexpected.hrportal.repository;

import com.teamunexpected.hrportal.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    /**
     * Search for employees by first name, last name, or email (case-insensitive).
     *
     * @param firstName First name of the employee (partial or full).
     * @param lastName  Last name of the employee (partial or full).
     * @param emailId   Email ID of the employee (partial or full).
     * @return List of employees matching the search criteria.
     */
    List<Employee> findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrEmailIdContainingIgnoreCase(
            String firstName, String lastName, String emailId);

    /**
     * Find employees by their designation.
     *
     * @param designation The designation to filter by.
     * @return List of employees with the specified designation.
     */
    List<Employee> findByDesignation(String designation);

    /**
     * Find a single employee by their email ID.
     *
     * @param emailId The email ID of the employee.
     * @return An Optional containing the employee if found, or empty if not.
     */
    Optional<Employee> findByEmailId(String emailId);

    /**
     * Find employees by their department.
     *
     * @param department The department to filter by.
     * @return List of employees in the specified department.
     */
    List<Employee> findByDepartment(String department);

    /**
     * Find employees by their work location.
     *
     * @param workLocation The work location to filter by.
     * @return List of employees in the specified work location.
     */
    List<Employee> findByWorkLocation(String workLocation);

    /**
     * Count employees by department.
     *
     * @param department The department name.
     * @return The count of employees in the specified department.
     */
    long countByDepartment(String department);

    /**
     * Count employees by work location.
     *
     * @param workLocation The work location.
     * @return The count of employees in the specified work location.
     */
    long countByWorkLocation(String workLocation);
}
