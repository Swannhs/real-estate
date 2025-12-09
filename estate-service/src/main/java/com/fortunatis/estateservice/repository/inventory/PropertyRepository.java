package com.fortunatis.estateservice.repository.inventory;

import com.fortunatis.estateservice.entity.inventory.PropertyEntity;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface PropertyRepository extends JpaRepository<PropertyEntity, UUID> {
    @EntityGraph(attributePaths = {"location", "units", "units.ratePlans"})
    @Query("SELECT DISTINCT p FROM PropertyEntity p " +
            "JOIN p.location l " +
            "LEFT JOIN p.units u " +
            "LEFT JOIN u.ratePlans rp " +
            "WHERE (:city IS NULL OR lower(l.city) = lower(:city)) " +
            "AND (:state IS NULL OR lower(l.state) = lower(:state)) " +
            "AND (:propertyType IS NULL OR p.propertyType = :propertyType)")
    List<PropertyEntity> searchInventory(@Param("city") String city,
                                         @Param("state") String state,
                                         @Param("propertyType") String propertyType);
}
