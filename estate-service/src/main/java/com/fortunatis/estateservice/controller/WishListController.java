package com.fortunatis.estateservice.controller;

import com.fortunatis.estateservice.pojo.request.WishListRequestDto;
import com.fortunatis.estateservice.service.WishListService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/v1/wishlist")
@Slf4j
@RequiredArgsConstructor
@Tag(name = "Wishlist", description = "REST Resource for Wishlist")
public class WishListController {
    private final WishListService wishListService;

    @GetMapping
    @Operation(summary = "Get all wishlist estates by user")
    public ResponseEntity<?> getWishlistEstatesByUser(
            @RequestParam(name = "page", required = false, defaultValue = "1") Integer page,
            @RequestParam(name = "size", required = false, defaultValue = "10") Integer size,
            @RequestParam(name = "orderBy", required = false, defaultValue = "createdAt") String orderBy,
            @RequestParam(name = "desc", required = false, defaultValue = "desc") String desc
    ) {
        return ResponseEntity.ok(wishListService.getWishlistEstatesByUser(page, size, orderBy, desc));
    }

    @GetMapping("/ids")
    @Operation(summary = "Get all wishlist ids by user")
    public ResponseEntity<?> getWishlistEstateIdsByUser() {
        return ResponseEntity.ok(wishListService.getWishlistEstateIdsByUser());
    }

    @PostMapping
    @Operation(summary = "Add estate to wishlist")
    public ResponseEntity<?> addEstateToWishList(@RequestBody WishListRequestDto wishListRequestDto) {
        wishListService.addEstateToWishList(wishListRequestDto);
        return ResponseEntity.ok("Estate added to wishlist");
    }

    @DeleteMapping("/{estateId}")
    @Operation(summary = "Delete estate from wishlist")
    public ResponseEntity<?> deleteEstateFromWishList(@PathVariable UUID estateId) {
        wishListService.deleteEstateFromWishList(estateId);
        return ResponseEntity.ok("Estate deleted from wishlist");
    }
}
