package com.ridesystem.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.ridesystem.backend.model.Driver;
import com.ridesystem.backend.repository.DriverRepository;

@RestController
@RequestMapping("/api/drivers")
public class DriverController {

    @Autowired
    private DriverRepository driverRepository;

    @PostMapping
    public Driver createDriver(@RequestBody Driver driver) {
        driver.setAvailable(true);
        return driverRepository.save(driver);
    }
}