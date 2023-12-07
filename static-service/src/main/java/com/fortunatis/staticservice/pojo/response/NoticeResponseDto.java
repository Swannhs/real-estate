package com.fortunatis.staticservice.pojo.response;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class NoticeResponseDto implements Serializable {
    String descriptionEn;
    String descriptionDe;
    String descriptionFr;
    String descriptionIt;
}
