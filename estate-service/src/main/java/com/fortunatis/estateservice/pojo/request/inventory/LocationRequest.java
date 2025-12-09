package com.fortunatis.estateservice.pojo.request.inventory;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class LocationRequest {
    private String countryCode;
    private String state;
    private String city;
    private String postalCode;
    private String addressLine1;
    private String addressLine2;
    private BigDecimal latitude;
    private BigDecimal longitude;
}
