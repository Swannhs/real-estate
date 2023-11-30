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
    private String orderBy;
    private String limit;
    private String offset;
    private Integer page = 0;
    private SearchFilterDto filter;
    private String searchKeywords;
    private List<UUID> estateIds;

    public Integer getPage() {
        if (page <= 0)
            return page;
        return page - 1;
    }
}
