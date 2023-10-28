import { TextField } from "@mui/material";
import React from "react";
import useStore from "../store/zustandStore";

export const TextfieldSearch = () => {
  const { search, setSearch } = useStore();

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <TextField
      name="search"
      onChange={handleChange}
      placeholder="Search"
      value={search}
    />
  );
};
