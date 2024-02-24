package com.fortunatis.staticservice.converter;

import org.springframework.core.convert.converter.Converter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Component
public class KeycloakRoleConverter implements Converter<Jwt, Collection<GrantedAuthority>> {
    @Override
    public Collection<GrantedAuthority> convert(Jwt jwt) {
        Map<String, Object> realmAccess = jwt.getClaim("realm_access");
        Map<String, Object> resourceAccess = jwt.getClaim("resource_access");

        List<String> realmRoles = extractRoles(realmAccess);
        List<String> resourceRoles = extractResourceRoles(resourceAccess);

        List<String> allRoles = Stream.concat(realmRoles.stream(), resourceRoles.stream()).toList();

        return allRoles.stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
                .collect(Collectors.toList());
    }

    private List<String> extractRoles(Map<String, Object> realmAccess) {
        if (realmAccess != null && realmAccess.containsKey("roles")) {
            return (List<String>) realmAccess.get("roles");
        }
        return Collections.emptyList();
    }

    private List<String> extractResourceRoles(Map<String, Object> resourceAccess) {
        if (resourceAccess != null && resourceAccess.containsKey("account") && resourceAccess.get("account") instanceof Map) {
            Map<String, Object> accountRoles = (Map<String, Object>) resourceAccess.get("account");
            if (accountRoles.containsKey("roles")) {
                return (List<String>) accountRoles.get("roles");
            }
        }
        return Collections.emptyList();
    }
}
