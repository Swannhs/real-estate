package com.fortunatis.estateservice.pojo.response.inventory;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.util.UUID;

@Getter
@Builder
public class RatePlanResponse {
    private UUID id;
    private String name;
    private Integer minNights;
    private Integer maxNights;
    private Integer advanceBookingMinDays;
    private Integer advanceBookingMaxDays;
    private BigDecimal baseRate;
    private String currency;
    private String pricingRules;
}
