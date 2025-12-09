package com.fortunatis.estateservice.pojo.response.inventory;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
@Builder
public class LocationResponse {
    private String countryCode;
    private String state;
    private String city;
    private String postalCode;
    private String addressLine1;
    private String addressLine2;
    private BigDecimal latitude;
    private BigDecimal longitude;
}
