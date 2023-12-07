package com.fortunatis.staticservice.repository;

import com.fortunatis.staticservice.enums.StaticDataType;
import com.fortunatis.staticservice.model.StaticData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface StaticDataRepository extends JpaRepository<StaticData, UUID> {
    @Query("SELECT s FROM StaticData s WHERE s.dataType = :dataType")
    List<StaticData> findAllByDataType(@Param("dataType") StaticDataType dataType);

    StaticData findFirstByDataTypeAndIsDeletedFalse(StaticDataType staticDataType);
}