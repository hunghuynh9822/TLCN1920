package com.hcmute.pose.projectservice.modelmap;

import com.hcmute.pose.database.connector.modelmap.SingleValue;

import java.io.Serializable;

public class IntValue extends SingleValue<Integer> implements Serializable {
    public IntValue() {
    }

    public IntValue(Integer value) {
        super(value);
    }
}
