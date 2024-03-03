import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { keyboardData } from "../../keyboardData";

interface Phonetic {
  text: string;
  audio: string;
  sourceUrl?: string;
  license?: {
    name: string;
    url: string;
  };
}

interface Definition {
  definition: string;
  synonyms: string[];
  antonyms: string[];
  example?: string;
}

export interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
  synonyms: string[];
  antonyms: string[];
}

interface License {
  name: string;
  url: string;
}

export interface DictionaryEntry {
  word: string;
  phonetic: string;
  phonetics: Phonetic[];
  meanings: Meaning[];
  license: License;
  sourceUrls: string[];
}

interface DictionaryState {
  dictionary: DictionaryEntry[];
  loading: boolean;
  error: string;
}

const initialState: DictionaryState = {
  dictionary: keyboardData, // Default data from keyboardData.ts
  loading: false,
  error: "",
};

const dictionarySlice = createSlice({
  name: "dictionary",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDictionary.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(
      fetchDictionary.fulfilled,
      (state, action: PayloadAction<DictionaryEntry[]>) => {
        state.dictionary = action.payload;
        state.loading = false;
        state.error = "";
      }
    );
    builder.addCase(fetchDictionary.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.code ?? "";
    });
  },
});

export const fetchDictionary = createAsyncThunk(
  "dictionary/fetchDictionary",
  async (word: string) => {
    const API_URI = "https://api.dictionaryapi.dev/api/v2/entries/en/";
    const data = await axios.get(`${API_URI}${word}`);
    return data.data;
  }
);

export const {} = dictionarySlice.actions;

export default dictionarySlice.reducer;
