package com.hcmute.pose.projectservice.payload.task;

import com.hcmute.pose.projectservice.model.task.Message;
import com.hcmute.pose.projectservice.model.task.TaskLink;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class AllTasksProjectResponse {
    private Long projectId;
    private List<TaskResponse> tasks;
    private List<TaskLink> links;
    private List<Message> message;
    private Map<String, Object> tasksInfo;
    private GanttResponse gantt;

    public AllTasksProjectResponse(Long projectId, List<TaskResponse> tasks, List<TaskLink> links, List<Message> message) {
        this.projectId = projectId;
        this.tasks = tasks;
        this.links = links;
        this.message = message;
    }

    public AllTasksProjectResponse(Long projectId, List<TaskResponse> tasks, List<TaskLink> links, List<Message> message, GanttResponse gantt) {
        this.projectId = projectId;
        this.tasks = tasks;
        this.links = links;
        this.message = message;
        this.gantt = gantt;
    }

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

    public Map<String, Object> getTasksInfo() {
        return tasksInfo;
    }

    public void setTasksInfo(Map<String, Object> tasksInfo) {
        this.tasksInfo = tasksInfo;
    }

    public List<Message> getMessage() {
        return message;
    }

    public void setMessage(List<Message> message) {
        this.message = message;
    }

    public GanttResponse getGantt() {
        return gantt;
    }

    public void setGantt(GanttResponse gantt) {
        this.gantt = gantt;
    }
}
