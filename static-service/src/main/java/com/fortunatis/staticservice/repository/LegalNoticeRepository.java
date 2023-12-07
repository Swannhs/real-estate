package com.fortunatis.staticservice.repository;

import com.fortunatis.staticservice.model.LegalNotice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface LegalNoticeRepository extends JpaRepository<LegalNotice, UUID> {
    LegalNotice findFirstByOrderByIdDesc();
}
