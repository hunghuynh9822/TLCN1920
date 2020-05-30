package com.hcmute.pose.projectservice.payload;

import com.google.gson.annotations.SerializedName;

public class TaskResponse {
    private Long id;
    private Long projectId;
    private Long employeeCreator;
    private Long employeeAssignee;
    private String title;
    private String description;
    private Long startedAt;
    private Integer duration;
    private String state;
    private Integer point;
    private Long createdAt;
    private Long updatedAt;

    public TaskResponse() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

    public Long getEmployeeCreator() {
        return employeeCreator;
    }

    public void setEmployeeCreator(Long employeeCreator) {
        this.employeeCreator = employeeCreator;
    }

    public Long getEmployeeAssignee() {
        return employeeAssignee;
    }

    public void setEmployeeAssignee(Long employeeAssignee) {
        this.employeeAssignee = employeeAssignee;
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

    public Long getStartedAt() {
        return startedAt;
    }

    public void setStartedAt(Long startedAt) {
        this.startedAt = startedAt;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public Integer getPoint() {
        return point;
    }

    public void setPoint(Integer point) {
        this.point = point;
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
