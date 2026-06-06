package com.ridesystem.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "rides")
public class Ride {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "pickup_location")
    private String pickupLocation;

    @Column(name = "drop_location")
    private String dropLocation;

    private double distance;
    private int fare;
    private String status;

    @Column(name = "user_id")
    private Long userId;

    // ✅ ONLY ONE RELATION (KEEP THIS ONLY)
    @ManyToOne
    @JoinColumn(name = "driver_id", nullable = true)
    private Driver driver;

    public Ride() {}

    // GETTERS & SETTERS

    public Long getId() { return id; }

    public String getPickupLocation() { return pickupLocation; }
    public void setPickupLocation(String pickupLocation) {
        this.pickupLocation = pickupLocation;
    }

    public String getDropLocation() { return dropLocation; }
    public void setDropLocation(String dropLocation) {
        this.dropLocation = dropLocation;
    }

    public double getDistance() { return distance; }
    public void setDistance(double distance) {
        this.distance = distance;
    }

    public int getFare() { return fare; }
    public void setFare(int fare) {
        this.fare = fare;
    }

    public String getStatus() { return status; }
    public void setStatus(String status) {
        this.status = status;
    }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Driver getDriver() { return driver; }
    public void setDriver(Driver driver) {
        this.driver = driver;
    }
}