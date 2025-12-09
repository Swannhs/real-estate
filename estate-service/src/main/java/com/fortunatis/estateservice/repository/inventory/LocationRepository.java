package com.fortunatis.estateservice.repository.inventory;

import com.fortunatis.estateservice.entity.inventory.LocationEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface LocationRepository extends JpaRepository<LocationEntity, UUID> {
}
