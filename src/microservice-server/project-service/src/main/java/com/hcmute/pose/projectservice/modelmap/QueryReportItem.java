package com.hcmute.pose.projectservice.modelmap;

import java.io.Serializable;
import java.util.List;

public class QueryReportItem implements Serializable {
    private Long id;
    private String name;
    private List<QueryReport> values;

    public QueryReportItem() {
    }

    public QueryReportItem(Long id, String name, List<QueryReport> values) {
        this.id = id;
        this.name = name;
        this.values = values;
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

    public List<QueryReport> getValues() {
        return values;
    }

    public void setValues(List<QueryReport> values) {
        this.values = values;
    }
}
