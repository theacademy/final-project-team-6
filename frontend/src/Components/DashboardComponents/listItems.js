import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import PersonIcon from "@mui/icons-material/Person";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import Typography from "@mui/material/Typography";

export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon sx={{ fontSize: "35px", color: "#7637A0" }} />
      </ListItemIcon>
      <ListItemText>
        <Typography variant="h6">Dashboard</Typography>
      </ListItemText>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PersonIcon sx={{ fontSize: "35px", color: "#EBB93E" }} />
      </ListItemIcon>
      <ListItemText>
        <Typography variant="h6">Patients</Typography>
      </ListItemText>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <Diversity1Icon sx={{ fontSize: "35px", color: "#98BC76" }} />
      </ListItemIcon>
      <ListItemText>
        <Typography variant="h6">Providers</Typography>
      </ListItemText>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <BookOnlineIcon sx={{ fontSize: "35px", color: "#710C10" }} />
      </ListItemIcon>
      <ListItemText>
        <Typography variant="h6">Appointments</Typography>
      </ListItemText>
    </ListItemButton>
  </React.Fragment>
);
