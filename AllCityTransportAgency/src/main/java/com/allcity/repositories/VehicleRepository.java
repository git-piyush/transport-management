package com.allcity.repositories;

import com.allcity.entities.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
    //tbl_vehicle
    @Query("SELECT v.originCity FROM Vehicle v")
    List<String> findAllOriginCity();

    @Query("SELECT v.destinationCity FROM Vehicle v")
    List<String> findAllDestinationCity();

}
