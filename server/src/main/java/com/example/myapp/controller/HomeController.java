package com.example.myapp.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/")
    public Map<String, String> home() {
        return Map.of("message", "Project loaded successfully ✅");
    }
    @GetMapping("/health")
    public ResponseEntity<?> health() {
    return ResponseEntity.ok("Server is running ✅  ");
}

}
