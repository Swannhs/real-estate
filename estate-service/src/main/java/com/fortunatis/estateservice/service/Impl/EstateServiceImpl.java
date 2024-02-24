package com.fortunatis.estateservice.service.Impl;

import com.fortunatis.estateservice.model.*;
import com.fortunatis.estateservice.pojo.Meta;
import com.fortunatis.estateservice.pojo.request.EstateAddDto;
import com.fortunatis.estateservice.pojo.request.EstateAddGalleryDto;
import com.fortunatis.estateservice.pojo.request.EstateSearchDto;
import com.fortunatis.estateservice.pojo.response.EstateResponseDto;
import com.fortunatis.estateservice.pojo.response.EstateSingleResponseDto;
import com.fortunatis.estateservice.repository.CantonNameVariationsRepository;
import com.fortunatis.estateservice.repository.EstateRepository;
import com.fortunatis.estateservice.service.CustomDAOService;
import com.fortunatis.estateservice.service.EstateService;
import com.fortunatis.estateservice.service.StaticApiService;
import com.fortunatis.estateservice.service.UserService;
import com.fortunatis.estateservice.utils.EstateUtils;
import com.fortunatis.estateservice.utils.UtilityService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.util.ObjectUtils;

import java.util.*;
import java.util.stream.Collectors;

import static com.fortunatis.estateservice.utils.ApplicationConstants.ENTRIES_PER_PAGE;

@Service
@RequiredArgsConstructor
@Slf4j
public class EstateServiceImpl implements EstateService {
    private final ModelMapper modelMapper;
    private final UserService userService;
    private final StaticApiService staticApiService;
    private final CustomDAOService customDAOService;
    private final EstateRepository estateRepository;
    private final CantonNameVariationsRepository cantonNameVariationsRepository;

    @Override
    public EstateResponseDto createEstate(EstateAddDto estateAddDto) {
        Estate estate = modelMapper.map(estateAddDto, Estate.class);
        if (ObjectUtils.isEmpty(userService.getUserId())) {
            throw new RuntimeException("Invalid user");
        }
        estate.setUserId(userService.getUserId());

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
    @Transactional
    public EstateResponseDto updateEstate(EstateAddDto estateAddDto, UUID id) {
        Estate estate = estateRepository.findByIdAndUserId(id, userService.getUserId());
        if (ObjectUtils.isEmpty(estate)) {
            throw new EntityNotFoundException("Estate not found");
        }

        modelMapper.map(estateAddDto, estate);

        // Update or create contact and location separately
        EstateContact estateContact = estate.getContact();
        if (estateContact == null) {
            estateContact = new EstateContact();
            estate.setContact(estateContact);
        }
        modelMapper.map(estateAddDto.getContact(), estateContact);

        EstateLocation estateLocation = estate.getLocation();
        if (estateLocation == null) {
            estateLocation = new EstateLocation();
            estate.setLocation(estateLocation);
        }
        modelMapper.map(estateAddDto.getLocation(), estateLocation);

        // Update galleries if present
        if (!estateAddDto.getEstateGalleries().isEmpty()) {
            List<EstateGallery> estateGalleries = estate.getEstateGalleries();
            for (EstateAddGalleryDto estateImageDTO : estateAddDto.getEstateGalleries()) {
                EstateGallery estateGallery = new EstateGallery();
                modelMapper.map(estateImageDTO, estateGallery);
                estateGallery.setGalleryEstate(estate);
                estateGalleries.add(estateGallery);
            }
            estate.setEstateGalleries(estateGalleries);
        }

        try {
            estate = estateRepository.save(estate);
            return modelMapper.map(estate, EstateResponseDto.class);
        } catch (Exception e) {
            log.error("Error while updating estate", e);
            throw new RuntimeException("Error while updating estate", e);
        }
    }

    @Override
    public EstateResponseDto deleteEstate(UUID id) {
        Estate estate = estateRepository.findByIdAndUserId(id, userService.getUserId());
        if (Objects.isNull(estate)) {
            throw new RuntimeException("Estate not found");
        }
        try {
            estateRepository.delete(estate);
            return modelMapper.map(estate, EstateResponseDto.class);
        } catch (Exception e) {
            log.error("Error while deleting estate", e);
            throw new RuntimeException("Error while deleting estate", e);
        }
    }

    @Override
    public EstateSingleResponseDto getEstateById(UUID id) {
        Estate estate = estateRepository.findById(id).orElseThrow(() -> new RuntimeException("Estate not found"));
        return EstateUtils.getEstateSingleResponseDto(estate, modelMapper, staticApiService);
    }

    @Override
    public Page<EstateResponseDto> getAllEstatesByUser(Integer page, Integer size, String orderBy, String desc) {
        Pageable pageable = PageRequest.of(page, UtilityService.preventEntitySize(size), Sort.Direction.fromString(desc), orderBy);
        Page<Estate> estatePage = estateRepository.findAllByUserId(userService.getUserId(), pageable);
        return estatePage.map(estate -> modelMapper.map(estate, EstateResponseDto.class));
    }

    @Override
    public List<EstateResponseDto> getRecentListings(Integer limit) {
        Pageable pageable = PageRequest.of(0, limit > 50 ? 8 : limit);
        List<Estate> estates = estateRepository.findAllByOrderByCreatedAtDesc(pageable);
        if (!estates.isEmpty()) {
            return estates.stream().map(estate -> modelMapper.map(estate, EstateResponseDto.class)).collect(Collectors.toList());
        }
        return new ArrayList<>();
    }

    @Override
    public Estate getEstateByEstateId(UUID id) {
        return estateRepository.findById(id).orElseThrow(() -> new RuntimeException("Estate not found"));
    }

    @Override
    public EstateSingleResponseDto getUserEstateById(UUID id) {
        Estate estate = estateRepository.findByIdAndUserId(id, userService.getUserId());
        if (Objects.isNull(estate)) {
            throw new RuntimeException("Estate not found");
        }
        return EstateUtils.getEstateSingleResponseDto(estate, modelMapper, staticApiService);
    }

    @Override
    public List<EstateResponseDto> searchEstateProperties(EstateSearchDto estateSearchDto) {
        if (!UtilityService.hasValidEstateFilter(estateSearchDto)) {
            throw new RuntimeException("Invalid filter");
        }
        Meta meta = new Meta();
        if (!StringUtils.isEmpty(estateSearchDto.getSearchKeywords())) {
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
     */
    public String getCantonVariationsFromSearchKeywords(String searchKeywords) {
        if (StringUtils.isEmpty(searchKeywords)) {
            return searchKeywords;
        }
        StringBuilder resultKeywords = new StringBuilder();
        List<String> keywords = Arrays.asList(searchKeywords.split(","));
        if (keywords.size() == 1) {
            List<CantonNameVariations> cantonNameVariationsList = cantonNameVariationsRepository.findByCantonsLike(searchKeywords);
            if (!CollectionUtils.isEmpty(cantonNameVariationsList)) {
                resultKeywords.append(cantonNameVariationsList.get(0).getCantons());
            } else {
                return searchKeywords;
            }
        } else {
            String cantons = keywords.stream().map(keyword -> {
                List<CantonNameVariations> cantonNameVariationsList = cantonNameVariationsRepository.findByCantonsLike(keyword.trim());
                if (!CollectionUtils.isEmpty(cantonNameVariationsList)) {
                    return cantonNameVariationsList.get(0).getCantons();
                }
                return keyword.trim();
            }).collect(Collectors.joining(","));
            resultKeywords.append(cantons);
        }
        return resultKeywords.toString();
    }
}
