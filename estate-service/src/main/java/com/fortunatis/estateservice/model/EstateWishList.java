package com.fortunatis.estateservice.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fortunatis.estateservice.entity.TimestampEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "estate_wish_list")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class EstateWishList extends TimestampEntity {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "id", updatable = false, nullable = false, columnDefinition = "uuid default uuid_generate_v4()")
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "estate_id")
    private Estate estate;

    @Column(name = "user_id", nullable = false, updatable = false)
    private UUID userId;
}
