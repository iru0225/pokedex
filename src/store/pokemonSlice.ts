import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { Pokemon, PokemonListItem, PokemonState } from '../types/pokemon';

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

export const fetchPokemonList = createAsyncThunk(
  'pokemon/fetchList',
  async ({ offset = 0, limit = 20 }: { offset?: number; limit?: number }) => {
    const response = await axios.get(`${POKEAPI_BASE_URL}/pokemon?offset=${offset}&limit=${limit}`);
    const pokemonList: PokemonListItem[] = response.data.results;

    const detailedPokemon = await Promise.all(
      pokemonList.map(async (pokemon) => {
        const detailResponse = await axios.get(pokemon.url);
        return detailResponse.data;
      })
    );

    return {
      pokemon: detailedPokemon,
      totalCount: response.data.count,
    };
  }
);

export const fetchPokemonById = createAsyncThunk(
  'pokemon/fetchById',
  async (id: number) => {
    const response = await axios.get(`${POKEAPI_BASE_URL}/pokemon/${id}`);
    return response.data;
  }
);

export const searchPokemon = createAsyncThunk(
  'pokemon/search',
  async (searchTerm: string) => {
    const response = await axios.get(`${POKEAPI_BASE_URL}/pokemon/${searchTerm.toLowerCase()}`);
    return response.data;
  }
);

export const fetchPokemonByType = createAsyncThunk(
  'pokemon/fetchByType',
  async ({ type, offset = 0, limit = 20 }: { type: string; offset?: number; limit?: number }) => {
    const response = await axios.get(`${POKEAPI_BASE_URL}/type/${type.toLowerCase()}`);
    const allPokemonList = response.data.pokemon.map((p: { pokemon: PokemonListItem }) => p.pokemon);
    
    const paginatedList = allPokemonList.slice(offset, offset + limit);

    const detailedPokemon = await Promise.all(
      paginatedList.map(async (pokemon: PokemonListItem) => {
        const detailResponse = await axios.get(pokemon.url);
        return detailResponse.data;
      })
    );

    return {
      pokemon: detailedPokemon,
      totalCount: allPokemonList.length,
    };
  }
);

const initialState: PokemonState = {
  pokemonList: [],
  selectedPokemon: null,
  loading: false,
  error: null,
  currentPage: 0,
  totalCount: 0,
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setSelectedPokemon: (state, action: PayloadAction<Pokemon | null>) => {
      state.selectedPokemon = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPokemonList.fulfilled, (state, action) => {
        state.loading = false;
        const uniquePokemon = [...new Map(
          [...state.pokemonList, ...action.payload.pokemon].map(item => [item.id, item])
        ).values()];
        state.pokemonList = uniquePokemon;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(fetchPokemonList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch Pokemon';
      })
      .addCase(fetchPokemonById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPokemonById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPokemon = action.payload;
      })
      .addCase(fetchPokemonById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch Pokemon';
      })
      .addCase(searchPokemon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchPokemon.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPokemon = action.payload;
      })
      .addCase(searchPokemon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Pokemon not found';
      })
      .addCase(fetchPokemonByType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPokemonByType.fulfilled, (state, action) => {
        state.loading = false;
        const uniquePokemon = [...new Map(
          [...state.pokemonList, ...action.payload.pokemon].map(item => [item.id, item])
        ).values()];
        state.pokemonList = uniquePokemon;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(fetchPokemonByType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch Pokemon by type';
      });
  },
});

export const { setSelectedPokemon, clearError } = pokemonSlice.actions;
export default pokemonSlice.reducer;
