package com.streaming_app_backend.controllers;

import com.streaming_app_backend.Dtos.security.Login;
import com.streaming_app_backend.Dtos.security.Registration;
import com.streaming_app_backend.Dtos.security.SuccessResponse;
import com.streaming_app_backend.repositories.UsersRepository;
import com.streaming_app_backend.security.jwt.JwtUtil;
import com.streaming_app_backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/authentication")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<SuccessResponse> login(@RequestBody Login login) {

        try{
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            login.username(),
                            login.password()
                    )
            );
        }
        catch(BadCredentialsException e){
            throw new BadCredentialsException("Invalid username or password");
        }

      return  ResponseEntity.status(HttpStatus.OK).body(new SuccessResponse(jwtUtil.generateToken(login.username())));
    }


    @PostMapping("/registration")
    public ResponseEntity<SuccessResponse> registration(@RequestBody Registration registration) {

            return ResponseEntity.status(HttpStatus.OK).body(new SuccessResponse(userService.saveUser(registration)));
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(
            Authentication authentication) {

        return ResponseEntity.ok(
                authentication.getName()
        );
    }

}

