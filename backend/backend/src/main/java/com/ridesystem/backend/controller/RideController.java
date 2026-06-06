package com.ridesystem.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ridesystem.backend.model.Ride;
import com.ridesystem.backend.service.RideService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/rides")
public class RideController {

    @Autowired
    private RideService rideService;

    // 🚕 Book Ride
   @PostMapping
public Ride bookRide(@RequestBody Ride ride) {
    return rideService.createRide(ride);
}

@GetMapping
public List<Ride> getAll() {
    return rideService.getAllRides();
}

@PutMapping("/{id}/status")
public Ride updateRideStatus(@PathVariable Long id,
                            @RequestParam String status) {
    return rideService.updateStatus(id, status);
}

@PutMapping("/{id}/auto-assign")
public Ride autoAssign(@PathVariable Long id) {
    return rideService.autoAssignDriver(id);
}
    
}