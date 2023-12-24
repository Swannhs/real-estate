package com.fortunatis.estateservice.repository;

import com.fortunatis.estateservice.model.Estate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface EstateRepository extends JpaRepository<Estate, UUID> {
    Page<Estate> findAllByUserId(UUID userId, Pageable pageable);
    Estate findByIdAndUserId(UUID id, UUID userId);
    List<Estate> findAllByOrderByCreatedAtDesc(Pageable pageable);
}
