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
    return enrichedData; // Return the enriched data
  } catch (error) {
    console.error("Error fetching appointments:", error.message);
    return []; // Return an empty array in case of an error
  }
};

export default fetchAppointments;
