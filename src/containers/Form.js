import React from "react";
import Text from "../components/Text";
import Select from "../components/Select";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import useStore from "../store/zustandStore";
import { useState } from "react";
import { useEffect } from "react";
import StandardImageList from "../components/ImageList";
import { Button, Paper } from "@mui/material";

// * use spritesTitles to set the titles to Images

const spriteTitles = {
  back_default: "Macho posterior",
  back_female: "Hembra posterior",
  back_shiny: "Macho brillante posterior",
  back_shiny_female: "Hembra brillante posterior",
  front_default: "Macho frontal",
  front_female: "Hembra frontal",
  front_shiny: "Macho frontal brillante",
  front_shiny_female: "Hembra frontal brillante",
};

export default function Form(props) {
  const navigate = useNavigate();
  // * Use navigate to return root path
  let { name } = useParams();
  const { typesData, pokemonData } = useStore();
  const types = typesData.map((data) => data.name);

  const pokemonToUpdate = pokemonData.find((pokemon) => pokemon.name === name);
  useEffect(() => {
    if (!pokemonToUpdate) {
      navigate("/");
    }
  }, [name]);

  const [selectedTypes, setSelectedTypes] = useState(
    pokemonToUpdate?.types.map((type) => type?.type.name)
  );
  const [info, setInfo] = useState({
    name: pokemonToUpdate?.name,
    description: pokemonToUpdate?.description,
    img: "",
  });

  const [teammates, setTeammates] = useState([]);
  const [selectedTeammates, setSelectedTeammates] = useState([]);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(teammates);
    if (pokemonToUpdate) {
      pokemonToUpdate.description = info.description;
      pokemonToUpdate.name = info.name;

      if (info.img.length > 0) {
        pokemonToUpdate.img = info.img;
      }
      console.log(pokemonToUpdate.teammates);
      if (selectedTeammates.length > 0) {
        pokemonToUpdate.teammates = selectedTeammates;
      }

      if (selectedTypes.length > 0) {
        pokemonToUpdate.types = selectedTypes.map((type, index) => ({
          slot: index + 1,
          type: { name: type },
        }));
      }
    }

    setTeammates([]);
    setSelectedTypes([]);
    navigate("/");
  };
  useEffect(() => {
    // Filter the Pokémon based on selected types

    const filteredPokemon = pokemonData.filter((pokemon) => {
      const pokemonTypes = pokemon.types.map((type) => type.type.name);
      return selectedTypes.every((type) => pokemonTypes.includes(type));
    });

    // Extract the names of filtered Pokémon
    const teammateNames = filteredPokemon.map((pokemon) => pokemon.name);

    // Set the teammate names as the new state
    setTeammates(teammateNames);
  }, [pokemonData, selectedTypes, name]);

  return (
    <form onSubmit={onSubmit} style={{ height: "100vh" }}>
      <Button
        onClick={() => {
          navigate("/");
        }}
        sx={{ position: "absolute", left: 0, border: "1px solid blue" }}
      >
        {" "}
        Volver{" "}
      </Button>
      <Paper sx={{ my: 2 }}>
        <Text
          name={"name"}
          label={"New name"}
          setInfo={setInfo}
          info={info}
          defaultValue={pokemonToUpdate?.name}
        />
        <Text
          name={"description"}
          label={"Descripcion"}
          info={info}
          setInfo={setInfo}
          defaultValue={pokemonToUpdate?.description}
        />

        <Select
          array={types}
          label={"New type"}
          selectedTypes={selectedTypes}
          setSelectedTypes={setSelectedTypes}
          defaultValue={"foundPokemon.my_teammates"}
          pokemonToUpdate={pokemonToUpdate}
        />
        <Select
          array={teammates}
          label={"Best teammate"}
          defaultValue={"foundPokemon.my_types"}
          pokemonToUpdate={pokemonToUpdate}
          setSelectedTeammates={setSelectedTeammates}
        />

        <StandardImageList
          pokemonToUpdate={pokemonToUpdate}
          info={info}
          setInfo={setInfo}
          defaultValue={"foundPokemon.my_sprite"}
        />

        <Button type={"submit"} sx={customButtonStyle}>
          Submit
        </Button>
      </Paper>
    </form>
  );
}

const customButtonStyle = {
  backgroundColor: "#2196f3", // Color azul
  color: "#ffffff", // Texto en color blanco
  fontSize: "1.1rem", // Tamaño de fuente ligeramente más grande
  padding: "10px 20px", // Espaciado interno
  "&:hover": {
    backgroundColor: "#1565c0", // Color azul oscuro al pasar el ratón por encima
  },
};
