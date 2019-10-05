package com.hcmute.pose.employeeservice.model.map;

import com.hcmute.pose.database.connector.modelmap.SingleValue;

import java.io.Serializable;

public class LongValue extends SingleValue<Long> implements Serializable {
    public LongValue(){
        this.setValue(0L);
    }
}
