package com.hcmute.pose.wiki.payload.request;

import com.google.gson.annotations.SerializedName;
import com.hcmute.pose.wiki.model.WikiState;

import java.io.Serializable;

public class WikiRequest implements Serializable {
    private String title;
    private Long projectId;
    private Long createdUser;
    private String path;
    private String content;
    private WikiState state;

    public WikiRequest() {
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
}
