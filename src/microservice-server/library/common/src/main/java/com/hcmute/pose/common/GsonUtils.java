package com.hcmute.pose.common;

import com.google.gson.Gson;

public class GsonUtils {
    private static Gson gson = new Gson();
    public static String toJson(Object data) {
        return gson.toJson(data);
    }
}
