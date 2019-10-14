package com.hcmute.pose.employeeservice.model;

import com.google.gson.annotations.SerializedName;

import java.io.Serializable;

public class ID implements Serializable {
    @SerializedName("id_number")
    private String idNumber;
    @SerializedName("id_created")
    private Long idCreated;
    @SerializedName("id_location")
    private String idLocation;

    public ID() {
    }

    public ID(String idNumber, Long idCreated, String idLocation) {
        this.idNumber = idNumber;
        this.idCreated = idCreated;
        this.idLocation = idLocation;
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
}
