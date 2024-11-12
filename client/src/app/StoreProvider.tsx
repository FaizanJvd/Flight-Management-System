"use client";
import React, { useRef } from "react";
import { Provider } from "react-redux";

import { AppStore, makeStore } from "../lib/store"; // Adjust path as necessary

interface StoreProviderProps {
  children: React.ReactNode;
}

const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const storeRef = useRef<AppStore>();

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;