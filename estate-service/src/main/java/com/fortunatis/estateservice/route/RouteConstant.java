package com.fortunatis.estateservice.route;

import static com.fortunatis.estateservice.util.ApplicationConstants.PUBLIC_URL_PREFIX;

public class RouteConstant {
    public static final String[] PUBLIC_ROUTES = {
            "/swagger-ui/**",
            "/v3/api-docs/**",
            "/actuator/**",
            PUBLIC_URL_PREFIX + "/v1/estates/**"
    };
    public static final String[] USER_ROUTES = {};
    public static final String[] ADMIN_ROUTES = {};
}
