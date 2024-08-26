package com.shafaa.shafaa.repositories;

import java.math.BigInteger;
import java.time.Month;
import java.time.Year;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public class ReportRepositories {

    @Autowired
    private CarWashRepository carWashRepository;
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private PackageRepository packageRepository;
    @Autowired
    private VehicleRepository vehicleRepository;
    @Autowired
    private WashServiceRepository washServiceRepository;
    @Autowired
    private WashBookingRepository washBookingRepository;


    public long getNumberOfEmployees(){
        return employeeRepository.count();
    }

    public long getNumberOfCustomers() {
        return customerRepository.count();
    }

    public long getNumberOfCarwashes() {
        return carWashRepository.count();
    }

    public long getNumberOfPackages() {
        return packageRepository.count();
    }

    public long getNumberOfVehicles() {
        return vehicleRepository.count();
    }

    public long getNumberOfWashServices(){
        return washServiceRepository.count();
    }


    // based on carwash
    public Optional<Map<String,Object>> packagesByCarWash(String car_wash_id){
        return packageRepository.packagesByCarWash(car_wash_id);
    }

    public Optional<Map<String,Object>> requestsByCarWash(String car_wash_id){
        return washBookingRepository.requestsByCarWash(car_wash_id);
    }

    public Optional<Map<String,Object>> customerByCarWash(String car_wash_id){
        return customerRepository.customerByCarWash(car_wash_id);
    }

    public Optional<Map<String, Object>> staffByCarWash(String car_wash_id) {
        return employeeRepository.staffByCarWash(car_wash_id);
    }
    

    public Optional<Map<String, Object>> requestByCarWashToday(String car_wash_id) {
        return washBookingRepository.requestByCarWashToday(car_wash_id);
    }
    
    public Optional<Map<String, Object>> requestByCarWashWeekLy(String car_wash_id) {
        return washBookingRepository.requestByCarWashWeekLy(car_wash_id);
    }
    
    public Optional<Map<String, Object>> requestByCarWashMonthly(String car_wash_id) {
        return washBookingRepository.requestByCarWashMonthly(car_wash_id);
    }
    
    public Optional<Map<String, Object>> requestByCarWashAnnual(String car_wash_id) {
        return washBookingRepository.requestByCarWashAnnual(car_wash_id);
    }

    public List<Map<String, Object>> staffByGender(String car_wash_id) {
        return employeeRepository.staffByGender(car_wash_id);
    }

        public List<Map<String,Objects>> generateMonthlyWashBookingReport(String washId) {
        Year currentYear = Year.now();
        int year = currentYear.getValue();
        return washBookingRepository.findMonthlyWashBookings(year,washId);
    }

    public List<Map<String,Objects>> employeeBasedOnCarWash() {
        return employeeRepository.employeeBasedOnCarWash();
    }
}
