package com.hcmute.pose.common.model.audit;

import com.google.gson.Gson;
import com.google.gson.annotations.SerializedName;

import java.io.Serializable;

public class DateAudit implements Serializable {
    @SerializedName("created_at")
    protected Long createdAt;
    @SerializedName("updated_at")
    protected Long updatedAt;
    protected DateAudit(){
        this.createdAt = System.currentTimeMillis();
        this.updatedAt = null;
    }

    public void setUpdated_at(Long updated_at) {
        this.updatedAt = updated_at;
    }

    public Long getCreated_at() {
        return createdAt;
    }

    public Long getUpdated_at() {
        return updatedAt;
    }

    @Override
    public String toString() {
        return new Gson().toJson(this);
    }
}
