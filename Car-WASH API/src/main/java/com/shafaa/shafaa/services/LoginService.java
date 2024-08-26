package com.shafaa.shafaa.services;

import com.shafaa.shafaa.dto.LoginAuth;
import com.shafaa.shafaa.dto.LoginDTO;
import com.shafaa.shafaa.repositories.LoginRepository;
import com.shafaa.shafaa.tables.Login;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.*;

@Service
public class LoginService {
    @Autowired
    public LoginRepository login_repository;
    protected static SecretKeySpec secretKey;
    protected static byte[] key;
    private static final String ALGORITHM = "AES";

    public void prepareSecreteKey(String myKey) {
        MessageDigest sha = null;
        try {
            key = myKey.getBytes(StandardCharsets.UTF_8);
            sha = MessageDigest.getInstance("SHA-1");
            key = sha.digest(key);
            key = Arrays.copyOf(key, 16);
            secretKey = new SecretKeySpec(key, ALGORITHM);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
    }

    public String encrypt(String strToEncrypt, String secret) {
        try {
            prepareSecreteKey(secret);
            Cipher cipher = Cipher.getInstance(ALGORITHM);
            cipher.init(Cipher.ENCRYPT_MODE, secretKey);
            return Base64.getEncoder().encodeToString(cipher.doFinal(strToEncrypt.getBytes("UTF-8")));
        } catch (Exception e) {
            System.out.println("Error while encrypting: " + e.toString());
        }
        return null;
    }

    public Login saveUsers(LoginDTO lgn){
        final String secretKey = "shafaaa987654321@gmail.com";
        Login l = new Login();
        l.setPassword(encrypt(lgn.getPassword(),secretKey));
        l.setUsername(lgn.getUsername()); l.setUser_status("1");
        l.setRole_id(lgn.getRole_id());
        Optional<Login> check = login_repository.check_existing_user(lgn.getUsername());
        if(check.isPresent()){
            throw new ResponseStatusException(HttpStatus.FOUND,"User exist");
        }else{
            return login_repository.save(l);
        }
    }

    @Transactional
    public Optional<Login> updateLoginData(String user_id,LoginDTO dto){
        return login_repository.findById(user_id).map(l->{
            l.setPassword(dto.getPassword());
            l.setRole_id(dto.getRole_id());
            l.setUsername(dto.getUsername());
            l.setUser_status(dto.getUser_status());
            return l;
        });
    }
    @Transactional
    public Optional<Login> resetPassword(String user_id,LoginDTO dto){
        return login_repository.findById(user_id).map(l->{
            final String secretKey = "shafaaa987654321@gmail.com";
            l.setPassword(encrypt(dto.getPassword(),secretKey));
            l.setRole_id(dto.getRole_id());
            l.setUsername(dto.getUsername());
            l.setUser_status(dto.getUser_status());
            return l;
        });
    }


    public Login login_authentication(String username, String password){
        final String secretKey = "shafaaa987654321@gmail.com";
        String encrypted_password = encrypt(password,secretKey);
//        String status = "1";
        Optional<Login> l = login_repository.login_authentication(username,encrypted_password);
        if(l.isPresent()){
            return l.get();
        }else{
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"User was not found");
        }
    }

    public List<Map<String,Objects>> login_authentication_(LoginAuth login){
        final String secretKey = "shafaaa987654321@gmail.com";
        String encrypted_password = encrypt(login.getPassword(),secretKey);
        List<Map<String,Objects>> l = login_repository.login_authentication_(login.getUsername(), encrypted_password);
        if(l.size() > 0){
            return l;
        }else{
         return new ArrayList<>();
        }
    }

    public Login getLoginDataByUserId(String user_id){
        Optional<Login> l = login_repository.findById(user_id);
        return l.orElseGet(Login::new);
    }

    public List<Login> getAllUsers(){
        List<Login> l = login_repository.findAll();
        if(l.size() > 0){
            return l;
        }else{
            return new ArrayList<>();
        }
    }
}
