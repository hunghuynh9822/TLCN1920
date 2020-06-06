package com.hcmute.pose.projectservice.model.task;

import com.google.gson.annotations.SerializedName;

import java.io.Serializable;

public class Task implements Serializable {
    private Long id;
    @SerializedName("project_id")
    private Long projectId;
    @SerializedName("employee_creator")
    private Long employeeCreator;
    @SerializedName("employee_assignee")
    private Long employeeAssignee;
    private String title;
    private String description;
    @SerializedName("started_at")
    private Long startedAt;
    private Integer duration;
    private TaskState state;
    private Integer point;
    @SerializedName("created_at")
    private Long createdAt;
    @SerializedName("updated_at")
    private Long updatedAt;
    @SerializedName("pre_task_id")
    private String preTaskId;

    public Task() {
    }

    public Task(String preTaskId,Long id, Long projectId, Long employeeCreator, Long employeeAssignee, String title, String description, Long startedAt, Integer duration, TaskState state, Integer point, Long createdAt, Long updatedAt) {
        this.id = id;
        this.preTaskId = preTaskId;
        this.projectId = projectId;
        this.employeeCreator = employeeCreator;
        this.employeeAssignee = employeeAssignee;
        this.title = title;
        this.description = description;
        this.startedAt = startedAt;
        this.duration = duration;
        this.state = state;
        this.point = point;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Task(Long id,String preTaskId, Long employeeAssignee, String title, String description, Long startedAt, Integer duration, TaskState state, Long updatedAt) {
        this.id = id;
        this.employeeAssignee = employeeAssignee;
        this.title = title;
        this.description = description;
        this.startedAt = startedAt;
        this.duration = duration;
        this.state = state;
        this.updatedAt = updatedAt;
        this.preTaskId = preTaskId;
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

    public TaskState getState() {
        return state;
    }

    public void setState(TaskState state) {
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

    public String getPreTaskId() {
        return preTaskId;
    }

    public void setPreTaskId(String preTaskId) {
        this.preTaskId = preTaskId;
    }
}