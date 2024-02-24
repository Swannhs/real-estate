package com.fortunatis.staticservice.sevices.impl;

import com.fortunatis.staticservice.enums.StaticDataType;
import com.fortunatis.staticservice.model.StaticData;
import com.fortunatis.staticservice.pojo.request.admin.cookie_policy.CookiePolicyRequestDto;
import com.fortunatis.staticservice.pojo.response.UserResponseDto;
import com.fortunatis.staticservice.pojo.response.admin.cookie_policy.CookiePolicyResponseDto;
import com.fortunatis.staticservice.repository.StaticDataRepository;
import com.fortunatis.staticservice.sevices.CookiePolicyService;
import com.fortunatis.staticservice.sevices.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.ObjectUtils;
import org.modelmapper.ModelMapper;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class CookiePolicyServiceImpl implements CookiePolicyService {
    private final ModelMapper modelMapper;
    private final UserService userService;
    private final StaticDataRepository staticDataRepository;

    @Override
    public CookiePolicyResponseDto getCookiePolicy() {
        StaticData staticData = staticDataRepository.findFirstByDataTypeAndIsDeletedFalse(StaticDataType.COOKIE_POLICY);
        CookiePolicyResponseDto cookiePolicyResponseDto = modelMapper.map(staticData, CookiePolicyResponseDto.class);
        if (!ObjectUtils.isEmpty(cookiePolicyResponseDto.getUpdatedBy())) {
            UserResponseDto userResponseDto = userService.getUserDetailsByUserId(cookiePolicyResponseDto.getUpdatedBy());
            if (!ObjectUtils.isEmpty(userResponseDto)) {
                cookiePolicyResponseDto.setUpdatedBy(userResponseDto.getFirstName() + " " + userResponseDto.getLastName());
            }
        }
        return cookiePolicyResponseDto;
    }

    @Override
    @CacheEvict(value = "cookie_policy", key = "'cookie_policy'")
    @CachePut(value = "cookie_policy", key = "'cookie_policy'")
    public CookiePolicyResponseDto updateCookiePolicy(CookiePolicyRequestDto cookiePolicyRequestDto) {
        StaticData staticData = staticDataRepository.findFirstByDataTypeAndIsDeletedFalse(StaticDataType.COOKIE_POLICY);
        if (ObjectUtils.isEmpty(staticData)) {
            staticData = new StaticData();
            staticData.setDataType(StaticDataType.COOKIE_POLICY);
        }
        try {
            staticData.setUpdatedBy(userService.getUserId());
            modelMapper.map(cookiePolicyRequestDto, staticData);
            StaticData saved = staticDataRepository.save(staticData);
            return modelMapper.map(saved, CookiePolicyResponseDto.class);
        } catch (Exception e) {
            log.error("Error while updating cookie policy", e);
            throw new RuntimeException("Error while updating cookie policy", e);
        }
    }
}
