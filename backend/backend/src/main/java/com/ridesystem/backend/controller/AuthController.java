package com.ridesystem.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.ridesystem.backend.model.User;
import com.ridesystem.backend.service.UserService;
import com.ridesystem.backend.util.JwtUtil;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    // REGISTER
    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userService.register(user);
    }
    @GetMapping("/test")
public String test() {
    return "Backend Working ✅";
}

    // LOGIN
    @PostMapping("/login")
    public String login(@RequestBody User user) {
        boolean valid = userService.validate(user.getUsername(), user.getPassword());

        if (!valid) {
            throw new RuntimeException("Invalid credentials");
        }

        return "Bearer " + JwtUtil.generateToken(user.getUsername());
    }
}