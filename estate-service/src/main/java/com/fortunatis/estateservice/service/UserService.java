package com.fortunatis.estateservice.service;

import java.util.List;
import java.util.UUID;

public interface UserService {
    UUID getUserId();
    List<UUID> getUserIds(); // TODO: This is for dummy data only generation
}
