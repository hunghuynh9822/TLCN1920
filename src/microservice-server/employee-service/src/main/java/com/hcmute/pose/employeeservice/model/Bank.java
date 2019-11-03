package com.hcmute.pose.employeeservice.model;

import com.google.gson.annotations.SerializedName;

import java.io.Serializable;

public class Bank implements Serializable {
    @SerializedName("bank_number")
    private String bankNumber;
    @SerializedName("bank_name")
    private String bankName;
    @SerializedName("bank_branch")
    private String bankBranch;

    public Bank() {
    }

    public Bank(String bankNumber, String bankName, String bankBranch) {
        this.bankNumber = bankNumber;
        this.bankName = bankName;
        this.bankBranch = bankBranch;
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
}
