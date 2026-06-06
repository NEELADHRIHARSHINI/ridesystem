package com.ridesystem.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "drivers")
public class Driver {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(name = "available")
    private Boolean available;   // ✅ FIXED

    public Long getId() { return id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Boolean getAvailable() { return available; }  // ✅ FIXED
    public void setAvailable(Boolean available) {
        this.available = available;
    }
}