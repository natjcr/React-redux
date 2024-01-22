import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPokemon, getPokemonDetails } from "../Api/Api";
import { setLoading } from "./uiSlice";

const initialState = {
    pokemons: [],
}

export const fetchPokemonWithDetails = createAsyncThunk(
    'data/fetchPokemonWithDetails',
    async (_, {dispatch}) => {
        //dispatch loader
        //fetch
        //dispatch loader
        dispatch(setLoading(true))
       const pokemonsRes = await getPokemon();
       const pokemonDetailed = await Promise.all(
        pokemonsRes.map((pokemon) => getPokemonDetails(pokemon))
       );
       dispatch(setPokemons(pokemonDetailed));
       dispatch(setLoading(false))
    }
)

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setPokemons: (state, action) => {
            state.pokemons = action.payload;
        },
        setFavorite: (state, action) => {
            const currentPokemonIndex = state.pokemons.findIndex((pokemon) => {
                  return pokemon.id === action.payload.pokemonId;
                });
          
                if (currentPokemonIndex >= 0) {
                 const isFavorite = state.pokemons[currentPokemonIndex].favorite;
                 
                 state.pokemons[currentPokemonIndex].favorite = !isFavorite
            }
        }
    }
})

export const { setFavorite, setPokemons } = dataSlice.actions;

export default dataSlice.reducer;