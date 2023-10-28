import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function Text({ label, defaultValue, setInfo, info, name }) {
  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          name={name}
          // error
          // id="standard-error-helper-text"
          onChange={handleChange}
          label={label}
          defaultValue={defaultValue}
          // helperText="Incorrect entry."
          variant={label === "Descripcion" ? "outlined" : "standard"}
          multiline={label === "Descripcion" ? true : false}
          rows={5}
        />
      </div>
    </Box>
  );
}
