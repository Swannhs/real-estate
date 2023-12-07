package com.fortunatis.staticservice.sevices;

import com.fortunatis.staticservice.model.GeneralTermsAndConditions;
import com.fortunatis.staticservice.model.LegalNotice;
import com.fortunatis.staticservice.model.StaticData;
import com.fortunatis.staticservice.pojo.request.admin.staticData.StaticDataRequestDto;

public interface NoticeService {
    GeneralTermsAndConditions getGeneralTermsAndConditions();
    StaticData getPrivacyPolicy();
    LegalNotice getLegalNotice();
    StaticData getCookiePolicy();
    StaticData createOrUpdateStaticData(StaticDataRequestDto staticDataRequestDto);
}
