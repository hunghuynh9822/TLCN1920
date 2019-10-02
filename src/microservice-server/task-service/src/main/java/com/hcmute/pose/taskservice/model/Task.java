package com.hcmute.pose.taskservice.model;

import java.util.Date;

public class Task {
    private Long id;
    private Long employeeId;
    private String title;
    private Date startDate;
    private Integer duration;

    public Task() {
    }

    public Task(Long id, Long employeeId, String title, Date startDate, Integer duration) {
        this.id = id;
        this.employeeId = employeeId;
        this.title = title;
        this.startDate = startDate;
        this.duration = duration;
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

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }
}
