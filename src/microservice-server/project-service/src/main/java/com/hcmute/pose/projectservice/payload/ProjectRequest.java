package com.hcmute.pose.projectservice.payload;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;


public class ProjectRequest {

    @NotBlank(message = "Not null title")
    @Size(min = 1, max = 255, message = "Title not in length")
    private String title;
    @NotBlank(message = "Not null description")
    private String description;
    @NotNull
    private Long employeeCreatedId;

    public ProjectRequest() {
    }

    public String getTitle() {
        return title;
    }

    public Long getEmployeeCreate() {
        return employeeCreatedId;
    }

    public String getDescription() {
        return description;
    }
}
