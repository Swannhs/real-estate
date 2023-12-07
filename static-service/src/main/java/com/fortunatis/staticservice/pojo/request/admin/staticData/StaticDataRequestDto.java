package com.fortunatis.staticservice.pojo.request.admin.staticData;

import com.fortunatis.staticservice.enums.StaticDataType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.UUID;

@Getter
@Setter
public class StaticDataRequestDto implements Serializable {
    UUID id;
    @NotNull
    @NotEmpty
    @NotBlank
    String keyword;
    String descriptionEn;
    String descriptionDe;
    String descriptionFr;
    String descriptionIt;
    StaticDataType dataType;
}