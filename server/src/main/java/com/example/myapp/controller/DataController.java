package com.example.myapp.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.myapp.dto.Datadto;
import com.example.myapp.entity.DataEntity;
import com.example.myapp.repo.DataRepository;

import jakarta.validation.Valid;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/data")
public class DataController {


@Autowired
private DataRepository db;

DataEntity data;

// ADD DATA
@PostMapping("/add")
public ResponseEntity<?> addData(@Valid @RequestBody Datadto ob) {

    if (db.existsByRollno(ob.getRollno())) {
        return ResponseEntity
                .badRequest()
                .body("Duplicate roll number not allowed");
    }

    DataEntity data = new DataEntity();

    data.setRollno(ob.getRollno());
    data.setSection(ob.getSection().toUpperCase());
    data.setAbstractname(ob.getAbstractname());
    data.setGithub(ob.getGithub());
    data.setFrontend(ob.getFrontend());
    data.setBackend(ob.getBackend());

    db.save(data);

    return ResponseEntity.ok("Data inserted successfully");
}
// GET ALL DATA
@GetMapping("/all")
public ResponseEntity<?> getAllData() {

    List<DataEntity> list = db.findAll();

    return ResponseEntity.ok(list);
}


// GET DATA BY ID
@GetMapping("/{id}")
public ResponseEntity<?> getData(@PathVariable Long id) {

    Optional<DataEntity> data = db.findById(id);

    if (data.isPresent()) {
        return ResponseEntity.ok(data.get());
    }

    return ResponseEntity
            .status(HttpStatus.NOT_FOUND)
            .body("Data not found");
}


// UPDATE DATA
@PutMapping("/update/{id}")
public ResponseEntity<?> updateData(@PathVariable Long id, @RequestBody Datadto ob) {

    Optional<DataEntity> data = db.findById(id);

    if (data.isPresent()) {

        DataEntity d = data.get();

        d.setRollno(ob.getRollno());
        d.setSection(ob.getSection());
        d.setAbstractname(ob.getAbstractname());
        d.setGithub(ob.getGithub());
        d.setFrontend(ob.getFrontend());
        d.setBackend(ob.getBackend());

        db.save(d);

        return ResponseEntity.ok("Data updated successfully");
    }

    return ResponseEntity
            .status(HttpStatus.NOT_FOUND)
            .body("Data not found");
}


// DELETE DATA
@DeleteMapping("/delete/{id}")
public ResponseEntity<?> deleteData(@PathVariable Long id) {

    if (!db.existsById(id)) {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body("Data not found");
    }

    db.deleteById(id);

    return ResponseEntity.ok("Data deleted successfully");
}

}
