package com.hcmute.pose.wiki.model;

import com.google.gson.annotations.SerializedName;

import java.io.Serializable;

public class WikiPage implements Serializable {
    @SerializedName("wiki_id")
    private Long id;
    @SerializedName("wiki_title")
    private String title;
    @SerializedName("project_id")
    private Long projectId;
    @SerializedName("created_by")
    private Long createdUser;
    @SerializedName("path")
    private String path;
    private String content;
    private WikiState state;
    @SerializedName("created_at")
    private Long createdAt;
    @SerializedName("updated_at")
    private Long updatedAt;

    public WikiPage() {

    }

    public WikiPage(Long id, String title, Long projectId, Long createdUser, String path, String content, WikiState state, Long createdAt, Long updatedAt) {
        this.id = id;
        this.title = title;
        this.projectId = projectId;
        this.createdUser = createdUser;
        this.path = path;
        this.content = content;
        this.state = state;
        this.createdAt = createdAt;
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

    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

    public Long getCreatedUser() {
        return createdUser;
    }

    public void setCreatedUser(Long createdUser) {
        this.createdUser = createdUser;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public WikiState getState() {
        return state;
    }

    public void setState(WikiState state) {
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
