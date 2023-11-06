import { create } from "zustand";

export const useCurrent = create((set) => ({
  currentId: null,
  seeThing: (id) => set(() => ({ currentId: id })),
  seeAllThings: () => set(() => ({ currentId: null })),
}));
