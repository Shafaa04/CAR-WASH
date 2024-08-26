package com.shafaa.shafaa.repositories;

import com.shafaa.shafaa.tables.WashPackage;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PackageRepository extends JpaRepository<WashPackage, String> {
    @Query(value = "SELECT COUNT(*) packages from wash_package where car_wash_id = ?1", nativeQuery = true)
    Optional<Map<String, Object>> packagesByCarWash(String car_wash_id);

    @Query(value = "SELECT p from WashPackage p JOIN p.carWashId WHERE p.carWashId.carWashId = :carWashId")
    List<WashPackage> getPackageByCarWash(String carWashId);
}
