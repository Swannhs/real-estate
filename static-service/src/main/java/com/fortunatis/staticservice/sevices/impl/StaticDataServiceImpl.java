package com.fortunatis.staticservice.sevices.impl;

import com.fortunatis.staticservice.enums.StaticDataType;
import com.fortunatis.staticservice.model.*;
import com.fortunatis.staticservice.pojo.response.*;
import com.fortunatis.staticservice.repository.*;
import com.fortunatis.staticservice.sevices.NoticeService;
import com.fortunatis.staticservice.sevices.StaticDataService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class StaticDataServiceImpl implements StaticDataService {
    private final ModelMapper modelMapper;
    private final NoticeService noticeService;
    private final FeaturesRepository featuresRepository;
    private final PaymentPackageRepository paymentPackageRepository;
    private final CountryRepository countryRepository;
    private final StaticDataRepository staticDataRepository;
    private final EstateStickerRepository estateStickerRepository;

    @Override
    @Cacheable(value = "features", key = "'publicFeatures'")
    public List<FeaturesResponseDto> getPublicFeatures() {
        List<Feature> features = featuresRepository.findAllByIsActiveTrue();
        return modelMapper.map(features, new TypeToken<List<FeaturesResponseDto>>() {
        }.getType());
    }

    @Override
    @Cacheable(value = "paymentPackages", key = "'publicPaymentPackages'")
    public List<PaymentPackageResponseDto> getPublicPaymentPackages() {
        List<PaymentPackage> packages = paymentPackageRepository.findAllActiveWithFeatures();
        return modelMapper.map(packages, new TypeToken<List<PaymentPackageResponseDto>>() {}.getType());
    }

    @Override
    @Cacheable(value = "paymentPackage", key = "'publicPaymentPackage:' + #id")
    public PaymentPackageResponseDto getPublicPaymentPackage(UUID id) {
        Optional<PaymentPackage> paymentPackageOptional = paymentPackageRepository.findByIdWithFeatures(id);

        return paymentPackageOptional.map(paymentPackage -> modelMapper.map(paymentPackage, PaymentPackageResponseDto.class))
                .orElseThrow(() -> new EntityNotFoundException("PaymentPackage not found for ID: " + id));
    }

    @Override
    @Cacheable(value = "countries", key = "'publicCountries'")
    public List<CountryResponseDto> getPublicCountries() {
        return modelMapper.map(countryRepository.findAllOrderByCountryNameAsc(), new TypeToken<List<CountryResponseDto>>() {}.getType());
    }

    @Override
    @Cacheable(value = "country", key = "'publicCountry:' + #id")
    public CountryResponseDto getPublicCountry(Long id) {
        Optional<Country> countryOptional = countryRepository.findById(id);
        return countryOptional.map(country -> modelMapper.map(country, CountryResponseDto.class))
                .orElseThrow(() -> new EntityNotFoundException("Country not found for ID: " + id));
    }

    @Override
    @Cacheable(value = "advertisers", key = "'advertisers'")
    public List<StaticDataResponseDto> getPublicEstateAdvertisers() {
        return modelMapper.map(staticDataRepository.findAllByDataType(StaticDataType.ADVERTISER), new TypeToken<List<StaticDataResponseDto>>() {}.getType());
    }

    @Override
    @Cacheable(value = "advertise_purpose", key = "'advertise_purpose'")
    public List<StaticDataResponseDto> getPublicEstateAdvertisePurpose() {
        return modelMapper.map(staticDataRepository.findAllByDataType(StaticDataType.ESTATE_ADVERTISE_PURPOSE), new TypeToken<List<StaticDataResponseDto>>() {}.getType());
    }

    @Override
    @Cacheable(value = "estate_category", key = "'estate_category'")
    public List<StaticDataResponseDto> getPublicEstateCategoryTypes() {
        return modelMapper.map(staticDataRepository.findAllByDataType(StaticDataType.ESTATE_TYPE), new TypeToken<List<StaticDataResponseDto>>() {}.getType());
    }

    @Override
    @Cacheable(value = "cookie_policy", key = "'cookie_policy'")
    public NoticeResponseDto getCookiePolicy() {
        return modelMapper.map(noticeService.getCookiePolicy(), NoticeResponseDto.class);
    }

    @Override
    @Cacheable(value = "privacy_policy", key = "'privacy_policy'")
    public NoticeResponseDto getPrivacyPolicy() {
        return modelMapper.map(noticeService.getPrivacyPolicy(), NoticeResponseDto.class);
    }

    @Override
    @Cacheable(value = "legal_notice", key = "'legal_notice'")
    public NoticeResponseDto getLegalNotice() {
        return modelMapper.map(noticeService.getLegalNotice(), NoticeResponseDto.class);
    }

    @Override
    @Cacheable(value = "general_terms_and_conditions", key = "'general_terms_and_conditions'")
    public NoticeResponseDto getGeneralTermsAndConditions() {
        return modelMapper.map(noticeService.getGeneralTermsAndConditions(), NoticeResponseDto.class);
    }

    @Override
    @Cacheable(value = "sticker", key = "'sticker:' + #id")
    public EstateStickerResponseDto getStickerById(UUID id) {
        EstateSticker sticker = estateStickerRepository.findByIdAndIsDeletedFalse(id);
        if (ObjectUtils.isEmpty(sticker)) {
            throw new RuntimeException("Sticker not found for ID: " + id);
        }
        return modelMapper.map(sticker, EstateStickerResponseDto.class);
    }

    @Override
    @Cacheable(value = "stickers", key = "'publicStickers'")
    public List<EstateStickerResponseDto> getStickers() {
        List<EstateSticker> estateStickers = estateStickerRepository.findAllByWhereIsDeletedFalse();
        return modelMapper.map(estateStickers, new TypeToken<List<EstateStickerResponseDto>>(){}.getType());
    }
}
