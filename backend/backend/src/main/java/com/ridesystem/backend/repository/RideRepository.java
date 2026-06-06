package com.ridesystem.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ridesystem.backend.model.Ride;

public interface RideRepository extends JpaRepository<Ride, Long> {
}