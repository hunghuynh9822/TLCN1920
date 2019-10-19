package com.hcmute.pose.common.security;

import com.google.gson.annotations.SerializedName;

import java.io.Serializable;

public enum AuthProvider implements Serializable {
    @SerializedName("local")
    local,
    @SerializedName("facebook")
    facebook,
    @SerializedName("google")
    google,
    @SerializedName("github")
    github
}
