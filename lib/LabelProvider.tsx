"use client";

import { createContext, useContext } from "react";
import type { LabelMap } from "./labels";

const LabelContext = createContext<LabelMap>({});

export function LabelProvider({
  labels,
  children,
}: {
  labels: LabelMap;
  children: React.ReactNode;
}) {
  return <LabelContext.Provider value={labels}>{children}</LabelContext.Provider>;
}

export function useLabel(key: string, fallback?: string) {
  const labels = useContext(LabelContext);
  return labels[key] ?? fallback ?? key;
}

export function useLabels() {
  return useContext(LabelContext);
}
