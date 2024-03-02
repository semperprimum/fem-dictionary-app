import { configureStore } from "@reduxjs/toolkit";
import dictionaryReducer from "./dictionary/dictionarySlice";

export const store = configureStore({
  reducer: {
    dictionary: dictionaryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
