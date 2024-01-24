import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

function SearchBar({ searchValueFunction }) {
  return (
    <form>
      {" "}
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Search Patient"
          variant="outlined"
          onChange={(e) => searchValueFunction(e.target.value)}
        />
      </Box>
    </form>
  );
}

export default SearchBar;
