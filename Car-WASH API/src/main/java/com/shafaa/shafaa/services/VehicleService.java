package com.shafaa.shafaa.services;

import com.shafaa.shafaa.repositories.VehicleRepository;
import com.shafaa.shafaa.tables.Vehicle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VehicleService {
    @Autowired
    private VehicleRepository vehicleRepository;

    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }

    public Optional<Vehicle> getVehicleById(String id) {
        return vehicleRepository.findById(id);
    }

    public Vehicle createVehicle(Vehicle vehicle) {
        return vehicleRepository.save(vehicle);
    }

    public Vehicle updateVehicle(String id, Vehicle vehicle) {
        if (vehicleRepository.existsById(id)) {
            vehicle.setCarId(id);
            return vehicleRepository.save(vehicle);
        }
        return null;
    }

    public void deleteVehicle(String id) {
        vehicleRepository.deleteById(id);
    }
}
