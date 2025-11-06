package com.allcity.controller;
import com.allcity.dtos.LoginRequest;
import com.allcity.dtos.RegistrationRequest;
import com.allcity.dtos.Response;
import com.allcity.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<Response> registerUser(@RequestBody @Valid RegistrationRequest request){
        return ResponseEntity.ok(userService.registerUser(request));
    }

    @PostMapping("/login")
    public ResponseEntity<Response> loginUser(@RequestBody @Valid LoginRequest request){
      return ResponseEntity.status(HttpStatus.CREATED).body(userService.loginUser(request));
    }
}
