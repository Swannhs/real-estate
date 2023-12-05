package com.fortunatis.staticservice.sevices;

import com.fortunatis.staticservice.pojo.request.admin.PaymentTagRequestDto;
import com.fortunatis.staticservice.pojo.request.admin.payment.PaymentFeatureRequestDto;
import com.fortunatis.staticservice.pojo.request.admin.payment.PaymentPackageRequestDto;
import com.fortunatis.staticservice.pojo.response.admin.payment.PaymentFeaturesResponseDto;
import com.fortunatis.staticservice.pojo.response.admin.payment.PaymentPackageResponseDto;
import com.fortunatis.staticservice.pojo.response.admin.payment.PaymentTagResponseDto;

import java.util.List;
import java.util.UUID;

public interface PaymentService {
    PaymentPackageResponseDto getPaymentPackageById(UUID id);
    List<PaymentPackageResponseDto> getPaymentPackages();
    PaymentPackageResponseDto createPaymentPackage(PaymentPackageRequestDto paymentPackageRequestDto);
    PaymentPackageResponseDto updatePaymentPackage(UUID paymentPackageId, PaymentPackageRequestDto paymentPackageRequestDto);
    PaymentFeaturesResponseDto getPaymentFeature(UUID id);
    List<PaymentFeaturesResponseDto> getPaymentFeatures();
    PaymentFeaturesResponseDto createPaymentFeature(PaymentFeatureRequestDto paymentFeaturesRequestDto);
    PaymentFeaturesResponseDto updatePaymentFeature(UUID paymentFeatureId, PaymentFeatureRequestDto paymentFeaturesRequestDto);
    PaymentTagResponseDto getPaymentTag(UUID id);
    List<PaymentTagResponseDto> getPaymentTags();
    PaymentTagResponseDto createPaymentTag(PaymentTagRequestDto paymentTagRequestDto);
    PaymentTagResponseDto updatePaymentTag(UUID paymentTagId, PaymentTagRequestDto paymentTagRequestDto);
}
