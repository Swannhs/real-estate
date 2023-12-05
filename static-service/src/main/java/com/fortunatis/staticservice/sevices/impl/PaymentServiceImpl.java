package com.fortunatis.staticservice.sevices.impl;

import com.fortunatis.staticservice.model.PaymentFeature;
import com.fortunatis.staticservice.model.PaymentPackage;
import com.fortunatis.staticservice.model.PaymentTag;
import com.fortunatis.staticservice.pojo.request.admin.PaymentTagRequestDto;
import com.fortunatis.staticservice.pojo.request.admin.payment.PaymentFeatureRequestDto;
import com.fortunatis.staticservice.pojo.request.admin.payment.PaymentPackageRequestDto;
import com.fortunatis.staticservice.pojo.response.admin.payment.PaymentFeaturesResponseDto;
import com.fortunatis.staticservice.pojo.response.admin.payment.PaymentPackageResponseDto;
import com.fortunatis.staticservice.pojo.response.admin.payment.PaymentTagResponseDto;
import com.fortunatis.staticservice.repository.PaymentFeaturesRepository;
import com.fortunatis.staticservice.repository.PaymentPackageRepository;
import com.fortunatis.staticservice.repository.PaymentTagRepository;
import com.fortunatis.staticservice.sevices.PaymentService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class PaymentServiceImpl implements PaymentService {
    private final ModelMapper modelMapper;
    private final PaymentPackageRepository paymentPackageRepository;
    private final PaymentFeaturesRepository paymentFeaturesRepository;
    private final PaymentTagRepository paymentTagRepository;

    @Override
    public PaymentPackageResponseDto getPaymentPackageById(UUID id) {
        Optional<PaymentPackage> paymentPackageOptional = paymentPackageRepository.findById(id);
        if (paymentPackageOptional.isEmpty()) {
            throw new EntityNotFoundException("PaymentPackage not found for ID: " + id);
        }
        return modelMapper.map(paymentPackageOptional.get(), PaymentPackageResponseDto.class);
    }

    @Override
    public List<PaymentPackageResponseDto> getPaymentPackages() {
        List<PaymentPackage> paymentPackages = paymentPackageRepository.findAll();
        return paymentPackages.stream().map(paymentPackage -> modelMapper.map(paymentPackage, PaymentPackageResponseDto.class)).toList();
    }

    @Override
    public PaymentPackageResponseDto createPaymentPackage(PaymentPackageRequestDto paymentPackageRequestDto) {
        PaymentPackage paymentPackage = modelMapper.map(paymentPackageRequestDto, PaymentPackage.class);
        paymentPackageRepository.save(paymentPackage);
        return modelMapper.map(paymentPackage, PaymentPackageResponseDto.class);
    }

    @Override
    public PaymentPackageResponseDto updatePaymentPackage(UUID paymentPackageId, PaymentPackageRequestDto paymentPackageRequestDto) {
        Optional<PaymentPackage> paymentPackageOptional = paymentPackageRepository.findById(paymentPackageId);
        if (paymentPackageOptional.isEmpty()) {
            throw new EntityNotFoundException("PaymentPackage not found for ID: " + paymentPackageId);
        }
        PaymentPackage paymentPackage = paymentPackageOptional.get();
        modelMapper.map(paymentPackageRequestDto, paymentPackage);
        return modelMapper.map(paymentPackageRepository.save(paymentPackage), PaymentPackageResponseDto.class);
    }

    @Override
    public PaymentFeaturesResponseDto getPaymentFeature(UUID id) {
        Optional<PaymentFeature> paymentFeatureOptional = paymentFeaturesRepository.findById(id);
        if (paymentFeatureOptional.isEmpty()) {
            throw new EntityNotFoundException("PaymentFeature not found for ID: " + id);
        }
        return modelMapper.map(paymentFeatureOptional.get(), PaymentFeaturesResponseDto.class);
    }

    @Override
    public List<PaymentFeaturesResponseDto> getPaymentFeatures() {
        List<PaymentFeature> paymentFeatures = paymentFeaturesRepository.findAll();
        return paymentFeatures.stream().map(paymentFeature -> modelMapper.map(paymentFeature, PaymentFeaturesResponseDto.class)).toList();
    }

    @Override
    public PaymentFeaturesResponseDto createPaymentFeature(PaymentFeatureRequestDto paymentFeaturesRequestDto) {
        PaymentFeature paymentFeature = modelMapper.map(paymentFeaturesRequestDto, PaymentFeature.class);
        paymentFeaturesRepository.save(paymentFeature);
        return modelMapper.map(paymentFeature, PaymentFeaturesResponseDto.class);
    }

    @Override
    public PaymentFeaturesResponseDto updatePaymentFeature(UUID paymentFeatureId, PaymentFeatureRequestDto paymentFeaturesRequestDto) {
        Optional<PaymentFeature> paymentFeatureOptional = paymentFeaturesRepository.findById(paymentFeatureId);
        if (paymentFeatureOptional.isEmpty()) {
            throw new EntityNotFoundException("PaymentFeature not found for ID: " + paymentFeatureId);
        }
        PaymentFeature paymentFeature = paymentFeatureOptional.get();
        modelMapper.map(paymentFeaturesRequestDto, paymentFeature);
        return modelMapper.map(paymentFeaturesRepository.save(paymentFeature), PaymentFeaturesResponseDto.class);
    }

    @Override
    public PaymentTagResponseDto getPaymentTag(UUID id) {
        Optional<PaymentTag> paymentTagOptional = paymentTagRepository.findById(id);
        if (paymentTagOptional.isEmpty()) {
            throw new EntityNotFoundException("PaymentTag not found for ID: " + id);
        }
        return modelMapper.map(paymentTagOptional.get(), PaymentTagResponseDto.class);
    }

    @Override
    public List<PaymentTagResponseDto> getPaymentTags() {
        List<PaymentTag> paymentTags = paymentTagRepository.findAll();
        return paymentTags.stream().map(paymentTag -> modelMapper.map(paymentTag, PaymentTagResponseDto.class)).toList();
    }

    @Override
    public PaymentTagResponseDto createPaymentTag(PaymentTagRequestDto paymentTagRequestDto) {
        PaymentTag paymentTag = modelMapper.map(paymentTagRequestDto, PaymentTag.class);
        paymentTagRepository.save(paymentTag);
        return modelMapper.map(paymentTag, PaymentTagResponseDto.class);
    }

    @Override
    public PaymentTagResponseDto updatePaymentTag(UUID paymentTagId, PaymentTagRequestDto paymentTagRequestDto) {
        Optional<PaymentTag> paymentTagOptional = paymentTagRepository.findById(paymentTagId);
        if (paymentTagOptional.isEmpty()) {
            throw new EntityNotFoundException("PaymentTag not found for ID: " + paymentTagId);
        }
        PaymentTag paymentTag = paymentTagOptional.get();
        modelMapper.map(paymentTagRequestDto, paymentTag);
        return modelMapper.map(paymentTagRepository.save(paymentTag), PaymentTagResponseDto.class);
    }
}
