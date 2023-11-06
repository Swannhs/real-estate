package com.fortunatis.staticservice.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "features")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Features {
    @Id
    private UUID id = UUID.randomUUID();

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
