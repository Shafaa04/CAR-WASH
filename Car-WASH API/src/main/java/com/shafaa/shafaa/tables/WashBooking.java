package com.shafaa.shafaa.tables;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDateTime;

@Data
@Entity
public class WashBooking {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID",strategy = "org.hibernate.id.UUIDGenerator")
    public String washBookingId;
    @ManyToOne
    @JoinColumn(name = "customerId", referencedColumnName = "customerId")
    public Customer customerData;
    @ManyToOne
    @JoinColumn(name = "carWashId", referencedColumnName = "carWashId")
    public CarWash carWashData;
    @ManyToOne
    @JoinColumn(name = "packageId", referencedColumnName = "packageId")
    public WashPackage washPackageData;
    public LocalDateTime washDate;
    @ManyToOne
    @JoinColumn(name = "employeeID",referencedColumnName = "employeeID",nullable = true)
    private Employee employeeAloosha;
    public String message;
    public int bookingStatus;
    public int paymentStatus;
}
