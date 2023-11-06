package com.fortunatis.staticservice.repository;

import com.fortunatis.staticservice.model.Features;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface FeaturesRepository extends JpaRepository<Features, UUID> {
    List<Features> findAllByIsActiveTrue();
}
