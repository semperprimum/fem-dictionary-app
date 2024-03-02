import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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

interface Meaning {
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
  sourceUrls?: string[];
}

interface DictionaryState {
  dictionary: DictionaryEntry[];
  loading: boolean;
}

const initialState: DictionaryState = {
  dictionary: [
    {
      word: "keyboard",
      phonetic: "/ˈkiːbɔːd/",
      phonetics: [
        {
          text: "/ˈkiːbɔːd/",
          audio: "",
        },
        {
          text: "/ˈkiːbɔːd/",
          audio: "",
        },
        {
          text: "/ˈkibɔɹd/",
          audio:
            "https://api.dictionaryapi.dev/media/pronunciations/en/keyboard-us.mp3",
          sourceUrl: "https://commons.wikimedia.org/w/index.php?curid=1755168",
          license: {
            name: "BY-SA 3.0",
            url: "https://creativecommons.org/licenses/by-sa/3.0",
          },
        },
      ],
      meanings: [
        {
          partOfSpeech: "noun",
          definitions: [
            {
              definition:
                "(etc.) A set of keys used to operate a typewriter, computer etc.",
              synonyms: [],
              antonyms: [],
            },
            {
              definition:
                "A component of many instruments including the piano, organ, and harpsichord consisting of usually black and white keys that cause different tones to be produced when struck.",
              synonyms: [],
              antonyms: [],
            },
            {
              definition:
                "A device with keys of a musical keyboard, used to control electronic sound-producing devices which may be built into or separate from the keyboard device.",
              synonyms: [],
              antonyms: [],
            },
          ],
          synonyms: ["electronic keyboard"],
          antonyms: [],
        },
        {
          partOfSpeech: "verb",
          definitions: [
            {
              definition: "To type on a computer keyboard.",
              synonyms: [],
              antonyms: [],
              example: "Keyboarding is the part of this job I hate the most.",
            },
          ],
          synonyms: [],
          antonyms: [],
        },
      ],
      license: {
        name: "CC BY-SA 3.0",
        url: "https://creativecommons.org/licenses/by-sa/3.0",
      },
      sourceUrls: ["https://en.wiktionary.org/wiki/keyboard"],
    },
  ],
  loading: false,
};

const dictionarySlice = createSlice({
  name: "dictionary",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDictionary.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchDictionary.fulfilled,
      (state, action: PayloadAction<DictionaryEntry[]>) => {
        state.dictionary = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(fetchDictionary.rejected, (state) => {
      state.loading = false;
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
