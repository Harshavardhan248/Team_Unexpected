package com.teamunexpected.hrportal.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import jakarta.servlet.http.HttpServletResponse;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .cors().and()
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/", "/api/v1/login", "/api/v1/logout","/api/v1/**", "/oauth2/**","/api/v1/employees/search", "/api/v1/session/**").permitAll()
                .requestMatchers("/api/v1/employees/**").hasRole("EMPLOYEE") 
                .anyRequest().authenticated()
            )
            .oauth2Login(oauth -> oauth
                .defaultSuccessUrl("http://localhost:3000/dashboard", true)
                .failureUrl("http://localhost:3000/login?error=true")
            )
            .logout(logout -> logout
            	    .logoutUrl("/api/v1/logout")
            	    .logoutSuccessHandler((request, response, authentication) -> {
            	        response.setStatus(HttpServletResponse.SC_OK);
            	        response.getWriter().write("{\"message\":\"Logout successful\"}");
            	        response.getWriter().flush();
            	    })
            	    .invalidateHttpSession(true) // Invalidate session
            	    .deleteCookies("JSESSIONID") // Delete the JSESSIONID cookie
            	);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin("http://localhost:3000");
        configuration.addAllowedMethod("*");
        configuration.addAllowedHeader("*");
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}
