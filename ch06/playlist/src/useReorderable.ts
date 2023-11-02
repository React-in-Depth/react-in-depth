import { type Reducer, useReducer } from "react";
import { Action } from "./types";

type State<T> = T[];

function reorder<T>(state: State<T>, action: Action): State<T> {
  const newState: T[] = [...state];

  switch (action.type) {
    case "up": {
      if (action.index <= 0 || action.index >= newState.length) {
        return state;
      }
      // Swap previous element with index
      [newState[action.index - 1], newState[action.index]] = [
        newState[action.index],
        newState[action.index - 1],
      ];
      return newState;
    }
    case "down": {
      if (action.index < 0 || action.index >= newState.length - 1) {
        return state;
      }
      // Swap next element with index
      [newState[action.index], newState[action.index + 1]] = [
        newState[action.index + 1],
        newState[action.index],
      ];
      return newState;
    }
    case "first": {
      if (action.index <= 0 || action.index >= newState.length) {
        return state;
      }
      // Move index to top
      const itemToTop = newState.splice(action.index, 1)[0];
      newState.unshift(itemToTop);
      return newState;
    }
    case "last": {
      if (action.index < 0 || action.index >= newState.length) {
        return state;
      }
      // Move index to bottom
      const itemToBottom = newState.splice(action.index, 1)[0];
      newState.push(itemToBottom);
      return newState;
    }
    default:
      return state;
  }
}

export function useReorderable<T>(initial: State<T>) {
  return useReducer<Reducer<State<T>, Action>>(reorder, initial);
}
