package com.fortunatis.staticservice.repository;

import com.fortunatis.staticservice.model.EstateSticker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface EstateStickerRepository extends JpaRepository<EstateSticker, UUID> {
    @Query("select e from EstateSticker e where e.isDeleted = false and e.id = ?1")
    EstateSticker findByIdAndIsDeletedFalse(UUID id);

    @Query("select e from EstateSticker e where e.isDeleted = false")
    List<EstateSticker> findAllByWhereIsDeletedFalse();
}
