package com.allcity.service;

import com.allcity.dtos.Response;
import com.allcity.entities.Vehicle;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface VehicleService {

    List<String> getAllOriginCity();

    List<String> getAllDestinationCity();

    Response addVehicle(Vehicle vehicle);

    Response getAvailableRooms();
}
