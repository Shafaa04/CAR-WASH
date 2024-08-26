package com.shafaa.shafaa.dto;

import com.shafaa.shafaa.tables.Roles;

import lombok.Data;

@Data
public class LoginDTO {
    private String username;
    private String password;
    private Roles role_id;
    private String user_status;
}
