package com.hcmute.pose.projectservice.payload;

import com.hcmute.pose.projectservice.model.Project;

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
