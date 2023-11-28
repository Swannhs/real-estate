package com.fortunatis.staticservice.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "general_terms_and_conditions")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class GeneralTermsAndConditions {
    @Id
    @Column(name = "id", updatable = false, nullable = false, columnDefinition = "uuid default uuid_generate_v4()")
    private UUID id;

    @Column(name = "general_terms_and_conditions_en", columnDefinition = "text")
    private String generalTermsAndConditionsEn;

    @Column(name = "general_terms_and_conditions_gr", columnDefinition = "text")
    private String generalTermsAndConditionsGr;

    @Column(name = "general_terms_and_conditions_fr", columnDefinition = "text")
    private String generalTermsAndConditionsFr;

    @Column(name = "general_terms_and_conditions_it", columnDefinition = "text")
    private String generalTermsAndConditionsIt;
}
