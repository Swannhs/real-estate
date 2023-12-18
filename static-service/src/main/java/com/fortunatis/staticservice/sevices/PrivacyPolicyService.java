package com.fortunatis.staticservice.sevices;

import com.fortunatis.staticservice.pojo.request.admin.privacy_policy.PrivacyPolicyRequestDto;
import com.fortunatis.staticservice.pojo.response.admin.privacy_policy.PrivacyPolicyResponseDto;

public interface PrivacyPolicyService {
    PrivacyPolicyResponseDto getPrivacyPolicy();
    PrivacyPolicyResponseDto updatePrivacyPolicy(PrivacyPolicyRequestDto privacyPolicyRequestDto);
}
