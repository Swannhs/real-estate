package com.fortunatis.estateservice.service;

import com.fortunatis.estateservice.pojo.request.EstateAddDto;
import com.fortunatis.estateservice.pojo.request.EstateSearchDto;
import com.fortunatis.estateservice.pojo.response.EstateResponseDto;
import com.fortunatis.estateservice.pojo.response.EstateSingleResponseDto;

import java.util.List;
import java.util.UUID;

public interface EstateService {
    EstateResponseDto createEstate(EstateAddDto estateAddDto);
    EstateSingleResponseDto getEstateById(UUID id);
    List<EstateResponseDto> searchEstateProperties(EstateSearchDto estateSearchDto);
}
