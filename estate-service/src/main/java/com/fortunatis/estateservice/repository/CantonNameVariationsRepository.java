package com.fortunatis.estateservice.repository;

import com.fortunatis.estateservice.model.CantonNameVariationsModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface CantonNameVariationsRepository extends JpaRepository<CantonNameVariationsModel, UUID> {
    List<CantonNameVariationsModel> findByCantonsLike(String keyword);
}
