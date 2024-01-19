package com.fortunatis.staticservice.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "estate_sticker")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class EstateSticker {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "id", updatable = false, nullable = false, columnDefinition = "uuid default uuid_generate_v4()")
    private UUID id;

    @Column(name = "sticker_name")
    private String stickerName;

    @Column(name = "sticker_style")
    private String stickerStyle;

    @Column(name = "search_priority", unique = true, columnDefinition = "integer default 0")
    private Integer searchPriority;

    @ElementCollection
    @CollectionTable(name = "sticker_features", joinColumns = @JoinColumn(name = "sticker_id"))
    @Column(name = "feature")
    private List<String> features;

    @Column(name = "is_deleted", columnDefinition = "boolean default false")
    private boolean isDeleted;

    @Column(name = "created_at", columnDefinition = "datetime default")
    private Date createdAt;

    @Column(name = "updated_at", columnDefinition = "datetime default")
    private Date updatedAt;

    @Column(name = "created_by")
    private UUID createdBy;
}
