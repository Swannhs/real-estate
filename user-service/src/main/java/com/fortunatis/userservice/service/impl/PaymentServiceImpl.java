package com.fortunatis.userservice.service.impl;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.fortunatis.userservice.model.PaymentSetting;
import com.fortunatis.userservice.pojo.request.PaymentRequestDto;
import com.fortunatis.userservice.pojo.response.PaymentAccountCreatedResponseDto;
import com.fortunatis.userservice.pojo.response.PaymentAccountInfoResponseDto;
import com.fortunatis.userservice.repository.PaymentSettingRepository;
import com.fortunatis.userservice.service.KeycloakService;
import com.fortunatis.userservice.service.PaymentService;
import com.fortunatis.userservice.service.StripeConnectService;
import com.fortunatis.userservice.service.UserService;
import com.stripe.exception.StripeException;
import com.stripe.model.Account;
import com.stripe.model.PaymentIntent;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {
    private final ModelMapper modelMapper;
    private final UserService userService;
    private final KeycloakService keycloakService;
    private final StripeConnectService stripeConnectService;
    private final PaymentSettingRepository paymentSettingRepository;

    @Override
    public PaymentIntent createPaymentIntent(PaymentRequestDto paymentRequestDto) throws StripeException {
        return null;
    }

    @Override
    public Boolean confirmPaymentIntent(String paymentIntentId) throws StripeException {
        return null;
    }

    @Override
    public PaymentAccountCreatedResponseDto createConnectAccount() {
        try {
            UUID userId = userService.getUserId();
            Account account = stripeConnectService.createConnectAccount(keycloakService.getUserById(userId).getEmail());
            PaymentSetting paymentSetting = new PaymentSetting();
            paymentSetting.setUserId(userId);

            ObjectMapper objectMapper = new ObjectMapper();
            String accountJsonString = objectMapper.writeValueAsString(account);
            ObjectNode paymentDetailsJson = objectMapper.readValue(accountJsonString, ObjectNode.class);

            paymentSetting.setPaymentDetails(paymentDetailsJson);
            return modelMapper.map(paymentSettingRepository.save(paymentSetting), PaymentAccountCreatedResponseDto.class);
        } catch (StripeException | JsonProcessingException exception) {
            throw new RuntimeException(exception);
        }
    }


    @Override
    public PaymentAccountInfoResponseDto getConnectAccount(String accountId) {
        try {
            return modelMapper.map(stripeConnectService.getConnectAccount(accountId), PaymentAccountInfoResponseDto.class);
        } catch (StripeException stripeException) {
            throw new RuntimeException(stripeException);
        }
    }
}
