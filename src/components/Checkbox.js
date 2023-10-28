import React from "react";
import { Checkbox as MuiCheckbox } from "@mui/material";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function Checkbox() {
  return (
    <div>
      <MuiCheckbox {...label} defaultChecked />
    </div>
  );
}