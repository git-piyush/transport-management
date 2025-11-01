package com.allcity.entities;

import com.allcity.enums.PermitLevel;
import com.allcity.enums.VehicleType;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Data
@Table(name = "tbl_vehicle")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Vehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Min(value = 4, message = "Vehicle Number must be at least 4 Char")
    @Column(unique = true)
    private String vehicleRegNo;

    @Enumerated(EnumType.STRING)
    private PermitLevel permitLevel;

    @Min(value = 4, message = "Vehicle Number must be at least 4 Char")
    @Column(unique = true)
    private Integer driverMob;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "Room type is required")
    private VehicleType type;

    @DecimalMin(value = "0.1", message = "Price per night is required")
    private BigDecimal price;

    @Min(value = 1, message = "capacity must be at least 1")
    private Integer capacity;

    private String description; //additional data for the vehicle

    private String imageUrl; //this will hold the vehicle picture

    private String from;

    private String to;
}
