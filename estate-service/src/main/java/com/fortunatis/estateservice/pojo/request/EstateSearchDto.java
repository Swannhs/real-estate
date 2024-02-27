package com.fortunatis.estateservice.pojo.request;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
public class EstateSearchDto {
    private List<String> estateAdsPurpose;
    private String addressLine1;
    private List<String> estateTypes;
    private Integer priceStart;
    private Integer priceEnd;
    private SearchFilterDto filter;
    private String searchKeywords;
    private List<UUID> estateIds;
}
