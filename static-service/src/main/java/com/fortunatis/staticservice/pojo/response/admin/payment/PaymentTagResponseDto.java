package com.fortunatis.staticservice.pojo.response.admin.payment;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.UUID;

@Getter
@Setter
public class PaymentTagResponseDto implements Serializable {
    UUID id;
    String name;
    Boolean isActive;
    String color;
    String borderColor;
}