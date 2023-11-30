package com.fortunatis.estateservice.service;

import com.fortunatis.estateservice.model.Estate;

import java.util.List;

public interface CustomDAOService {
    List<Estate> searchEstates(String generatedQuery);

    Long countSearchEstateResults(String generatedQuery);

    List<Estate> findFeaturedEstate(Integer limit, Integer offset);
}
