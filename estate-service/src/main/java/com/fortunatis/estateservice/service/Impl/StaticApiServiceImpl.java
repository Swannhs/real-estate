package com.fortunatis.estateservice.service.Impl;

import com.fortunatis.estateservice.client.StaticApiClient;
import com.fortunatis.estateservice.pojo.response.staticService.FeaturesResponseDto;
import com.fortunatis.estateservice.pojo.response.staticService.StaticDataResponseDto;
import com.fortunatis.estateservice.service.StaticApiService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StaticApiServiceImpl implements StaticApiService {
    @Value("${service.param.static-service.public-prefix}")
    private String publicPrefix;
    @Value("${service.param.static-service.endpoint-prefix}")
    private String endpointPrefix;
    private final StaticApiClient staticApiClient;

    @Override
    public List<StaticDataResponseDto> getAdvertisePurpose() {
        return staticApiClient.getClient()
                .get()
                .uri(publicPrefix + endpointPrefix + "/estate-advertise-purpose")
                .retrieve()
                .bodyToFlux(StaticDataResponseDto.class)
                .collectList()
                .block();
    }

    @Override
    public List<StaticDataResponseDto> getAdvertisers() {
        return staticApiClient.getClient()
                .get()
                .uri(publicPrefix + endpointPrefix + "/estate-advertiser")
                .retrieve()
                .bodyToFlux(StaticDataResponseDto.class)
                .collectList()
                .block();
    }

    @Override
    public List<StaticDataResponseDto> getEstateCategories() {
        return staticApiClient.getClient()
                .get()
                .uri(publicPrefix + endpointPrefix + "/estate-category-types")
                .retrieve()
                .bodyToFlux(StaticDataResponseDto.class)
                .collectList()
                .block();
    }

    @Override
    public List<FeaturesResponseDto> getEstateFeatures() {
        return staticApiClient.getClient()
                .get()
                .uri(publicPrefix + endpointPrefix + "/features")
                .retrieve()
                .bodyToFlux(FeaturesResponseDto.class)
                .collectList()
                .block();
    }
}
