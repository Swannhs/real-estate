package com.fortunatis.estateservice.pojo.request.inventory;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class RatePlanRequest {
    private String name;
    private Integer minNights;
    private Integer maxNights;
    private Integer advanceBookingMinDays;
    private Integer advanceBookingMaxDays;
    private BigDecimal baseRate;
    private String currency;
    private String pricingRules;
}
