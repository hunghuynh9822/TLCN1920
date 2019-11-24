package com.hcmute.pose.projectservice.payload;

import com.hcmute.pose.projectservice.model.ProjectRole;

public class PerOfProjectRequest {
    private Long employeeId;
    private Long projectId;
    private Integer role;

    public PerOfProjectRequest() {
    }

    public PerOfProjectRequest(Long employeeId, Long projectId, ProjectRole role) {
        this.employeeId = employeeId;
        this.projectId = projectId;
        this.role = role.ordinal();
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

    public ProjectRole getRole() {
        return ProjectRole.values()[role];
    }

    public void setRole(ProjectRole role) {
        this.role = role.ordinal();
    }
}
