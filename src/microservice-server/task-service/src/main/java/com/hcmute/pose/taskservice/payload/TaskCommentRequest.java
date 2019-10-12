package com.hcmute.pose.taskservice.payload;

import javax.validation.constraints.NotBlank;

public class TaskCommentRequest {
    @NotBlank(message = "Not null taskId")
    private Long taskId;
    @NotBlank(message = "Not null employeeId")
    private Long employeeId;
    @NotBlank(message = "Not null createTime")
    private Long createTime;
    @NotBlank(message = "Not null comment")
    private String comment;

    public TaskCommentRequest(@NotBlank(message = "Not null taskId") Long taskId, @NotBlank(message = "Not null employeeId") Long employeeId, @NotBlank(message = "Not null createTime") Long createTime, @NotBlank(message = "Not null comment") String comment) {
        this.taskId = taskId;
        this.employeeId = employeeId;
        this.createTime = createTime;
        this.comment = comment;
    }

    public TaskCommentRequest(@NotBlank(message = "Not null taskId") Long taskId, @NotBlank(message = "Not null employeeId") Long employeeId, @NotBlank(message = "Not null comment") String comment) {
        this.taskId = taskId;
        this.employeeId = employeeId;
        this.comment = comment;
    }

    public Long getTaskId() {
        return taskId;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public Long getCreateTime() {
        return createTime;
    }

    public String getComment() {
        return comment;
    }
}
