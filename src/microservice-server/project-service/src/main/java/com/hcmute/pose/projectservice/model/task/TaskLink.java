package com.hcmute.pose.projectservice.model.task;

import com.google.gson.annotations.SerializedName;

import java.io.Serializable;

public class TaskLink implements Serializable {
    private Long id;
    private Long source;
    private Long target;
    private Integer type;
    @SerializedName("created_at")
    private Long createdAt;
    @SerializedName("updated_at")
    private Long updatedAt;

    public TaskLink() {
    }

    public TaskLink(Long id, Long source, Long target, Integer type, Long createdAt, Long updatedAt) {
        this.id = id;
        this.source = source;
        this.target = target;
        this.type = type;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getSource() {
        return source;
    }

    public void setSource(Long source) {
        this.source = source;
    }

    public Long getTarget() {
        return target;
    }

    public void setTarget(Long target) {
        this.target = target;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
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
}
