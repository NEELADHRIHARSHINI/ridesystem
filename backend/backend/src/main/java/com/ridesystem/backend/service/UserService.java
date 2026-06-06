package com.ridesystem.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ridesystem.backend.model.User;
import com.ridesystem.backend.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User register(User user) {
        return userRepository.save(user);
    }

    public boolean validate(String username, String password) {
        return userRepository.findByUsername(username)
                .map(u -> u.getPassword().equals(password))
                .orElse(false);
    }
}