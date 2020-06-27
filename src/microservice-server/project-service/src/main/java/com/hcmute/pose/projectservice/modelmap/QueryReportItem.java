package com.hcmute.pose.projectservice.modelmap;

import java.io.Serializable;
import java.util.List;

public class QueryReportItem implements Serializable {
    private String name;
    private List<QueryReport> values;

    public QueryReportItem() {
    }

    public QueryReportItem(String name, List<QueryReport> values) {
        this.name = name;
        this.values = values;
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
