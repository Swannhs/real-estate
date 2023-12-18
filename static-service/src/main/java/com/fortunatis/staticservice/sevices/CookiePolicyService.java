package com.fortunatis.staticservice.sevices;

import com.fortunatis.staticservice.pojo.request.admin.cookie_policy.CookiePolicyRequestDto;
import com.fortunatis.staticservice.pojo.response.admin.cookie_policy.CookiePolicyResponseDto;

public interface CookiePolicyService {
    CookiePolicyResponseDto getCookiePolicy();
    CookiePolicyResponseDto updateCookiePolicy(CookiePolicyRequestDto cookiePolicyRequestDto);
}
