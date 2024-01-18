package com.example.hasapp.service;

import com.example.hasapp.dao.AppointmentRepo;
import com.example.hasapp.dto.Appointment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class AppointmentServiceImpl implements AppointmentService {

    @Autowired
    AppointmentRepo appointmentRepo;
    @Override
    public List<Appointment> getAllAppointments() {
        return appointmentRepo.getAllAppointments();
    }

    @Override
    public Appointment getAppointmentById(int id) {
        return null;
    }

    @Override
    public Appointment addNewAppointment(Appointment appointment) {
        return null;
    }

    @Override
    public Appointment updateAppointmentData(int id, Appointment appointment) {
        return null;
    }

    @Override
    public void deleteAppointmentById(int id) {

    }
}
