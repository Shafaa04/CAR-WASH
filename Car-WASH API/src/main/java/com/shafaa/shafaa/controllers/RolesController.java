package com.shafaa.shafaa.controllers;

import com.shafaa.shafaa.services.RolesService;
import com.shafaa.shafaa.tables.Roles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/car-wash/roles")
@CrossOrigin
public class RolesController {
    @Autowired
    private RolesService rolesService;

    // Create
    @PostMapping("/")
    public ResponseEntity<Roles> createRoles(@RequestBody Roles roles) {
        return new ResponseEntity<>(rolesService.createRoles(roles), HttpStatus.CREATED);
    }

    // Read
    @GetMapping("/")
    public ResponseEntity<List<Roles>> getAllRoles() {
        return new ResponseEntity<>(rolesService.getAllRoles(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Roles> getRolesById(@PathVariable String id) {
        Optional<Roles> roles = rolesService.getRolesById(id);
        return roles.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Update
    @PutMapping("/{id}")
    public Optional<Roles> updateRole(@PathVariable("id") String id,@RequestBody Roles role){
        return rolesService.updateRoles(id, role);
    }

    // Delete
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRoles(@PathVariable String id) {
        rolesService.deleteRoles(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/byRoleName/{roleName}")
    public Optional<Roles> byRoleName(@PathVariable("roleName") String roleName){
        return rolesService.roleByName(roleName);
    }
}
