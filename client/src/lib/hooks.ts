import { useDispatch, useSelector, useStore } from "react-redux";

import type { AppDispatch, AppStore, RootState } from "./store";

// Use throughout your app to dispatch actions with TypeScript types
export const useAppDispatch = () => useDispatch<AppDispatch>();
// Use throughout your app to select state with TypeScript types
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// Optional: Use this if you need direct access to the store with TypeScript types
export const useAppStore = () => useStore.withTypes<AppStore>();

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppSelector = useSelector.withTypes<RootState>();
