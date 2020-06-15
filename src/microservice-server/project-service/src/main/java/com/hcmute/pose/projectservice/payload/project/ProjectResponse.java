package com.hcmute.pose.projectservice.payload.project;

import com.hcmute.pose.projectservice.model.project.Project;
import com.hcmute.pose.projectservice.payload.task.TaskResponse;

import java.util.List;
import java.util.Map;

public class ProjectResponse {
    private Project project;
    private List<EmployeeResponse> members;
    private List<TaskResponse> tasks;
    private Map<String, Object> more;

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

    public Map<String, Object> getMore() {
        return more;
    }

    public void setMore(Map<String, Object> more) {
        this.more = more;
    }
}
