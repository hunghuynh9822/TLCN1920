package com.hcmute.pose.projectservice.model.project;

import com.google.gson.annotations.SerializedName;

import java.io.Serializable;

public enum ProjectState implements Serializable {
    @SerializedName("0")
    NEW,
    @SerializedName("1")
    DEVELOPING,
    @SerializedName("2")
    DEVELOPED,
    @SerializedName("3")
    TESTING,
    @SerializedName("4")
    TESTED,
    @SerializedName("5")
    RUNNING,
    @SerializedName("6")
    MAINTAINING,
    @SerializedName("7")
    BUG,
    @SerializedName("8")
    DEBUGGING,
    @SerializedName("9")
    CLOSE
}
