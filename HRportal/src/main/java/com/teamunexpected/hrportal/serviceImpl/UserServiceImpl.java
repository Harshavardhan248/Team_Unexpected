package com.teamunexpected.hrportal.serviceImpl;

import com.teamunexpected.hrportal.exception.InvalidCredentialsException;
import com.teamunexpected.hrportal.model.User;
import com.teamunexpected.hrportal.repository.UserRepository;
import com.teamunexpected.hrportal.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User validateUser(String email, String password) {
        // Fetch user by email
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            // Validate password
            if (user.getPassword().equals(password)) {
                // Fetch role from backend table
                String role = user.getRole();
                
                // Validate role
                if (role == null || role.isEmpty()) {
                    throw new InvalidCredentialsException("User role is not defined for the given account.");
                }

                return user; // Return user with role and other information
            } else {
                throw new InvalidCredentialsException("Invalid password. Please try again.");
            }
        } else {
            throw new InvalidCredentialsException("User with email " + email + " not found.");
        }
    }
}
