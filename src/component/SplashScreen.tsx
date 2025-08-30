/* eslint-disable react-hooks/exhaustive-deps */
// components/SplashScreen.tsx
'use client';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEffect, useState } from 'react';

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish(); // پایان نمایش Splash
    }, 2000); // مثلا ۲ ثانیه

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <h1 className="text-3xl font-bold">Aropet</h1>
    </div>
  );
}
