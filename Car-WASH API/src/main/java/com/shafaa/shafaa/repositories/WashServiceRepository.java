package com.shafaa.shafaa.repositories;

import com.shafaa.shafaa.tables.WashService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WashServiceRepository extends JpaRepository<WashService, String> {
}
