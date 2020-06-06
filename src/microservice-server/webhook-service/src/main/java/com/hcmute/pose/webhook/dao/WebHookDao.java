package com.hcmute.pose.webhook.dao;

import java.util.Optional;

public interface WebHookDao {
    Optional<Long> getLastID();
}
