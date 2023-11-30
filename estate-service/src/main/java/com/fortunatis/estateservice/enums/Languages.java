package com.fortunatis.estateservice.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Languages {
    English("English", "en"), French("French", "fr"), German("German", "de"), Italian("Italian", "it");
    private final String name;
    private final String value;
}
