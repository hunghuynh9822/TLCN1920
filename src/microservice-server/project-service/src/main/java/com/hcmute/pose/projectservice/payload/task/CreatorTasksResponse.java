package com.hcmute.pose.projectservice.payload.task;

import java.util.List;

public class CreatorTasksResponse {
    private Long creatorId;
    private List<AssigneeTasksResponse> tasks;

    public CreatorTasksResponse() {
    }

    public CreatorTasksResponse(Long creatorId, List<AssigneeTasksResponse> tasks) {
        this.creatorId = creatorId;
        this.tasks = tasks;
    }

    public Long getcreatorId() {
        return creatorId;
    }

    public void setcreatorId(Long creatorId) {
        this.creatorId = creatorId;
    }

    public List<AssigneeTasksResponse> getTasks() {
        return tasks;
    }

    public void setTasks(List<AssigneeTasksResponse> tasks) {
        this.tasks = tasks;
    }
}
