package com.streaming_app_backend.services.Impl;

import com.streaming_app_backend.Dtos.security.Registration;
import com.streaming_app_backend.entities.users;
import com.streaming_app_backend.repositories.UsersRepository;
import com.streaming_app_backend.services.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UsersRepository usersRepository;

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public List<users> findAll() {
        return List.of();
    }

    @Override
    public String saveUser(Registration user) {

        System.out.println("DTO username = " + user.username());
        System.out.println("DTO password = " + user.password());

        if(usersRepository.findByUsername(user.username()).isPresent()){
            return "User already exists";
        }

        users newUser = new users();



        newUser.setUsername(user.username());
        newUser.setPassword( passwordEncoder.encode(user.password()));

        usersRepository.save(newUser);

        return "User registered successfully";


    }
}
