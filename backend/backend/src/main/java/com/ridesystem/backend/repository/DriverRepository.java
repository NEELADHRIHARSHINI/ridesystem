package com.ridesystem.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ridesystem.backend.model.Driver;

@Repository
public interface DriverRepository extends JpaRepository<Driver, Long> {

    // 🔥 THIS MUST MATCH FIELD NAME EXACTLY
    List<Driver> findByAvailable(boolean available);

}