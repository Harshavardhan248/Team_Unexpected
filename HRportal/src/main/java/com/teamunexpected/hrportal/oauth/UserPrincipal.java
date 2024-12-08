package com.teamunexpected.hrportal.oauth;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.HashMap;

@Component
public class UserPrincipal {

    public Map<String, Object> getUserDetails(Authentication authentication) {
        DefaultOAuth2User oauthUser = (DefaultOAuth2User) authentication.getPrincipal();
        Map<String, Object> attributes = oauthUser.getAttributes();

        // Extract key attributes and map them to more meaningful keys
        Map<String, Object> userDetails = new HashMap<>();
        userDetails.put("email", attributes.get("email"));

        // Assuming firstName and lastName exist in the attributes
        // Adjust keys based on your OAuth provider's response structure
        userDetails.put("firstName", attributes.get("given_name"));
        userDetails.put("lastName", attributes.get("family_name"));

        // If role information is available, include it
        if (attributes.containsKey("role")) {
            userDetails.put("role", attributes.get("role"));
        }

        return userDetails;
    }
}
