package com.fortunatis.userservice.service;

import com.stripe.exception.StripeException;
import com.stripe.model.Account;

public interface StripeConnectService {
    Account createConnectAccount(String email) throws StripeException;
    void deleteConnectAccount(String email) throws StripeException;
    Account getConnectAccount(String email) throws StripeException;
}
