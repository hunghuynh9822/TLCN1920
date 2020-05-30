package com.hcmute.pose.taskservice.payload;

import com.hcmute.pose.taskservice.model.Task;
import com.hcmute.pose.taskservice.model.TaskLink;

import java.util.List;

public class AllTasksProjectResponse {
    private Long projectId;
    private List<Task> tasks;
    private List<TaskLink> links;

    public AllTasksProjectResponse(Long projectId, List<Task> tasks) {
        this.projectId = projectId;
        this.tasks = tasks;
    }

    public AllTasksProjectResponse(Long projectId, List<Task> tasks, List<TaskLink> links) {
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

    public List<Task> getTasks() {
        return tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }

    public List<TaskLink> getLinks() {
        return links;
    }

    public void setLinks(List<TaskLink> links) {
        this.links = links;
    }
}
