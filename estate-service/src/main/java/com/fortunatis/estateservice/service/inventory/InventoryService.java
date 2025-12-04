package com.fortunatis.estateservice.service.inventory;

import com.fortunatis.estateservice.pojo.request.inventory.BookingRequest;
import com.fortunatis.estateservice.pojo.request.inventory.InventorySearchRequest;
import com.fortunatis.estateservice.pojo.request.inventory.PropertyCreateRequest;
import com.fortunatis.estateservice.pojo.response.inventory.BookingResponse;
import com.fortunatis.estateservice.pojo.response.inventory.PropertyResponse;

import java.util.List;
import java.util.UUID;

public interface InventoryService {
    PropertyResponse createProperty(PropertyCreateRequest request);

    PropertyResponse getProperty(UUID propertyId);

    List<PropertyResponse> searchInventory(InventorySearchRequest request);

    BookingResponse createBooking(BookingRequest request);
}
