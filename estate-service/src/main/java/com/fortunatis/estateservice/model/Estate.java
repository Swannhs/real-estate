package com.fortunatis.estateservice.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fortunatis.estateservice.enums.EstateAmountType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.UpdateTimestamp;

import java.io.Serializable;
import java.util.*;

@Entity
@Table(name = "estate")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Estate implements Serializable {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "id", updatable = false, nullable = false, columnDefinition = "uuid default uuid_generate_v4()")
    private UUID id;

    @Column(name = "estate_advertiser")
    private String estateAdvertiser;

    @Column(name = "estate_type")
    private String estateType;

    @Column(name = "estate_advertise_purpose")
    private String estateAdvertisePurpose;

    @Column(name = "rooms")
    private Double rooms;

    @Column(name = "living_area")
    private Double livingArea;

    @Column(name = "estate_availability_policy")
    private String estateAvailabilityPolicy;

    @Column(name = "estate_will_be_available")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date estateWillBeAvailable;

    @Column(name = "estate_will_be_available_to")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date estateWillBeAvailableTo;

    @Column(name = "estate_price_currency")
    private EstateAmountType estatePriceType;

    @Column(name = "estate_price")
    private Double estatePrice;

    @Column(name = "estate_additional_price")
    private Double estateAdditionalPrice;

    @Column(name = "estate_floor")
    private String estateFloor;

    @Column(name = "estate_number_of_floor")
    private Integer estateNumberOfFloor;

    @Column(name = "estate_lot_area")
    private Double estateLotArea;

    @Column(name = "estate_floor_space")
    private Double estateFloorSpace;

    @Column(name = "estate_room_height")
    private Double estateRoomHeight;

    @Column(name = "estate_year_of_building")
    private Integer estateYearOfBuilding;

    @Column(name = "estate_year_of_renovation")
    private Integer estateYearOfRenovation;

    @Column(name = "video_url")
    private String videoUrl;

    @Column(name = "title")
    private String title;

    @Column(name = "description", columnDefinition = "text")
    private String description;

    @Column(name = "is_active", columnDefinition = "boolean default true")
    private Boolean isActive;

    @Column(name = "is_published", columnDefinition = "boolean default false")
    private Boolean isPublished;

    @Column(name = "is_deleted", columnDefinition = "boolean default false")
    private Boolean isDeleted;

    @Column(name = "creation_date", nullable = false, updatable = false)
    @CreationTimestamp
    private Date creationDate;

    @Column(name = "updated_at")
    @UpdateTimestamp
    private Date lastModified;

    @Column(name = "user_id")
    private String userId;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @ToString.Exclude
    @JoinColumn(name = "estate_contact_id", referencedColumnName = "id", unique = true)
    @JsonManagedReference
    private EstateContact contact;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "location_id", referencedColumnName = "id", unique = true)
    @JsonManagedReference
    @ToString.Exclude
    private EstateLocation location;
//
//    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    @JoinColumn(name = "estate_search_priority_id", columnDefinition = "bigint default 1")
//    @ToString.Exclude
//    private EstateSearchPriority estateSearchPriority;
//
    @Column(name = "country")
    private String country;

    @OneToMany(mappedBy = "galleryEstate", cascade = CascadeType.ALL)
    @JsonManagedReference
    @EqualsAndHashCode.Exclude
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ToString.Exclude
    private List<EstateGallery> estateGalleries = new ArrayList<>();
//
//    @OneToMany(mappedBy = "documentEstate", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    @JsonManagedReference
//    @EqualsAndHashCode.Exclude
//    @ToString.Exclude
//    private List<EstateDocument> estateDocuments = new ArrayList<>();
//
    @ElementCollection
    @CollectionTable(name = "estate_features", joinColumns = @JoinColumn(name = "estate_id"))
    @Column(name = "feature_id")
    private Set<UUID> estateFeatures = new HashSet<>();

    @ElementCollection
    @CollectionTable(name = "estate_stickers", joinColumns = @JoinColumn(name = "estate_id"))
    @Column(name = "sticker")
    @ToString.Exclude
    private Set<UUID> estateStickers = new HashSet<>();
//
//    @PrePersist
//    public void prePersist() {
//        if (ObjectUtils.isEmpty(isPublished)) {
//            setIsPublished(true);
//        }
//    }
}
