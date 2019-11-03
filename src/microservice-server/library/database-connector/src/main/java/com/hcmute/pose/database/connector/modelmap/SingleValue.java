package com.hcmute.pose.database.connector.modelmap;

public class SingleValue<T> {
    private T value;

    public T getValue() {
        return value;
    }

    public void setValue(T value) {
        this.value = value;
    }

    public SingleValue() {
    }

    public SingleValue(T value){
        this.value = value;
    }
}
