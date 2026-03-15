package com.example.myapp.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
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

<<<<<<< HEAD
    @GetMapping("/health")
    public ResponseEntity<?> health() {
    return ResponseEntity.ok("Server is running ✅  ");
}


}
=======
}
>>>>>>> 0c83ad23df6902b7aa7e945fea45e69b13514c3e
