package com.fortunatis.staticservice.route;

public class RouteConstant {
    public static final String[] PUBLIC_ROUTES = {
            "/swagger-ui/**",
            "/v3/api-docs/**",
            "/actuator/**",
            "/public/**",
    };
    public static final String[] USER_ROUTES = {};
    public static final String[] ADMIN_ROUTES = {
            "/api/v1/**",
    };
}
