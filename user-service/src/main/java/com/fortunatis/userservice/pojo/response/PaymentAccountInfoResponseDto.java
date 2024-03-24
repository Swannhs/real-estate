package com.fortunatis.userservice.pojo.response;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class PaymentAccountInfoResponseDto implements Serializable {
    String id;
    String email;
    String country;
    String statementDescriptor;
    Boolean chargesEnabled;
    Boolean transfersEnabled;
    String defaultCurrency;
}
