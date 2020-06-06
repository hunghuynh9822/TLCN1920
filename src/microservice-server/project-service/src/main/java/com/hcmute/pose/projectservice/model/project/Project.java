package com.hcmute.pose.projectservice.model.project;


import com.google.gson.annotations.SerializedName;

import java.io.Serializable;

public class Project implements Serializable {
    private Long id;
    private String title;
    private String description;
    private ProjectState state;
    @SerializedName("created_at")
    private Long createdAt;
    @SerializedName("updated_at")
    private Long updatedAt;

    public Project(Long id, String title, String description, ProjectState state, Long createdAt, Long updatedAt) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.state = state;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Project(Long id, String title, String description, ProjectState state, Long updatedAt) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.state = state;
        this.updatedAt = updatedAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public ProjectState getState() {
        return state;
    }

    public void setState(ProjectState state) {
        this.state = state;
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
