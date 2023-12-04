//package com.fortunatis.estateservice.validators;
//
//import com.fortunatis.estateservice.repository.EstateRepository;
//import jakarta.validation.ConstraintValidatorContext;
//import lombok.RequiredArgsConstructor;
//
//import java.util.regex.Pattern;
//
//@RequiredArgsConstructor
//public class ContactPropertyOwnerValidator implements ConstraintValidator<ContactPropertyOwnerValidation, ContactAdvertiserEmailDTO> {
//    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$", Pattern.CASE_INSENSITIVE);
//    private final EstateRepository estateRepository;
//
//    @Override
//    public boolean isValid(ContactAdvertiserEmailDTO contactAdvertiserEmailDTO, ConstraintValidatorContext context) {
//        boolean isValid = true;
//        if (isEmpty(contactAdvertiserEmailDTO.getFirstName())) {
//            validation(context, "First name cannot be empty", "firstName");
//            isValid = false;
//        }
//        if (isValidEmail(contactAdvertiserEmailDTO.getSenderEmail())) {
//            validation(context, "Invalid email address", "email");
//            isValid = false;
//        }
//        if (isEmpty(contactAdvertiserEmailDTO.getZipCode())) {
//            validation(context, "Zip code cannot be blank", "zipCode");
//            isValid = false;
//        }
//        if (isEmpty(contactAdvertiserEmailDTO.getCity())) {
//            validation(context, "City cannot be blank", "city");
//            isValid = false;
//        }
//        if (isEmpty(contactAdvertiserEmailDTO.getMessage())) {
//            validation(context, "Message cannot be blank", "message");
//            isValid = false;
//        }
//        if (isEmpty(contactAdvertiserEmailDTO.getEstateId().toString()) || !estateRepository.existsById(contactAdvertiserEmailDTO.getEstateId())) {
//            validation(context, "Property does not exist", "estateId");
//            isValid = false;
//        }
//
//        return isValid;
//    }
//    private boolean isEmpty(String value) {
//        return value == null || value.trim().isEmpty();
//    }
//
//    private boolean isValidEmail(String email) {
//        return email != null && EMAIL_PATTERN.matcher(email).matches();
//    }
//
//    private void validation(ConstraintValidatorContext context, String message, String field) {
//        context.disableDefaultConstraintViolation();
//        context.buildConstraintViolationWithTemplate(message)
//                .addPropertyNode(field)
//                .addConstraintViolation();
//    }
//}
