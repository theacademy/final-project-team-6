import React from "react";

const AppointmentBox = ({ appointments }) => {
  return (
    <div>
      <h2>Appointments</h2>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.appointmentId}>
            {appointment.appointmentDetails}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentBox;
