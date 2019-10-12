package com.hcmute.pose.taskservice.model;

import java.io.Serializable;
import java.util.Date;

public class TaskComments implements Serializable {
    private Long id;
    private Long taskId;
    private Long employeeId;
    private Long createTime;
    private String comment;

    public  TaskComments(){}

    public TaskComments(Long id, Long taskID, Long employeeID, Long createTime, String comment) {
        this.id = id;
        this.taskId = taskID;
        this.employeeId = employeeID;
        this.createTime = createTime;
        this.comment = comment;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getTaskID() {
        return taskId;
    }

    public void setTaskID(Long taskID) {
        this.taskId = taskID;
    }

    public Long getEmployeeID() {
        return employeeId;
    }

    public void setEmployeeID(Long employeeID) {
        this.employeeId = employeeID;
    }

    public Long getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Long createTime) {
        this.createTime = createTime;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
