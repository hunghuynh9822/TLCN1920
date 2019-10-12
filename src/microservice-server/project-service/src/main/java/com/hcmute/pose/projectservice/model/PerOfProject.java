package com.hcmute.pose.projectservice.model;

import java.io.Serializable;

public class PerOfProject  implements Serializable {
    private Long id;
    private Long employeeId;

    public PerOfProject(Long id, Long employeeId) {
        this.id = id;
        this.employeeId = employeeId;
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
}
