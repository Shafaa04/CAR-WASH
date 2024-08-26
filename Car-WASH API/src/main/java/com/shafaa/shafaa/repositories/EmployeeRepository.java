package com.shafaa.shafaa.repositories;

import com.shafaa.shafaa.tables.Employee;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, String> {
    @Query(value="SELECT * FROM employee e WHERE e.car_wash_id = ?1",nativeQuery = true)
    List<Employee> getEmployeesByCarwash(String car_wash);

    @Query(value = "SELECT COUNT(*) AS staffs from employee where car_wash_id = ?1",nativeQuery = true)
    Optional<Map<String,Object>> staffByCarWash(String car_wash_id);

    @Query(value = "SELECT COUNT(*) as staffs,gender from employee where car_wash_id = ?1 group by gender",nativeQuery = true)
    List<Map<String,Object>> staffByGender(String car_wash_id);

    @Query(value = "SELECT COUNT(*) AS staffs,cw.name from employee e,car_wash cw where cw.car_wash_id = e.car_wash_id " +
            " group by cw.name",nativeQuery = true)
    List<Map<String, Objects>> employeeBasedOnCarWash();
}
