package com.teamunexpected.hrportal.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "*")
public class WelcomeController {

    @RequestMapping
    public String redirectToFrontend() {
        return "redirect:http://localhost:3000/";
    }
}
