package com.teamunexpected.hrportal.controller;

import com.teamunexpected.hrportal.oauth.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/session")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class SessionController {

    @Autowired
    private UserPrincipal userPrincipal;

    @GetMapping("/details")
    public Map<String, Object> getSessionDetails(Authentication authentication, HttpSession session) {
        Map<String, Object> response = new HashMap<>();
        
        if (authentication != null && authentication.isAuthenticated()) {
            Map<String, Object> userDetails = userPrincipal.getUserDetails(authentication);

            response.put("status", "active");
            response.put("userDetails", userDetails);
            response.put("sessionId", session.getId());
        } else {
            response.put("status", "inactive");
            response.put("message", "No active session found");
        }

        return response;
    }

    @PostMapping("/invalidate")
    public Map<String, String> invalidateSession(HttpSession session) {
        session.invalidate();
        return Map.of("message", "Session invalidated successfully");
    }
}
