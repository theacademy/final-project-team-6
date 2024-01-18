package com.example.hasapp.dao;

import com.example.hasapp.dao.mappers.AppointmentMapper;
import com.example.hasapp.dto.Appointment;
import com.example.hasapp.dto.Doctor;
import com.example.hasapp.dto.Patient;
import jakarta.transaction.Transactional;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public class AppointmentRepoImpl implements AppointmentRepo{
    private final JdbcTemplate jdbcTemplate;

    public AppointmentRepoImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    @Override
    public List<Appointment> getAllAppointments() {
    final String sql = "SELECT * FROM Appointment";
    return jdbcTemplate.query(sql, new AppointmentMapper());
    }

    @Override
    public Appointment getAppointmentById(int id) {
        final String sql = "SELECT * FROM Appointment " +
                "Where AID = ?;";
        return jdbcTemplate.queryForObject(sql, new AppointmentMapper(),id);
    }

    @Override
    @Transactional
    public Appointment addAppointment(Appointment appointment) {
        final String sql ="INSERT INTO Appointment(PID, DID, AppointmentDateTime, status, note,hasPaid) " +
                "VALUES(?,?,?,?,?,?)";
        jdbcTemplate.update(sql, appointment.getPatientId(),
                appointment.getDoctorId(),
                appointment.getAppointmentDateTime(),
                appointment.getStatus(),
                appointment.getNote(),
                appointment.getHasPaid());
        int newId = jdbcTemplate.queryForObject("SELECT LAST_INSERT_ID()", Integer.class);
        appointment.setAppointmentId(newId);
        return appointment;
    }

    @Override
    @Transactional
    public void updateAppointment(Appointment appointment) {
        final String sql = "UPDATE Appointment SET AppointmentDateTime = ?, status = ?, " +
                "note = ?, hasPaid = ? WHERE AID = ?";
        jdbcTemplate.update(sql, appointment.getAppointmentDateTime(),
                appointment.getStatus(),
                appointment.getNote(),
                appointment.getHasPaid());
    }

    @Override
    @Transactional
    public void deleteAppointmentById(int id) {
        final String sql = "DELETE FROM Appointment WHERE AID = ?";
        jdbcTemplate.update(sql,id);
    }

    @Override
    public List<Appointment> getAppointmentForPatient(Patient patient) {
        final String sql = "SELECT * FROM Appointment WHERE PID = ?";
        return jdbcTemplate.query(sql,
                new AppointmentMapper(), patient.getId());
    }

    @Override
    public List<Appointment> getAppointmentForDoctor(Doctor doctor) {
        final String sql = "SELECT * FROM Appointment WHERE DID = ?";
        return jdbcTemplate.query(sql,
                new AppointmentMapper(), doctor.getId());
    }
}
