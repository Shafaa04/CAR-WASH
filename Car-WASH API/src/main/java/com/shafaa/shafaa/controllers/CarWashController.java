package com.shafaa.shafaa.controllers;

import com.shafaa.shafaa.services.CarWashService;
import com.shafaa.shafaa.tables.CarWash;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/car-wash/carwashes")
@CrossOrigin
public class CarWashController {
    @Autowired
    private CarWashService carWashService;

    @GetMapping
    public List<CarWash> getAllCarWashes() {
        return carWashService.getAllCarWashes();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CarWash> getCarWashById(@PathVariable String id) {
        Optional<CarWash> carWash = carWashService.getCarWashById(id);
        if (carWash.isPresent()) {
            return ResponseEntity.ok(carWash.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<CarWash> createCarWash(@RequestBody CarWash carWash) {
        CarWash createdCarWash = carWashService.createCarWash(carWash);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCarWash);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CarWash> updateCarWash(@PathVariable String id, @RequestBody CarWash carWash) {
        CarWash updatedCarWash = carWashService.updateCarWash(id, carWash);
        if (updatedCarWash != null) {
            return ResponseEntity.ok(updatedCarWash);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCarWash(@PathVariable String id) {
        carWashService.deleteCarWash(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("get-by-user_id/{user_id}")
    public CarWash getCarWashByUserId(@PathVariable("user_id") String user_id) {
       return carWashService.getCarWashByUserId(user_id);
    }
}
