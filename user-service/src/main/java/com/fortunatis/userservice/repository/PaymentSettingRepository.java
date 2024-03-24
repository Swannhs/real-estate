package com.fortunatis.userservice.repository;

import com.fortunatis.userservice.model.PaymentSetting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface PaymentSettingRepository extends JpaRepository<PaymentSetting, UUID> {
}
