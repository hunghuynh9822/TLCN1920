package com.hcmute.pose.projectservice.payload.task;

import com.hcmute.pose.projectservice.model.task.Task;
import com.hcmute.pose.projectservice.model.task.TaskLink;

import java.util.List;

public class AllTasksProjectResponse {
    private Long projectId;
    private List<TaskResponse> tasks;
    private List<TaskLink> links;

    public AllTasksProjectResponse(Long projectId, List<TaskResponse> tasks) {
        this.projectId = projectId;
        this.tasks = tasks;
    }

    public AllTasksProjectResponse(Long projectId, List<TaskResponse> tasks, List<TaskLink> links) {
        this.projectId = projectId;
        this.tasks = tasks;
        this.links = links;
    }

    public AllTasksProjectResponse() {
    }

    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

    public List<TaskResponse> getTasks() {
        return tasks;
    }

    public void setTasks(List<TaskResponse> tasks) {
        this.tasks = tasks;
    }

    public List<TaskLink> getLinks() {
        return links;
    }

    public void setLinks(List<TaskLink> links) {
        this.links = links;
    }
}
