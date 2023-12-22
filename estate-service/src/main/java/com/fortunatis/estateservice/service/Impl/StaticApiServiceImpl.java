package com.fortunatis.estateservice.service.Impl;

import com.fortunatis.estateservice.client.StaticApiClient;
import com.fortunatis.estateservice.pojo.response.staticService.FeaturesResponseDto;
import com.fortunatis.estateservice.pojo.response.staticService.StaticDataResponseDto;
import com.fortunatis.estateservice.service.StaticApiService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StaticApiServiceImpl implements StaticApiService {
    private final StaticApiClient staticApiClient;

    @Override
    public List<StaticDataResponseDto> getAdvertisePurpose() {
        return staticApiClient.getClient()
                .get()
                .uri("/public/api/v1/static/estate-advertise-purpose")
                .retrieve()
                .bodyToFlux(StaticDataResponseDto.class)
                .collectList()
                .block();
    }

    @Override
    public List<StaticDataResponseDto> getAdvertisers() {
        return staticApiClient.getClient()
                .get()
                .uri("/public/api/v1/static/estate-advertiser")
                .retrieve()
                .bodyToFlux(StaticDataResponseDto.class)
                .collectList()
                .block();
    }

    @Override
    public List<StaticDataResponseDto> getEstateCategories() {
        return staticApiClient.getClient()
                .get()
                .uri("/public/api/v1/static/estate-category-types")
                .retrieve()
                .bodyToFlux(StaticDataResponseDto.class)
                .collectList()
                .block();
    }

    @Override
    public List<FeaturesResponseDto> getEstateFeatures() {
        return staticApiClient.getClient()
                .get()
                .uri("/public/api/v1/static/features")
                .retrieve()
                .bodyToFlux(FeaturesResponseDto.class)
                .collectList()
                .block();
    }
}
