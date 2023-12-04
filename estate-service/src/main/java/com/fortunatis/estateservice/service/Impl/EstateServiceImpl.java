package com.fortunatis.estateservice.service.Impl;

import com.fortunatis.estateservice.model.*;
import com.fortunatis.estateservice.pojo.Meta;
import com.fortunatis.estateservice.pojo.request.EstateAddDto;
import com.fortunatis.estateservice.pojo.request.EstateAddGalleryDto;
import com.fortunatis.estateservice.pojo.request.EstateSearchDto;
import com.fortunatis.estateservice.pojo.response.EstateResponseDto;
import com.fortunatis.estateservice.repository.CantonNameVariationsRepository;
import com.fortunatis.estateservice.repository.EstateRepository;
import com.fortunatis.estateservice.service.CustomDAOService;
import com.fortunatis.estateservice.service.EstateService;
import com.fortunatis.estateservice.util.UtilityService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import static com.fortunatis.estateservice.util.ApplicationConstants.ENTRIES_PER_PAGE;

@Service
@RequiredArgsConstructor
@Slf4j
public class EstateServiceImpl implements EstateService {
    private final ModelMapper modelMapper;
    private final CustomDAOService customDAOService;
    private final EstateRepository estateRepository;
    private final CantonNameVariationsRepository cantonNameVariationsRepository;

    @Override
    public EstateResponseDto createEstate(EstateAddDto estateAddDto) {
        Estate estate = modelMapper.map(estateAddDto, Estate.class);

        EstateContact estateContact = modelMapper.map(estateAddDto.getContact(), EstateContact.class);
        estate.setContact(estateContact);

        EstateLocation estateLocation = modelMapper.map(estateAddDto.getLocation(), EstateLocation.class);
        estate.setLocation(estateLocation);

        if (!estateAddDto.getEstateGalleries().isEmpty()) {
            List<EstateGallery> estateGalleries = new ArrayList<>();
            for (EstateAddGalleryDto estateImageDTO : estateAddDto.getEstateGalleries()) {
                EstateGallery estateGallery = modelMapper.map(estateImageDTO, EstateGallery.class);
                estateGallery.setGalleryEstate(estate);
                estateGalleries.add(estateGallery);
            }
            estate.setEstateGalleries(estateGalleries);
        }

        try {
            estate = estateRepository.save(estate);
        } catch (Exception e) {
            log.error("Error while creating estate", e);
            throw new RuntimeException("Error while creating estate", e);
        }
        return modelMapper.map(estate, EstateResponseDto.class);
    }

    @Override
    public EstateResponseDto getEstateById(UUID id) {
        return modelMapper.map(estateRepository.findById(id), EstateResponseDto.class);
    }

    @Override
    public List<EstateResponseDto> searchEstateProperties(EstateSearchDto estateSearchDto) {
        if (!UtilityService.hasValidEstateFilter(estateSearchDto)) {
            throw new RuntimeException("Invalid filter");
        }
        Meta meta = new Meta();
        if(!StringUtils.isEmpty(estateSearchDto.getSearchKeywords())){
            estateSearchDto.setSearchKeywords(getCantonVariationsFromSearchKeywords(estateSearchDto.getSearchKeywords()));
        }
        String generatedSql = UtilityService.buildSearchQueryForPublicEstateSearch(estateSearchDto);
        if (StringUtils.isNotBlank(generatedSql)) {
            List<Estate> estates = customDAOService.searchEstates(generatedSql);

            if (CollectionUtils.isEmpty(estates)) {
                return new ArrayList<>();
            }
            List<EstateResponseDto> estateDTOList = estates.stream().map(estate -> modelMapper.map(estate, EstateResponseDto.class)).collect(Collectors.toList());

            meta.setTotal(customDAOService.countSearchEstateResults(UtilityService.countSearchResult(generatedSql)));
            meta.setPerPage(ENTRIES_PER_PAGE);
            meta.setCurrentPage(estateSearchDto.getPage());
            meta.setTotalPage((int) Math.ceil(Double.parseDouble(String.valueOf(meta.getTotal())) / ENTRIES_PER_PAGE));
            meta.setNextPage(meta.getCurrentPage() + 1);
            meta.setPreviousPage(meta.getCurrentPage() > 0 ? meta.getCurrentPage() - 1 : 0);

            return estateDTOList;
        }
        return new ArrayList<>();
    }

    /**
     * Find the match in canton variation table using keyword and prolong the keyword with matching words from db
     *
     * @param searchKeywords
     * @return
     */
    public String getCantonVariationsFromSearchKeywords(String searchKeywords) {
        if (StringUtils.isEmpty(searchKeywords)) {
            return searchKeywords;
        }
        StringBuilder resultKeywords = new StringBuilder();
        List<String> keywords = Arrays.asList(searchKeywords.split(","));
        if (keywords.size() == 1) {
            List<CantonNameVariationsModel> cantonNameVariationsModelList = cantonNameVariationsRepository.findByCantonsLike(searchKeywords);
            if (!CollectionUtils.isEmpty(cantonNameVariationsModelList)) {
                resultKeywords.append(cantonNameVariationsModelList.get(0).getCantons());
            } else {
                return searchKeywords;
            }
        } else {
            String cantons = keywords.stream().map(keyword -> {
                List<CantonNameVariationsModel> cantonNameVariationsModelList = cantonNameVariationsRepository.findByCantonsLike(keyword.trim());
                if (!CollectionUtils.isEmpty(cantonNameVariationsModelList)) {
                    return cantonNameVariationsModelList.get(0).getCantons();
                }
                return keyword.trim();
            }).collect(Collectors.joining(","));
            resultKeywords.append(cantons);
        }
        return resultKeywords.toString();
    }
}
