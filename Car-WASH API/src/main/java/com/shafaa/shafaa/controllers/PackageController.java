package com.shafaa.shafaa.controllers;

import com.shafaa.shafaa.services.PackageService;
import com.shafaa.shafaa.tables.WashPackage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/car-wash/packages")
@CrossOrigin
public class PackageController {
    @Autowired
    private PackageService packageService;

    @GetMapping
    public List<WashPackage> getAllPackages() {
        return packageService.getAllPackages();
    }

    @GetMapping("/{id}")
    public ResponseEntity<WashPackage> getPackageById(@PathVariable String id) {
        Optional<WashPackage> p = packageService.getPackageById(id);
        if (p.isPresent()) {
            return ResponseEntity.ok(p.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<WashPackage> createPackage(@RequestBody WashPackage p) {
        WashPackage createdPackage = packageService.createPackage(p);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdPackage);
    }

    @PutMapping("/{id}")
    public ResponseEntity<WashPackage> updatePackage(@PathVariable String id, @RequestBody WashPackage p) {
        WashPackage updatedPackage = packageService.updatePackage(id, p);
        if (updatedPackage != null) {
            return ResponseEntity.ok(updatedPackage);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePackage(@PathVariable String id) {
        packageService.deletePackage(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/by-car-was-id/{carWashId}")
    public List<WashPackage> getPackageByCarWash(@PathVariable("carWashId") String carWashId) {
        return packageService.getPackageByCarWash(carWashId);
    }
}
