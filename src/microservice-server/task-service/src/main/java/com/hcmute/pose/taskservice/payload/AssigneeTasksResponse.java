package com.hcmute.pose.taskservice.payload;

import com.hcmute.pose.taskservice.model.Task;

import java.util.List;

public class AssigneeTasksResponse {
    private Long assigneeId;
    private List<Task> tasks;

    public AssigneeTasksResponse() {
    }

    public AssigneeTasksResponse(Long assigneeId, List<Task> tasks) {
        this.assigneeId = assigneeId;
        this.tasks = tasks;
    }

    public Long getAssigneeId() {
        return assigneeId;
    }

    public void setAssigneeId(Long assigneeId) {
        this.assigneeId = assigneeId;
    }

    public List<Task> getTasks() {
        return tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }
}
