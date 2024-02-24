package com.fortunatis.estateservice.utils;

import com.fortunatis.estateservice.model.Estate;
import com.fortunatis.estateservice.pojo.response.EstateSingleResponseDto;
import com.fortunatis.estateservice.pojo.response.staticService.FeaturesResponseDto;
import com.fortunatis.estateservice.service.StaticApiService;
import org.modelmapper.ModelMapper;

import java.util.List;
import java.util.stream.Collectors;

public class EstateUtils {
    public static EstateSingleResponseDto getEstateSingleResponseDto(Estate estate, ModelMapper modelMapper, StaticApiService staticApiService) {
        EstateSingleResponseDto estateResponseDto = modelMapper.map(estate, EstateSingleResponseDto.class);
        if (!estate.getEstateFeatures().isEmpty()) {
            List<FeaturesResponseDto> featuresResponseDtos = staticApiService.getEstateFeatures();
            List<FeaturesResponseDto> estateFeatures = estate.getEstateFeatures().stream()
                    .map(estateFeatureId -> featuresResponseDtos.stream()
                            .filter(featuresResponseDto -> featuresResponseDto.getId().equals(estateFeatureId))
                            .findFirst().orElse(null))
                    .collect(Collectors.toList());
            estateResponseDto.setEstateFeatures(estateFeatures);
        }
        return estateResponseDto;
    }
}
