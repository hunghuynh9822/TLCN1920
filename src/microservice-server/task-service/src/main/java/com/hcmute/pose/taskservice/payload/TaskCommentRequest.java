package com.hcmute.pose.taskservice.payload;

import javax.validation.constraints.NotBlank;

public class TaskCommentRequest {

    private Long taskId;

    private Long employeeId;

    private Long createTime;
    @NotBlank(message = "Not null comment")
    private String comment;

    public TaskCommentRequest(Long taskId, Long employeeId, Long createTime, @NotBlank(message = "Not null comment") String comment) {
        this.taskId = taskId;
        this.employeeId = employeeId;
        this.createTime = createTime;
        this.comment = comment;
    }



    public Long getTaskId() {
        return taskId;
    }

    public void setTaskId(Long taskId) {
        this.taskId = taskId;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
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
