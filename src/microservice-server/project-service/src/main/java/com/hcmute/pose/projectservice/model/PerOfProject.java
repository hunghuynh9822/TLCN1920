package com.hcmute.pose.projectservice.model;

import com.google.gson.annotations.SerializedName;

import java.io.Serializable;

public class PerOfProject  implements Serializable {
    @SerializedName("pro_id")
    private Long projectId;
    @SerializedName("employee_id")
    private Long employeeId;
    private ProjectRole role;

    public PerOfProject(Long projectId, Long employeeId, ProjectRole role) {
        this.projectId = projectId;
        this.employeeId = employeeId;
        this.role = role;
    }

    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public ProjectRole getRole() {
        return role;
    }

    public void setRole(ProjectRole role) {
        this.role = role;
    }
}
