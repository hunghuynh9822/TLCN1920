package com.hcmute.pose.taskservice.payload;

import java.util.List;

public class ProjectTasksAssigneeWithStateResponse {
    private Long projectId;
    private List<AssigneeTasksWithStateResponse> assignTasks;

    public ProjectTasksAssigneeWithStateResponse() {
    }

    public ProjectTasksAssigneeWithStateResponse(Long projectId, List<AssigneeTasksWithStateResponse> assignTasks) {
        this.projectId = projectId;
        this.assignTasks = assignTasks;
    }

    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

    public List<AssigneeTasksWithStateResponse> getAssignTasks() {
        return assignTasks;
    }

    public void setAssignTasks(List<AssigneeTasksWithStateResponse> assignTasks) {
        this.assignTasks = assignTasks;
    }
}
