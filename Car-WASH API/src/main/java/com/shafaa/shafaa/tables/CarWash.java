package com.shafaa.shafaa.tables;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Data
public class CarWash {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID",strategy = "org.hibernate.id.UUIDGenerator")
    private String carWashId;
    private String name;
    private String location;
    private String contactNumber;
    private String email;
    private String website;
    private String workingHours;
    private String latitude;
    private String longitude;
    @ManyToOne
    @JoinColumn(name = "user_id",referencedColumnName = "user_id")
    private Login user_data;
}
