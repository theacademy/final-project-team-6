// PatientManagement.js
import React, { useState, useEffect } from "react";
import {
  Typography,
  Paper,
  Grid,
  Divider,
  Button,
  TextField,
} from "@mui/material";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import AddBoxIcon from "@mui/icons-material/AddBox";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const PatientManagement = () => {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const [patients, setPatients] = useState([]);
  const [newPatient, setNewPatient] = useState({
    pFName: "",
    pLName: "",
    birthday: "",
    phoneNumber: "",
    insuranceProvider: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedPatient, setEditedPatient] = useState({
    pFName: "",
    pLName: "",
    birthday: "",
    phoneNumber: "",
    insuranceProvider: "",
  });

  const openModal = (patient) => {
    setEditedPatient(patient);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditedPatient({
      pFName: "",
      pLName: "",
      birthday: "",
      phoneNumber: "",
      insurancePatient: "",
    });
  };

  // Fetch patients from backend
  const fetchPatients = async () => {
    try {
      const response = await fetch("http://localhost:8080/patients");
      if (!response.ok) {
        throw new Error("Failed to fetch patients");
      }
      const data = await response.json();
      setPatients(data);
    } catch (error) {
      console.error("Error fetching patients:", error.message);
    }
  };

  // Call fetchPatients when the component mounts
  useEffect(() => {
    fetchPatients();
  }, []);

  const handleAddPatient = async () => {
    try {
      const response = await fetch("http://localhost:8080/patient/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPatient),
      });

      if (!response.ok) {
        throw new Error("Failed to add patient");
      }

      const addedPatient = await response.json();
      setPatients([...patients, addedPatient]);

      // Reset the newPatient state
      setNewPatient({
        pFName: "",
        pLName: "",
        specialty: "",
      });
    } catch (error) {
      console.error("Error adding patient:", error.message);
    }
  };

  const handleEditPatient = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/patient/${editedPatient.did}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedPatient),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to edit patient");
      }

      const updatedPatient = await response.json();

      // Update the patients state
      setPatients((prevPatients) =>
        prevPatients.map((patient) =>
          patient.did === editedPatient.did ? updatedPatient : patient
        )
      );

      // Close the modal after successful edit
      closeModal();
    } catch (error) {
      console.error("Error editing patient:", error.message);
    }
  };

  const handleRemovePatient = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/patient/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to remove patient");
      }

      // Update the patients state
      setPatients((prevPatients) =>
        prevPatients.filter((patient) => patient.did !== id)
      );
    } catch (error) {
      console.error("Error removing patient:", error.message);
    }
  };

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setNewPatient({
      pFName: "",
      pLName: "",
      specialty: "",
    });
  };

  return (
    <Paper
      elevation={3}
      style={{ padding: "25px", marginTop: "16px" }}
      sx={{ backgroundColor: "#355828" }}
    >
      <Typography variant="h5" sx={{ color: "white" }} gutterBottom>
        Patient Management
        <IconButton
          color="primary"
          onClick={openAddModal}
          style={{ marginLeft: "8px" }}
        >
          <AddBoxIcon style={{ fontSize: 35, color: "#4CAF50" }} />
        </IconButton>
      </Typography>
      <Divider style={{ marginBottom: "16px" }} />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>First Name</StyledTableCell>
              <StyledTableCell align="right">Last Name</StyledTableCell>
              <StyledTableCell align="right">
                Birthdate (yyyy-mm-dd)
              </StyledTableCell>
              <StyledTableCell align="right">Phone Number</StyledTableCell>
              <StyledTableCell align="right">
                Insurance Provider
              </StyledTableCell>
              <StyledTableCell align="right">Edit</StyledTableCell>
              <StyledTableCell align="right">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((patient) => (
              <StyledTableRow key={patient.PID}>
                <StyledTableCell component="th" scope="row">
                  {patient.pFName}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {patient.pLName}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {patient.birthday}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {patient.phoneNumber}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {patient.insuranceProvider}
                </StyledTableCell>

                <StyledTableCell align="right">
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => openModal(patient)}
                    style={{ marginTop: "8px" }}
                  >
                    Edit
                  </Button>
                </StyledTableCell>

                <StyledTableCell align="right">
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleRemovePatient(patient.PID)}
                    style={{ marginTop: "8px", marginLeft: "8px" }}
                  >
                    Remove
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Patient Modal */}
      <Modal open={isModalOpen} onClose={closeModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: "8px",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Edit Patient
          </Typography>
          <TextField
            label="First Name"
            value={editedPatient.pFName}
            onChange={(e) =>
              setEditedPatient({ ...editedPatient, pFName: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Last Name"
            value={editedPatient.pLName}
            onChange={(e) =>
              setEditedPatient({ ...editedPatient, pLName: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Specialty"
            value={editedPatient.specialty}
            onChange={(e) =>
              setEditedPatient({ ...editedPatient, specialty: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleEditPatient(editedPatient.did)}
            style={{ marginTop: "8px" }}
          >
            Save Changes
          </Button>
        </Box>
      </Modal>

      <Divider style={{ margin: "16px 0" }} />

      {/* Add Patient Modal */}
      <Modal open={isAddModalOpen} onClose={closeAddModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: "8px",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Add New Patient
          </Typography>
          <TextField
            label="First Name"
            value={newPatient.pFName}
            onChange={(e) =>
              setNewPatient({ ...newPatient, pFName: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Last Name"
            value={newPatient.pLName}
            onChange={(e) =>
              setNewPatient({ ...newPatient, pLName: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Specialty"
            value={newPatient.specialty}
            onChange={(e) =>
              setNewPatient({ ...newPatient, specialty: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddPatient}
            style={{ marginTop: "8px", backgroundColor: "#4CAF50" }}
          >
            Add Patient
          </Button>
        </Box>
      </Modal>
    </Paper>
  );
};

export default PatientManagement;
