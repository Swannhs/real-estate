package com.fortunatis.staticservice.redis;

import org.jetbrains.annotations.NotNull;
import org.springframework.cache.interceptor.KeyGenerator;
import org.springframework.stereotype.Component;

import java.lang.reflect.Method;

@Component("redisKeyGenerator")
public class RedisKeyGenerator implements KeyGenerator {
    @Override
    public @NotNull Object generate(Object target, Method method, Object @NotNull ... params) {
        return target.getClass().getName() + "." + method.getName() + "." + params[0];
    }
}
