package com.fortunatis.estateservice.service.Impl;

import com.fortunatis.estateservice.model.Estate;
import com.fortunatis.estateservice.service.CustomDAOService;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomDAOServiceImpl implements CustomDAOService {
    private final EntityManager entityManager;

    @Override
    public List<Estate> searchEstates(String generatedQuery) {
        return entityManager.createNativeQuery(generatedQuery, Estate.class).getResultList();
    }

    @Override
    public Long countSearchEstateResults(String generatedQuery) {
        String count = entityManager.createNativeQuery(generatedQuery).getSingleResult().toString();
        if(!StringUtils.isEmpty(count)){
            return Long.parseLong(count);
        }
        return 0L;
    }

    @Override
    public List<Estate> findFeaturedEstate(Integer limit, Integer offset) {
        return null;
    }
}
