package com.shafaa.shafaa.tables;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Data
public class Customer {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID",strategy = "org.hibernate.id.UUIDGenerator")
    public String customerId;
    @ManyToOne
    @JoinColumn(name = "user_id",referencedColumnName = "user_id")
    private Login user_data;
    private String firstName;
    private String lastName;
    private String email;
    @Column(nullable = true)
    private String phone;
    @Column(nullable = true)
    private String address;
    @Column(nullable = true)
    private String city;
    @Column(nullable = true)
    private String state;
    @Column(nullable = true)
    private String zipCode;
}
