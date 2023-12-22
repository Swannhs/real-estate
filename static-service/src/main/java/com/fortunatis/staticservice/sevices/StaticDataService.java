package com.fortunatis.staticservice.sevices;

import com.fortunatis.staticservice.pojo.response.*;

import java.util.List;
import java.util.UUID;

public interface StaticDataService {
    List<FeaturesResponseDto> getPublicFeatures();
    List<PaymentPackageResponseDto> getPublicPaymentPackages();
    PaymentPackageResponseDto getPublicPaymentPackage(UUID id);
    List<CountryResponseDto> getPublicCountries();
    CountryResponseDto getPublicCountry(Long id);
    List<StaticDataResponseDto> getPublicEstateAdvertisePurpose();
    List<StaticDataResponseDto> getPublicEstateAdvertisers();
    List<StaticDataResponseDto> getPublicEstateCategoryTypes();
    NoticeResponseDto getCookiePolicy();
    NoticeResponseDto getPrivacyPolicy();
    NoticeResponseDto getLegalNotice();
    NoticeResponseDto getGeneralTermsAndConditions();
}
