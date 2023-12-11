package com.fortunatis.staticservice.sevices.impl;

import com.fortunatis.staticservice.enums.StaticDataType;
import com.fortunatis.staticservice.model.StaticData;
import com.fortunatis.staticservice.pojo.response.admin.privacy_policy.PrivacyPolicyResponseDto;
import com.fortunatis.staticservice.repository.StaticDataRepository;
import com.fortunatis.staticservice.security.service.UserService;
import com.fortunatis.staticservice.sevices.PrivacyPolicyService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PrivacyPolicyServiceImpl implements PrivacyPolicyService {
    private final ModelMapper modelMapper;
    private final UserService userService;
    private final StaticDataRepository staticDataRepository;

    @Override
    public PrivacyPolicyResponseDto getPrivacyPolicy() {
        StaticData staticData = staticDataRepository.findFirstByDataTypeAndIsDeletedFalse(StaticDataType.PRIVACY_POLICY);
        PrivacyPolicyResponseDto privacyPolicyResponseDto = modelMapper.map(staticData, PrivacyPolicyResponseDto.class);
//        privacyPolicyResponseDto.setUpdatedBy();
        return null;
    }
}
