package com.teamunexpected.hrportal.serviceImpl;

import com.teamunexpected.hrportal.exception.ResourceNotFoundException;
import com.teamunexpected.hrportal.model.Employee;
import com.teamunexpected.hrportal.repository.EmployeeRepository;
import com.teamunexpected.hrportal.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    @Override
    public Employee saveEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    @Override
    public Employee getEmployeeById(Long id) {
        return employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee", "ID", id));
    }

    @Override
    public Optional<Employee> getEmployeeByEmail(String email) {
        return employeeRepository.findByEmailId(email);
    }

    @Override
    public Employee updateEmployee(Long id, Employee employeeDetails) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee", "ID", id));

        employee.setFirstName(employeeDetails.getFirstName());
        employee.setLastName(employeeDetails.getLastName());
        employee.setEmailId(employeeDetails.getEmailId());
        employee.setPhoneNumber(employeeDetails.getPhoneNumber());
        employee.setAddress(employeeDetails.getAddress());
        employee.setDepartment(employeeDetails.getDepartment());
        employee.setDesignation(employeeDetails.getDesignation());
        employee.setGender(employeeDetails.getGender());
        employee.setDateOfBirth(employeeDetails.getDateOfBirth());
        employee.setDateOfJoining(employeeDetails.getDateOfJoining());
        employee.setEmergencyContactName(employeeDetails.getEmergencyContactName());
        employee.setEmergencyContactPhone(employeeDetails.getEmergencyContactPhone());
        employee.setEmploymentType(employeeDetails.getEmploymentType());
        employee.setNationality(employeeDetails.getNationality());
        employee.setWorkLocation(employeeDetails.getWorkLocation());
        employee.setCareerLevel(employeeDetails.getCareerLevel());
        employee.setContractType(employeeDetails.getContractType());
        employee.setShiftTiming(employeeDetails.getShiftTiming());

        return employeeRepository.save(employee);
    }

    @Override
    public void deleteEmployee(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee", "ID", id));
        employeeRepository.delete(employee);
    }

    @Override
    public List<Employee> searchEmployees(String keyword) {
        return employeeRepository.findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrEmailIdContainingIgnoreCase(
                keyword, keyword, keyword);
    }

    @Override
    public List<Employee> getEmployeesByDesignation(String designation) {
        return employeeRepository.findByDesignation(designation);
    }

    @Override
    public List<Employee> getEmployeesByDepartment(String department) {
        return employeeRepository.findByDepartment(department);
    }

    @Override
    public List<Employee> getEmployeesByWorkLocation(String workLocation) {
        return employeeRepository.findByWorkLocation(workLocation);
    }

    @Override
    public long countEmployeesByDepartment(String department) {
        return employeeRepository.findByDepartment(department).size();
    }

    @Override
    public long countEmployeesByWorkLocation(String workLocation) {
        return employeeRepository.findByWorkLocation(workLocation).size();
    }

    @Override
    public Map<String, Object> getStatistics() {
        List<Employee> employees = employeeRepository.findAll();
        Map<String, Object> stats = new HashMap<>();

        stats.put("totalEmployees", employees.size());
        stats.put("genderDistribution", employees.stream()
                .collect(Collectors.groupingBy(Employee::getGender, Collectors.counting())));
        stats.put("departmentCount", employees.stream()
                .collect(Collectors.groupingBy(Employee::getDepartment, Collectors.counting())));
        stats.put("employmentType", employees.stream()
                .collect(Collectors.groupingBy(Employee::getEmploymentType, Collectors.counting())));

        return stats;
    }
}
