package com.hcmute.pose.projectservice.modelmap;

import com.google.gson.annotations.SerializedName;
import com.hcmute.pose.projectservice.model.task.TaskState;

import java.io.Serializable;

public class CountStateReport implements Serializable {
    @SerializedName("state")
    private TaskState state;
    private Integer number;

    public CountStateReport() {
    }

    public CountStateReport(TaskState state, Integer number) {
        this.state = state;
        this.number = number;
    }

    public TaskState getState() {
        return state;
    }

    public void setState(TaskState state) {
        this.state = state;
    }

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }
}
