import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useStore = create(
  devtools((set) => ({
    search: "",
    pokemonData: [],
    typesData: [],

    setPokemonData: (data) => set({ pokemonData: data }),
    setSearch: (pokemon) => set({ search: pokemon }),
    setTypesData: (types) => set({ typesData: types }),
  }))
);

export default useStore;
