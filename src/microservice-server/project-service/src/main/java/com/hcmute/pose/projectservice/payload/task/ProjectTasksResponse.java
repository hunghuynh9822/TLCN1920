package com.hcmute.pose.projectservice.payload.task;

import java.util.List;

public class ProjectTasksResponse {
    private Long projectId;
    private List<AssigneeTasksResponse> tasks;

    public ProjectTasksResponse() {
    }

    public ProjectTasksResponse(Long projectId, List<AssigneeTasksResponse> tasks) {
        this.projectId = projectId;
        this.tasks = tasks;
    }

    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

    public List<AssigneeTasksResponse> getTasks() {
        return tasks;
    }

    public void setTasks(List<AssigneeTasksResponse> tasks) {
        this.tasks = tasks;
    }
}
