package com.hcmute.pose.projectservice.model;

import com.google.gson.annotations.SerializedName;

import java.io.Serializable;

public class PerOfProject  implements Serializable {
    @SerializedName("proid")
    private Long id;
    @SerializedName("employeeid")
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
