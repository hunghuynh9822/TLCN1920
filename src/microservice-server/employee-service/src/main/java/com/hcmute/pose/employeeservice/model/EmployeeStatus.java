package com.hcmute.pose.employeeservice.model;

import com.google.gson.annotations.SerializedName;

import java.io.Serializable;

public enum EmployeeStatus implements Serializable {
    @SerializedName("0")
    CREATED,
    @SerializedName("1")
    ACCEPTED,
    @SerializedName("2")
    DELETED
}
