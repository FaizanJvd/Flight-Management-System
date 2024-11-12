import { combineReducers, configureStore } from "@reduxjs/toolkit";

import authReducer from "./features/authSlice";
import flightReducer from "./features/flightSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  flight: flightReducer
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

// Types for RootState and AppDispatch
export type RootState = ReturnType<ReturnType<typeof makeStore>["getState"]>;
export type AppDispatch = ReturnType<typeof makeStore>["dispatch"];
export type AppStore = ReturnType<typeof makeStore>;
