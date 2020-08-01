package com.hcmute.pose.projectservice.payload.project;

import java.util.ArrayList;
import java.util.List;

public class ProjectsResponse {
    private List<ProjectResponse> projects;

    public ProjectsResponse() {
        projects = new ArrayList<>();
    }

    public ProjectsResponse(List<ProjectResponse> projects) {
        this.projects = projects;
    }

    public List<ProjectResponse> getProjects() {
        return projects;
    }

    public void setProjects(List<ProjectResponse> projects) {
        this.projects = projects;
    }
}
