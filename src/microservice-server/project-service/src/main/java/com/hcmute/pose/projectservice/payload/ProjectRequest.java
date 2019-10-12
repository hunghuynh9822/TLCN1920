package com.hcmute.pose.projectservice.payload;

import javax.validation.constraints.NotBlank;

public class ProjectRequest {
    @NotBlank(message = "Not null idListPer")
    private Long idListPer;
    @NotBlank(message = "Not null title")
    private String title;
    @NotBlank(message = "Not null employeeCre")
    private Long employeeCreate;

    public ProjectRequest(@NotBlank(message = "Not null idListPer") Long idListPer, @NotBlank(message = "Not null title") String title, @NotBlank(message = "Not null employeeCre") Long employeeCreate) {
        this.idListPer = idListPer;
        this.title = title;
        this.employeeCreate = employeeCreate;
    }

    public Long getIdListPer() {
        return idListPer;
    }

    public String getTitle() {
        return title;
    }

    public Long getEmployeeCreate() {
        return employeeCreate;
    }
}
