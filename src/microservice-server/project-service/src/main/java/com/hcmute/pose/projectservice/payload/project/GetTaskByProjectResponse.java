package com.hcmute.pose.projectservice.payload.project;

import com.hcmute.pose.projectservice.payload.task.TaskResponse;

import java.util.List;

public class GetTaskByProjectResponse {
    private List<TaskResponse> tasks;

    public GetTaskByProjectResponse() {
    }

    public List<TaskResponse> getTasks() {
        return tasks;
    }

    public void setTasks(List<TaskResponse> tasks) {
        this.tasks = tasks;
    }
}
