package com.hcmute.pose.projectservice.payload;


import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;


public class ProjectRequest {
    @NotNull
    private Long employeeId;
    @NotBlank(message = "Not null title")
    @Size(min = 1, max = 255, message = "Title not in length")
    private String title;
    @NotBlank(message = "Not null description")
    private String description;
    private List<Long> projectAdmin;
    private List<Long> projectMember;

    public ProjectRequest() {
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
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

    public List<Long> getProjectAdmin() {
        return projectAdmin;
    }

    public void setProjectAdmin(List<Long> projectAdmin) {
        this.projectAdmin = projectAdmin;
    }

    public List<Long> getProjectMember() {
        return projectMember;
    }

    public void setProjectMember(List<Long> projectMember) {
        this.projectMember = projectMember;
    }
}
