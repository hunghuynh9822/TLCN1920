package com.hcmute.pose.projectservice.modelmap;

import com.hcmute.pose.database.connector.modelmap.SingleValue;

import java.io.Serializable;

public class LongValue extends SingleValue<Long> implements Serializable {
    public LongValue() {
    }

    public LongValue(Long value) {
        super(value);
    }
}
