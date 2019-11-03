package com.hcmute.pose.employeeservice.model.map;

import com.hcmute.pose.database.connector.modelmap.SingleValue;

import java.io.Serializable;

public class SingleLong extends SingleValue<Long> implements Serializable {
    public SingleLong(){
        super(0L);
    }

    public SingleLong(Long value) {
        super(value);
    }
}
