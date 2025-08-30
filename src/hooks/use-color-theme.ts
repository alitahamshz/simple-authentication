// hooks/use-color-theme.ts
"use client";

import { useEffect, useState } from "react";
export const colorThemes = ["blossom","sage","coral","lavender","mint","ocean"] as const;
export type ColorTheme = typeof colorThemes[number];

const KEY = "color-theme";

export function useColorTheme() {
  const [ready, setReady] = useState(false);
  const [color, setColor] = useState<ColorTheme>();

  useEffect(() => {
    try {
      const saved = (localStorage.getItem(KEY) as ColorTheme) || "";
      document.documentElement.setAttribute("data-theme", saved);
      setColor(saved);
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, color);
      document.documentElement.setAttribute("data-theme", color);
    } catch {}
  }, [color, ready]);

  return { color, setColor, ready };
}