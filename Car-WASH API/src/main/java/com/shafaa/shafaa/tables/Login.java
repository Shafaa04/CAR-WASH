package com.shafaa.shafaa.tables;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

@Data
@Entity
public class Login {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID",strategy = "org.hibernate.id.UUIDGenerator")
    private String user_id;
    private String username;
    private String password;
    @ManyToOne
    @JoinColumn(name = "roleId",referencedColumnName = "roleId")
    private Roles role_id;
    private String user_status;
}
