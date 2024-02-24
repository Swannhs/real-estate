package com.fortunatis.userservice.route;

public class RouteConstant {
    public static final String[] PUBLIC_ROUTES = {
            "/swagger-ui/**",
            "/v3/api-docs/**",
            "/actuator/**",
            "/public/**",
    };
    public static final String[] USER_ROUTES = {
            "/api/v1/user-info/**"
    };
    public static final String[] ADMIN_ROUTES = {
            "/api/v1/users/**",
            "/api/v1/roles/**",
            "/api/v1/payment/**",
    };
}
