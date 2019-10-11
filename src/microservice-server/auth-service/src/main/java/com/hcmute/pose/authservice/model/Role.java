package com.hcmute.pose.authservice.model;

import java.io.Serializable;

public class Role implements Serializable {
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
