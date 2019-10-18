package com.hcmute.pose.projectservice.payload;

import javax.validation.constraints.NotBlank;


public class ProjectRequest {

    @NotBlank(message = "Not null title")
    private String title;

    private Long employeeCreate;

    public ProjectRequest(@NotBlank(message = "Not null title") String title, Long employeeCreate) {

        this.title = title;
        this.employeeCreate = employeeCreate;
    }

    public String getTitle() {
        return title;
    }

    public Long getEmployeeCreate() {
        return employeeCreate;
    }
}
