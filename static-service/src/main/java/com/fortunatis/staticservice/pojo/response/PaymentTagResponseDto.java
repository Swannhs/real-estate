package com.fortunatis.staticservice.pojo.response;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.UUID;

@Getter
@Setter
public class PaymentTagResponseDto implements Serializable {
    UUID id;
    String name;
    String color;
    String borderColor;
}