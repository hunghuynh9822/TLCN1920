package com.hcmute.pose.taskservice.model;

import java.util.List;

public class ListTasks {
    List<Task> tasks;

    public ListTasks() {
    }

    public ListTasks(List<Task> tasks) {
        this.tasks = tasks;
    }

    public List<Task> getTasks() {
        return tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }


}
