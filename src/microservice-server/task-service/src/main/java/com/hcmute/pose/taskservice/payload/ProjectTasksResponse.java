package com.hcmute.pose.taskservice.payload;

import java.util.List;

public class ProjectTasksResponse {
    private Long projectId;
    private List<CreatorTasksResponse> creatorTasks;

    public ProjectTasksResponse() {
    }

    public ProjectTasksResponse(Long projectId, List<CreatorTasksResponse> creatorTasks) {
        this.projectId = projectId;
        this.creatorTasks = creatorTasks;
    }

    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

    public List<CreatorTasksResponse> getCreatorTasks() {
        return creatorTasks;
    }

    public void setCreatorTasks(List<CreatorTasksResponse> creatorTasks) {
        this.creatorTasks = creatorTasks;
    }
}
