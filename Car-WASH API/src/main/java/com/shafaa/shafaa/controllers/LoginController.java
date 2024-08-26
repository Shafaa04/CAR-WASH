package com.shafaa.shafaa.controllers;

import com.shafaa.shafaa.dto.LoginAuth;
import com.shafaa.shafaa.dto.LoginDTO;
import com.shafaa.shafaa.services.LoginService;
import com.shafaa.shafaa.tables.Login;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/car-wash/login-auth")
@CrossOrigin
public class LoginController {
    @Autowired
    private LoginService loginServices;

    @GetMapping("/{username}/{password}")
    public Login login_authentication(@PathVariable("username") String username, @PathVariable("password") String password){
        return loginServices.login_authentication(username,password);
    }

    @PostMapping("/login")
    public List<Map<String, Objects>> login_authentication_(@RequestBody LoginAuth login){
        return loginServices.login_authentication_(login);
    }

    @PostMapping("/registration")
    public ResponseEntity<Login> SaveUser(@RequestBody LoginDTO dto){
        Login lgn = loginServices.saveUsers(dto);
        return new ResponseEntity<Login>(lgn,new HttpHeaders(), HttpStatus.OK);
    }

    @PutMapping("/updateLoginData/{user_id}")
    public Optional<Login> updateLoginData(@PathVariable("user_id") String user_id, @RequestBody LoginDTO dto){
        return loginServices.updateLoginData(user_id,dto);
    }
    @PutMapping("/resetPassword/{user_id}")
    public Optional<Login> resetPassword(@PathVariable("user_id") String user_id,@RequestBody LoginDTO dto){
        return loginServices.resetPassword(user_id,dto);
    }
    @GetMapping("/getLoginInformationByUserId/{user_id}")
    public Login getLoginInformationByUserId(@PathVariable("user_id") String user_id){
        return loginServices.getLoginDataByUserId(user_id);
    }

    @GetMapping("/getAllUsers")
    public List<Login> getAllUsers(){
        return loginServices.getAllUsers();
    }
}
