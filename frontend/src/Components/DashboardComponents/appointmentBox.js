import React, { useEffect, useState } from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import moment from "moment";

function preventDefault(event) {
  event.preventDefault();
}

async function fetchPatient(patientId) {
  const response = await fetch(`http://localhost:8080/patients/${patientId}`);
  const data = await response.json();
  const name = data.pFName + " " + data.pLName;
  return name;
}

async function fetchDoctor(doctorId) {
  const response = await fetch(`http://localhost:8080/doctor/${doctorId}`);
  const data = await response.json();
  const name = data.dfname + " " + data.dlname;
  return name;
}

export default function AppointmentTable() {
  const [rows, setRows] = React.useState([]);

  const fetchAppointments = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/appointment/appointments"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch appointments");
      }
      let data = await response.json();
      data = Object.values(data);

      // Fetch additional details for each appointment
      const enrichedData = await Promise.all(
        data.map(async (row) => {
          const patientName = await fetchPatient(row.patientId);
          const doctorName = await fetchDoctor(row.doctorId);
          return { ...row, patientName, doctorName };
        })
      );

      setRows(enrichedData);
    } catch (error) {
      console.error("Error fetching appointments:", error.message);
    }
  };

  // Call fetchAppointments when the component mounts
  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <React.Fragment>
      <Title>Recent Appointments</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Appointment ID</TableCell>
            <TableCell>Patient</TableCell>
            <TableCell>Doctor</TableCell>
            <TableCell>Appointment Date</TableCell>
            <TableCell>Appointment Time</TableCell>
            <TableCell>Appointment Status</TableCell>
            <TableCell>Appointment Note</TableCell>
            <TableCell align="right">Payment</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.appointmentId}>
              <TableCell>{row.appointmentId}</TableCell>
              <TableCell>{row.patientName}</TableCell>
              <TableCell>{row.doctorName}</TableCell>
              <TableCell>
                {moment(row.appointmentDateTime).format("MM/DD/YYYY")}
              </TableCell>
              <TableCell>
                {moment(row.appointmentDateTime).format("hh:mm A")}
              </TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>{row.note}</TableCell>
              <TableCell align="right">
                {row.hasPaid ? "Paid" : "Not Paid"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div
        sx={{
          marginTop: (theme) => theme.spacing(3),
        }}
      >
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
}
