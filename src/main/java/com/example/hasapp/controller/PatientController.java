package com.example.hasapp.controller;

import com.example.hasapp.dao.AppointmentRepo;
import com.example.hasapp.dao.DoctorRepo;
import com.example.hasapp.dao.PatientRepo;
import com.example.hasapp.dao.PatientRepoImpl;
import com.example.hasapp.dao.mappers.PatientMapper;
import com.example.hasapp.dto.Patient;
import com.example.hasapp.service.PatientService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class PatientController {



    @Autowired
    PatientService patientService;


    // This is if you want to test it in Postman
    @GetMapping("/patients")
    public List<Patient> displayPatients() {
        return patientService.getAllPatients();
    }

    @GetMapping("/patients/{id}")
    public Patient getPatientById(@PathVariable int id) {

        return patientService.getPatientById(id);

    }

    @PostMapping("/addPatient")
    public Patient addPatient(@RequestBody Patient patient) {

        return patientService.addPatient(patient);

    }

    @PutMapping("/updatePatient/{id}")
    public Patient updatePatient(@PathVariable int id, @RequestBody Patient patient) {

        return patientService.updatePatient(patient,id);

    }

    @DeleteMapping("/deletePatient/{id}")
    public void deletePatient(@PathVariable int id) {
        patientService.deletePatientById(id);


    }




}
