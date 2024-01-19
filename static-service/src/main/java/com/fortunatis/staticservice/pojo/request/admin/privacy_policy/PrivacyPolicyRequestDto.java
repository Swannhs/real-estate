package com.fortunatis.staticservice.pojo.request.admin.privacy_policy;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class PrivacyPolicyRequestDto implements Serializable {
    @NotNull(message = "Description English is required")
    @NotEmpty(message = "Description English is required")
    @NotBlank(message = "Description English is required")
    String descriptionEn;
    @NotNull(message = "Description French is required")
    @NotEmpty(message = "Description French is required")
    @NotBlank(message = "Description French is required")
    String descriptionDe;
    @NotNull(message = "Description Italian is required")
    @NotEmpty(message = "Description Italian is required")
    @NotBlank(message = "Description Italian is required")
    String descriptionFr;
    @NotNull(message = "Description Italian is required")
    @NotEmpty(message = "Description Italian is required")
    @NotBlank(message = "Description Italian is required")
    String descriptionIt;
}