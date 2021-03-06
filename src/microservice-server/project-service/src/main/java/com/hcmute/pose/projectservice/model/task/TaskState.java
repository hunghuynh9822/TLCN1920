package com.hcmute.pose.projectservice.model.task;

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
    DONE,
    @SerializedName("5")
    FINISH
}
