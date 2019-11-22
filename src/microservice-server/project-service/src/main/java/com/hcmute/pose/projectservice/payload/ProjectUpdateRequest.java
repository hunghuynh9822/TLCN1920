package com.hcmute.pose.projectservice.payload;

import com.hcmute.pose.projectservice.model.ProjectState;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

public class ProjectUpdateRequest {
    private Long projectId;
    @NotBlank(message = "Not null title")
    @Size(min = 1, max = 255, message = "Title not in length")
    private String title;
    @NotBlank(message = "Not null description")
    private String description;
    private Integer state;
    @NotEmpty
    private List<PerOfProjectRequest> perOfProjects;

    public ProjectUpdateRequest() {
    }

    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public ProjectState getState() {
        return ProjectState.values()[state];
    }

    public void setState(ProjectState state) {
        this.state = state.ordinal();
    }

    public List<PerOfProjectRequest> getPerOfProjects() {
        return perOfProjects;
    }

    public void setPerOfProjects(List<PerOfProjectRequest> perOfProjects) {
        this.perOfProjects = perOfProjects;
    }
}
