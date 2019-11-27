package com.hcmute.pose.requestservice.payload;

public class RequestRequest {
    private Long employeeid;
    private String name;
    private String position;
    private Long timestart;
    private Long timeend;
    private String reason;
    private Boolean confirm;
    public RequestRequest(Long employeeid, String name, String position, Long timestart, Long timeend, String reason, Boolean confirm) {
        this.employeeid = employeeid;
        this.name = name;
        this.position = position;
        this.timestart = timestart;
        this.timeend = timeend;
        this.reason = reason;
        this.confirm = confirm;
    }
    public Long getEmployeeid() {
        return employeeid;
    }

    public void setEmployeeid(Long employeeid) {
        this.employeeid = employeeid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public Long getTimestart() {
        return timestart;
    }

    public void setTimestart(Long timestart) {
        this.timestart = timestart;
    }

    public Long getTimeend() {
        return timeend;
    }

    public void setTimeend(Long timeend) {
        this.timeend = timeend;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public Boolean getConfirm() {
        return confirm;
    }

    public void setConfirm(Boolean confirm) {
        this.confirm = confirm;
    }
}
