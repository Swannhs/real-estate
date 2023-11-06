package com.fortunatis.staticservice.sevices.impl;

import com.fortunatis.staticservice.pojo.response.FeaturesResponseDTO;
import com.fortunatis.staticservice.repository.FeaturesRepository;
import com.fortunatis.staticservice.sevices.StaticDataService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StaticDataServiceImpl implements StaticDataService {
    private final ModelMapper modelMapper;
    private final FeaturesRepository featuresRepository;

    @Override
    public List<FeaturesResponseDTO> getPublicFeatures() {
        return modelMapper.map(featuresRepository.findAllByIsActiveTrue(), List.class);
    }
}
