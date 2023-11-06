package com.fortunatis.staticservice.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fortunatis.staticservice.enums.StaticDataType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Type;

import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "static_data")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class StaticData {
    @Id
    private UUID id = UUID.randomUUID();

    @Column(name = "keyword")
    private String keyword;

    @Column(name = "description_en", columnDefinition = "text")
    private String descriptionEn;

    @Column(name = "description_de", columnDefinition = "text")
    private String descriptionDe;

    @Column(name = "description_fr", columnDefinition = "text")
    private String descriptionFr;

    @Column(name = "description_it", columnDefinition = "text")
    private String descriptionIt;

    @Enumerated(EnumType.STRING)
    @Column(name = "data_type")
    private StaticDataType dataType;

    @Column(name = "is_deleted")
    private Boolean isDeleted;

    @Column(name = "creation_date", nullable = false, updatable = false)
    @CreationTimestamp
    private Date creationDate;
}
