package com.example.hasapp.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import net.sf.jsqlparser.expression.DateTimeLiteralExpression;

import java.time.LocalDate;
import java.util.Date;
import java.util.Objects;

import static com.fasterxml.jackson.databind.type.LogicalType.DateTime;

public class Patient {


    private int PID;
    @NotBlank(message = "First name must not be empty.")
    @Size(max = 255, message="First name must be less than 255 characters.")
    private String pFName;

    @NotBlank(message = "Last name must not be empty.")
    @Size(max = 255, message="Last name must be less than 255 characters.")
    private String pLName;

    @NotBlank(message = "Birthday must not be empty.")
    private Date birthday;

    @NotBlank(message = "Phone Number must not be empty.")
    @Size(max = 10, min = 10, message="Phone Number is not valid")
    private String phoneNumber;

    private String insuranceProvider;

    public void setPID(int PID) {
        this.PID = PID;
    }

    public int getPID() {
        return PID;
    }

    public String getpFName() {
        return pFName;
    }

    public void setpFName(String pFName) {
        this.pFName = pFName;
    }

    public String getpLName() {
        return pLName;
    }

    public void setpLName(String pLName) {
        this.pLName = pLName;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getInsuranceProvider() {
        return insuranceProvider;
    }

    public void setInsuranceProvider(String insuranceProvider) {
        this.insuranceProvider = insuranceProvider;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Patient patient = (Patient) o;
        return getPID() == patient.getPID() && Objects.equals(getpFName(), patient.getpFName()) && Objects.equals(getpLName(), patient.getpLName()) && Objects.equals(getBirthday(), patient.getBirthday()) && Objects.equals(getPhoneNumber(), patient.getPhoneNumber()) && Objects.equals(getInsuranceProvider(), patient.getInsuranceProvider());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getPID(), getpFName(), getpLName(), getBirthday(), getPhoneNumber(), getInsuranceProvider());
    }
}
