package com.fortunatis.staticservice.sevices.impl;

import com.fortunatis.staticservice.enums.StaticDataType;
import com.fortunatis.staticservice.model.GeneralTermsAndConditions;
import com.fortunatis.staticservice.model.LegalNotice;
import com.fortunatis.staticservice.model.StaticData;
import com.fortunatis.staticservice.pojo.request.admin.staticData.StaticDataRequestDto;
import com.fortunatis.staticservice.repository.GeneralTermsAndConditionsRepository;
import com.fortunatis.staticservice.repository.LegalNoticeRepository;
import com.fortunatis.staticservice.repository.StaticDataRepository;
import com.fortunatis.staticservice.sevices.NoticeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class NoticeServiceImpl implements NoticeService {
    private final ModelMapper modelMapper;
    private final StaticDataRepository staticDataRepository;
    private final GeneralTermsAndConditionsRepository generalTermsAndConditionsRepository;
    private final LegalNoticeRepository legalNoticeRepository;

    @Override
    public GeneralTermsAndConditions getGeneralTermsAndConditions() {
        return generalTermsAndConditionsRepository.findFirstByOrderByIdDesc();
    }

    @Override
    public StaticData getPrivacyPolicy() {
        return staticDataRepository.findFirstByDataTypeAndIsDeletedFalse(StaticDataType.PRIVACY_POLICY);
    }

    @Override
    public LegalNotice getLegalNotice() {
        return legalNoticeRepository.findFirstByOrderByIdDesc();
    }

    @Override
    public StaticData getCookiePolicy() {
        return staticDataRepository.findFirstByDataTypeAndIsDeletedFalse(StaticDataType.COOKIE_POLICY);
    }

    @Override
    public StaticData createOrUpdateStaticData(StaticDataRequestDto staticDataRequestDto) {
        Optional<StaticData> staticDataOptional = staticDataRepository.findById(staticDataRequestDto.getId());
        StaticData staticData;
        if (staticDataOptional.isPresent()) {
            staticData = staticDataOptional.get();
            modelMapper.map(staticDataRequestDto, staticDataOptional.get());
        } else {
            staticData = modelMapper.map(staticDataRequestDto, StaticData.class);
        }
        return staticDataRepository.save(staticData);
    }
}
