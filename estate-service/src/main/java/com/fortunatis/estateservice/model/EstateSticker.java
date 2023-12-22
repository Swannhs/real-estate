package com.fortunatis.estateservice.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fortunatis.estateservice.entity.TimestampEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import java.util.*;

@Entity
@Table(name = "estate_sticker")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class EstateSticker extends TimestampEntity {
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

    @ManyToMany(mappedBy = "estateStickers", fetch = FetchType.LAZY)
    @JsonBackReference
    private Set<Estate> estates = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "estate_sticker_estate_type",
            joinColumns = @JoinColumn(name = "estate_sticker_id"),
            inverseJoinColumns = @JoinColumn(name = "estate_type_id"))
    private Set<EstateSearchPriority> estateSearchPriorities = new HashSet<>();
}
