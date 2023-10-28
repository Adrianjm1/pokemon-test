import React from "react";
import EnhancedTable from "../components/Table";
import { useNavigate } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import { Loader } from "../components/Loader/Loader";

import { axiosGet } from "../axios/axios";
import { useEffect } from "react";
import useStore from "../store/zustandStore";

export default function Home(props) {
  const navigate = useNavigate();
  const { pokemonData } = useStore();

  const handleEditButton = (row) => (e) => {
    e.stopPropagation();
    const {
      html_image,
      html_types,
      html_my_sprite,
      html_my_types,
      html_my_teammates,
      ...params
    } = row;
    // ! NAVIGATE NOT ACCEPT HTML PARAMS
    navigate(`form/${row.name}`, {
      state: { ...params },
    });
  };

  return (
    <div>
      {pokemonData.length > 0 ? (
        <EnhancedTable
          rowsProp={pokemonData}
          handleEditButton={handleEditButton}
        />
      ) : (
        <Box>
          <Loader />
        </Box>
      )}
    </div>
  );
}
