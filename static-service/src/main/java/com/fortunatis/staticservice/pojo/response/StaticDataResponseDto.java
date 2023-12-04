package com.fortunatis.staticservice.pojo.response;

import com.fortunatis.staticservice.enums.StaticDataType;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.UUID;

@Getter
@Setter
public class StaticDataResponseDto implements Serializable {
    UUID id;
    String keyword;
    String descriptionEn;
    String descriptionDe;
    String descriptionFr;
    String descriptionIt;
    StaticDataType dataType;
}