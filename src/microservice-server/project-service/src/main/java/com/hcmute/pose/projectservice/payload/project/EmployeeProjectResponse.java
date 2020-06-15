package com.hcmute.pose.projectservice.payload.project;

import java.util.List;

public class EmployeeProjectResponse {
    private List<ProjectResponse> ownProjects;
    private List<ProjectResponse> joinProjects;

    public EmployeeProjectResponse(List<ProjectResponse> ownProjects, List<ProjectResponse> joinProjects) {
        this.ownProjects = ownProjects;
        this.joinProjects = joinProjects;
    }

    public EmployeeProjectResponse() {
    }

    public List<ProjectResponse> getOwnProjects() {
        return ownProjects;
    }

    public void setOwnProjects(List<ProjectResponse> ownProjects) {
        this.ownProjects = ownProjects;
    }

    public List<ProjectResponse> getJoinProjects() {
        return joinProjects;
    }

    public void setJoinProjects(List<ProjectResponse> joinProjects) {
        this.joinProjects = joinProjects;
    }
}
