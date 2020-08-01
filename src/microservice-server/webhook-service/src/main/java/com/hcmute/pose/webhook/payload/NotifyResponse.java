package com.hcmute.pose.webhook.payload;

import java.util.Map;

public class NotifyResponse {
    private Map<String, Object> messages;

    public NotifyResponse(Map<String, Object> messages) {
        this.messages = messages;
    }

    public NotifyResponse() {
    }

    public Map<String, Object> getMessages() {
        return messages;
    }

    public void setMessages(Map<String, Object> messages) {
        this.messages = messages;
    }
}
