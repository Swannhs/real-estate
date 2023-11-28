package com.fortunatis.estateservice.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "estate")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Estate {
    @Id
    private UUID id = UUID.randomUUID();

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

//    @Column(name = "estate_price_currency")
//    private EstateAmountType estatePriceType;

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

//    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    @ToString.Exclude
//    @JoinColumn(name = "estate_contact_id", referencedColumnName = "id", unique = true)
//    @JsonManagedReference
//    private EstateContact contact;
//
//    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    @JoinColumn(name = "location_id", referencedColumnName = "id", unique = true)
//    @JsonManagedReference
//    @ToString.Exclude
//    private EstateLocation location;
//
//
//
//    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    @JoinColumn(name = "estate_search_priority_id", columnDefinition = "bigint default 1")
//    @ToString.Exclude
//    private EstateSearchPriority estateSearchPriority;
//
//    @OneToOne
//    @JoinColumn(name = "country_id")
//    private Country country;
//
//    @OneToMany(mappedBy = "galleryEstate", cascade = CascadeType.ALL)
//    @JsonManagedReference
//    @EqualsAndHashCode.Exclude
//    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
//    @LazyCollection(org.hibernate.annotations.LazyCollectionOption.FALSE)
//    @ToString.Exclude
//    private List<EstateGallery> estateGalleries = new ArrayList<>();
//
//    @OneToMany(mappedBy = "documentEstate", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    @JsonManagedReference
//    @EqualsAndHashCode.Exclude
//    @ToString.Exclude
//    private List<EstateDocument> estateDocuments = new ArrayList<>();
//
//    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
//    @JoinTable(name = "estate_features",
//            inverseJoinColumns = {@JoinColumn(name = "feature_id")})
//    @JsonManagedReference
//    @ToString.Exclude
//    private List<Features> estateFeatures = new ArrayList<>();
//
//    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
//    @JoinTable(name = "estate_stickers",
//            inverseJoinColumns = {@JoinColumn(name = "sticker_id")})
//    @JsonManagedReference
//    @ToString.Exclude
//    private List<EstateSticker> estateStickers = new ArrayList<>();
//
//    @PrePersist
//    public void prePersist() {
//        if (ObjectUtils.isEmpty(isPublished)) {
//            setIsPublished(true);
//        }
//    }
}
