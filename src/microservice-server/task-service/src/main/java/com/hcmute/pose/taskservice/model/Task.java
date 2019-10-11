package com.hcmute.pose.taskservice.model;

import java.io.Serializable;
import java.util.Date;

public class Task implements Serializable {
    private Long id;
    private Long employeeId;
    private Long projectId;
    private String title;
    private Long startDate;
    private Integer duration;
    private Boolean status;
    private Integer point;

    public Task() {
    }

    public Task(Long id, Long employeeId, Long projectId, String title, Long startDate, Integer duration, Boolean status, Integer point) {
        this.id = id;
        this.employeeId = employeeId;
        this.projectId = projectId;
        this.title = title;
        this.startDate = startDate;
        this.duration = duration;
        this.status = status;
        this.point = point;
    }

    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

    public Integer getPoint() {
        return point;
    }

    public void setPoint(Integer point) {
        this.point = point;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Long getStartDate() {
        return startDate;
    }

    public void setStartDate(Long startDate) {
        this.startDate = startDate;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }


}
