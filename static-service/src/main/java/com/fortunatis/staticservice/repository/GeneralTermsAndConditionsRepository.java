package com.fortunatis.staticservice.repository;

import com.fortunatis.staticservice.model.GeneralTermsAndConditions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface GeneralTermsAndConditionsRepository extends JpaRepository<GeneralTermsAndConditions, UUID> {
    GeneralTermsAndConditions findFirstByOrderByIdDesc();
}
