package com.hcmute.pose.employeeservice.model;

import com.hcmute.pose.common.model.audit.DateAudit;

import java.io.Serializable;

public class Position extends DateAudit implements Serializable {
    private Long id;
    private String name;

    public Position() {
    }

    public Position(Long id) {
        this.id = id;
    }

    public Position(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
