package com.hcmute.pose.projectservice.model.task;

import java.util.ArrayList;
import java.util.List;

public class ProcessActivity {
    private Long startTime;
    private Long endTime;
    private List<Activity> activities;

    public ProcessActivity() {
        activities = new ArrayList<>();
    }

    public ProcessActivity(Long startTime, Long endTime, List<Activity> activities) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.activities = activities;
    }

    public Long getStartTime() {
        return startTime;
    }

    public void setStartTime(Long startTime) {
        this.startTime = startTime;
    }

    public Long getEndTime() {
        return endTime;
    }

    public void setEndTime(Long endTime) {
        this.endTime = endTime;
    }

    public List<Activity> getActivities() {
        return activities;
    }

    public void setActivities(List<Activity> activities) {
        this.activities = activities;
    }
}
