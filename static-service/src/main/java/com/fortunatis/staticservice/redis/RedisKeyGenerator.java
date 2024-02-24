package com.fortunatis.staticservice.redis;

import org.springframework.cache.interceptor.KeyGenerator;
import org.springframework.stereotype.Component;

import java.lang.reflect.Method;

@Component("redisKeyGenerator")
public class RedisKeyGenerator implements KeyGenerator {
    @Override
    public Object generate(Object target, Method method, Object ... params) {
        return target.getClass().getName() + "." + method.getName() + "." + params[0];
    }
}
