package com.shafaa.shafaa.controllers;

import java.time.Month;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shafaa.shafaa.dto.ReportDate;
import com.shafaa.shafaa.repositories.ReportRepositories;
import com.shafaa.shafaa.repositories.WashBookingRepository;
import com.shafaa.shafaa.tables.WashBooking;
import org.springframework.web.bind.annotation.PostMapping;


@RestController
@RequestMapping("/car-wash/report")
@CrossOrigin
public class ReportController {

    @Autowired
    public ReportRepositories reportRepositories;

    @Autowired
    public WashBookingRepository washbBookingRepository;
    
    @GetMapping("/summary")
    public ResponseEntity<Map<String, Long>> getSummaryReport() {
        Map<String, Long> summary = new HashMap<>();
        summary.put("employees", reportRepositories.getNumberOfEmployees());
        summary.put("carwashes", reportRepositories.getNumberOfCarwashes());
        summary.put("customers", reportRepositories.getNumberOfCustomers());
        summary.put("packages", reportRepositories.getNumberOfPackages());
        summary.put("services", reportRepositories.getNumberOfWashServices());
        summary.put("vehicles", reportRepositories.getNumberOfVehicles());
        return ResponseEntity.ok(summary);
    }

    @GetMapping("/requestBasedOnCarWash")
    public List<Map<String,Objects>> requestBasedOnCarWash(){
        return washbBookingRepository.requestBasedOnCarWash();
    }

    @GetMapping("/customersBasedOnCarWash")
    public List<Map<String,Objects>> customersBasedOnCarWash(){
        return washbBookingRepository.customersBasedOnCarWash();
    }

    @GetMapping("/summary-by-car-wash/{carWashId}")
    public ResponseEntity<Map<String, Object>> packagesByCarWash(@PathVariable("carWashId") String carWashId) {
        Map<String, Object> summary = new HashMap<>();
        summary.put("employees", reportRepositories.staffByCarWash(carWashId));
        summary.put("requests", reportRepositories.requestsByCarWash(carWashId));
        summary.put("customers", reportRepositories.customerByCarWash(carWashId));
        summary.put("packages", reportRepositories.packagesByCarWash(carWashId));
        return ResponseEntity.ok(summary);
    }

    @PostMapping("/by-start-date-to-end-date")
    public List<WashBooking> getListOfCustomersByStartDateToEndDate(@RequestBody ReportDate reportDate) {
        return washbBookingRepository.getListOfCustomersByStartDateToEndDate(reportDate.getStartDate(),
                reportDate.getEndDate());
    }

    @PostMapping("/by-start-date-to-end-date-car-wash/{car_wash}")
    public List<WashBooking> getListOfCustomersByStartDateToEndDateCarWash(@PathVariable("car_wash") String car_wash,@RequestBody ReportDate reportDate) {
        return washbBookingRepository.getListOfCustomersByStartDateToEndDateByCarWash(car_wash,reportDate.getStartDate(),
                reportDate.getEndDate());
    }
    

    @GetMapping("/request-report-by-car-wash/{carWashId}")
    public ResponseEntity<Map<String, Object>> requestReportByCarWash(@PathVariable("carWashId") String carWashId) {
        Map<String, Object> summary = new HashMap<>();
        summary.put("todayBookings", reportRepositories.requestByCarWashToday(carWashId));
        summary.put("weeklyBooking", reportRepositories.requestByCarWashWeekLy(carWashId));
        summary.put("monthlyBooking", reportRepositories.requestByCarWashMonthly(carWashId));
        summary.put("annualBookings", reportRepositories.requestByCarWashAnnual(carWashId));
        return ResponseEntity.ok(summary);
    }

    @GetMapping("/staff-by-gender-car-wash/{carWashId}")
    public List<Map<String,Object>> staffByGender(@PathVariable("carWashId") String carWashId) {
        return reportRepositories.staffByGender(carWashId);
    }

    @GetMapping("/monthlyWashBookingReport/{carWashId}")
    public ResponseEntity<List<Map<String,Objects>>> getMonthlyWashBookingReport(@PathVariable("carWashId") String carWashId) {
        List<Map<String,Objects>> report = reportRepositories.generateMonthlyWashBookingReport(carWashId);
        return new ResponseEntity<>(report, HttpStatus.OK);
    }

    @GetMapping("/employee-based-on-car-wash")
    public ResponseEntity<List<Map<String,Objects>>> employeeBasedOnCarWash() {
        List<Map<String,Objects>> report = reportRepositories.employeeBasedOnCarWash();
        return new ResponseEntity<>(report, HttpStatus.OK);
    }
}
