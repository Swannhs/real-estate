package com.fortunatis.staticservice.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "legal_notice")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class LegalNotice {
    @Id
    @Column(name = "id", updatable = false, nullable = false, columnDefinition = "uuid default uuid_generate_v4()")
    private UUID id;

    @Column(name = "legal_notice_en", columnDefinition = "text")
    private String legalNoticeEn;

    @Column(name = "legal_notice_gr", columnDefinition = "text")
    private String legalNoticeGr;

    @Column(name = "legal_notice_fr", columnDefinition = "text")
    private String legalNoticeFr;

    @Column(name = "legal_notice_it", columnDefinition = "text")
    private String legalNoticeIt;
}
