package com.fortunatis.estateservice.service;

import com.fortunatis.estateservice.model.Estate;
import com.fortunatis.estateservice.pojo.request.EstateAddDto;
import com.fortunatis.estateservice.pojo.request.EstateSearchDto;
import com.fortunatis.estateservice.pojo.response.EstateResponseDto;
import com.fortunatis.estateservice.pojo.response.EstateSingleResponseDto;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.UUID;

public interface EstateService {
    EstateResponseDto createEstate(EstateAddDto estateAddDto);
    EstateResponseDto updateEstate(EstateAddDto estateAddDto, UUID id);
    EstateResponseDto deleteEstate(UUID id);
    EstateSingleResponseDto getEstateById(UUID id);
    List<EstateResponseDto> searchEstateProperties(EstateSearchDto estateSearchDto);
    Page<EstateResponseDto> getAllEstatesByUser(Integer page, Integer size, String orderBy, String desc);
    List<EstateResponseDto> getRecentListings(Integer limit);
    Estate getEstateByEstateId(UUID id);
    EstateSingleResponseDto getUserEstateById(UUID id);
}
