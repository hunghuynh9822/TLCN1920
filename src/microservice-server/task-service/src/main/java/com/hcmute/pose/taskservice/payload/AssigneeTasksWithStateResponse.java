package com.hcmute.pose.taskservice.payload;

import com.hcmute.pose.taskservice.model.Task;
import com.hcmute.pose.taskservice.model.TaskState;

import java.util.List;
import java.util.Map;

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
