package com.hcmute.pose.projectservice.payload;

import com.hcmute.pose.projectservice.model.Project;

import java.util.List;

public class ProjectResponse {
    private Project project;
    private List<EmployeeResponse> members;
    private List<TaskResponse> tasks;

    public ProjectResponse() {
    }

    public ProjectResponse(Project project, List<EmployeeResponse> members, List<TaskResponse> tasks) {
        this.project = project;
        this.members = members;
        this.tasks = tasks;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public List<EmployeeResponse> getMembers() {
        return members;
    }

    public void setMembers(List<EmployeeResponse> members) {
        this.members = members;
    }

    public List<TaskResponse> getTasks() {
        return tasks;
    }

    public void setTasks(List<TaskResponse> tasks) {
        this.tasks = tasks;
    }
}
