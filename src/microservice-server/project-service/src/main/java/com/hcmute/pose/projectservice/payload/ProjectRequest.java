package com.hcmute.pose.projectservice.payload;


import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;


public class ProjectRequest {
    @NotNull
    private Long employeeId;
    @NotBlank(message = "Not null title")
    @Size(min = 1, max = 255, message = "Title not in length")
    private String title;
    @NotBlank(message = "Not null description")
    private String description;

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
}
