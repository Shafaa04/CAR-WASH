package com.shafaa.shafaa.repositories;

import com.shafaa.shafaa.tables.Customer;

import java.util.Map;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, String> {
    @Query(value = "SELECT COUNT(*) as customers from customer c,wash_booking wb where c.customer_id = wb.customer_id " + 
    " and wb.car_wash_id = ?1",nativeQuery = true)
    Optional<Map<String,Object>> customerByCarWash(String car_wash_id);
}

