package com.fortunatis.staticservice.pojo.response;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.UUID;

@Getter
@Setter
public class PaymentFeaturesResponseDto implements Serializable {
    UUID id;
    String title;
    Boolean isNew;
}