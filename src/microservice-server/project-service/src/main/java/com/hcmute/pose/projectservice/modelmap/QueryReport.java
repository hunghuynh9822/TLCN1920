package com.hcmute.pose.projectservice.modelmap;

import java.io.Serializable;
import java.util.Map;

public class QueryReport implements Serializable {
    private Long id;
    private String name;
    private Integer number;

    public QueryReport() {
    }

    public QueryReport(Long id, String name, Integer number) {
        this.id = id;
        this.name = name;
        this.number = number;
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

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }
}
