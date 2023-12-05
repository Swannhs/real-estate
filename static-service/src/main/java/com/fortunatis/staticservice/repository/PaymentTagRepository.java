package com.fortunatis.staticservice.repository;

import com.fortunatis.staticservice.model.PaymentTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface PaymentTagRepository extends JpaRepository<PaymentTag, UUID> {
}
