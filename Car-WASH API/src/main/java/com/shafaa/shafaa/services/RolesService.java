package com.shafaa.shafaa.services;

import com.shafaa.shafaa.repositories.RolesRepository;
import com.shafaa.shafaa.tables.Roles;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class RolesService {
    @Autowired
    private RolesRepository rolesRepository;

    // Create
    public Roles createRoles(Roles roles) {
        return rolesRepository.save(roles);
    }

    // Read
    public List<Roles> getAllRoles() {
        return rolesRepository.findAll();
    }

    public Optional<Roles> getRolesById(String id) {
        return rolesRepository.findById(id);
    }

    // Update
    @Transactional
    public Optional<Roles> updateRoles(String roleId, Roles roles) {
        return rolesRepository.findById(roleId).map(t->{
          t.setRoleName(roles.getRoleName());
          return t;
        });
    }

    public Optional<Roles> roleByName(String roleName){
        Optional<Roles> r = rolesRepository.roleByName(roleName);
        if(r.isPresent()){
            return r;
        }else{
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"role not found ");
        }
    }

    // Delete
    public void deleteRoles(String id) {
        rolesRepository.deleteById(id);
    }
}
