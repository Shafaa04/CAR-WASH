package com.shafaa.shafaa.repositories;

import com.shafaa.shafaa.tables.WashBooking;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface WashBookingRepository extends JpaRepository<WashBooking,String> {
    @Query(value = "SELECT COUNT(*) as requests,name FROM car_wash cw,wash_booking wb " +
            " WHERE cw.car_wash_id = wb.car_wash_id group by cw.name order by cw.name",nativeQuery = true)
    List<Map<String,Objects>> requestBasedOnCarWash();

    @Query(value = "SELECT wb FROM WashBooking wb JOIN wb.carWashData WHERE wb.carWashData.carWashId = :carWashId")
    List<WashBooking> getWashbookingByCarWash(@Param("carWashId") String carWashId);

    @Query(value = "SELECT COUNT(*) as customers,name FROM car_wash cw,wash_booking wb,customer cu" +
            " WHERE cw.car_wash_id = wb.car_wash_id and cu.customer_id = wb.customer_id group by" +
            " cw.name order by cw.name",nativeQuery = true)
    List<Map<String,Objects>> customersBasedOnCarWash();

    @Query(value = "SELECT COUNT(*) as requests from customer c,wash_booking wb where c.customer_id = wb.customer_id " + 
    " and wb.car_wash_id = ?1",nativeQuery = true)
    Optional<Map<String, Object>> requestsByCarWash(String car_wash_id);
    
    @Query(value = "SELECT * FROM wash_booking WHERE DATE(wash_date) between ?1 and ?2",nativeQuery = true)
    List<WashBooking> getListOfCustomersByStartDateToEndDate(String startDate, String endDate);

    @Query(value = "SELECT * FROM wash_booking WHERE car_wash_id = ?1 and DATE(wash_date) between ?2 and ?3",nativeQuery = true)
    List<WashBooking> getListOfCustomersByStartDateToEndDateByCarWash(String carwash_id,String startDate, String endDate);

    @Query(value = "SELECT COUNT(*) as todayBookings FROM wash_booking WHERE DATE(wash_date) = CURDATE() and car_wash_id = ?1", nativeQuery = true)
    Optional<Map<String, Object>> requestByCarWashToday(String car_wash_id);

    @Query(value = "SELECT COUNT(*) as weeklyBookings FROM wash_booking WHERE YEAR(wash_date) = YEAR(CURDATE()) and WEEK(wash_date) = WEEK(CURDATE()) and car_wash_id = ?1",nativeQuery = true)
    Optional<Map<String, Object>> requestByCarWashWeekLy(String car_wash_id);

    @Query(value = "SELECT COUNT(*) as monthlyBooking FROM wash_booking WHERE YEAR(wash_date) = YEAR(CURDATE()) and MONTH(wash_date) = MONTH(CURDATE()) and car_wash_id = ?1", nativeQuery = true)
    Optional<Map<String, Object>> requestByCarWashMonthly(String car_wash_id);

    @Query(value = "SELECT COUNT(*) as annualBookings FROM wash_booking WHERE YEAR(wash_date) = YEAR(CURDATE()) and car_wash_id = ?1", nativeQuery = true)
    Optional<Map<String, Object>> requestByCarWashAnnual(String car_wash_id);

    @Query(value = "SELECT MONTH(wb.wash_date) AS month, COUNT(wb.wash_booking_id) AS booking_count " +
            "FROM wash_booking wb " +
            "WHERE YEAR(wb.wash_date) = ?1 and wb.car_wash_id = ?2 " +
            "GROUP BY MONTH(wb.wash_date)", nativeQuery = true)
    List<Map<String, Objects>> findMonthlyWashBookings(int year, String carWashId);
}
