package com.fortunatis.staticservice.pojo.request.admin.payment;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class PaymentPackageRequestDto implements Serializable {
    @NotNull
    @NotEmpty
    @NotBlank
    String name;
    String description;
    @NotNull
    @PositiveOrZero
    Double price;
    String priceBy;
    Double crossPrice;
    Boolean isActive;
    String currency;
}