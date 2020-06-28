package com.hcmute.pose.projectservice.model.task;

import java.io.Serializable;
import java.util.List;

public class MessageError implements Serializable {
    private String message;
    private List<String> params;

    public MessageError() {
    }

    public MessageError(String message, List<String> params) {
        this.message = message;
        this.params = params;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public List<String> getParams() {
        return params;
    }

    public void setParams(List<String> params) {
        this.params = params;
    }
}
