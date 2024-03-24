package com.fortunatis.userservice.pojo.request;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class PaymentRequestDto implements Serializable {
    Long amount;
    String currency;
    String token;
}
