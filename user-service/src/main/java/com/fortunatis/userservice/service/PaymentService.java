package com.fortunatis.userservice.service;

import com.fortunatis.userservice.pojo.request.PaymentRequestDto;
import com.fortunatis.userservice.pojo.response.PaymentAccountCreatedResponseDto;
import com.fortunatis.userservice.pojo.response.PaymentAccountInfoResponseDto;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

public interface PaymentService {
    PaymentIntent createPaymentIntent(PaymentRequestDto paymentRequestDto) throws StripeException;
    Boolean confirmPaymentIntent(String paymentIntentId) throws StripeException;
    PaymentAccountCreatedResponseDto createConnectAccount();
    PaymentAccountInfoResponseDto getConnectAccount(String accountId);
}
