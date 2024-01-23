package com.fortunatis.estateservice.repository;

import com.fortunatis.estateservice.model.Estate;
import com.fortunatis.estateservice.model.EstateWishList;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface WishListRepository extends JpaRepository<EstateWishList, UUID> {
    List<EstateWishList> findAllByUserId(UUID userId);
    Boolean existsByUserIdAndEstateId(UUID userId, UUID estateId);
    void deleteByUserIdAndEstateId(UUID userId, UUID estateId);
    @Query("SELECT wl.estate FROM EstateWishList wl WHERE wl.userId = :userId")
    Page<Estate> findAllEstateByUserId(UUID userId, Pageable pageable);
}