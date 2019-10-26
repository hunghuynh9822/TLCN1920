package com.hcmute.pose.employeeservice.model.map;

import com.google.gson.annotations.SerializedName;
import com.hcmute.pose.employeeservice.model.*;

import java.io.Serializable;

public class EmployeeMap  implements Serializable {
    private Long id;
    @SerializedName("first_name")
    private String firstName;
    @SerializedName("middle_name")
    private String middleName;
    @SerializedName("last_name")
    private String lastName;
    @SerializedName("id_number")
    private String idNumber;
    @SerializedName("id_created")
    private Long idCreated;
    @SerializedName("id_location")
    private String idLocation;
    private String address;
    @SerializedName("position_id")
    private Long positionId;
    @SerializedName("bank_number")
    private String bankNumber;
    @SerializedName("bank_name")
    private String bankName;
    @SerializedName("bank_branch")
    private String bankBranch;
    private Long birthday;
    @SerializedName("start_time")
    private Long startTime;
    @SerializedName("created_at")
    private Long createdAt;
    @SerializedName("updated_at")
    private Long updatedAt;

    public EmployeeMap() {
    }

    public Employee toEmployee(){
        Employee employee = new Employee();
        employee.setId(this.id);
        employee.setFirstName(this.firstName);
        employee.setMiddleName(this.middleName);
        employee.setLastName(this.lastName);
        employee.setIdentification(new ID(this.idNumber,this.idCreated,this.idLocation));
        employee.setAddress(this.address);
        employee.setPosition(new Position(this.positionId));
        employee.setBank(new Bank(this.bankNumber,this.bankName,this.bankBranch));
        employee.setBirthday(this.birthday);
        employee.setStartTime(this.startTime);
        employee.setCreatedAt(this.createdAt);
        employee.setUpdatedAt(this.updatedAt);
        return employee;
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

    public String getIdNumber() {
        return idNumber;
    }

    public void setIdNumber(String idNumber) {
        this.idNumber = idNumber;
    }

    public Long getIdCreated() {
        return idCreated;
    }

    public void setIdCreated(Long idCreated) {
        this.idCreated = idCreated;
    }

    public String getIdLocation() {
        return idLocation;
    }

    public void setIdLocation(String idLocation) {
        this.idLocation = idLocation;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Long getPositionId() {
        return positionId;
    }

    public void setPositionId(Long positionId) {
        this.positionId = positionId;
    }

    public String getBankNumber() {
        return bankNumber;
    }

    public void setBankNumber(String bankNumber) {
        this.bankNumber = bankNumber;
    }

    public String getBankName() {
        return bankName;
    }

    public void setBankName(String bankName) {
        this.bankName = bankName;
    }

    public String getBankBranch() {
        return bankBranch;
    }

    public void setBankBranch(String bankBranch) {
        this.bankBranch = bankBranch;
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
