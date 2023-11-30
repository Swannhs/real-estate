package com.fortunatis.staticservice.sevices;

import com.fortunatis.staticservice.pojo.response.CountryResponseDto;
import com.fortunatis.staticservice.pojo.response.FeaturesResponseDTO;
import com.fortunatis.staticservice.pojo.response.PaymentPackageResponseDto;
import com.fortunatis.staticservice.pojo.response.StaticDataResponseDto;
import org.springframework.cache.annotation.Cacheable;

import java.util.List;
import java.util.UUID;

public interface StaticDataService {
    List<FeaturesResponseDTO> getPublicFeatures();
    List<PaymentPackageResponseDto> getPublicPaymentPackages();
    PaymentPackageResponseDto getPublicPaymentPackage(UUID id);
    List<CountryResponseDto> getPublicCountries();
    CountryResponseDto getPublicCountry(Long id);
    List<StaticDataResponseDto> getPublicEstateAdvertisingTypes();
    List<StaticDataResponseDto> getPublicEstateCategoryTypes();
}
