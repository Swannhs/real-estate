package com.fortunatis.estateservice.service;

import com.fortunatis.estateservice.pojo.request.EstateAddDto;
import com.fortunatis.estateservice.pojo.request.EstateSearchDto;
import com.fortunatis.estateservice.pojo.response.EstateResponseDto;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.UUID;

public interface EstateService {
    EstateResponseDto createEstate(EstateAddDto estateAddDto);
    EstateResponseDto getEstateById(UUID id);
    List<EstateResponseDto> searchEstateProperties(EstateSearchDto estateSearchDto);
}
