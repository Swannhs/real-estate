package com.fortunatis.estateservice.pojo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@JsonIgnoreProperties(ignoreUnknown = true)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Meta {
    private Long total;
    private Integer perPage;
    private String orderBy;
    private Integer totalPage;
    private Integer currentPage;
    private Integer nextPage;
    private Integer previousPage;
}
