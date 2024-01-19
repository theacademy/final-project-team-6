import React from "react";

const DoctorBox = ({ doctors }) => {
  return (
    <div>
      <h2>Doctors</h2>
      <ul>
        {doctors.map((doctor) => (
          <li key={doctor.did}>
            {doctor.dFName} {doctor.dLName} - {doctor.specialty}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorBox;
