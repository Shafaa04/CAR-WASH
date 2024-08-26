package com.shafaa.shafaa.repositories;


import com.shafaa.shafaa.dto.LoginAuth;
import com.shafaa.shafaa.tables.Login;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@Repository
public interface LoginRepository extends JpaRepository<Login,String> {

    @Query(value = "SELECT * from login where username = ?1",nativeQuery = true)
    Optional<Login> check_existing_user(String username);
    @Query(value = "SELECT * from login WHERE username = ?1 and password = ?2",nativeQuery=true)
    Optional<Login> login_authentication(String username,String password);

    @Query(value = "SELECT * from login l,roles r WHERE " +
            "r.role_id = l.role_id and l.username = ?1 and " +
            "l.password = ?2",nativeQuery=true)
    List<Map<String, Objects>> login_authentication_(String username,String password);

}
