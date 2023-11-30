package com.fortunatis.estateservice.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;

import java.io.Serializable;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "estate_gallery")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class EstateGallery implements Serializable {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "id", updatable = false, nullable = false, columnDefinition = "uuid default uuid_generate_v4()")
    private UUID id;

    @Column(name = "original_image_name")
    private String originalImageName;

    @Column(name = "compressed_image_name")
    private String compressedImageName;

    @Column(name = "blurred_image_name", length = 50)
    private String blurredImageName;

    @CreationTimestamp
    @Column(name = "creation_date")
    private Date creationDate;

    @Column(name = "is_featured_image", columnDefinition = "boolean default false")
    private Boolean isFeaturedImage;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "estate_id", nullable = false, referencedColumnName = "id")
    @JsonBackReference
    private Estate galleryEstate;
}
