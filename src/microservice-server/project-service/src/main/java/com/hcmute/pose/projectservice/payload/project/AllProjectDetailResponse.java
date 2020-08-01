package com.hcmute.pose.projectservice.payload.project;

import java.util.List;

public class AllProjectDetailResponse {
    private List<ProjectDetailResponse> projectResponses;

    public AllProjectDetailResponse(List<ProjectDetailResponse> projectDetailResponses) {
        this.projectResponses = projectDetailResponses;
    }

    public AllProjectDetailResponse() {
    }

    public List<ProjectDetailResponse> getProjectResponses() {
        return projectResponses;
    }

    public void setProjectResponse(List<ProjectDetailResponse> projectDetailResponses) {
        this.projectResponses = projectDetailResponses;
    }
}
