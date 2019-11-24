package com.hcmute.pose.projectservice.payload;

import com.hcmute.pose.projectservice.model.Project;

import java.util.List;

public class ProjectResponse {
    private Project project;
    private List<Long> members;

    public ProjectResponse() {
    }

    public ProjectResponse(Project project, List<Long> members) {
        this.project = project;
        this.members = members;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public List<Long> getMembers() {
        return members;
    }

    public void setMembers(List<Long> members) {
        this.members = members;
    }
}
