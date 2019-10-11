package com.hcmute.pose.taskservice.payload;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Date;

public class TaskRequest {

    @NotBlank(message = "Not null taskId")
    private Long Id;

    @NotBlank(message = "Not null employee")
    private Long employeeId;

    @NotBlank(message = "Not null projectId")
    private Long projectId;

    @NotBlank(message = "Not null title")
    @Size(max = 255,message = "Not long character 255")
    private String title;

    @NotBlank(message = "Not null ")
    private Integer duration;

    @NotBlank(message = "Not null status")
    private Boolean status;

    @NotBlank(message = "NOt null point")
    private Integer point;

    public TaskRequest(){

    }

    public TaskRequest(@NotBlank(message = "Not null employee") Long employeeId, @NotBlank(message = "Not null employee") Long projectId, @NotBlank(message = "Not null title") @Size(max = 255, message = "Not long character 255") String title, @NotBlank(message = "Not null ") Integer duration) {
        this.employeeId = employeeId;
        this.projectId = projectId;
        this.title = title;
        this.duration = duration;
    }

    public TaskRequest(@NotBlank(message = "Not null taskId") Long id, @NotBlank(message = "Not null employee") Long employeeId, @NotBlank(message = "Not null projectId") Long projectId, @NotBlank(message = "Not null title") @Size(max = 255, message = "Not long character 255") String title, @NotBlank(message = "Not null ") Integer duration) {
        Id = id;
        this.employeeId = employeeId;
        this.projectId = projectId;
        this.title = title;
        this.duration = duration;
    }

    public Long getId() {
        return Id;
    }

    public TaskRequest(@NotBlank(message = "Not null status") Boolean status) {
        this.status = status;
    }

    public TaskRequest(@NotBlank(message = "NOt null point") Integer point) {
        this.point = point;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public String getTitle() {
        return title;
    }

    public Integer getDuration() {
        return duration;
    }

    public Long getProjectId() {
        return projectId;
    }

    public Boolean getStatus() {
        return status;
    }

    public Integer getPoint() {
        return point;
    }
}
