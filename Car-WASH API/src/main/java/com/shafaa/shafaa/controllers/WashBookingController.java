package com.shafaa.shafaa.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shafaa.shafaa.services.WashBookingService;
import com.shafaa.shafaa.tables.WashBooking;

@RestController
@RequestMapping("/car-wash/wash-booking")
@CrossOrigin
public class WashBookingController {

    @Autowired
    public WashBookingService washBookingService;

    @PostMapping("/save")
    public WashBooking saveWashingBookings(@RequestBody WashBooking washBooking){
        return washBookingService.saveWashingBookings(washBooking);
    }

    @PutMapping("/update/{id}")
    public Optional<WashBooking> updateWashBooking(@PathVariable("id") String id,@RequestBody WashBooking washBooking){
        return washBookingService.updateWashBooking(id, washBooking);
    }

    @GetMapping("/allWashBooking")
    public List<WashBooking> getAllWashBookings(){
        return washBookingService.getAllWashBookings();
    }

    @GetMapping("/byId/{id}")
    public Optional<WashBooking> getWashBookingById(@PathVariable("id") String id){
        return washBookingService.getWashBookingById(id);
    }

    @GetMapping("/allWashBooking-by-car-wash/{carWashId}")
    public List<WashBooking> getWashbookingByCarWash(@PathVariable("carWashId") String carWashId){
        return washBookingService.getWashbookingByCarWash(carWashId);
    }
}
