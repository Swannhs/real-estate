package com.fortunatis.staticservice.pojo.response;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.UUID;

@Getter
@Setter
public class FeaturesResponseDTO implements Serializable {
    private UUID id;
    private String featuresTitle;
    private String featuresTitleDe;
    private String featuresTitleFr;
    private String featuresTitleIt;
}
