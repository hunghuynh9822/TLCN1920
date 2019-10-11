package com.hcmute.pose.common.model.audit;

import com.google.gson.Gson;

import java.io.Serializable;

public class DateAudit implements Serializable {
    protected Long created_at;
    protected Long updated_at;
    protected DateAudit(){
        this.created_at = System.currentTimeMillis();
        this.updated_at = null;
    }

    public void setUpdated_at(Long updated_at) {
        this.updated_at = updated_at;
    }

    public Long getCreated_at() {
        return created_at;
    }

    public Long getUpdated_at() {
        return updated_at;
    }

    @Override
    public String toString() {
        return new Gson().toJson(this);
    }
}
