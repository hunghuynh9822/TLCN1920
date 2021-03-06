package com.hcmute.pose.projectservice.payload.task;

import com.hcmute.pose.projectservice.model.task.Task;
import com.hcmute.pose.projectservice.model.task.TaskState;

import java.util.List;
import java.util.Map;

public class TasksWithState {
    private Map<TaskState, List<Task>> tasks;

    public TasksWithState() {
    }

    public TasksWithState(Map<TaskState, List<Task>> tasks) {
        this.tasks = tasks;
    }

    public Map<TaskState, List<Task>> getTasks() {
        return tasks;
    }

    public void setTasks(Map<TaskState, List<Task>> tasks) {
        this.tasks = tasks;
    }
}
