import Routes from "./Routes";
import "./App.css";
import Text from "./components/Text";
import EnhancedTable from "./components/Table";
import Dialog from "./components/Dialog";
import React from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { axiosGet } from "./axios/axios";
import useStore from "./store/zustandStore";

function App() {
  const [tableRows, setTableRows] = React.useState([]);
  const [pokemonTypesOptions, setPokemonTypesOptions] = React.useState([]);

  const handleUpdatePokemonRow = ({ id_pokemon, fields }) => {
    const { my_name, my_description, my_types, my_teammates, my_sprite } =
      fields;
  };

  const { pokemonData, setPokemonData, setTypesData } = useStore();

  const fetchData = async () => {
    try {
      const pokemonData = await axiosGet(
        "https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0"
      );
      const typesData = await axiosGet("https://pokeapi.co/api/v2/type/");
      const extractedData = await Promise.all(
        pokemonData.data.results.map(async (pokemon) => {
          const pokemonDetails = await axiosGet(pokemon.url);
          const { types, weight, height, id, name, sprites } =
            pokemonDetails.data;
          return { types, weight, height, id, name, sprites };
        })
      );
      setPokemonData(extractedData);
      setTypesData(typesData.data.results);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (pokemonData.length === 0) {
      fetchData();
    }
  }, []);

  return (
    <div className="App">
      <Routes
        tableRows={tableRows}
        pokemonTypesOptions={pokemonTypesOptions}
        handleUpdatePokemonRow={handleUpdatePokemonRow}
      />
      <Outlet />
    </div>
  );
}

export default App;
