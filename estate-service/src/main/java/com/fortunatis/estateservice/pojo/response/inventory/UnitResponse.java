package com.fortunatis.estateservice.pojo.response.inventory;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Getter
@Builder
public class UnitResponse {
    private UUID id;
    private String name;
    private Integer capacity;
    private BigDecimal baseRate;
    private String currency;
    private String availabilityStrategy;
    private List<RatePlanResponse> ratePlans;
}
