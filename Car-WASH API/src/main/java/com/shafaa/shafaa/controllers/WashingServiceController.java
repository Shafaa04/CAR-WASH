package com.shafaa.shafaa.controllers;


import com.shafaa.shafaa.services.WashServiceService;
import com.shafaa.shafaa.tables.WashService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/car-wash/services")
@CrossOrigin
public class WashingServiceController {
    @Autowired
    private WashServiceService serviceService;

    @GetMapping
    public List<WashService> getAllServices() {
        return serviceService.getAllServices();
    }

    @GetMapping("/{id}")
    public WashService getServiceById(@PathVariable String id) {
        return serviceService.getServiceById(id)
                .orElseThrow(() -> new RuntimeException("Service not found with id: " + id));
    }

    @PostMapping
    public WashService createService(@RequestBody WashService service) {
        return serviceService.createService(service);
    }

    @PutMapping("/{id}")
    public WashService updateService(@PathVariable String id, @RequestBody WashService service) {
        return serviceService.updateService(id, service);
    }

    @DeleteMapping("/{id}")
    public void deleteService(@PathVariable String id) {
        serviceService.deleteService(id);
    }
}
