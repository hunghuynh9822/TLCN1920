package com.hcmute.pose.employeeservice.model;


import com.hcmute.pose.employeeservice.model.audit.DateAudit;

public class Role extends DateAudit {
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

    public Role(Integer id, String name, Long createdAt,Long updatedAt) {
        this.id = id;
        this.name = name;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
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
