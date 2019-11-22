package com.hcmute.pose.projectservice.payload;

import com.hcmute.pose.projectservice.model.Project;

import java.util.List;

public class AllProjectResponse {
    private List<Project> projects;

    public AllProjectResponse(List<Project> projects) {
        this.projects = projects;
    }

    public AllProjectResponse() {
    }

    public List<Project> getProjects() {
        return projects;
    }

    public void setProjects(List<Project> projects) {
        this.projects = projects;
    }
}
