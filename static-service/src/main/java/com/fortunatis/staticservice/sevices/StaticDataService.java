package com.fortunatis.staticservice.sevices;

import com.fortunatis.staticservice.pojo.response.FeaturesResponseDTO;

import java.util.List;

public interface StaticDataService {
    List<FeaturesResponseDTO> getPublicFeatures();
}
