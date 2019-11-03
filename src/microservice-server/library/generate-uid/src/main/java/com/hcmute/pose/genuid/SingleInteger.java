package com.hcmute.pose.genuid;

import com.hcmute.pose.database.connector.modelmap.SingleValue;

import java.io.Serializable;

public class SingleInteger extends SingleValue<Integer> implements Serializable {
    public SingleInteger(Integer value){
        super(value);
    }
}
