package com.hcmute.pose.projectservice.payload.project;

import java.util.List;

public class EmployeeProjectResponse {
    private List<ProjectDetailResponse> ownProjects;
    private List<ProjectDetailResponse> joinProjects;

    public EmployeeProjectResponse(List<ProjectDetailResponse> ownProjects, List<ProjectDetailResponse> joinProjects) {
        this.ownProjects = ownProjects;
        this.joinProjects = joinProjects;
    }

    public EmployeeProjectResponse() {
    }

    public List<ProjectDetailResponse> getOwnProjects() {
        return ownProjects;
    }

    public void setOwnProjects(List<ProjectDetailResponse> ownProjects) {
        this.ownProjects = ownProjects;
    }

    public List<ProjectDetailResponse> getJoinProjects() {
        return joinProjects;
    }

    public void setJoinProjects(List<ProjectDetailResponse> joinProjects) {
        this.joinProjects = joinProjects;
    }
}
