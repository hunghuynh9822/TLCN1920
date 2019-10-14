package com.hcmute.pose.employeeservice.payload;

import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class EmployeeRequest {
    @NotBlank(message = "Phone not allow blank")
    @Size(max = 10,message = "Phone too long")
    private String phone;

    @NotBlank(message = "Email not allow blank")
    @Email(message = "Email with wrong format")
    private String email;

    @NotBlank(message = "Password not allow blank")
    @Size(min = 8,max = 255,message = "Password must be between 8 - 255 ")
    private String password;

    @NotEmpty(message = "Not set role yet")
    private List<Long> roles = new ArrayList<>();

    @NotBlank(message = "First name not allow blank")
    @Size(max = 255,message = "First name too long")
    private String firstName;

    @NotBlank(message = "Middle name not allow blank")
    @Size(max = 255,message = "Middle name too long")
    private String middleName;

    @NotBlank(message = "Last name not allow blank")
    @Size(max = 255,message = "Last name too long")
    private String lastName;

    @NotBlank(message = "Identification number not allow blank")
    @Size(max = 15,message = "Identification number too long")
    private String idNumber;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date idCreated;

    @NotBlank(message = "Identification location not allow blank")
    @Size(max = 255,message = "Identification location too long")
    private String idLocation;

    @NotBlank(message = "Address not allow blank")
    @Size(max = 255,message = "Address too long")
    private String address;

    private Long positionId;

    @NotBlank(message = "Bank account number not allow blank")
    @Size(max = 20,message = "Bank account number too long")
    private String bankNumber;

    @NotBlank(message = "Bank name not allow blank")
    @Size(max = 255,message = "Bank name too long")
    private String bankName;

    @NotBlank(message = "Bank branch not allow blank")
    @Size(max = 255,message = "Bank branch too long")
    private String bankBranch;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date birthday;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date startTime;


    public EmployeeRequest() {
    }

    //For test

    public EmployeeRequest(@NotBlank(message = "Phone not allow blank") @Size(max = 255, message = "Phone too long") String phone, @NotBlank(message = "Email not allow blank") @Email(message = "Email with wrong format") String email, @NotBlank(message = "Password not allow blank") @Size(min = 8, max = 255, message = "Password must be between 8 - 255 ") String password, @NotEmpty(message = "Not set role yet") List<Long> roles, @NotBlank(message = "First name not allow blank") @Size(max = 255, message = "First name too long") String firstName, @NotBlank(message = "Middle name not allow blank") @Size(max = 255, message = "Middle name too long") String middleName, @NotBlank(message = "Last name not allow blank") @Size(max = 255, message = "Last name too long") String lastName) {
        this.phone = phone;
        this.email = email;
        this.password = password;
        this.roles = roles;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Long> getRoles() {
        return roles;
    }

    public void setRoles(List<Long> roles) {
        this.roles = roles;
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

    public Date getIdCreated() {
        return idCreated;
    }

    public void setIdCreated(Date idCreated) {
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

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }
}
