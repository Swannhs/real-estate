package com.fortunatis.staticservice.pojo.response;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
public class PaymentPackageResponseDto implements Serializable {
    UUID id;
    String name;
    String description;
    Double price;
    String priceBy;
    Double crossPrice;
    String currency;
    PaymentTagResponseDto paymentTag;
    List<PaymentFeaturesResponseDto> paymentFeatures;
}