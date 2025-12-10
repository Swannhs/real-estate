package com.fortunatis.estateservice.pojo.request.inventory;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
public class UnitCreateRequest {
    private String name;
    private Integer capacity;
    private BigDecimal baseRate;
    private String currency;
    private String availabilityStrategy;
    private List<RatePlanRequest> ratePlans;
}
