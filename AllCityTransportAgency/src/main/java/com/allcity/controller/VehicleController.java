package com.allcity.controller;

import com.allcity.dtos.Response;
import com.allcity.dtos.VehicleDTO;
import com.allcity.entities.Vehicle;
import com.allcity.enums.PermitLevel;
import com.allcity.enums.VehicleType;
import com.allcity.service.VehicleService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/vehicle")
@RequiredArgsConstructor
public class VehicleController {

    @Autowired
    private VehicleService vehicleService;

    @Autowired
    ModelMapper mapper;

    @GetMapping("/from-city")
    public ResponseEntity<List<String>> getAllFromCity(){
        return ResponseEntity.ok(vehicleService.getAllOriginCity());
    }

    @GetMapping("/to-city")
    public ResponseEntity<List<String>> getAllToCities(){
        return ResponseEntity.ok(vehicleService.getAllDestinationCity());
    }

    @GetMapping("/vehicle-permit")
    public ResponseEntity<List<PermitLevel>> getVehiclePermit(){
        List<PermitLevel> permitList = Arrays.asList(PermitLevel.values());
        return ResponseEntity.ok(permitList);
    }

    @GetMapping("/vehicle-type")
    public ResponseEntity<List<VehicleType>> getVehicleType(){
        List<VehicleType> vehicleTypes = Arrays.asList(VehicleType.values());
        return ResponseEntity.ok(vehicleTypes);
    }


    @PostMapping("/add-vehicle")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> addVehicle(
            @RequestParam String  permitLevel,
            @RequestParam String  vehicleType,
            @RequestParam String  vehicleRegNo,
            @RequestParam Integer  driverMob,
            @RequestParam Integer  capacity,
            @RequestParam Double  price,
            @RequestParam String  originCity,
            @RequestParam String  destinationCity,
            @RequestParam String  description,
            @RequestParam MultipartFile imageFile
    ){

       // Vehicle vehicleEntity = mapper.map(vehicle, Vehicle.class);
        Vehicle vehicle = Vehicle.builder()
                .permitLevel(PermitLevel.valueOf(permitLevel))
                .type(VehicleType.valueOf(vehicleType))
                .vehicleRegNo(vehicleRegNo)
                .driverMob(driverMob)
                .capacity(capacity)
                .price(price)
                .originCity(originCity)
                .description(destinationCity)
                .description(description)
                .imageFile(imageFile).build();

        System.out.println("hi");
        return ResponseEntity.ok(vehicleService.addVehicle(vehicle));

    }

    @GetMapping("/all-vehicle")
    public ResponseEntity<Response> getAvailableRooms(){
        return ResponseEntity.ok(vehicleService.getAvailableRooms());
    }

}
