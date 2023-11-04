import { v4 as uuid } from "uuid";
import { createSlice, configureStore } from "@reduxjs/toolkit";

export const STORAGE_KEY = "100-things-redux";

const getInitialThings = () =>
  JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
    things: [],
    currentThing: null,
  };

const reducers = {
  seeThing: (draft, { payload: newThing }) => {
    draft.currentThing = newThing;
  },
  seeAllThings: (draft) => {
    draft.currentThing = null;
  },
  addThing: (draft, { payload: name }) => {
    draft.things.push({ id: uuid(), name, done: [] });
  },
  removeThing: (draft, { payload: id }) => {
    const index = draft.things.findIndex((thing) => thing.id === id);
    if (index !== -1) {
      draft.things.splice(index, 1);
      if (id === draft.currentThing) {
        draft.currentThing = null;
      }
    }
  },
  doThing: (draft, { payload: id }) => {
    const thing = draft.things.find((thing) => thing.id === id);
    thing.done.push(Date.now());
  },
  undoThing: (draft, { payload: { id, index } }) => {
    const thing = draft.things.find((thing) => thing.id === id);
    thing.done.splice(index, 1);
  },
};

const dataSlice = createSlice({
  name: "data",
  initialState: getInitialThings(),
  reducers,
});

export const store = configureStore({
  reducer: {
    data: dataSlice.reducer,
  },
});

export const actions = dataSlice.actions;
