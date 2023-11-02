import { type Reducer, useReducer } from "react";

type State<T> = T[];

type Action =
  | { type: "moveUp"; index: number }
  | { type: "moveDown"; index: number }
  | { type: "moveToTop"; index: number }
  | { type: "moveToBottom"; index: number };

function reorder<T>(state: State<T>, action: Action): State<T> {
  const newState: T[] = [...state];

  switch (action.type) {
    case "moveUp": {
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
    case "moveDown": {
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
    case "moveToTop": {
      if (action.index <= 0 || action.index >= newState.length) {
        return state;
      }
      // Move index to top
      const itemToTop = newState.splice(action.index, 1)[0];
      newState.unshift(itemToTop);
      return newState;
    }
    case "moveToBottom": {
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
  const [state, dispatch] = useReducer<Reducer<State<T>, Action>>(
    reorder,
    initial
  );

  return {
    list: state,
    moveUp: (index: number) => dispatch({ type: "moveUp", index }),
    moveDown: (index: number) => dispatch({ type: "moveDown", index }),
    moveToTop: (index: number) =>
      dispatch({ type: "moveToTop", index }),
    moveToBottom: (index: number) =>
      dispatch({ type: "moveToBottom", index }),
  };
}
