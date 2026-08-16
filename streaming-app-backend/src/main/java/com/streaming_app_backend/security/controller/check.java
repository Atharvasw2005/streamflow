package com.streaming_app_backend.security.controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class check {

    @GetMapping("/check")
    public String check(){
        return "success";
    }
}
