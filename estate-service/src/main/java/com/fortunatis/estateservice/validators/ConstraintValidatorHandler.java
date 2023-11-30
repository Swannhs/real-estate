package com.fortunatis.estateservice.validators;

import jakarta.validation.ConstraintValidatorContext;
import org.springframework.util.ObjectUtils;

public class ConstraintValidatorHandler {
    public void overrideViolationMessage(ConstraintValidatorContext context, String message) {
        if (!ObjectUtils.isEmpty(context)) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(message).addConstraintViolation();
        }
    }
}
