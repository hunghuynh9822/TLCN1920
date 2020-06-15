package com.hcmute.pose.projectservice.model.project;

import com.google.gson.annotations.SerializedName;

import java.io.Serializable;

public enum ProjectRole implements Serializable {
    @SerializedName("0")
    OWNER,
    @SerializedName("1")
    ADMIN,
    @SerializedName("2")
    MEMBER
}
