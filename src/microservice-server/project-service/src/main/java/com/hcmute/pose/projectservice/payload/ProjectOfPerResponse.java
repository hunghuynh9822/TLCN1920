package com.hcmute.pose.projectservice.payload;

import com.hcmute.pose.projectservice.model.Project;

import java.util.List;

public class ProjectOfPerResponse {
    private List<Project> ownProjects;
    private List<Project> joinProjects;

    public ProjectOfPerResponse(List<Project> ownProjects, List<Project> joinProjects) {
        this.ownProjects = ownProjects;
        this.joinProjects = joinProjects;
    }

    public ProjectOfPerResponse() {
    }

    public List<Project> getOwnProjects() {
        return ownProjects;
    }

    public void setOwnProjects(List<Project> ownProjects) {
        this.ownProjects = ownProjects;
    }

    public List<Project> getJoinProjects() {
        return joinProjects;
    }

    public void setJoinProjects(List<Project> joinProjects) {
        this.joinProjects = joinProjects;
    }
}
