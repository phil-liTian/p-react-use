import { useReducer } from "react";

const toggleReducer = (state: boolean, nextState?: any) => {
  return typeof nextState === "boolean" ? nextState : !state;
};

const useToggle = (initialValue: boolean) => {
  return useReducer(toggleReducer, initialValue);
};

export default useToggle;
