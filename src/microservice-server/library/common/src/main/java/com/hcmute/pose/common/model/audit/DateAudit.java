package com.hcmute.pose.common.model.audit;

import com.google.gson.Gson;
import com.google.gson.annotations.SerializedName;

import java.io.Serializable;

public class DateAudit implements Serializable {
    @SerializedName("created_at")
    protected Long createdAt;
    @SerializedName("updated_at")
    protected Long updatedAt;
    protected DateAudit(Long createdAt){
        this.createdAt = createdAt;
        this.updatedAt = null;
    }

    public DateAudit() {
    }

    public DateAudit(Long createdAt, Long updatedAt) {
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Long getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Long createdAt) {
        this.createdAt = createdAt;
    }

    public Long getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Long updatedAt) {
        this.updatedAt = updatedAt;
    }

    @Override
    public String toString() {
        return new Gson().toJson(this);
    }
}
