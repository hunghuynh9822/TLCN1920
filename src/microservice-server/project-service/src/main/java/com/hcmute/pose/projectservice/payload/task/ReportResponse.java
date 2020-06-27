package com.hcmute.pose.projectservice.payload.task;

import java.util.HashMap;
import java.util.Map;

public class ReportResponse {
    private Map<String, Object> data;

    public ReportResponse() {
        data = new HashMap<>();
    }

    public ReportResponse(Map<String, Object> data) {
        this.data = data;
    }

    public Map<String, Object> getData() {
        return data;
    }

    public void setData(Map<String, Object> data) {
        this.data = data;
    }

    public void putData(String key, Object value) {
        data.put(key, value);
    }
}
