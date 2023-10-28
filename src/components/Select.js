import React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Select as MuiSelect } from "@mui/material";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function Select({
  array,
  label,
  setSelectedTypes,
  selectedTypes,
  pokemonToUpdate,
  setSelectedTeammates,
}) {
  const theme = useTheme();
  const defaultState =
    label === "New type"
      ? pokemonToUpdate?.types.map((pkm) => pkm.type.name)
      : pokemonToUpdate?.teammates
      ? pokemonToUpdate.teammates
      : [];
  const [personName, setPersonName] = React.useState(defaultState);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    if (label === "New type") {
      setSelectedTypes(typeof value === "string" ? value.split(",") : value);
    } else {
      setSelectedTeammates(
        typeof value === "string" ? value.split(",") : value
      );
    }
  };
  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Selección</InputLabel>
        <MuiSelect
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected &&
                selected.map((value) => <Chip key={value} label={value} />)}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {array &&
            array.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, personName, theme)}
              >
                {name}
              </MenuItem>
            ))}
        </MuiSelect>
      </FormControl>
    </div>
  );
}
