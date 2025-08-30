'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({ showSpinner: false });

export const RouteLoader = () => {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setShow(true);
    NProgress.start();

    // تأخیر کوتاه برای فعال‌سازی انیمیشن ورود
    const enterTimeout = setTimeout(() => {
      setVisible(true);
    }, 100); // یا 0 یا با requestAnimationFrame هم میشه

    const stopTimeout = setTimeout(() => {
      NProgress.done();
      setVisible(false);

      // بعد از انیمیشن خروج، کامپوننت رو hide کن
      setTimeout(() => {
        setShow(false);
      }, 300);
    }, 300);

    return () => {
      clearTimeout(enterTimeout);
      clearTimeout(stopTimeout);
    };
  }, [pathname]);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-white/0  transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <span className="h-10 w-10 animate-spin rounded-full border-4 border-laundry border-t-transparent" />
    </div>
  );
};
