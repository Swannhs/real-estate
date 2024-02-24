package com.fortunatis.userservice.service.impl;

import com.fortunatis.userservice.service.StripeConnectService;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Account;
import com.stripe.param.AccountCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class StripeConnectServiceImpl implements StripeConnectService {
    @Value("${stripe.key.secret}")
    private String secretKey;

    @Override
    public Account createConnectAccount(String email) throws StripeException {
        Stripe.apiKey = secretKey;
        return Account.create(
                AccountCreateParams
                        .builder()
                        .setType(AccountCreateParams.Type.STANDARD)
                        .setEmail(email)
                        .build());
    }

    @Override
    public void deleteConnectAccount(String email) throws StripeException {
        Stripe.apiKey = secretKey;
        Account account = Account.retrieve(email);
        account.delete();
    }

    @Override
    public Account getConnectAccount(String email) throws StripeException {
        Stripe.apiKey = secretKey;
        return Account.retrieve(email);
    }
}
