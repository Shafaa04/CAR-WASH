package com.shafaa.shafaa.repositories;

import com.shafaa.shafaa.tables.CarWash;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CarWashRepository extends JpaRepository<CarWash, String> {
    @Query(value = "SELECT * FROM car_wash where user_id = ?1",nativeQuery = true)
    Optional<CarWash> getCarWashByUserId(String user_id);
}
