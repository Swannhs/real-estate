package com.fortunatis.estateservice.service.inventory.impl;

import com.fortunatis.estateservice.entity.inventory.BookingEntity;
import com.fortunatis.estateservice.entity.inventory.LocationEntity;
import com.fortunatis.estateservice.entity.inventory.PropertyEntity;
import com.fortunatis.estateservice.entity.inventory.RatePlanEntity;
import com.fortunatis.estateservice.entity.inventory.UnitEntity;
import com.fortunatis.estateservice.pojo.request.inventory.BookingRequest;
import com.fortunatis.estateservice.pojo.request.inventory.InventorySearchRequest;
import com.fortunatis.estateservice.pojo.request.inventory.PropertyCreateRequest;
import com.fortunatis.estateservice.pojo.request.inventory.RatePlanRequest;
import com.fortunatis.estateservice.pojo.request.inventory.UnitCreateRequest;
import com.fortunatis.estateservice.pojo.response.inventory.BookingResponse;
import com.fortunatis.estateservice.pojo.response.inventory.LocationResponse;
import com.fortunatis.estateservice.pojo.response.inventory.PropertyResponse;
import com.fortunatis.estateservice.pojo.response.inventory.RatePlanResponse;
import com.fortunatis.estateservice.pojo.response.inventory.UnitResponse;
import com.fortunatis.estateservice.repository.inventory.BookingRepository;
import com.fortunatis.estateservice.repository.inventory.PropertyRepository;
import com.fortunatis.estateservice.repository.inventory.UnitRepository;
import com.fortunatis.estateservice.service.UserService;
import com.fortunatis.estateservice.service.inventory.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.util.ObjectUtils;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InventoryServiceImpl implements InventoryService {

    private final PropertyRepository propertyRepository;
    private final UnitRepository unitRepository;
    private final BookingRepository bookingRepository;
    private final UserService userService;

    @Override
    public PropertyResponse createProperty(PropertyCreateRequest request) {
        UUID ownerId = userService.getUserId();

        PropertyEntity property = new PropertyEntity();
        property.setOwnerUserId(ownerId);
        property.setTitle(request.getTitle());
        property.setDescription(request.getDescription());
        property.setPropertyType(request.getPropertyType());
        property.setStatus(ObjectUtils.isEmpty(request.getStatus()) ? "draft" : request.getStatus());
        property.setBedrooms(request.getBedrooms());
        property.setBathrooms(request.getBathrooms());
        property.setAreaSqft(request.getAreaSqft());
        property.setTimezone(ObjectUtils.isEmpty(request.getTimezone()) ? "UTC" : request.getTimezone());

        property.setLocation(mapLocation(request));

        if (!CollectionUtils.isEmpty(request.getUnits())) {
            for (UnitCreateRequest unitRequest : request.getUnits()) {
                UnitEntity unit = mapUnit(unitRequest, property);
                property.getUnits().add(unit);
            }
        }

        PropertyEntity saved = propertyRepository.save(property);
        return mapPropertyResponse(saved);
    }

    @Override
    public PropertyResponse getProperty(UUID propertyId) {
        PropertyEntity property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new IllegalArgumentException("Property not found"));
        return mapPropertyResponse(property);
    }

    @Override
    public List<PropertyResponse> searchInventory(InventorySearchRequest request) {
        List<PropertyEntity> properties = propertyRepository.searchInventory(
                request.getCity(), request.getState(), request.getPropertyType());

        List<PropertyResponse> responses = new ArrayList<>();
        for (PropertyEntity property : properties) {
            List<UnitEntity> availableUnits = property.getUnits()
                    .stream()
                    .filter(unit -> isUnitAvailable(unit, request.getCheckIn(), request.getCheckOut()))
                    .filter(unit -> request.getGuests() == null || unit.getCapacity() >= request.getGuests())
                    .collect(Collectors.toList());

            if (CollectionUtils.isEmpty(availableUnits)) {
                continue;
            }
            property.setUnits(availableUnits);
            responses.add(mapPropertyResponse(property));
        }
        return responses;
    }

    @Override
    public BookingResponse createBooking(BookingRequest request) {
        if (request.getCheckIn() == null || request.getCheckOut() == null ||
                !request.getCheckIn().isBefore(request.getCheckOut())) {
            throw new IllegalArgumentException("Invalid check-in/check-out range");
        }

        UnitEntity unit = unitRepository.findById(request.getUnitId())
                .orElseThrow(() -> new IllegalArgumentException("Unit not found"));

        if (!isUnitAvailable(unit, request.getCheckIn(), request.getCheckOut())) {
            throw new IllegalStateException("Unit is not available for the selected dates");
        }

        long nights = ChronoUnit.DAYS.between(request.getCheckIn(), request.getCheckOut());
        BigDecimal nightlyRate = unit.getBaseRate();
        if (!CollectionUtils.isEmpty(unit.getRatePlans()) && unit.getRatePlans().get(0).getBaseRate() != null) {
            nightlyRate = unit.getRatePlans().get(0).getBaseRate();
        }

        BigDecimal totalAmount = nightlyRate.multiply(BigDecimal.valueOf(nights));

        BookingEntity booking = new BookingEntity();
        booking.setUnit(unit);
        booking.setUserId(userService.getUserId());
        booking.setCheckIn(request.getCheckIn());
        booking.setCheckOut(request.getCheckOut());
        booking.setGuests(request.getGuests());
        booking.setCurrency(ObjectUtils.isEmpty(request.getCurrency()) ? unit.getCurrency() : request.getCurrency());
        booking.setTotalAmount(totalAmount);
        booking.setCancellationPolicy(request.getCancellationPolicy());

        BookingEntity saved = bookingRepository.save(booking);
        return BookingResponse.builder()
                .bookingId(saved.getId())
                .unitId(saved.getUnit().getId())
                .checkIn(saved.getCheckIn())
                .checkOut(saved.getCheckOut())
                .guests(saved.getGuests())
                .status(saved.getStatus())
                .totalAmount(saved.getTotalAmount())
                .currency(saved.getCurrency())
                .paymentStatus(saved.getPaymentStatus())
                .build();
    }

    private boolean isUnitAvailable(UnitEntity unit, LocalDate checkIn, LocalDate checkOut) {
        if (checkIn == null || checkOut == null) {
            return true;
        }
        return !bookingRepository.existsByUnitIdAndCheckInLessThanAndCheckOutGreaterThan(
                unit.getId(), checkOut, checkIn);
    }

    private LocationEntity mapLocation(PropertyCreateRequest request) {
        if (request.getLocation() == null) {
            throw new IllegalArgumentException("Location is required");
        }
        LocationEntity location = new LocationEntity();
        location.setCountryCode(request.getLocation().getCountryCode());
        location.setState(request.getLocation().getState());
        location.setCity(request.getLocation().getCity());
        location.setPostalCode(request.getLocation().getPostalCode());
        location.setAddressLine1(request.getLocation().getAddressLine1());
        location.setAddressLine2(request.getLocation().getAddressLine2());
        location.setLatitude(request.getLocation().getLatitude());
        location.setLongitude(request.getLocation().getLongitude());
        return location;
    }

    private UnitEntity mapUnit(UnitCreateRequest unitRequest, PropertyEntity property) {
        UnitEntity unit = new UnitEntity();
        unit.setProperty(property);
        unit.setName(unitRequest.getName());
        unit.setCapacity(unitRequest.getCapacity());
        unit.setBaseRate(unitRequest.getBaseRate());
        unit.setCurrency(ObjectUtils.isEmpty(unitRequest.getCurrency()) ? "USD" : unitRequest.getCurrency());
        unit.setAvailabilityStrategy(ObjectUtils.isEmpty(unitRequest.getAvailabilityStrategy()) ?
                "calendar" : unitRequest.getAvailabilityStrategy());

        if (!CollectionUtils.isEmpty(unitRequest.getRatePlans())) {
            for (RatePlanRequest ratePlanRequest : unitRequest.getRatePlans()) {
                RatePlanEntity ratePlan = new RatePlanEntity();
                ratePlan.setUnit(unit);
                ratePlan.setName(ratePlanRequest.getName());
                ratePlan.setMinNights(ratePlanRequest.getMinNights());
                ratePlan.setMaxNights(ratePlanRequest.getMaxNights());
                ratePlan.setAdvanceBookingMinDays(ratePlanRequest.getAdvanceBookingMinDays());
                ratePlan.setAdvanceBookingMaxDays(ratePlanRequest.getAdvanceBookingMaxDays());
                ratePlan.setBaseRate(ratePlanRequest.getBaseRate());
                ratePlan.setCurrency(ObjectUtils.isEmpty(ratePlanRequest.getCurrency()) ? "USD" : ratePlanRequest.getCurrency());
                ratePlan.setPricingRules(ratePlanRequest.getPricingRules());
                unit.getRatePlans().add(ratePlan);
            }
        }
        return unit;
    }

    private PropertyResponse mapPropertyResponse(PropertyEntity property) {
        LocationResponse location = LocationResponse.builder()
                .countryCode(property.getLocation().getCountryCode())
                .state(property.getLocation().getState())
                .city(property.getLocation().getCity())
                .postalCode(property.getLocation().getPostalCode())
                .addressLine1(property.getLocation().getAddressLine1())
                .addressLine2(property.getLocation().getAddressLine2())
                .latitude(property.getLocation().getLatitude())
                .longitude(property.getLocation().getLongitude())
                .build();

        List<UnitResponse> units = new ArrayList<>();
        if (!CollectionUtils.isEmpty(property.getUnits())) {
            for (UnitEntity unit : property.getUnits()) {
                List<RatePlanResponse> ratePlans = new ArrayList<>();
                if (!CollectionUtils.isEmpty(unit.getRatePlans())) {
                    ratePlans = unit.getRatePlans().stream()
                            .map(ratePlan -> RatePlanResponse.builder()
                                    .id(ratePlan.getId())
                                    .name(ratePlan.getName())
                                    .minNights(ratePlan.getMinNights())
                                    .maxNights(ratePlan.getMaxNights())
                                    .advanceBookingMinDays(ratePlan.getAdvanceBookingMinDays())
                                    .advanceBookingMaxDays(ratePlan.getAdvanceBookingMaxDays())
                                    .baseRate(ratePlan.getBaseRate())
                                    .currency(ratePlan.getCurrency())
                                    .pricingRules(ratePlan.getPricingRules())
                                    .build())
                            .toList();
                }

                units.add(UnitResponse.builder()
                        .id(unit.getId())
                        .name(unit.getName())
                        .capacity(unit.getCapacity())
                        .baseRate(unit.getBaseRate())
                        .currency(unit.getCurrency())
                        .availabilityStrategy(unit.getAvailabilityStrategy())
                        .ratePlans(ratePlans)
                        .build());
            }
        }

        return PropertyResponse.builder()
                .id(property.getId())
                .title(property.getTitle())
                .description(property.getDescription())
                .propertyType(property.getPropertyType())
                .status(property.getStatus())
                .bedrooms(property.getBedrooms())
                .bathrooms(property.getBathrooms())
                .areaSqft(property.getAreaSqft())
                .timezone(property.getTimezone())
                .location(location)
                .units(units)
                .build();
    }
}
