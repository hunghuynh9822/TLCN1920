package com.hcmute.pose.employeeservice.model;


import com.hcmute.pose.common.model.audit.DateAudit;

import java.io.Serializable;

public class Role extends DateAudit implements Serializable {
    private Integer id;
    private String name;

    public Role() {
    }

    public Role(String name) {
        super();
        this.name = name;
    }

    public Role(Integer id, String name) {
        this.id = id;
        this.name = name;
    }

    public Role(Integer id){
        this.id = id;
    }

    public Role(Integer id, String name, Long created_at,Long updated_at) {
        this.id = id;
        this.name = name;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }
}
