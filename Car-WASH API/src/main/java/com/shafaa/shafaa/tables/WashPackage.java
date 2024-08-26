package com.shafaa.shafaa.tables;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import java.util.List;

@Entity
@Data
public class WashPackage {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID",strategy = "org.hibernate.id.UUIDGenerator")
    private String packageId;
    private String packageName;
    private String description;
    private double price;
    @ManyToOne
    @JoinColumn(name = "carWashId",referencedColumnName = "carWashId")
    private CarWash carWashId;
    @ManyToMany
    @JoinTable(
            name = "package_service",
            joinColumns = @JoinColumn(name = "packageId"),
            inverseJoinColumns = @JoinColumn(name = "serviceId")
    )
    private List<WashService> services;
    @ManyToOne
    @JoinColumn(name = "carId",referencedColumnName = "carId")
    private Vehicle car_id;
}
