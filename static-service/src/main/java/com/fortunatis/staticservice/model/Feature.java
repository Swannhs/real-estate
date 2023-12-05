package com.fortunatis.staticservice.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import java.io.Serializable;
import java.util.UUID;

@Entity
@Table(name = "features")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Feature implements Serializable {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "id", updatable = false, nullable = false, columnDefinition = "uuid default uuid_generate_v4()")
    private UUID id;

    @Column(name = "features_title")
    private String featuresTitle;

    @Column(name = "features_title_de")
    private String featuresTitleDe;

    @Column(name = "features_title_fr")
    private String featuresTitleFr;

    @Column(name = "features_title_it")
    private String featuresTitleIt;

    @Column(name = "is_active", columnDefinition = "boolean default true")
    @JsonIgnore
    private Boolean isActive;
}
