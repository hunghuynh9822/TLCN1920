package com.hcmute.tlcn.workmanagement.model;

import com.google.gson.Gson;

public class Employee {
    private String id;
    private String firstName;
    private String lastName;
    private String middleName;

    public Employee(String firstName, String middleName, String lastName) {
        this.id = "";
        this.firstName = firstName;
        this.lastName = lastName;
        this.middleName = middleName;
    }



    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    @Override
    public String toString() {
        return new Gson().toJson(this);
    }
}
