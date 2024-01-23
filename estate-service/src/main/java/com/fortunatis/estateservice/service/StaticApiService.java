package com.fortunatis.estateservice.service;

import com.fortunatis.estateservice.pojo.response.staticService.FeaturesResponseDto;
import com.fortunatis.estateservice.pojo.response.staticService.StaticDataResponseDto;

import java.util.List;

public interface StaticApiService {
    List<StaticDataResponseDto> getAdvertisePurpose();
    List<StaticDataResponseDto> getAdvertisers();
    List<StaticDataResponseDto> getEstateCategories();
    List<FeaturesResponseDto> getEstateFeatures();
}
