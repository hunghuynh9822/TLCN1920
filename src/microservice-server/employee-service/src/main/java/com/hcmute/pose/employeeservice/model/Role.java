package com.hcmute.pose.employeeservice.model;


import com.hcmute.pose.common.model.audit.DateAudit;

import java.io.Serializable;

public class Role extends DateAudit implements Serializable {
    private Long id;
    private String name;

    public Role() {
    }

    public Role(String name) {
        super();
        this.name = name;
    }

    public Role(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Role(Long id){
        this.id = id;
    }

    public Role(Long id, String name, Long createdAt,Long updatedAt) {
        this.id = id;
        this.name = name;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
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
}
