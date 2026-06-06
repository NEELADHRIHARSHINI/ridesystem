package com.ridesystem.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ridesystem.backend.model.Ride;
import com.ridesystem.backend.model.Driver;
import com.ridesystem.backend.repository.RideRepository;
import com.ridesystem.backend.repository.DriverRepository;

import java.util.List;

@Service
public class RideService {

    @Autowired
    private RideRepository rideRepository;

    @Autowired
    private DriverRepository driverRepository;

    // 🚕 Book Ride
  public Ride createRide(Ride ride) {

    ride.setStatus("BOOKED");

    // 🔥 STEP 1: Save ride first
    Ride savedRide = rideRepository.save(ride);

    // 🔥 STEP 2: Get available drivers
    List<Driver> drivers = driverRepository.findByAvailable(true);

    System.out.println("🔥 AUTO ASSIGN RUNNING");
    System.out.println("Drivers found: " + drivers.size());

    // 🔥 STEP 3: Assign driver if exists
    if (!drivers.isEmpty()) {
        Driver driver = drivers.get(0);

        savedRide.setDriver(driver);

        driver.setAvailable(false);
        driverRepository.save(driver);  // VERY IMPORTANT

        return rideRepository.save(savedRide);
    }

    return savedRide;
}

    // 🔄 Update Status
    public Ride updateStatus(Long id, String status) {
        Ride ride = rideRepository.findById(id).orElseThrow();

        // 🔥 Validation (important)
        if(status.equals("STARTED") && ride.getDriver() == null) {
            throw new RuntimeException("Assign driver first");
        }

        if(status.equals("COMPLETED") && ride.getDriver() == null) {
            throw new RuntimeException("Cannot complete without driver");
        }

        ride.setStatus(status);
        return rideRepository.save(ride);
    }

    // 🚗 Assign Driver manually
    public Ride assignDriver(Long rideId, Long driverId) {
        Ride ride = rideRepository.findById(rideId).orElseThrow();
        Driver driver = driverRepository.findById(driverId).orElseThrow();

        ride.setDriver(driver);
        driver.setAvailable(false);

        return rideRepository.save(ride);
    }

    // 🤖 Auto Assign
    public Ride autoAssignDriver(Long rideId) {

        Ride ride = rideRepository.findById(rideId).orElseThrow();

        List<Driver> drivers = driverRepository.findByAvailable(true);

        if (drivers.isEmpty()) {
            throw new RuntimeException("No drivers available");
        }

        Driver driver = drivers.get(0);

        ride.setDriver(driver);
        driver.setAvailable(false);

        return rideRepository.save(ride);
    }

    // 📋 Get all rides
    public List<Ride> getAllRides() {
        return rideRepository.findAll();
    }
}