package com.fortunatis.estateservice.repository.inventory;

import com.fortunatis.estateservice.entity.inventory.UnitEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UnitRepository extends JpaRepository<UnitEntity, UUID> {
}
