'use client'
import { useEffect, useState } from "react";

export function useRealViewportHeight() {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const setRealHeight = () => {
      setHeight(window.innerHeight);
    };

    setRealHeight();

    window.addEventListener("resize", setRealHeight);
    return () => window.removeEventListener("resize", setRealHeight);
  }, []);

  return height;
}