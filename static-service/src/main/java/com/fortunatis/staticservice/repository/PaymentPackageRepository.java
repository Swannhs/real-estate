package com.fortunatis.staticservice.repository;

import com.fortunatis.staticservice.model.PaymentPackage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface PaymentPackageRepository extends JpaRepository<PaymentPackage, UUID> {
    @Query("SELECT DISTINCT p FROM PaymentPackage p LEFT JOIN FETCH p.paymentFeatures WHERE p.isActive = true")
    List<PaymentPackage> findAllActiveWithFeatures();

    @Query("SELECT DISTINCT p FROM PaymentPackage p LEFT JOIN FETCH p.paymentFeatures WHERE p.id = :id")
    Optional<PaymentPackage> findByIdWithFeatures(UUID id);
}
