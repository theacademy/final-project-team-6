async function fetchPatient(patientId) {
  const token = localStorage.getItem('jwt_token');
  const response = await fetch(`http://localhost:8080/patients/${patientId}`, {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${token}`
    },
  });
  const data = await response.json();
  const name = data.firstName + " " + data.lastName;
  return name;
}

async function fetchDoctor(doctorId) {
  const token = localStorage.getItem('jwt_token');

  const response = await fetch(`http://localhost:8080/doctor/${doctorId}`, {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${token}`
    },
  });
  const data = await response.json();
  const name = data.firstName + " " + data.lastName;
  return name;
}

export const fetchPatients = async () => {
  const token = localStorage.getItem('jwt_token');

  try {
    const response = await fetch("http://localhost:8080/patients", {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch patients");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching patients:", error);
    return [];
  }
};

export const fetchDoctors = async () => {
  const token = localStorage.getItem('jwt_token');

  try {
    const response = await fetch("http://localhost:8080/doctor/doctors", {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch doctors");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return [];
  }
};

const fetchAppointments = async () => {
  const token = localStorage.getItem('jwt_token');

  try {
    const response = await fetch(
      "http://localhost:8080/appointment/appointments",
      {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`
        },
      }
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
