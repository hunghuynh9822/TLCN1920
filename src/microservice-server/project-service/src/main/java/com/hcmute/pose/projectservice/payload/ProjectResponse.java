package com.hcmute.pose.projectservice.payload;

import com.hcmute.pose.projectservice.model.Project;

import java.util.List;

public class ProjectResponse {
    private Project project;
    private List<EmployeeResponse> members;

    public ProjectResponse() {
    }

    public ProjectResponse(Project project, List<EmployeeResponse> members) {
        this.project = project;
        this.members = members;
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
}
