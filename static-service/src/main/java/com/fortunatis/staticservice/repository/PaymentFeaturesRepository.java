package com.fortunatis.staticservice.repository;

import com.fortunatis.staticservice.model.PaymentFeature;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface PaymentFeaturesRepository extends JpaRepository<PaymentFeature, UUID> {
}
