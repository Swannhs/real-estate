package com.fortunatis.staticservice.sevices.impl;

import com.fortunatis.staticservice.enums.StaticDataType;
import com.fortunatis.staticservice.model.StaticData;
import com.fortunatis.staticservice.pojo.request.admin.privacy_policy.PrivacyPolicyRequestDto;
import com.fortunatis.staticservice.pojo.response.UserResponseDto;
import com.fortunatis.staticservice.pojo.response.admin.privacy_policy.PrivacyPolicyResponseDto;
import com.fortunatis.staticservice.repository.StaticDataRepository;
import com.fortunatis.staticservice.sevices.UserService;
import com.fortunatis.staticservice.sevices.PrivacyPolicyService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.ObjectUtils;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class PrivacyPolicyServiceImpl implements PrivacyPolicyService {
    private final ModelMapper modelMapper;
    private final UserService userService;
    private final StaticDataRepository staticDataRepository;

    @Override
    public PrivacyPolicyResponseDto getPrivacyPolicy() {
        StaticData staticData = staticDataRepository.findFirstByDataTypeAndIsDeletedFalse(StaticDataType.PRIVACY_POLICY);
        PrivacyPolicyResponseDto privacyPolicyResponseDto = modelMapper.map(staticData, PrivacyPolicyResponseDto.class);
        if (!ObjectUtils.isEmpty(privacyPolicyResponseDto.getUpdatedBy())) {
            UserResponseDto userResponseDto = userService.getUserDetailsByUserId(privacyPolicyResponseDto.getUpdatedBy());
            if (!ObjectUtils.isEmpty(userResponseDto)) {
                privacyPolicyResponseDto.setUpdatedBy(userResponseDto.getFirstName() + " " + userResponseDto.getLastName());
            }
        }
        return privacyPolicyResponseDto;
    }

    @Override
    public PrivacyPolicyResponseDto updatePrivacyPolicy(PrivacyPolicyRequestDto privacyPolicyRequestDto) {
        StaticData staticData = staticDataRepository.findFirstByDataTypeAndIsDeletedFalse(StaticDataType.PRIVACY_POLICY);
        if (ObjectUtils.isEmpty(staticData)) {
            staticData = new StaticData();
            staticData.setDataType(StaticDataType.PRIVACY_POLICY);
        }
        try {
            staticData.setUpdatedBy(userService.getUserId());
            modelMapper.map(privacyPolicyRequestDto, staticData);
            StaticData saved = staticDataRepository.save(staticData);
            return modelMapper.map(saved, PrivacyPolicyResponseDto.class);
        } catch (Exception e) {
            log.error("Error while updating privacy policy", e);
            throw new RuntimeException("Error while updating privacy policy", e);
        }
    }
}
