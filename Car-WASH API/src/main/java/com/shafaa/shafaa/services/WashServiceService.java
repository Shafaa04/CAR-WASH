package com.shafaa.shafaa.services;

import com.shafaa.shafaa.repositories.WashServiceRepository;
import com.shafaa.shafaa.tables.WashService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WashServiceService {
    @Autowired
    private WashServiceRepository serviceRepository;

    public List<WashService> getAllServices() {
        return serviceRepository.findAll();
    }

    public Optional<WashService> getServiceById(String id) {
        return serviceRepository.findById(id);
    }

    public WashService createService(WashService service) {
        return serviceRepository.save(service);
    }

    public WashService updateService(String id, WashService serviceDetails) {
        WashService service = serviceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Service not found with id: " + id));
        service.setServiceName(serviceDetails.getServiceName());
        service.setDescription(serviceDetails.getDescription());
        return serviceRepository.save(service);
    }

    public void deleteService(String id) {
        serviceRepository.deleteById(id);
    }
}
