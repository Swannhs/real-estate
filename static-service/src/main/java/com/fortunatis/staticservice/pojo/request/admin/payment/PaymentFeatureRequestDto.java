package com.fortunatis.staticservice.pojo.request.admin.payment;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class PaymentFeatureRequestDto implements Serializable {
    @NotNull(message = "Title is required")
    @NotEmpty(message = "Title is required")
    @NotBlank(message = "Title is required")
    String title;
    Boolean isNew;
    @NotNull(message = "Status is required")
    Boolean isActive;
}