package com.shafaa.shafaa.services;

import com.shafaa.shafaa.repositories.CarWashRepository;
import com.shafaa.shafaa.tables.CarWash;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CarWashService {
    @Autowired
    private CarWashRepository carWashRepository;

    public List<CarWash> getAllCarWashes() {
        return carWashRepository.findAll();
    }

    public Optional<CarWash> getCarWashById(String id) {
        return carWashRepository.findById(id);
    }

    public CarWash createCarWash(CarWash carWash) {
        return carWashRepository.save(carWash);
    }

    public CarWash updateCarWash(String id, CarWash carWash) {
        if (carWashRepository.existsById(id)) {
            carWash.setCarWashId(id);
            return carWashRepository.save(carWash);
        }
        return null;
    }

    public void deleteCarWash(String id) {
        carWashRepository.deleteById(id);
    }

    public CarWash getCarWashByUserId(String user_id) {
        Optional<CarWash> carWash = carWashRepository.getCarWashByUserId(user_id);
        if(carWash.isPresent()){
            return carWash.get();
        }else{
            return new CarWash();
        }
    }
}
