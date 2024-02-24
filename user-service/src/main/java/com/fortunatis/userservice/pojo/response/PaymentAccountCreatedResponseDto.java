package com.fortunatis.userservice.pojo.response;

import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.UUID;

@Getter
@Setter
public class PaymentAccountCreatedResponseDto implements Serializable {
    UUID id;
    UUID userId;
}
