package com.fortunatis.estateservice.repository;

import com.fortunatis.estateservice.model.Estate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface EstateRepository extends JpaRepository<Estate, UUID> {
}
