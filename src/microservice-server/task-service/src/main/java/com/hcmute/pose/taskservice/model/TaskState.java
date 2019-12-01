package com.hcmute.pose.taskservice.model;

import com.google.gson.annotations.SerializedName;

public enum TaskState {
    @SerializedName("0")
    NEW,
    @SerializedName("1")
    DEVELOPING,
    @SerializedName("2")
    DEVELOPED,
    @SerializedName("3")
    TESTING,
    @SerializedName("4")
    DONE
}
