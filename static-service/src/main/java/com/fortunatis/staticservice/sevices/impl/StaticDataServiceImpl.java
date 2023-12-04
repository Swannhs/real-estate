package com.fortunatis.staticservice.sevices.impl;

import com.fortunatis.staticservice.enums.StaticDataType;
import com.fortunatis.staticservice.model.Country;
import com.fortunatis.staticservice.model.Feature;
import com.fortunatis.staticservice.model.PaymentPackage;
import com.fortunatis.staticservice.pojo.response.CountryResponseDto;
import com.fortunatis.staticservice.pojo.response.FeaturesResponseDTO;
import com.fortunatis.staticservice.pojo.response.PaymentPackageResponseDto;
import com.fortunatis.staticservice.pojo.response.StaticDataResponseDto;
import com.fortunatis.staticservice.repository.CountryRepository;
import com.fortunatis.staticservice.repository.FeaturesRepository;
import com.fortunatis.staticservice.repository.PaymentPackageRepository;
import com.fortunatis.staticservice.repository.StaticDataRepository;
import com.fortunatis.staticservice.sevices.StaticDataService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class StaticDataServiceImpl implements StaticDataService {
    private final ModelMapper modelMapper;
    private final FeaturesRepository featuresRepository;
    private final PaymentPackageRepository paymentPackageRepository;
    private final CountryRepository countryRepository;
    private final StaticDataRepository staticDataRepository;

    @Override
    @Cacheable(value = "features", key = "'publicFeatures'")
    public List<FeaturesResponseDTO> getPublicFeatures() {
        List<Feature> features = featuresRepository.findAllByIsActiveTrue();
        return modelMapper.map(features, new TypeToken<List<FeaturesResponseDTO>>() {
        }.getType());
    }

    @Override
    @Cacheable(value = "paymentPackages", key = "'publicPaymentPackages'", unless = "#result == null")
    public List<PaymentPackageResponseDto> getPublicPaymentPackages() {
        List<PaymentPackage> packages = paymentPackageRepository.findAllActiveWithFeatures();
        return modelMapper.map(packages, new TypeToken<List<PaymentPackageResponseDto>>() {}.getType());
    }

    @Override
    @Cacheable(value = "paymentPackage", key = "'publicPaymentPackage:' + #id", unless = "#result == null")
    public PaymentPackageResponseDto getPublicPaymentPackage(UUID id) {
        Optional<PaymentPackage> paymentPackageOptional = paymentPackageRepository.findByIdWithFeatures(id);

        return paymentPackageOptional.map(paymentPackage -> modelMapper.map(paymentPackage, PaymentPackageResponseDto.class))
                .orElseThrow(() -> new EntityNotFoundException("PaymentPackage not found for ID: " + id));
    }

    @Override
    @Cacheable(value = "countries", key = "'publicCountries'", unless = "#result == null")
    public List<CountryResponseDto> getPublicCountries() {
        return modelMapper.map(countryRepository.findAllOrderByCountryNameAsc(), new TypeToken<List<CountryResponseDto>>() {}.getType());
    }

    @Override
    @Cacheable(value = "country", key = "'publicCountry:' + #id", unless = "#result == null")
    public CountryResponseDto getPublicCountry(Long id) {
        Optional<Country> countryOptional = countryRepository.findById(id);
        return countryOptional.map(country -> modelMapper.map(country, CountryResponseDto.class))
                .orElseThrow(() -> new EntityNotFoundException("Country not found for ID: " + id));
    }

    @Override
    @Cacheable(value = "estateAdvertisingTypes", key = "'publicEstateAdvertisingTypes'", unless = "#result == null")
    public List<StaticDataResponseDto> getPublicEstateAdvertisingTypes() {
        return modelMapper.map(staticDataRepository.findAllByDataType(StaticDataType.ADVERTISER), new TypeToken<List<StaticDataResponseDto>>() {}.getType());
    }

    @Override
    @Cacheable(value = "estateCategoryTypes", key = "'publicEstateCategoryTypes'", unless = "#result == null")
    public List<StaticDataResponseDto> getPublicEstateCategoryTypes() {
        return modelMapper.map(staticDataRepository.findAllByDataType(StaticDataType.ESTATE_TYPE), new TypeToken<List<StaticDataResponseDto>>() {}.getType());
    }
}
