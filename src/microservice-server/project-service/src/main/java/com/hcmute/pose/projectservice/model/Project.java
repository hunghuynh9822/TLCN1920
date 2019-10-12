package com.hcmute.pose.projectservice.model;

import org.graalvm.compiler.lir.Variable;

import java.io.Serializable;

public class Project implements Serializable {
    private Long id;
    private Long idListPer;
    private String title;
    private Long createTime;
    private Long employeeCreate;
    private boolean submit;

    public Project(Long id, Long idListPer, String title, Long createTime, Long employeeCreate, boolean submit) {
        this.id = id;
        this.idListPer = idListPer;
        this.title = title;
        this.createTime = createTime;
        this.employeeCreate = employeeCreate;
        this.submit = submit;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIdListPer() {
        return idListPer;
    }

    public void setIdListPer(Long idListPer) {
        this.idListPer = idListPer;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Long getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Long createTime) {
        this.createTime = createTime;
    }

    public boolean isSubmit() {
        return submit;
    }

    public void setSubmit(boolean submit) {
        this.submit = submit;
    }

    public Long getEmployeeCreate() {
        return employeeCreate;
    }

    public void setEmployeeCreate(Long employeeCreate) {
        this.employeeCreate = employeeCreate;
    }
}
