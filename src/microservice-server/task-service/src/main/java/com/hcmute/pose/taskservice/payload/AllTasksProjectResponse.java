package com.hcmute.pose.taskservice.payload;

import com.hcmute.pose.taskservice.model.Task;

import java.util.List;

public class AllTasksProjectResponse {
    private Long projectId;
    private List<Task> tasks;

    public AllTasksProjectResponse(Long projectId, List<Task> tasks) {
        this.projectId = projectId;
        this.tasks = tasks;
    }

    public AllTasksProjectResponse() {
    }

    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

    public List<Task> getTasks() {
        return tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }
}
