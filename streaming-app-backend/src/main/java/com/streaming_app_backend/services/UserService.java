package com.streaming_app_backend.services;

import com.streaming_app_backend.Dtos.security.Registration;
import com.streaming_app_backend.entities.users;

import java.util.List;

public interface UserService {

    public List<users> findAll();

    public String saveUser(Registration user);
}
