package com.hcmute.pose.taskservice.payload;

public class TaskUpdateRequest {
    private Long taskId;
    private Long employeeId;
    private String title;
    private String description;
    private Integer point;
    private Integer state;
    private Long startedAt;
    private Integer duration;

    public TaskUpdateRequest() {
    }

    public TaskUpdateRequest(Long taskId, Long employeeId, String title, String description, Integer point, Integer state, Long startedAt, Integer duration) {
        this.taskId = taskId;
        this.employeeId = employeeId;
        this.title = title;
        this.description = description;
        this.point = point;
        this.state = state;
        this.startedAt = startedAt;
        this.duration = duration;
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

    public Integer getPoint() {
        return point;
    }

    public void setPoint(Integer point) {
        this.point = point;
    }

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }

    public Long getStartedAt() {
        return startedAt;
    }

    public void setStartedAt(Long startedAt) {
        this.startedAt = startedAt;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }
}