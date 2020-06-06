package com.hcmute.pose.projectservice.payload.task;

public class AssigneeTasksWithStateResponse {
    private Long assigneeId;
    private TasksWithState tasks;

    public AssigneeTasksWithStateResponse() {
    }

    public AssigneeTasksWithStateResponse(Long assigneeId, TasksWithState tasks) {
        this.assigneeId = assigneeId;
        this.tasks = tasks;
    }

    public Long getAssigneeId() {
        return assigneeId;
    }

    public void setAssigneeId(Long assigneeId) {
        this.assigneeId = assigneeId;
    }

    public TasksWithState getTasks() {
        return tasks;
    }

    public void setTasks(TasksWithState tasks) {
        this.tasks = tasks;
    }
}
