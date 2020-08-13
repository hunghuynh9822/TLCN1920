package com.hcmute.pose.projectservice.payload.task;

import com.hcmute.pose.projectservice.model.task.Message;

import java.util.ArrayList;
import java.util.List;

public class GanttResponse {
    private List<Long> listGantt;
    private Long start;
    private Long end;
    private int duration;
    private List<Message> message;
    private List<Message> messageError;

    public GanttResponse(List<Long> listGantt, Long start, Long end, int duration, List<Message> message, List<Message> messageError) {
        this.listGantt = listGantt;
        this.start = start;
        this.end = end;
        this.message = message;
        this.duration = duration;
        this.messageError = messageError;
    }

    public GanttResponse() {
        this.listGantt = new ArrayList<>();
        this.message = new ArrayList<>();
        this.messageError = new ArrayList<>();
    }

    public List<Long> getListGantt() {
        return listGantt;
    }

    public void setListGantt(List<Long> listGantt) {
        this.listGantt = listGantt;
    }

    public Long getStart() {
        return start;
    }

    public void setStart(Long start) {
        this.start = start;
    }

    public Long getEnd() {
        return end;
    }

    public void setEnd(Long end) {
        this.end = end;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public List<Message> getMessage() {
        return message;
    }

    public void setMessage(List<Message> message) {
        this.message = message;
    }

    public List<Message> getMessageError() {
        return messageError;
    }

    public void setMessageError(List<Message> messageError) {
        this.messageError = messageError;
    }
}
