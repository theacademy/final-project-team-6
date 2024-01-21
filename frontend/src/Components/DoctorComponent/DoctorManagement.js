// DoctorManagement.js
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

const DoctorManagement = () => {
  const [doctors, setDoctors] = useState([]);
  const [newDoctor, setNewDoctor] = useState({
    dfname: "",
    dlname: "",
    specialty: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedDoctor, setEditedDoctor] = useState({
    dfname: "",
    dlname: "",
    specialty: "",
  });

  const openModal = (doctor) => {
    setEditedDoctor(doctor);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditedDoctor({
      dfname: "",
      dlname: "",
      specialty: "",
    });
  };

  // Fetch doctors from backend
  const fetchDoctors = async () => {
    try {
      const response = await fetch("http://localhost:8080/doctor/doctors");
      if (!response.ok) {
        throw new Error("Failed to fetch doctors");
      }
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.error("Error fetching doctors:", error.message);
    }
  };

  // Call fetchDoctors when the component mounts
  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleAddDoctor = async () => {
    try {
      const response = await fetch("http://localhost:8080/doctor/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDoctor),
      });

      if (!response.ok) {
        throw new Error("Failed to add doctor");
      }

      const addedDoctor = await response.json();
      setDoctors([...doctors, addedDoctor]);

      // Reset the newDoctor state
      setNewDoctor({
        dfname: "",
        dlname: "",
        specialty: "",
      });
    } catch (error) {
      console.error("Error adding doctor:", error.message);
    }
  };

  const handleEditDoctor = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/doctor/${editedDoctor.did}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedDoctor),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to edit doctor");
      }

      const updatedDoctor = await response.json();

      // Update the doctors state
      setDoctors((prevDoctors) =>
        prevDoctors.map((doctor) =>
          doctor.did === editedDoctor.did ? updatedDoctor : doctor
        )
      );

      // Close the modal after successful edit
      closeModal();
    } catch (error) {
      console.error("Error editing doctor:", error.message);
    }
  };

  const handleRemoveDoctor = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/doctor/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to remove doctor");
      }

      // Update the doctors state
      setDoctors((prevDoctors) =>
        prevDoctors.filter((doctor) => doctor.did !== id)
      );
    } catch (error) {
      console.error("Error removing doctor:", error.message);
    }
  };

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setNewDoctor({
      dfname: "",
      dlname: "",
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
        Provider Management
        <IconButton
          color="primary"
          onClick={openAddModal}
          style={{ marginLeft: "8px" }}
        >
          <AddBoxIcon style={{ fontSize: 35, color: "#4CAF50" }} />
        </IconButton>
      </Typography>
      <Divider style={{ marginBottom: "16px" }} />
      <Grid container spacing={2}>
        {doctors.map((doctor) => (
          <Grid item xs={12} key={doctor.did}>
            <Paper
              elevation={2}
              style={{
                padding: "16px",
                borderRadius: "8px",
                textAlign: "left",
              }}
            >
              <Typography variant="subtitle1" gutterBottom>
                {`${doctor.dfname} ${doctor.dlname}`}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {doctor.specialty}
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => openModal(doctor)}
                style={{ marginTop: "8px" }}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleRemoveDoctor(doctor.did)}
                style={{ marginTop: "8px", marginLeft: "8px" }}
              >
                Remove
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Edit Doctor Modal */}
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
            Edit Provider
          </Typography>
          <TextField
            label="First Name"
            value={editedDoctor.dfname}
            onChange={(e) =>
              setEditedDoctor({ ...editedDoctor, dfname: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Last Name"
            value={editedDoctor.dlname}
            onChange={(e) =>
              setEditedDoctor({ ...editedDoctor, dlname: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Specialty"
            value={editedDoctor.specialty}
            onChange={(e) =>
              setEditedDoctor({ ...editedDoctor, specialty: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleEditDoctor(editedDoctor.did)}
            style={{ marginTop: "8px" }}
          >
            Save Changes
          </Button>
        </Box>
      </Modal>

      <Divider style={{ margin: "16px 0" }} />

      {/* Add Provider Modal */}
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
            Add New Provider
          </Typography>
          <TextField
            label="First Name"
            value={newDoctor.dfname}
            onChange={(e) =>
              setNewDoctor({ ...newDoctor, dfname: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Last Name"
            value={newDoctor.dlname}
            onChange={(e) =>
              setNewDoctor({ ...newDoctor, dlname: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Specialty"
            value={newDoctor.specialty}
            onChange={(e) =>
              setNewDoctor({ ...newDoctor, specialty: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddDoctor}
            style={{ marginTop: "8px", backgroundColor: "#4CAF50" }}
          >
            Add Provider
          </Button>
        </Box>
      </Modal>
    </Paper>
  );
};

export default DoctorManagement;
