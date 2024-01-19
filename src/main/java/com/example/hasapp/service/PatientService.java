package com.example.hasapp.service;

import com.example.hasapp.dao.PatientRepo;
import com.example.hasapp.dao.PatientRepoImpl;
import com.example.hasapp.dto.Patient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientService {

    @Autowired
    PatientRepoImpl patientDAO;

    public List<Patient> getAllPatients(){
        List<Patient> patients = patientDAO.getAllPatients();
        return patients;

    }

    public Patient addPatient(Patient patient){
        Patient addedPatient = patientDAO.addPatient(patient);
        return addedPatient;

    }

    public Patient updatePatient(Patient patient, int id){
        if (id != patient.getPID()) {
            patient.setpFName("IDs do not match, patient not updated");
            patient.setpLName("IDs do not match, patient not updated");
            return patient;
        }else {
            patientDAO.updatePatient(patient);
            return patient;
        }

    }

    public void deletePatientById(int id) {
        //YOUR CODE STARTS HERE

        patientDAO.deletePatientById(id);
        //YOUR CODE ENDS HERE
    }

    public Patient getPatientById(int id) {
        //YOUR CODE STARTS HERE
        try {
            return patientDAO.getPatientById(id);
        } catch (DataAccessException ex) {
            Patient patient = new Patient();
            patient.setPID(id);
            patient.setpFName("Patient Not Found");
            patient.setpLName("Patient Not Found");
            return patient;
        }
        //YOUR CODE ENDS HERE
    }
}
