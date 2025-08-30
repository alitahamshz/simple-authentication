"use client";

import { useEffect, useState } from "react";

export default function ScrollIndicator() {
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY; // فقط window.scrollY
      console.log({scrollTop})
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setScrollPercent(percent);
      console.log("Scroll percent:", percent.toFixed(1));
    };

    handleScroll(); // بار اول
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        right: "20px",
        width: "6px",
        height: "200px",
        background: "#eee",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: `${scrollPercent}%`,
          background: "pink",
          transition: "height 0.1s ease-out",
        }}
      />
    </div>
  );
}
