package com.allcity.service.serviceImpl;

import com.allcity.dtos.Response;
import com.allcity.dtos.VehicleDTO;
import com.allcity.entities.Vehicle;
import com.allcity.repositories.VehicleRepository;
import com.allcity.service.VehicleService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.util.List;
import java.util.UUID;

@Service
public class VehicleServiceImpl implements VehicleService {

    private static final String IMAGE_DIRECTORY_FRONTEND = "D://AllCityTransport/public/images/";

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    private VehicleRepository vehicleRepository;

    @Override
    public List<String> getAllOriginCity() {
        return List.of();
    }

    @Override
    public List<String> getAllDestinationCity() {
        return List.of();
    }

    @Override
    public Response addVehicle(Vehicle vehicle) {
        if (vehicle.getImageFile() != null){
            String imagePath = saveImageToFrontend(vehicle.getImageFile());
            vehicle.setImageUrl(imagePath);
        }

        vehicleRepository.save(vehicle);
        return Response.builder()
                .status(200)
                .message("Vehicle successfully added")
                .build();
    }

    @Override
    public Response getAvailableRooms() {
        List<Vehicle> roomList = vehicleRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));

        List<VehicleDTO> vehicleList = modelMapper.map(roomList,new TypeToken<List<VehicleDTO>>() {}.getType());

        return Response.builder()
                .status(200)
                .message("success")
                .vehicleDTOS(vehicleList)
                .build();
    }

    //save image to frontend folder
    private String saveImageToFrontend(MultipartFile imageFile){
        if (!imageFile.getContentType().startsWith("image/")){
            throw new IllegalArgumentException("Only Image files are allowed");
        }

        //Create directory to store image if it doesn exist
        File directory = new File(IMAGE_DIRECTORY_FRONTEND);

        if (!directory.exists()){
            directory.mkdir();
        }
        //Generate uniwue file name for the image
        String uniqueFileName = UUID.randomUUID() + "_" + imageFile.getOriginalFilename();
        //get the absolute path of the image
        String  imagePath = IMAGE_DIRECTORY_FRONTEND + uniqueFileName;

        try {
            File destinationFile = new File(imagePath);
            imageFile.transferTo(destinationFile);
        }catch (Exception ex){
            throw  new IllegalArgumentException(ex.getMessage());
        }

        return "http://localhost:8080/images/"+uniqueFileName;

    }
}
