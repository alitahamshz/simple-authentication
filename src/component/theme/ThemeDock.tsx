"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Check, Moon, Sun, Monitor, Paintbrush } from "lucide-react";

type Side = "left" | "right";

const colorThemes = [
  "blossom",
  "coral",
  "lavender",
  "mint",
  "sage",
  "ocean",
  "sand",
] as const;

type ColorTheme = (typeof colorThemes)[number];

const THEME_SWATCHES: Record<ColorTheme, string> = {
  blossom: "#E56B6F",
  coral: "#FF7F50",
  lavender: "#A78BFA",
  mint: "#34D399",
  sage: "#16A34A",
  ocean: "#0EA5E9",
  sand: "#F59E0B",
};

const STORAGE_KEY = "color-theme";

export function ThemeDock({ side = "left" }: { side?: Side }) {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  const [ready, setReady] = useState(false);
  const [color, setColor] = useState<ColorTheme>("blossom");

  const { theme, setTheme, resolvedTheme } = useTheme();

  // Gate SSR to avoid hydration mismatch
  useEffect(() => setMounted(true), []);

  // Init color theme from localStorage before interactions
  useEffect(() => {
    try {
      const saved = (localStorage.getItem(STORAGE_KEY) as ColorTheme) || "blossom";
      document.documentElement.setAttribute("data-theme", saved);
      setColor(saved);
    } finally {
      setReady(true);
    }
  }, []);

  // Persist and apply color theme
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, color);
      document.documentElement.setAttribute("data-theme", color);
    } catch {}
  }, [color, ready]);

  if (!mounted || !ready) return null;

  const isLeft = side === "left";
  const sideClass = isLeft ? "left-0" : "right-0";
  const translateClosed = isLeft ? "-translate-x-full" : "translate-x-full";
  const roundedTab = isLeft ? "rounded-r-lg" : "rounded-l-lg";
  const tabTranslate = open
    ? isLeft
      ? "translateX(288px)"
      : "translateX(-288px)"
    : "translateX(0)";

  return (
    <>
      {/* Sliding panel */}
      <div
        className={`fixed top-0 ${sideClass} z-[60] h-screen w-72 transform bg-popover text-popover-foreground border border-border shadow-xl transition-transform duration-300 ${
          open ? "translate-x-0" : translateClosed
        }`}
        style={{ willChange: "transform" }}
      >
        <div className="flex items-center justify-between border-b border-border p-3">
          <div className="flex items-center gap-2">
            <Paintbrush className="h-4 w-4 opacity-70" />
            <span className="text-sm font-medium">سفارشی‌سازی تم</span>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            بستن
          </button>
        </div>

        <div className="space-y-5 p-4">
          {/* Mode: System / Light / Dark */}
          <div>
            <div className="mb-2 text-xs font-medium text-muted-foreground">
              حالت نمایش
            </div>
            <div className="grid grid-cols-3 gap-2">
              <ModeButton
                active={theme === "system"}
                onClick={() => setTheme("system")}
                icon={<Monitor className="h-4 w-4" />}
                label="سیستم"
              />
              <ModeButton
                active={
                  theme === "light" ||
                  (theme === "system" && resolvedTheme === "light")
                }
                onClick={() => setTheme("light")}
                icon={<Sun className="h-4 w-4" />}
                label="روشن"
              />
              <ModeButton
                active={
                  theme === "dark" ||
                  (theme === "system" && resolvedTheme === "dark")
                }
                onClick={() => setTheme("dark")}
                icon={<Moon className="h-4 w-4" />}
                label="تاریک"
              />
            </div>
          </div>

          {/* Brand color themes */}
          <div>
            <div className="mb-2 text-xs font-medium text-muted-foreground">
              رنگ برند
            </div>
            <div className="grid grid-cols-4 gap-3">
              {colorThemes.map((t) => (
                <Swatch
                  key={t}
                  label={t}
                  color={THEME_SWATCHES[t]}
                  active={color === t}
                  onClick={() => setColor(t)}
                />
              ))}
            </div>
          </div>

          {/* Quick preview */}
          <div className="space-y-2 rounded-lg border border-border p-3">
            <div className="flex gap-2">
              <button className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground shadow transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                دکمه اصلی
              </button>
              <button className="rounded-md border border-border bg-secondary px-3 py-1.5 text-xs text-secondary-foreground transition hover:bg-accent/60">
                دکمه خنثی
              </button>
            </div>
            <a href="#" className="text-xs text-primary hover:opacity-80">
              لینک با رنگ برند
            </a>
          </div>
        </div>
      </div>

      {/* Vertical tab */}
      <button
        aria-label="Theme settings"
        onClick={() => setOpen((v) => !v)}
        className={`fixed top-1/2 ${sideClass} z-[61] -translate-y-1/2 bg-primary px-3 text-primary-foreground shadow-md transition ${roundedTab}`}
        style={{
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          transform: `translateY(-50%) ${tabTranslate}`,
        }}
      >
        تنظیمات تم
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[50] bg-black/20"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}

function ModeButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-1.5 rounded-md border px-2 py-1.5 text-xs transition ${
        active
          ? "border-primary bg-primary/10 text-foreground"
          : "border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function Swatch({
  label,
  color,
  active,
  onClick,
}: {
  label: string;
  color: string;
  active: boolean;
  onClick: () => void;
}) {
  const ring = active
    ? "ring-2 ring-ring ring-offset-2 ring-offset-background"
    : "";
  return (
    <button
      onClick={onClick}
      className="group flex flex-col items-center gap-1"
      aria-pressed={active}
      title={label}
    >
      <span
        className={`relative inline-flex h-8 w-8 items-center justify-center rounded-full border border-border shadow-sm transition ${ring}`}
        style={{ backgroundColor: color }}
      >
        {active && <Check className="h-4 w-4 text-white drop-shadow" />}
      </span>
      <span className="text-[10px] leading-none text-muted-foreground group-hover:text-foreground">
        {label}
      </span>
    </button>
  );
}