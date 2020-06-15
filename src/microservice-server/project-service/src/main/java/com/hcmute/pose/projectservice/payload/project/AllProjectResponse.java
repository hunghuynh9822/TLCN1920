package com.hcmute.pose.projectservice.payload.project;

import java.util.List;

public class AllProjectResponse {
    private List<ProjectResponse> projectResponses;

    public AllProjectResponse(List<ProjectResponse> projectResponses) {
        this.projectResponses = projectResponses;
    }

    public AllProjectResponse() {
    }

    public List<ProjectResponse> getProjectResponses() {
        return projectResponses;
    }

    public void setProjectResponses(List<ProjectResponse> projectResponses) {
        this.projectResponses = projectResponses;
    }
}
