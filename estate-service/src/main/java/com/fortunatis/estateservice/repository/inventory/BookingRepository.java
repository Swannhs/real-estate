package com.fortunatis.estateservice.repository.inventory;

import com.fortunatis.estateservice.entity.inventory.BookingEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.UUID;

public interface BookingRepository extends JpaRepository<BookingEntity, UUID> {
    boolean existsByUnitIdAndCheckInLessThanAndCheckOutGreaterThan(UUID unitId, LocalDate checkOut, LocalDate checkIn);
}
