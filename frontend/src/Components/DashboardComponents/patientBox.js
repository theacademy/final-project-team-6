import React from "react";

const PatientBox = ({ patients }) => {
  return (
    <div>
      <h2>Patients</h2>
      <ul>
        {patients.map((patient) => (
          <li key={patient.PID}>
            {patient.pFName} {patient.pLName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientBox;
