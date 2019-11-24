package com.hcmute.pose.employeeservice.model;


import com.google.gson.annotations.SerializedName;
import com.hcmute.pose.common.model.audit.DateAudit;

import java.io.Serializable;

public class Employee extends DateAudit implements Serializable {
    private Long id;
    @SerializedName("first_name")
    private String firstName;
    @SerializedName("middle_name")
    private String middleName;
    @SerializedName("last_name")
    private String lastName;
    private ID identification;
    private String address;
    private Position position;
    private Bank bank;
    private Long birthday;
    @SerializedName("start_time")
    private Long startTime;

    public Employee() {
    }

    public Employee(Long id, String firstName, String middleName, String lastName, ID identification, String address, Position position, Bank bank, Long birthday, Long startTime) {
        this.id = id;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.identification = identification;
        this.address = address;
        this.position = position;
        this.bank = bank;
        this.birthday = birthday;
        this.startTime = startTime;
    }

    public Employee(Long id, String firstName, String middleName, String lastName, ID identification, String address, Bank bank, Long birthday) {
        this.id = id;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.identification = identification;
        this.address = address;
        this.bank = bank;
        this.birthday = birthday;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public ID getIdentification() {
        return identification;
    }

    public void setIdentification(ID identification) {
        this.identification = identification;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Position getPosition() {
        return position;
    }

    public void setPosition(Position position) {
        this.position = position;
    }

    public Bank getBank() {
        return bank;
    }

    public void setBank(Bank bank) {
        this.bank = bank;
    }

    public Long getBirthday() {
        return birthday;
    }

    public void setBirthday(Long birthday) {
        this.birthday = birthday;
    }

    public Long getStartTime() {
        return startTime;
    }

    public void setStartTime(Long startTime) {
        this.startTime = startTime;
    }
}
