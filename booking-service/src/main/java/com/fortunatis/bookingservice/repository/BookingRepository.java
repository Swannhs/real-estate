package com.fortunatis.bookingservice.repository;

import com.fortunatis.bookingservice.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface BookingRepository extends JpaRepository<Booking, UUID> {
    List<Booking> findByEstateId(UUID estateId);
    List<Booking> findByUserId(UUID userId);
}
