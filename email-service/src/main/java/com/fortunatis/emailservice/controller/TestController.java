package com.fortunatis.emailservice.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/test")
@Tag(name = "Test Controller", description = "Rest Resource for Test")
public class TestController {
    @GetMapping
    @Operation(summary = "Hello World")
    public String helloWorld() {
        return "Hello World";
    }
}
