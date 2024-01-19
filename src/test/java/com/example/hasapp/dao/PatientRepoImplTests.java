package com.example.hasapp.dao;

import com.example.hasapp.dto.Patient;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.jdbc.DataJdbcTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DataJdbcTest
public class PatientRepoImplTests {
//    private JdbcTemplate jdbcTemplate;
//    private PatientRepoImpl patientDao;
//
//    @Autowired
//    public void PatientRepoImplTest(JdbcTemplate jdbcTemplate) {
//        this.jdbcTemplate = jdbcTemplate;
//        patientDao = new PatientRepoImpl();
//    }
//
//    @Test
//    @DisplayName("Add New Patient Test")
//    public void addNewPatientTest() {
//        Patient patient = new Patient();
//        patient.setpFName("Luan");
//        patient.setpLName("Nguyen");
//        patient.setpLName("Nguyen");
//        patient.setpLName("Nguyen");
//        patient.setpLName("Nguyen");
//        patientDao.createNewPatient(patient);
//        List<Patient> newList = patientDao.getAllPatients();
//        assertNotNull(newList);
//        assertEquals(9, newList.size());
//    }
//
//    @Test
//    @DisplayName("Get A List Of All Patients")
//    public void getListOfAllPatientsTest() {
//        List<Patient> newList = patientDao.getAllPatients();
//        assertNotNull(newList);
//        assertEquals(8, newList.size());
//    }
//
//    @Test
//    @DisplayName("Find Patient By Id")
//    public void findPatientByIdTest() {
//        Patient patient = patientDao.findPatientById(2);
//        assertNotNull(patient);
//        assertEquals("Tabby", patient.getPatientFirstName());
//        assertEquals("Daniell", patient.getPatientLastName());
//    }
//
//    @Test
//    @DisplayName("Update Patient Info")
//    public void updateCourseInfoTest() {
//        Patient patient = new Patient();
//        patient.setPatientId(1);
//        patient.setPatientFirstName("William");
//        patient.setPatientLastName("Gates");
//        patientDao.updatePatient(patient);
//        List<Patient> newList = patientDao.getAllPatients();
//        assertNotNull(newList);
//        int i = 0;
//        for (Patient st : newList) {
//            if(st.getPatientFirstName().contains("William")) {
//                i++;
//            }
//        }
//        assertTrue(i != 0);
//    }
//
//    @Test
//    @DisplayName("Delete Patient Test")
//    @Transactional
//    public void deletePatientTest() {
//        //Delete patient with id 8 as they are not enrolled in any classes
//        patientDao.deletePatient(8);
//        assertNotNull(patientDao.getAllPatients());
//        assertEquals(8, patientDao.getAllPatients().size());
//    }
}
