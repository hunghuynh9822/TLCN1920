package com.hcmute.tlcn.workmanagement.model;

import com.hcmute.tlcn.workmanagement.model.audit.DateAudit;

public class Role extends DateAudit {
    private Long id;
    private String name;

    public Role(String name) {
        super();
        this.name = name;
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
