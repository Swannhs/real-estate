package com.fortunatis.staticservice.pojo.request.admin.payment;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class PaymentTagRequestDto implements Serializable {
    @NotNull
    @NotEmpty
    @NotBlank
    String name;
    Boolean isActive;
    String color;
    String borderColor;
}