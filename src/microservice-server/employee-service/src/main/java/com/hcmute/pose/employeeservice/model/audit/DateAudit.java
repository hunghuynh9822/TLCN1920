package com.hcmute.pose.employeeservice.model.audit;

import com.google.gson.Gson;

public class DateAudit {
    protected Long createdAt;
    protected Long updatedAt;
    protected DateAudit(){
        this.createdAt = System.currentTimeMillis();
        this.updatedAt = null;
    }

    public void setUpdatedAt(Long updateAt) {
        this.updatedAt = updateAt;
    }

    public Long getCreatedAt() {
        return createdAt;
    }

    public Long getUpdatedAt() {
        return updatedAt;
    }

    @Override
    public String toString() {
        return new Gson().toJson(this);
    }
}
