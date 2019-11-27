package com.hcmute.pose.notifyservice.model;

import java.io.Serializable;

public class Notify implements Serializable {
    private Long id;
    private Long create_id;
    private String create_name;
    private Long create_time;
    private String content;
    private Long receive_id;
    private Boolean view;

    public Notify(Long id, Long create_id, String create_name, Long create_time, String content, Long receive_id, Boolean view) {
        this.id = id;
        this.create_id = create_id;
        this.create_name = create_name;
        this.create_time = create_time;
        this.content = content;
        this.receive_id = receive_id;
        this.view = view;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCreate_id() {
        return create_id;
    }

    public void setCreate_id(Long create_id) {
        this.create_id = create_id;
    }

    public String getCreate_name() {
        return create_name;
    }

    public void setCreate_name(String create_name) {
        this.create_name = create_name;
    }

    public Long getCreate_time() {
        return create_time;
    }

    public void setCreate_time(Long create_time) {
        this.create_time = create_time;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Long getReceive_id() {
        return receive_id;
    }

    public void setReceive_id(Long receive_id) {
        this.receive_id = receive_id;
    }

    public Boolean getView() {
        return view;
    }

    public void setView(Boolean view) {
        this.view = view;
    }
}
