package com.hcmute.pose.taskservice.payload;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Date;

public class TaskRequest {


    private Long Id;


    private Long employeeId;


    private Long projectId;

    @NotBlank(message = "Not null title")
    @Size(max = 255,message = "Not long character 255")
    private String title;


    private Integer duration;


    private Boolean status;


    private Integer point;

    public TaskRequest(){

    }

    public TaskRequest(Long employeeId, Long projectId, @NotBlank(message = "Not null title") @Size(max = 255, message = "Not long character 255") String title, Integer duration) {
        this.employeeId = employeeId;
        this.projectId = projectId;
        this.title = title;
        this.duration = duration;
    }

    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        Id = id;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
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

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public Integer getPoint() {
        return point;
    }

    public void setPoint(Integer point) {
        this.point = point;
    }
}
