package com.fortunatis.estateservice.pojo.response.staticService;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.UUID;

@Getter
@Setter
public class FeaturesResponseDto implements Serializable {
    UUID id;
    String featuresTitle;
    String featuresTitleDe;
    String featuresTitleFr;
    String featuresTitleIt;
}
