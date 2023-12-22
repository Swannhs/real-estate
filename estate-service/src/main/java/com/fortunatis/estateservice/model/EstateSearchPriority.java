package com.fortunatis.estateservice.model;

import com.fortunatis.estateservice.entity.TimestampEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import java.util.*;

@Entity
@Table(name = "estate_search_priority")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class EstateSearchPriority extends TimestampEntity {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "id", updatable = false, nullable = false, columnDefinition = "uuid default uuid_generate_v4()")
    private UUID id;

    @Column(name = "priority", unique = true, nullable = false)
    private Integer priority;

    @OneToMany(mappedBy = "estateSearchPriority", fetch = FetchType.LAZY)
    private List<Estate> estates = new ArrayList<>();

    @ManyToMany(mappedBy = "estateSearchPriorities", fetch = FetchType.LAZY)
    private Set<EstateSticker> estateStickers = new HashSet<>();
}
