package com.shafaa.shafaa.services;

import com.shafaa.shafaa.repositories.WashBookingRepository;
import com.shafaa.shafaa.tables.WashBooking;
import jakarta.transaction.Transactional;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Data
public class WashBookingService {
    @Autowired
    public WashBookingRepository washBookingRepository;

    public WashBooking saveWashingBookings(WashBooking washBooking){
        return washBookingRepository.save(washBooking);
    }

   @Transactional
   public Optional<WashBooking> updateWashBooking(String id,WashBooking washBooking){
       return washBookingRepository.findById(id).map(wash->{
        wash.setBookingStatus(washBooking.getBookingStatus());
        wash.setCarWashData(washBooking.getCarWashData());
        wash.setCustomerData(washBooking.getCustomerData());
        wash.setMessage(washBooking.getMessage());
        wash.setPaymentStatus(washBooking.getPaymentStatus());
        wash.setWashDate(washBooking.getWashDate());
        wash.setWashPackageData(washBooking.getWashPackageData());
        wash.setEmployeeAloosha(washBooking.getEmployeeAloosha());
        return wash;
       });
   }

    public List<WashBooking> getAllWashBookings(){
        List<WashBooking> wash = washBookingRepository.findAll();
        if(wash.size() > 0){
            return wash;
        }else{
            return new ArrayList<>();
        }
    }

    
    public List<WashBooking> getWashbookingByCarWash(String id){
        List<WashBooking> wash = washBookingRepository.getWashbookingByCarWash(id);
        if(wash.size() > 0){
            return wash;
        }else{
            return new ArrayList<>();
        }
    }

    public Optional<WashBooking> getWashBookingById(String id){
        Optional<WashBooking> wash = washBookingRepository.findById(id);
        if(wash.isEmpty()){
            return Optional.of(new WashBooking());
        }else{
            return wash;
        }
    }
}
