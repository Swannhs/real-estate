package com.fortunatis.estateservice.repository;

import com.fortunatis.estateservice.model.CantonNameVariations;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface CantonNameVariationsRepository extends JpaRepository<CantonNameVariations, UUID> {
    List<CantonNameVariations> findByCantonsLike(String keyword);
}
