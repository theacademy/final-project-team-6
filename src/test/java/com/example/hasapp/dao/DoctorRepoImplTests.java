package com.example.hasapp.dao;

import com.example.hasapp.dto.Doctor;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.jdbc.DataJdbcTest;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DataJdbcTest
public class DoctorRepoImplTests {

    private JdbcTemplate jdbcTemplate;

    private DoctorRepo doctorDao;

    @Autowired
    public void DoctorDaoImplTests(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
        doctorDao = new DoctorRepoImpl(jdbcTemplate);
    }

    @Test
    @DisplayName("Create new Doctor Test")
    public void createNewDoctorTest() {
        Doctor doctor = new Doctor();
        doctor.setDFName("John");
        doctor.setDLName("Doe");
        doctor.setSpecialty("Cardiology");
        doctor.setOfficeNumber("Room 101");
        doctorDao.addDoctor(doctor);
        List<Doctor> doctors = doctorDao.getAllDoctors();
        assertNotNull(doctors);
        assertEquals(6, doctors.size());
    }

    @Test
    @DisplayName("Get All Doctors Test")
    public void getAllDoctorsTest() {
        List<Doctor> newList = doctorDao.getAllDoctors();
        assertNotNull(newList);
        assertEquals(5, newList.size());
    }

    @Test
    @DisplayName("Find A Doctor By ID: 3 Test")
    public void findDoctorByID3Test() {
        Doctor doctor = doctorDao.getDoctorById(3);
        assertNotNull(doctor);
        assertEquals("Michael Johnson", doctor.getDFName() + " " + doctor.getDLName());
    }

    @Test
    @DisplayName("Update Doctor Info Test")
    public void updateDoctorInfoTest() {
        Doctor doctor = new Doctor();
        doctor.setDid(2);
        doctor.setDFName("Jane");
        doctor.setDLName("Smith");
        doctor.setSpecialty("Dermatology");
        doctor.setOfficeNumber("Room 202");
        doctorDao.updateDoctor(doctor);

        List<Doctor> newList = doctorDao.getAllDoctors();
        assertNotNull(newList);

        int i = 0;
        for (Doctor d : newList) {
            if (d.getDFName().contains("Jane")) {
                i++;
            }
        }
        assertTrue(i != 0);

        int j = 0;
        for (Doctor d : newList) {
            if (d.getDLName().contains("Smith")) {
                j++;
            }
        }
        assertTrue(j != 0);
    }

    @Test
    @DisplayName("Delete a Doctor Test")
    public void deleteADoctorTest() {
        doctorDao.deleteDoctor(4);
        List<Doctor> newList = doctorDao.getAllDoctors();
        assertNotNull(newList);
        assertEquals(4, newList.size());
    }
}