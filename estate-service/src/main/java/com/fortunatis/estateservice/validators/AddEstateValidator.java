package com.fortunatis.estateservice.validators;

import com.fortunatis.estateservice.pojo.request.EstateAddDto;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.RequiredArgsConstructor;
import org.springframework.util.ObjectUtils;

import java.util.regex.Pattern;

@RequiredArgsConstructor
public class AddEstateValidator implements ConstraintValidator<AddEstateValidation, EstateAddDto> {
    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[A-Za-z0-9+_.-]+@(.+)$");

    @Override
    public boolean isValid(EstateAddDto addPropertyDTO, ConstraintValidatorContext context) {
        boolean isValid = true;
        if(ObjectUtils.isEmpty(addPropertyDTO)){
            validation(context, "Invalid request", "property");
            isValid = false;
        }
        if (addPropertyDTO.getEstateAdvertiser() == null) {
            validation(context, "Advertising as cannot be blank", "estateAdvertiser");
            isValid = false;
        }

        if (addPropertyDTO.getEstateAdvertisePurpose() == null) {
            validation(context, "Property for must be selected", "estateAdvertisePurpose");
            isValid = false;
        }

        if (addPropertyDTO.getEstateType() == null) {
            validation(context, "Estate Type cannot be blank", "estateType");
            isValid = false;
        }

        if (addPropertyDTO.getLocation().getSearchKeywords() == null) {
            validation(context, "Search Keywords cannot be null", "searchKeywords");
            isValid = false;
        }

        if (isEmpty(addPropertyDTO.getLocation().getZipCode())) {
            validation(context, "Zip code cannot be blank", "zipCode");
            isValid = false;
        }

        if (addPropertyDTO.getEstatePrice() == null || addPropertyDTO.getEstatePrice() <= 0) {
            validation(context, "Price must be provided and positive", "estatePrice");
            isValid = false;
        }

        if (isEmpty(addPropertyDTO.getContact().getName())) {
            validation(context, "Contact name cannot be blank", "contact.contactName");
            isValid = false;
        }

        if (!isValidEmail(addPropertyDTO.getContact().getEmail())) {
            validation(context, "Invalid email format", "contact.contactEmail");
            isValid = false;
        }

        return isValid;
    }

    private boolean isEmpty(String value) {
        return value == null || value.trim().isEmpty();
    }

    private boolean isValidEmail(String email) {
        return email != null && EMAIL_PATTERN.matcher(email).matches();
    }

    private void validation(ConstraintValidatorContext context, String message, String property) {
        context.disableDefaultConstraintViolation();
        ConstraintValidatorContext.ConstraintViolationBuilder violationBuilder = context.buildConstraintViolationWithTemplate(message);
        String[] propertyParts = property.split("\\.");
        for (String part : propertyParts) {
            violationBuilder.addPropertyNode(part);
        }
        violationBuilder.addConstraintViolation();
    }
}