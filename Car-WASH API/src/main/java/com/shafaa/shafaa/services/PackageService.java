package com.shafaa.shafaa.services;

import com.shafaa.shafaa.repositories.PackageRepository;
import com.shafaa.shafaa.tables.WashPackage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PackageService {
    @Autowired
    private PackageRepository packageRepository;

    public List<WashPackage> getAllPackages() {
        return packageRepository.findAll();
    }

    public Optional<WashPackage> getPackageById(String id) {
        return packageRepository.findById(id);
    }

    public WashPackage createPackage(WashPackage data) {
        return packageRepository.save(data);
    }

    public WashPackage updatePackage(String id, WashPackage data) {
        if (packageRepository.existsById(id)) {
            data.setPackageId(id);
            return packageRepository.save(data);
        }
        return null;
    }

    public void deletePackage(String id) {
        packageRepository.deleteById(id);
    }

    public List<WashPackage> getPackageByCarWash(String id) {
        return packageRepository.getPackageByCarWash(id);
    }
}
