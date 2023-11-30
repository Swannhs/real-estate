package com.fortunatis.estateservice.service.Impl;

import com.fortunatis.estateservice.model.Estate;
import com.fortunatis.estateservice.service.CustomDAOService;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class CustomDAOServiceImpl implements CustomDAOService {
    private final EntityManager entityManager;

    @Override
    public List<Estate> searchEstates(String generatedQuery) {
        return null;
    }

    @Override
    public Long countSearchEstateResults(String generatedQuery) {
        return null;
    }

    @Override
    public List<Estate> findFeaturedEstate(Integer limit, Integer offset) {
        return null;
    }
}
