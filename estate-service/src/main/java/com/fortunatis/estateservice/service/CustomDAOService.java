package com.fortunatis.estateservice.service;

import com.fortunatis.estateservice.model.Estate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CustomDAOService {
    Page<Estate> searchEstates(String generatedQuery, Pageable pageable);

    Long countSearchEstateResults(String generatedQuery);

    List<Estate> findFeaturedEstate(Integer limit, Integer offset);
}
