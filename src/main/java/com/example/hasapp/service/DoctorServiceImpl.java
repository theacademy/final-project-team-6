package com.example.hasapp.service;

import com.example.hasapp.dao.DoctorRepo;
import com.example.hasapp.dto.Doctor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorServiceImpl implements DoctorServiceInterface {

    @Autowired
    private DoctorRepo doctorDao;

    public DoctorServiceImpl(DoctorRepo doctorDao) {
        this.doctorDao = doctorDao;
    }

    @Override
    public List<Doctor> getAllDoctors() {
        // get a list of all doctors
        return doctorDao.getAllDoctors();
    }

    @Override
    public Doctor getDoctorById(int id) {
        Doctor doctor;
        String notFoundMsg = "Doctor Not Found.";

        try {
            // find doctors by id
            doctor = doctorDao.getDoctorById(id);
        } catch (DataAccessException e) {
            // if a DataAccessException occurs,
            // set a not found message
            doctor = new Doctor();
            doctor.setDFName(notFoundMsg);
            doctor.setDLName(notFoundMsg);
        }

        return doctor;
    }

    @Override
    public Doctor addNewDoctor(Doctor doctor) {
        String notAddedMsg = " blank, doctor NOT added";

        // if the doctor's first or last name is blank,
        // set a message in the first name and/or last name
        // that the doctor was not added
        if (doctor.getDFName().isBlank() || doctor.getDLName().isBlank()) {
            if (doctor.getDFName().isBlank()) {
                doctor.setDFName("First Name" + notAddedMsg);
            }
            if (doctor.getDLName().isBlank()) {
                doctor.setDLName("Last Name" + notAddedMsg);
            }
            return doctor;
        }

        // add the doctor
        Doctor doctorAdded = doctorDao.addDoctor(doctor);

        // if the doctor was successfully added
        if (doctorAdded != null) {
            return doctorAdded;
        } else {
            return null;
        }
    }

    @Override
    public Doctor updateDoctorData(int id, Doctor doctor) {
        String nonMatchingIdsMsg = "IDs do not match, doctor not updated";

        try {
            // if the path variable id and Doctor object id are not the same
            // set a message stating that the doctor was not updated
            if (id != doctor.getDid()) {
                doctor.setDFName(nonMatchingIdsMsg);
                doctor.setDLName(nonMatchingIdsMsg);
                return doctor;
            }

            // check if the doctor exists
            Doctor doctorFound = getDoctorById(id);

            // if the doctor was found
            if (doctorFound.getDid() != 0) {
                // update doctor
                doctorDao.updateDoctor(doctor);
                return doctor;
            } else {
                return null;
            }
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public void deleteDoctorById(int id) {
        doctorDao.deleteDoctor(id);
    }
}