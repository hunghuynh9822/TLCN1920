package com.hcmute.pose.taskservice.payload;

import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Date;

public class TaskRequest {
    private Long projectId;
    private Long employeeCreator;
    private Long employeeAssignee;
    @NotBlank(message = "Not null title")
    @Size(max = 255,message = "Not long character 255")
    private String title;
    private String preTaskId;
    @NotBlank(message = "Not null title")
    private String description;
    @DateTimeFormat(pattern = "dd-MM-yyyy")
    private Date startedAt;
    private Integer duration;

    public TaskRequest(){

    }

    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

    public Long getEmployeeCreator() {
        return employeeCreator;
    }

    public void setEmployeeCreator(Long employeeCreator) {
        this.employeeCreator = employeeCreator;
    }

    public Long getEmployeeAssignee() {
        return employeeAssignee;
    }

    public void setEmployeeAssignee(Long employeeAssignee) {
        this.employeeAssignee = employeeAssignee;
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

    public Date getStartedAt() {
        return startedAt;
    }

    public void setStartedAt(Date startedAt) {
        this.startedAt = startedAt;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }


    public String getPreTaskId() {
        return preTaskId;
    }

    public void setPreTaskId(String preTaskId) {
        this.preTaskId = preTaskId;
    }
}
