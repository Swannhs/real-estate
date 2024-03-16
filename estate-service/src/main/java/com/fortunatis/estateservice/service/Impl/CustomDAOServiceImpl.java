package com.fortunatis.estateservice.service.Impl;

import com.fortunatis.estateservice.model.Estate;
import com.fortunatis.estateservice.service.CustomDAOService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomDAOServiceImpl implements CustomDAOService {
    private final EntityManager entityManager;

    @Override
    public Page<Estate> searchEstates(String generatedQuery, Pageable pageable) {
        List<Estate> resultList = entityManager.createNativeQuery(generatedQuery, Estate.class)
                .setFirstResult(pageable.getPageNumber() * pageable.getPageSize())
                .setMaxResults(pageable.getPageSize())
                .getResultList();

        // Fetch total count using a separate count query
        long total = countSearchEstateResults(generatedQuery);

        return new PageImpl<>(resultList, pageable, total);
    }

    @Override
    public Long countSearchEstateResults(String generatedQuery) {
        String countQuery = "SELECT COUNT(*) FROM (" + generatedQuery + ") AS total";
        Query query = entityManager.createNativeQuery(countQuery);
        Number result = (Number) query.getSingleResult();
        return result.longValue();
    }

    @Override
    public List<Estate> findFeaturedEstate(Integer limit, Integer offset) {
        return null;
    }
}
