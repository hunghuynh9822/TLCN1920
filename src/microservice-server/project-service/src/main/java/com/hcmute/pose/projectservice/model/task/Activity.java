package com.hcmute.pose.projectservice.model.task;

import java.util.ArrayList;
import java.util.List;

public class Activity {
    private Long id;
    private String title;
    private int duration;
    //Early start time
    private int est;
    //Late start time
    private int lst;
    //Early end time
    private int eet;
    //Late end time
    private int let;
    private Long startedAt;
    private List<Activity> successors;
    private List<Activity> predecessors;

    public Activity(Long id, String title, Long startedAt, int duration) {
        this.id = id;
        this.title = title;
        this.startedAt = startedAt;
        this.duration = duration;
        this.est = 0;
        this.lst = 0;
        this.eet = 0;
        this.let = 0;
        this.successors = new ArrayList<>();
        this.predecessors = new ArrayList<>();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public int getEst() {
        return est;
    }

    public void setEst(int est) {
        this.est = est;
    }

    public int getLst() {
        return lst;
    }

    public void setLst(int lst) {
        this.lst = lst;
    }

    public int getEet() {
        return eet;
    }

    public void setEet(int eet) {
        this.eet = eet;
    }

    public int getLet() {
        return let;
    }

    public void setLet(int let) {
        this.let = let;
    }

    public List<Activity> getSuccessors() {
        return successors;
    }

    public void setSuccessors(List<Activity> successors) {
        this.successors = successors;
    }

    public List<Activity> getPredecessors() {
        return predecessors;
    }

    public void setPredecessors(List<Activity> predecessors) {
        this.predecessors = predecessors;
    }

    public Long getStartedAt() {
        return startedAt;
    }

    public void setStartedAt(Long startedAt) {
        this.startedAt = startedAt;
    }
}
